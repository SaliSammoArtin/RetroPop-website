// hämtar in hooks från React
import { useEffect, useState } from "react"

export default function Products() {

  // Skapar en state-variabel som håller listan med produkter.
  // Startvärdet är en tom array då vi inte hämtat data än.
  // setProducts är funktionen för att ändra värdet i products.
  const [products, setProducts] = useState([])
 
  async function getProducts() {
    const response = await fetch("http://localhost:3000/products")
    const result = await response.json()

    if (response.ok) {
      setProducts(result)
    } else {
      console.log("Fetching products failed!")
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

   return <> 
    <div className=" w-64 bg-slate-200 m-auto">
      <p> These are our products </p>
      {products.map(product => {
        return <div key={product.id}>
          <h3 className="font-xl">{product.name}</h3>
          </div>
      })}
     </div>
   </>
}