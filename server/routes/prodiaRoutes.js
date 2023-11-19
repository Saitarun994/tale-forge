import express from 'express';
import * as dotenv from "dotenv";
import { createProdia } from "prodia";
import sendRequest from "../google-foundation-models.js";
import { error } from 'console';

let paras;
let prompts;
let title;
let coverImage="";

dotenv.config();

const router = express.Router();
const prodia = createProdia({
	apiKey: process.env.PRODIA_KEY,
});

router.route('/').get((req,res)=>{
    res.send("Get ready for some good stories!");
})

router.route('/').post(async (req,res)=>{
    try{
        const{prompt} = req.body;
        console.log("\n\n<(   Received User prompt: " + prompt+"   )>");
        //? <<<<< use vertex code to obtain other properties >>>>>>>>
        
        // used for the vertex AI request
        let params = {
            apiEndpoint: "us-central1-aiplatform.googleapis.com",
            projectId: "atomic-segment-405503",
            modelId: "code-bison",
            instances: [
            {
                prefix:
                `I need you to write a complete story about:"${prompt}",
                it needs to be atleast 6 paragraphs and I need you to give me an image prompt which summaries each paragraph so that i can generate that image using ai 
                I need you to give me a title for the story and a prompt for the cover image of the story.
                I need you to return a json in the format.
                json:
                {paras:["...","...","..."]
                prompts:["...","...","..."]
                title:"..."
                coverImage:"..."
                }
                
                note: Strictly follow the format and  I want your response to be nothing but a json format i showed above`,
            },
            ],
            parameters: { temperature: 0.2, maxOutputTokens: 2000, topP: 0.8, topK: 40 },
        };
        
        try {
            const response = await sendRequest(params);
            const content = response.predictions[0].content;
            // Removing the code block formatting
            const jsonContent = content.replace(/```json\s*\n([\s\S]*?)\n```/, '$1');
            
            let parsedContent = "";
            try {
                 parsedContent = JSON.parse(jsonContent);
                // Access the parsed JSON content here
                console.log(parsedContent);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
            // Accessing the 'para' and 'prompt' variables
            paras = parsedContent.paras;
            prompts = parsedContent.prompts;
            title = parsedContent.title;
            coverImage = parsedContent.coverImage;

            console.log('Para:', paras);
            console.log('Prompt:', prompts);
            console.log('Title:', title);
            console.log('Cover:', coverImage);

        } catch (error) {
            console.log(error);
        }
        
        //! <<<<<< end of vertex call, obtained prompts/story >>>>>>>>
        
        

        const imageUrls = [];
        for (const prompt of prompts) {
            try {
                const final_prompt =prompt+"artistic masterpiece, realistic cartoon ,clean brush stroke and shading, realistic and detailed art."
                console.log('Making Prodia request...');
                const job = await prodia.generate({ prompt:final_prompt });
                const { imageUrl } = await prodia.wait(job);
                imageUrls.push(imageUrl);
            } catch (error) {
                console.error(error);
            }
        }
        
        // Generating the cover image
        console.log('Making Cover Image request...');
        const job = await prodia.generate({ prompt:coverImage });
        const {coverImageUrl, status } = await prodia.wait(job);
        console.log('CoverImg Url: '+ coverImageUrl);

        console.log('Image Urls :', imageUrls);
        res.status(200).json({photo: imageUrls , story: paras , title: title , coverImageUrl: coverImageUrl});
        console.log('\n<[         Generation data sent to client        ]>\n\n<');
    }
    catch(err){
        console.log(err);
        res.status(500).send(error?.response.data.error.message)
    }
});


export default router;