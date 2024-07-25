import React, { useContext, useEffect } from "react";
import Context from "../context/Context";
import { Card } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";

const Basket = () => {
    const { count, array, setarray, setCount } = useContext(Context);

  useEffect(() => {
    let basketArr = JSON.parse(localStorage.getItem("array"));
    if (basketArr) {
      setarray(basketArr);
      setCount(basketArr.length);
    }
  }, []);

  function decrement(btn, item) {
    console.log("derceremnet");
    if (item.counter > 1) {
      item.counter -= 1;
      setarray([...array]);
    }
    // else {
    //   btn.disabled = true;
    // }
  }
  function increment(btn, item) {
    item.counter += 1;
    // if (item.counter > 0) {
    //   btn.disabled = false;
    // }
    setarray([...array]);
  }
  function Delete(obj) {
    let filteredArray = array.filter((item) => obj.id != item.id);
    console.log(filteredArray);
    localStorage.setItem("array", JSON.stringify(filteredArray));

    setCount(count - 1);
    setarray(filteredArray);
  }

  return (
    <>
      {array.map((item, index) => (
        <Card
          key={index}
          className="col-md-12  "
          style={{ height: "19rem", width: "28rem" }}
        >
          <div className="d-flex justify-content-between">
            <Card.Img
              variant="top"
              src={item.image}
              style={{ width: "4rem" }}
            />
            <span
              className="fs-3"
              onClick={() => {
                Delete(item);
              }}
            >
              <RiDeleteBin6Line />
            </span>
          </div>
          <Card.Body className="card-body-basket   ">
            <div className="row">
              <Card.Title> {item.price}</Card.Title>
              <Card.Text>{item.title}</Card.Text>
              <div className="col">
                <button
                  className="btn btn-primary btn-sm  "
                  onClick={(e) => {
                    decrement(e.target, item);
                  }}
                >
                  -
                </button>
                {item.counter}
                <button
                  className="btn btn-primary btn-sm  "
                  onClick={(e) => {
                    increment(e.target, item);
                  }}
                >
                  +
                </button>
                <p>
                  <b>Amount:{item.price * item.counter}</b>
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
        
      ))}
      { <p>
            <b>Total amount:</b>

            {array.reduce((sum, item) => {
              return parseInt(sum + item.price * item.counter);
            }, 0)}
          </p>}
    </>
  );
};

export default Basket;
