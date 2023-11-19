import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {preview,gears} from '../assets'
import {getRandomPrompt} from '../utils'
import {FormField,Loader} from '../components'
import StoryCard from '../components/StoryCard'

function CreatePost() {
  const navigate = useNavigate();
  const [form,setForm] =useState({
    name:"",
    prompt:"",
    photo:[],
    story:[],
    title:"",
    coverImageUrl:"",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage =async () => {
    if(form.prompt){
      try{
        setGeneratingImg(true);
        // website:- 
        // localhost:- http://localhost:8080/
        const response = await fetch("http://localhost:8080/api/v1/prodia",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({prompt: form.prompt}),
        })

        const data = await response.json();
        setForm({
          ...form,
          photo: data.photo,
          story: data.story,
          title: data.title,
          coverImageUrl: data.coverImageUrl,
        });
        console.log("Form Title:"+form.title+"\n");
        console.log("Form Cover:"+form.coverImageUrl+"\n");
        console.log("Form Story:"+form.story[0]+"\n");
        console.log("Form Photo:"+form.photo[0]+"\n");
      }
      catch(err){
        alert(err);
      }
      finally{
        setGeneratingImg(false);
      }
    }
    else{
      alert("Please enter a prompt");
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        // website:- 
        // localhost:- http://localhost:8080/
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }
  
  //? <<<<<<<<< Page Starts >>>>>>>>>>>
  return (
    <section className='max-w-7xl mx-auto'>
      <div className="flex flex-col items-center justify-center">
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Words Paint Worlds
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w [500px]'>
          Create Imaginative and visually stunning stories with just one prompt
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="felx flex-col gap-5">
        <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex. Jimothy Johnson"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Story Prompt"
            type="text"
            name="prompt"
            placeholder="A story about a sheep and a fox"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='my-5 felx gap-5'>
              <button
                type="button"
                onClick={generateImage}
                className='text-black bg-[#ffb199] font-medium 
                rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center
                hover:shadow-lg hover:transform hover:translate-y-[-2px] transition duration-300 ease-in-out'
              >
                {generatingImg ? "Generating..." : "Generate"}
              </button>
          </div>
          <div>
            <div className="flex items-center justify-center">
              {form.title ?(
                  <h1 className='font-extrabold text-[#222328] text-[32px] text-justify'>
                      {form.title}
                  </h1>
              ):(
                  <h1 className='font-extrabold text-[#222328] text-[32px] text-justify'>
                    Enter prompt to generate a story
                  </h1>
              )

              }
            </div>
            <div className="flex items-center justify-center rounded-md border-2">
              {form.coverImageUrl ? (
                <img
                    src={form.coverImageUrl}
                    alt={form.title}
                    className="w-full h-full object-contain rounded-md border-2"
                />
                ) : (
                <img
                    src={gears}
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40 rounded-md border-2"
                />
              )}
            </div>
          </div>
          {/* //!Story getting displayed here */}
          {form.photo.map((photo, index) => (
            <StoryCard
              key={index}
              photo={form.photo[index]}
              story={form.story[index]}
              generatingImg={generatingImg}
            />
          ))}
          
            
        </div>
        

        <div className='mt-10'>
              <p className='mt-2 text-[#666e75] text-[14px]'>
                Once you have created your story! You can share it with others in the community
              </p>
              <button
                type="submit"
                className='mt-3 text-black bg-[#ffb199] font-medium
                rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              >
                {loading ? "Sharing..." : "Share with others"}
              </button>
        </div>

        
      </form>
    </section>
  )
}

export default CreatePost
