import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import axios from "axios";
import  '../pages/Product.css';

const Header = () => {
  const {
    productsData,
    count,
    array,
    setarray,
    setCount,
    modalshow,
    setmodalshow,
    setproductsData,
  } = useContext(Context);
 
  const [categories, setCategories] = useState([]);
  const [categoryItem, setCategoryItem] = useState("");

  useEffect(() => {
   
    
    Getdata();
  }, []);

  async function Getdata() {
    const request1 = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );

    console.log(request1.data);
    setCategories(request1.data);
  }

  // function filterItem(item) {
  //   let filterCategory = productsData.filter((obj) => obj.category == item);
  //   console.log(filterCategory);
  //   setproductsData(filterCategory);
  // }
  const filterItem = async (a) => {
    try {
      setCategoryItem(a);
      const categoryData = await axios.get(
        `https://fakestoreapi.com/products/category/${a}`
      );
      setproductsData(categoryData.data)
      console.log(categoryData);
    } catch (error) {
      console.error(error);
    }

  };
  return (
    <Navbar expand="lg" className="bg-primary">
      <Container className="">
        <Navbar.Brand href="/">
          <img src="./react.256x228.png" alt="" style={{ width: "3rem" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-5 fs-2 fw-bold text-decoration-none text-mmonospace d-flex align-items-center justify-content-center">
            <Link className="text-decoration-none text-light" to="/">
              Products
            </Link>
            <Link
              className="text-decoration-none text-light"
              to="/productdetails"
            >
              Product Details
            </Link>
            <Link
              className="text-decoration-none text-light"
              to="/shoppingcard"
            >
              {" "}
              Shopping Card
            </Link>
            <NavDropdown style={{color: 'white !important'}}
              className="text-decoration-none text-light dropdown"
              title="Category"
              id="basic-nav-dropdown"
            >
              {categories.map((item, index) => {
                return (
                  <NavDropdown.Item key={index} className="text-primary">
                    <div onClick={() => filterItem(item)}>{item}</div>
                  </NavDropdown.Item>
                );
              })}
              {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
