import React from 'react'
import {preview} from '../assets'
import {Loader} from '../components'

function StoryCard({photo,story,generatingImg}) {

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-5 my-5">
        <div className='rounded-md flex-shrink-0 
        hover:shadow-lg hover:transform hover:translate-y-[-2px] transition duration-300 ease-in-out'>
            {photo ? (
            <img
                src={photo}
                alt={story}
                className="w-full h-full object-contain rounded-md"
            />
            ) : (
            <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40 rounded-md"
            />
            )}

            {generatingImg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
            </div>
            )}
        </div>

        <div className="md:mt-0 flex-grow mb-10">
            {story ?(
                <p className="text-justify">
                    {story}
                </p>
            ):(
                <p className="text-justify">
                story is getting made ...
                </p>
            )

            }
        </div>
    </div>
  )
}

export default StoryCard
