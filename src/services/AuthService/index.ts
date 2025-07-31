'use server'

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async(userData: FieldValues) =>{
   try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(userData)
    });
     const result = await res.json();
    
    // set token to cookies
    if(result.success){
       (await cookies()).set("accessToken", result.data.accessToken);
    }
    return result;
   } catch (error:any) {
    return Error(error)
   }
}
export const loginUser = async(userData: FieldValues) =>{
   try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(userData)
    });

    const result = await res.json();
    
    // set token to cookies
    if(result.success){
       (await cookies()).set("accessToken", result.data.accessToken);
    }


    return res.json();
   } catch (error:any) {
    return Error(error)
   }
}

// must call from server component
export const getCurrentUser = async() =>{
    const accessToken = (await cookies()).get('accessToken')!.value;
    let decodedData = null;

    if(accessToken){
        decodedData = await jwtDecode(accessToken)
        return decodedData;
    }else{
        return null
    }
}