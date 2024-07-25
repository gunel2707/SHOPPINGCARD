import { useEffect, useState } from "react";
import Context from "./context/Context";
import "./App.css";
import axios from "axios";
import Products from "./pages/Products";

import ProductDetails from "./pages/ProductDetails";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Basket from "./pages/Basket";
import NotFound from "./pages/NotFound";

function App() {
  useEffect(() => {
    getdata();
  }, []);

  const [productsData, setproductsData] = useState([]);
  const [array, setarray] = useState([]);
  const [count, setCount] = useState(0);
  const [modalshow, setmodalshow] = useState(false);

  async function getdata() {
    const request = await axios.get("https://fakestoreapi.com/products");
    
    setproductsData(request.data);
  }

  const data = {
    productsData,
    setproductsData,
    array,
    setarray,
    count,
    setCount,
    modalshow,
    setmodalshow,
  };

  return (
    <>
      <Context.Provider value={data}>
        <Header />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/shoppingcard" element={<Basket/>} />
          <Route path="/productdetail/:id" element={<ProductDetails />} />
          
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
