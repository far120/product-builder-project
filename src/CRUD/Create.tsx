import { v4 as uuid } from "uuid";
import MyModal from "../Ui/Model/Model"
import Button from "../Ui/Button/Button"
import React, { useEffect, useState } from "react"
import {formInputsList } from "../data/index"
import Input from "../Ui/Input/Input"
import { ICategory, IProduct } from "../interfaces/index"
import { productList } from "../data/index"
import { productValidation } from "../validation";
import ErrorMessage from "../Ui/ErrorMassege/ErrorMessage";
import CircleColor from "../Ui/CircleColor/CircleColor";
import {colors} from "../data/index"
import  Selects  from "../Ui/Select/Selects";
import { categories } from "../data/index";
import { toast  } from "react-toastify"
interface IModal {
    openmodel: boolean
    closemodel: () => void
    title: string
    products?: IProduct
    setproducts: React.Dispatch<React.SetStateAction<IProduct[]>>
}
export default function Create({ openmodel, closemodel, title , products , setproducts}: IModal ) {
    const [selected , setSelected] = useState<ICategory>(categories[0])
    const [product, setProduct] = useState<IProduct>({
        id: uuid(),
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: [],
        category: {
            name: "",
            imageURL: ""
        }
    });
    useEffect(() => {
        if (products) {
            setSelected({
                id: products.category?.id || uuid(),
                name: products.category?.name || categories[0].name,
                imageURL:  products.category?.imageURL || categories[0].imageURL
            })
            setProduct({
                id: products.id || uuid(),
                title: products.title || "",
                description: products.description || "",
                imageURL: products.imageURL || "",
                price: products.price || "",
                colors: products.colors || [],
                category:  {
                    id: uuid(),
                    name: "",
                    imageURL: ""
                }as ICategory
            })
        }
    }, [products]);
    useEffect(() => {
        setProduct((prev) => ({
            ...prev,
            category: selected
        }));
    }, [selected]);



    const [errors, setErrors] = useState({
        title: "",
        description: "",
        imageURL: "",
        price: ""
    });

    function Cancel(){
        setProduct({
            id: uuid(),
            title: "",
            description: "",
            imageURL: "",
            price: "",
            colors: [],
            category: {
                name: "",
                imageURL: ""
            }
        });
        setErrors({
            title: "",
            description: "",
            imageURL: "",
            price: ""
        });
        closemodel()
    }


    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
        }



        const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = productValidation(product);
        setErrors(validationErrors);

        if (
          validationErrors.title || validationErrors.description || validationErrors.imageURL || validationErrors.price
        ) {
            toast.error("Product validation failed. Please check the form and try again.");
          return;
        }
        const existingProductIndex = productList.findIndex((p) => p.id === product.id);
        if (existingProductIndex !== -1) {
            productList[existingProductIndex] = product;
        } else {
            productList.push(product);
        }

        setproducts((prevProducts) => {
            const existingIndex = prevProducts.findIndex((p) => p.id === product.id);
            if (existingIndex !== -1) {
            const updated = [...prevProducts];
            updated[existingIndex] = product;
            return updated;
            } else {
            return [...prevProducts, product];
            }
        });
        Cancel();
        toast.success(existingProductIndex !== -1 ? "Product updated successfully!" : "Product added successfully!");
        };
    
    return (
        <>
         <MyModal openmodel={openmodel} closemodel={closemodel} title={title}> 
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 my-2">
      {formInputsList.map((input) => (
        <div key={input.id} className="flex flex-col space-y-4 my-2">
          <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
            {input.label}
          </label>
          <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
            <ErrorMessage msg={errors[input.name]} />
        </div>    
))}

        <div className="flex flex-col space-y-4 my-2">
            <label htmlFor="category" className="mb-[2px] text-sm font-bold text-gray-700">Category</label>
            <Selects selected={selected} setSelected={setSelected} /> 
        </div>  

        <div className="flex flex-col space-y-4 my-2">
          {/* <label htmlFor="colors" className="mb-[2px] text-sm font-bold text-gray-700">Colors</label> */}
          <div className="flex flex-wrap space-x-2">   
          {colors.map((color, index) => (
            <CircleColor key={index} color={color} onClick={() => {
                if ((product.colors || []).includes(color)) {
                    setProduct((prev) => ({
                        ...prev,
                        colors: (prev.colors || []).filter((c) => c !== color)
                    }));
                } else {
                    setProduct((prev) => ({
                        ...prev,
                        colors: [...(prev.colors || []), color]
                    }));
                }
            }} />
          ))}
            </div>
          <div className="flex flex-wrap space-x-2">
            {(product.colors ?? []).map((color, index) => (
                <span key={index} className="rounded-lg p-0.5 my-1 text-sm" style={{backgroundColor : color}} >{color}</span>
            ))}
          </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 ">
          <Button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => {}}>Submit</Button>
          <Button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg" onClick={Cancel}>Cancel</Button>
        </div>
        </form>
        </MyModal>
        </>
    )
}