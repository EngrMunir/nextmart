import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getAllProducts = async (page?:string) =>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product?page=${page}`,{
            next:{
                tags:["PRODUCT"],
            }
        })
    } catch (error:any) {
        return Error(error.message)
    }
}

export const getSingleProduct = async (productId:string) =>{
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/product/${productId}`
        );
        const data = await res.json();
        return data;
    } catch (error:any) {
        return Error(error.message)
    }
}
export const addProduct = async (productData:FormData):Promise<any> =>{
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/product`,{
                method:"POST",
                body:productData,
                headers:{
                    Authorization:(await cookies()).get("accessToken")!.value,
                },
            }
        );
        revalidateTag("PRODUCT");
        return res.json();
    } catch (error:any) {
        return Error(error)
    }
}
export const updateProduct = async (productData:FormData, productId:string):Promise<any> =>{
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/product/${productId}`,{
                method:"PATCH",
                body:productData,
                headers:{
                    Authorization:(await cookies()).get("accessToken")!.value,
                },
            }
        );
        return res.json();
    } catch (error:any) {
        return Error(error)
    }
}
