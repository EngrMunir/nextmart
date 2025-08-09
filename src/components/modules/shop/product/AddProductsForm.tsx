import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

const AddProductsForm = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) =>{
        try {
            console.log(data);
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
                            name="brand"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}/>
                                    </FormControl>
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