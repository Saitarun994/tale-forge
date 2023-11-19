import {surpriseMePrompts} from "../constants"
import FilerSaver from 'file-saver';

export function getRandomPrompt(prompt){
    const randomIndex =Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex]; 
    // Make sure we dont get the same prompt twice or thrice
    if(randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id, photo){
    FilerSaver.saveAs(photo, `download-${_id}.jpg`);
}