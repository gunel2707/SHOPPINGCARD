import React ,{useContext} from 'react'
import Context from "../context/Context";
import { useParams } from 'react-router-dom'
import "../pages/Product.css";
const ProductDetails = () => {
  const {
    productsData,
    count,
    array,
    setarray,
    setCount,
    modalshow,
    setmodalshow,
  } = useContext(Context);
  const {id}=useParams()
  const findProduct=productsData.find(product=>product.id==id)
  console.log(findProduct);
  console.log(id);
  return (
    <div className='Productdetailcontent'><img className='Productdetailimage' src={findProduct.image} alt="" />
<h4>Category:{findProduct.category}</h4> 
 <h1>Price:{findProduct.price}</h1>
<p><b>Title:{findProduct.title}</b></p> 
 <p>Description:{findProduct.description}</p>
    </div>
  )
}

export default ProductDetails