import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/types";
import { getAllCategories } from "@/services/Category";
import { getAllBrands } from "@/services/Brand";
import { addProduct } from "@/services/Product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddProductsForm = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const [categories, setCategories] = useState<ICategory[] | []>([]);
    const [brands, setBrands] = useState<IBrand[] | []>([]);
    const router = useRouter();


    const form = useForm({
        defaultValues:{
            name:"",
            description:"",
            price:"",
            category:"",
            brand:"",
            stock:"",
            weight:"",
            availableColors:[{value:""}],
            keyFeatures:[{value:""}],
            specification:[{key:"", value:""}],
        },
    });

    const { formState: {isSubmitting }, } = form;

    const { append: appendColor, fields:colorFields } = useFieldArray({
        control: form.control,
        name:"availableColors"
    });

    const addColor = () =>{
        appendColor({value:""});
    }

    const { append: appendFeatures, fields:featureFields } = useFieldArray({
        control:form.control,
        name: "keyFeatures",
    });

    const addFeatures = () =>{
        appendFeatures({value:""});
    }

    const {append: appendSpec, fields:specFields } = useFieldArray({
        control: form.control,
        name:"specification"
    })

    const addSpec = () =>{
        appendSpec({key:"",value:""});
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            const [categoriesData, brandsData ] = await Promise.all([
                getAllCategories(),
                getAllBrands()
            ]);
            
            setCategories(categoriesData?.data);
            setBrands(brandsData?.data);
        }

        fetchData();
    },[])

    const onSubmit: SubmitHandler<FieldValues> = async (data) =>{
         const availableColors = data?.availableColors.map((color: {value:string})=> color.value);
            const keyFeatures = data?.keyFeatures.map((feature: {value:string})=> feature.value);

            const specification: {[key: string]: string} ={};
            data?.specification.forEach((item:{key:string, value:string}) => specification[item.key] = item.value)
            
            // console.log({ availableColors, keyFeatures, specification})
            const modifiedData = {
                ...data,
                availableColors,
                keyFeatures,
                specification,
                price: parseFloat(data?.price),
                stock: parseInt(data?.stock),
                weight: parseFloat(data?.weight)
            }

            const formData = new FormData();
            formData.append("data",JSON.stringify(modifiedData));
            for (const file of imageFiles) {
                formData.append("images", file);
            }
        try {
           const res = await addProduct(formData);
           if(res.success){
            toast.success(res?.message);
            router.push("/user/shop/products");
           }
           else{
            toast.error(res?.message)
           }
            
        } catch (err:any) {
            console.error(err)
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center border-t border-b py-3 my-5">
                        <p className="text-primary font-bold text-xl">Basic Information</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {
                        categories.map((category)=><SelectItem  key={category?._id} value={category?._id}>{category?.name}</SelectItem>)
                    }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {
                        categories.map((category)=><SelectItem  key={category?._id} value={category?._id}>{category?.name}</SelectItem>)
                    }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
                        {/* dynamic fields */}

                        <div>
                            <p className="text-primary font-bold text-xl">Key Features</p>
                            <Button onClick={addFeatures} variant="outline" className="size-10" type="button">
                                <Plus className="text-primary"/>
                            </Button>
                        </div>
                        
                        <div className="my-5">
                            {
                                featureFields.map((featureField, index) => <div key={featureField.id}>
                                    <FormField
                            control={form.control}
                            name={`keyFeatures.${index}.value`}
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Key Feature {index+1}</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                                </div>)
                            }
                        </div>

                        {/* dynamically add double field */}
                        <div>
                            <div className="flex justify-between items-center border-t border-b py-3 my-3">
                                <p className="text-primary font-bold text-xl">Specification</p>
                                <Button onClick={addSpec} variant="outline" className="size-10" type="button">
                                    <Plus/>
                                </Button>
                            </div>
                            {
                                specFields.map((specField, index) =>(
                                    <div key={specField.id} className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5">
                            <FormField
                            control={form.control}
                            name={`specification.${index}.key`}
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Feature name {index+1}</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name={`specification.${index}.value`}
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Feature Description {index+1}</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                            </div>
                                ))
                            }
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AddProductsForm;