import { useEffect, useState } from "react"
import Images from "../Ui/Images/Images"
import Button from "../Ui/Button/Button"
import { IProduct } from "../interfaces"
import {txtSlicer} from "../Ui/utils/functions"
import { productList } from "../data"
import MyModal from "../Ui/Model/Model"
import { toast } from "react-toastify"
export default function Card_Prouduct({ product ,  setproducts , update , setupdate , setProduct }: { product: IProduct, setproducts: React.Dispatch<React.SetStateAction<IProduct[]>> , update: boolean, setupdate: React.Dispatch<React.SetStateAction<boolean>> , setProduct: React.Dispatch<React.SetStateAction<IProduct | null>> }) {
  const { title, description, imageURL, price, colors, category } = product
  const [open, setopen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  function closemodel() {
    setopen(false)
    setDeleteId(null)
  }

  function confirmDelete() {
    if (deleteId) {
      const updatedProductList = productList.filter((p: IProduct) => p.id !== deleteId)
      productList.length = 0
      productList.push(...updatedProductList)
      setproducts([...updatedProductList])
      closemodel()
      toast.success("Product deleted successfully!")
    }
  }

    function handleEdit (product: IProduct) {
      setupdate(true)
      setProduct(product)
    }

    return (
      <>
      <div className=" w-70 h-full border-1 border-gray-400 flex flex-col  bg-gray-100 p-2 rounded-lg shadow-md md:w-full ">
        <Images images={imageURL} alt={title} className="w-full h-full rounded-2xl mb-2" />
        <h2 className="text-lg font-bold my-2">{title}</h2>
        <p className="text-gray-600 my-2">{txtSlicer(description)}</p>
        <div className=" flex space-x-2 my-2 ">          
            {(colors ?? []).length > 0 ? (
              (colors ?? []).map((color, index) => (
                color ? (
                  <div key={index} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></div>
                ) : null
              ))
            ) : (
              <p className="">Not available colors!</p>
            )}
        </div>
        <div className="flex justify-between items-center my-2 px-2">
          <span className="text-lg font-bold text-blue-800">{price}</span>
          <div className="flex space-x-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{category?.name}</span>
                <Images images={category?.imageURL ?? "" } alt={category?.name ?? "Category Image"} className="w-10 h-10 rounded-full" />
              </div>
          </div>
        </div>
        <div className="flex space-x-2 my-2 ">
          <Button className="w-full h-full py-2 bg-blue-500 text-white  rounded-lg hover:bg-blue-600 transition duration-300" onClick={() => handleEdit(product)}>Edit</Button>
          <Button className="w-full h-full py-2 bg-red-600 text-white  rounded-lg hover:bg-red-800 transition duration-300" onClick={() => {setopen(true);  setDeleteId(product.id ?? "")} } >Remove</Button>
              </div>   
               </div>
               <MyModal openmodel={open} closemodel={closemodel} title="Delete Confirmation">
        <div>
          <p>Are you sure you want to delete this product?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <Button className="py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300" onClick={closemodel}>
              Cancel
            </Button>
            <Button className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-800 transition duration-300" onClick={confirmDelete}>
              Confirm
            </Button>
          </div>
        </div>
      </MyModal>
      
      </>
    )
}