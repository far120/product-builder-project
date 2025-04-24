import {  useState } from "react"
import { productList } from "./data/index"
import Card_Prouduct from "./CRUD/Read"
import Button from "./Ui/Button/Button"
import Create from "./CRUD/Create"
import { IProduct } from "./interfaces"
import {  ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const [products , setproducts] = useState(productList);
  const [product , setProduct] = useState<IProduct | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isupdate, setIsUpdate] = useState(false)
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
    setIsUpdate(false);
  }

  const Show_Data = products.map((product) => {
      return <Card_Prouduct key={product.id} product={product}  setproducts={setproducts}  update={isupdate} setupdate={setIsUpdate} setProduct={setProduct}  />;
  });


  return (
    <>
    <h1 className="text-4xl font-bold my-4 text-center text-red-600 ">Product List</h1>
    <Button className="w-full h-full py-2 bg-blue-500 text-white  rounded-lg hover:bg-blue-600 transition duration-300" onClick={open}>Add Product</Button>
    
     {/* <MyModal openmodel={isOpen} closemodel={close} title="Add a New Prouduct"  setproducts={setproducts} />  */}
     {/* <Create openmodel={isOpen} closemodel={close} title="Add a New Prouduct"  setproducts={setproducts} />  */}
     {isupdate && (
           <>
        <Create openmodel={isupdate} closemodel={close} title="Update Product" products={product || undefined} setproducts={setproducts} />
     </>
     )}
    {isOpen && (
      <>
        <Create openmodel={isOpen} closemodel={close} title="Add a New Prouduct" setproducts={setproducts} />
      </>
     )}

    <div className="grid grid-col-1 md:grid-cols-2 justify-center items-center lg:grid-cols-3 xl:grid-cols-4 gap-4 px-20 py-5"> 
      {Show_Data}
    </div>
    <ToastContainer />
    </> 
  )
}

export default App
