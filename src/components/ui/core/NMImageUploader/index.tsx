import React, { Dispatch, SetStateAction, useState } from 'react';
import { Input } from '../../input';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type TImageUploaderProps ={
    label?:string;
    className?:string;
    setImageFiles: Dispatch<SetStateAction< File[]>>;
    setImagePreview: Dispatch<SetStateAction<string[]>>;
};

const NMImageUploader = ({label="Upload Images", className, setImageFiles, setImagePreview }: TImageUploaderProps) => {

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files![0];
        setImageFiles((prev) => [...prev, file]);

        if(file){
            const reader = new FileReader();

            reader.onloadend = ()=>{
                setImagePreview((prev) => [...prev, reader.result as string]);
            };

            reader.readAsDataURL(file);
        }
        event.target.value="";
    };

    
    return (
        <div className={cn("flex flex-col items-center w-full gap-4", className)}>
            <Input 
                onChange={handleImageChange} 
                type='file' 
                multiple 
                accept='image/*'
                className='hidden'
                id='image-uploader'
                    />
            <label className='w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-300 transition' htmlFor='image-uploader'>
                {label}
            </label>
            
        </div>
    );
};

export default NMImageUploader;