import React, { useState } from 'react'
import axios from 'axios';

function Uploader({addedPhotos,onChange}) {

   
    const [photoLink,setPhotoLink] = useState()

    //upload photo 


    async function uploadPhoto(e){
    
        const files =  e.target.files;
        const data = new FormData()
         for(let i =0 ; i<files.length;i++){
   
           data.append('photos' , files[i])
         }
       await  axios.post('/upload' , data ,{
         headers:{
           "Content-Type" : 'multipart/form-data'
         }
        })
        .then(res  => {
         const {data:filenames} = res;
         onChange(prev=>{
           return [...prev , ...filenames];
         })
        })
         
       }


       //upload by link 


       async function addPhotoLink(ev){
        ev.preventDefault()
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink})   // for download image
        onChange(prev=>{
          return [...prev , filename];
        })
        setPhotoLink(' ')
      
          }


  return (
    <>
     <div className='flex gap-2'>
                    <input type="text" placeholder={'Add Your link here to upload ...jpg'} value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
                    <button  onClick={addPhotoLink} className='bg-gray-200 px-4 rounded-2xl py-2'>Add Photo</button>
                  </div>
                
                  <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                  {
                    addedPhotos.length >0 && addedPhotos.map((link, index)=>{
                      return (
                        <div key={index} className='h-32 flex'>
                        <img className='rounded-2xl w-full object-cover' src={`http://localhost:4000/uploads/${link}`} alt="" />
                       </div>
                      )
                    })
                  }
                  <label className='h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl text-base text-gray-800 gap-1 py-9'
>
                    <input type="file" multiple className='hidden' onChange={uploadPhoto} />

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload
                  </label>
                </div>
    </>
  )
}

export default Uploader
