"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createCategory = async (data:FormData) =>{
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`,{
        method:"POST",
        headers:{
            Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: data   //form data er ketre json.stringify krte hoina
    });
    revalidateTag("category")
    return res.json()
  } catch (err:any) {
    return Error(err);
  }
}

export const getAllCategories = async()=>{
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/category`,{
      next:{
        tags:["category"]
      }
    })
    return res.json();
  } catch (err:any) {
    return Error(err)
  }
}

export const deleteCategory = async (categoryId:string):Promise<any> =>{
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        method:"DELETE",
        headers:{
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("category")
    return res.json();
  } catch (err:any) {
    return Error(err);
  }
};