export const getAllBrands = async()=>{
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/brand`,{
      next:{
        tags:["Brands"]
      }
    })
    const data = await res.json();
    return data;
  } catch (err:any) {
    return Error(err)
  }
}