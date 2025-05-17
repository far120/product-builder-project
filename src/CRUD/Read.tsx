import { useEffect, useState } from "react"
import Images from "../Ui/Images/Images"
import Button from "../Ui/Button/Button"
import { IProduct } from "../interfaces"
import { txtSlicer } from "../Ui/utils/functions"
import { productList } from "../data"
import MyModal from "../Ui/Model/Model"
import { toast } from "react-toastify"
import { useTheme } from "../Ui/utils/ThemeContext";

export default function Card_Prouduct({ product, setproducts, update, setupdate, setProduct }: { product: IProduct, setproducts: React.Dispatch<React.SetStateAction<IProduct[]>>, update: boolean, setupdate: React.Dispatch<React.SetStateAction<boolean>>, setProduct: React.Dispatch<React.SetStateAction<IProduct | null>> }) {
  const { themeStyles } = useTheme();
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

  function handleEdit(product: IProduct) {
    setupdate(true)
    setProduct(product)
  }

  return (
    <>
      <div className={`w-full max-w-sm flex flex-col p-4 rounded-2xl shadow-lg bg-white dark:bg-gray-800 ${themeStyles.card} ${themeStyles.text} transition-all`}>
        <Images images={imageURL} alt={title} className="w-full h-48 object-cover rounded-2xl mb-3" />
        <h2 className="text-xl font-bold my-2 truncate text-gray-900 dark:text-white">{title}</h2>
        <p className="opacity-80 my-2 line-clamp-2 text-gray-700 dark:text-gray-300">{txtSlicer(description)}</p>
        <div className="flex space-x-2 my-2">
          {(colors ?? []).length > 0 ? (
        (colors ?? []).map((color, index) => (
          color ? (
            <div key={index} className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ backgroundColor: color }}></div>
          ) : null
        ))
          ) : (
        <p className="text-gray-400">Not available colors!</p>
          )}
        </div>
        <div className="flex justify-between items-center my-2 px-2">
          <span className="text-lg font-bold text-blue-800 dark:text-blue-300">{price}</span>
          <div className="flex items-center space-x-2">
        <span className="opacity-80 text-gray-700 dark:text-gray-300">{category?.name}</span>
        <Images images={category?.imageURL ?? ""} alt={category?.name ?? "Category Image"} className="w-10 h-10 rounded-full object-cover border" />
          </div>
        </div>
        <div className="flex space-x-2 my-2">
          <Button className={`w-1/2 py-2 rounded-lg transition duration-300 font-semibold ${themeStyles.button}`} onClick={() => handleEdit(product)}>Edit</Button>
          <Button className="w-1/2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition duration-300" onClick={() => { setopen(true); setDeleteId(product.id ?? "") }} >Remove</Button>
        </div>
      </div>
      <MyModal openmodel={open} closemodel={closemodel} title="Delete Confirmation">
        <div>
          <p className="text-gray-900 dark:text-white">Are you sure you want to delete this product?</p>
          <div className="flex justify-end space-x-4 mt-4">
        <Button className={`py-2 px-4 rounded-lg ${themeStyles.accent} ${themeStyles.text}`} onClick={closemodel}>
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
