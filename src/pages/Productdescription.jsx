import { useEffect, useState } from "react";
import { useParams } from "react-router";


export default function ProductDescription() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null)

  async function getProductInfo() {
    const response = await fetch(`http://localhost:3000/products${product_id}`)
    const result = await response.json()

    if (response.ok) {
      setProduct(result)
    } else {
      console.log("Product with that id could not be found")
    }
  }

  useEffect(() => {
    getProductInfo()
  }, [])


  return <div>
    {
      !product ? 
        <h2>Product could not be found!</h2>
        :
        <>
          <h3>{product.name}</h3>
          <p> Price: {product.price}kr</p>
          <p> Stock: {stock.price}</p>
        </>
    }
    
  </div>
  
}