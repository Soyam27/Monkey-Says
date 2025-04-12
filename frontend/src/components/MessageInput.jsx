import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { compressImage } from '../lib/imgCompression';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const {sendMessages} = useChatStore();
    const imageref = useRef();
    const [IsLoadingImage, setIsLoadingImage] = useState(false)

    const handleImageUpload = async (e) => {
        
        console.log(IsLoadingImage)
        const file = e.target.files[0];
        
        if (!file.type.startsWith("image/")) {
            toast.error("Select an image only");
            return;
        }
    
        try {
            const imageCompressed = await compressImage(file); // assuming this is async
            const reader = new FileReader();
    
            reader.readAsDataURL(imageCompressed);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        } catch (error) {
            toast.error("Failed to compress image");
            console.error(error);
        }
    };

    const handleImageRemove = () =>{
        setImage(null);
        if(imageref.current) imageref.current.value = null;
    }
    const handleSubmitData = async (e) =>{
        e.preventDefault();
        setIsLoadingImage(true)

        try {
            const data = {
                image: image,
                text: text.trim(), 
            }
    
            if(!data) return toast.error("Nothing to send");
    
            await sendMessages(data);
    
            setText("");
            setImage(null);
            if(imageref.current) imageref.current.value = null;
        } catch (error) {
            console.log(error)
            return
        }finally{
            setIsLoadingImage(false)
            console.log(IsLoadingImage)
        }
        
    }

  return(
    <div className='w-full'>
        <div className='absolute bottom-3 w-full'>

        <div className='mx-8'>
            {image && 
            <button onClick={handleImageRemove} className='relative w-fit'>
                {
                    IsLoadingImage? (
                        <div>
                          <div className="flex items-center justify-center size-20 rounded bg-gray-100">
                            <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                          </div>
                        </div>
                      ) 
                    :<img src = {image} className='size-20 rounded'/>
                }
                

                <X className='absolute top-[-10px] right-[-10px] bg-slate-800 rounded-full p-0.5' />

            </button>}
        </div>
        <div className='mx-8'>
            <form onSubmit={handleSubmitData} className='flex items-center gap-2'>
                <input value={text} onChange={(e)=> setText(e.target.value)} type='text' placeholder='Type your message...' className='input input-secondary w-full h-15'/>
                <input type='file' onChange={(e)=>handleImageUpload(e)} accept='image/*' className='hidden' ref={imageref} />
                <button type="button" onClick={()=>imageref.current?.click()}><Image className='size-5'/></button>
                <button type="submit" disabled={!text && !image}><Send className={`size-5 ${(!text && !image)?"tab-disabled":""}`}/></button>
            </form>
        </div>
    </div>

    </div>
  )
}  

export default MessageInput
