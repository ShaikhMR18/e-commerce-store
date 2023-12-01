import { useEffect, useState } from "react";

export function Store() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: { rate: 0, count: 0 },
    },
  ]);
  const [cartItems, setCartItems] = useState([]);

  async function LoadCategory() {
    const resp = await fetch("https://fakestoreapi.com/products/categories");
    const result = await resp.json();
    result.unshift("all");
    console.log(result);
    setCategory(result);
  }
  async function LoadAllProducts() {
    const resp = await fetch("https://fakestoreapi.com/products");

    const result = await resp.json();
    setProducts(result);
  }
  async function LoadByCategory(url) {
    const resp = await fetch(url);
    const result = await resp.json();
    setProducts(result);
  }
  function handleCategoryChange(e) {
    if (e.target.value === "all") {
      LoadByCategory("https://fakestoreapi.com/products");
    } else {
      LoadByCategory(
        `https://fakestoreapi.com/products/category/${e.target.value}`
      );
    }
  }
  function handleAddClick(prod) {
    const itm = cartItems.find((it) => it.id === prod.id);
    if (itm) {
      setCartItems([...cartItems]);
      alert("item already Added");
    } else {
      setCartItems([...cartItems, prod]);
    }
  }

  async function handleRangeChange(e) {
    const p = await products.filter((prod) => prod.price <= e.target.value);
    setProducts(p);
  }

  useEffect(() => {
    LoadCategory();
    LoadAllProducts();
    LoadAllProducts("https://fakestoreapi.com/products");
  }, []);

  return (
    <>
      <div className="container-fluid bg-dark text-white   ">
        <header className=" d-flex justify-content-between align-items-center  p-2 ">
          <h3>My Store</h3>
          <div className="mt-2">
            <button
              className="bi bi-cart btn bg-light fw-bold position-relative text-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                {cartItems.length}
              </span>
            </button>
          </div>
        </header>
      </div>

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-2">
            <select
              className="form-select"
              onChange={handleCategoryChange}
              name=""
              id=""
            >
              {category?.map((cate) => (
                <option key={cate} value={cate}>
                  {cate.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="mt-2 border p-2 rounded ">
              <label htmlFor="customRange1" className="form-label " />
              Select Price Range
              <input
                type="range"
                className="form-range"
                id="customRange1"
                max={1000}
                min={100}
                step={10}
                onChange={handleRangeChange}
              />
            </div>
          </div>
          <div
            className="col-10  d-flex flex-wrap"
            style={{ height: "450px", overflow: "auto" }}
          >
            {products.map((prod) => (
              <div
                key={prod.id}
                className="card shadow-sm    p-3 ms-2 mt-2"
                style={{ width: "18rem" }}
              >
                <img
                  className="card-img "
                  src={prod.image}
                  width={120}
                  alt="Products"
                />
                <div className="card-body">
                  <p className="card-title text-secondary fw-bold">
                    {prod.title}
                  </p>
                  <div className="d-flex  ">
                    <span className="bi bi-star-fill badge bg-success  ">
                      <span className="ms-2">{prod.rating.rate}</span>
                    </span>
                    <span className="ms-3 d-flex justify-content-center align-items-center  fw-bold bi bi-currency-rupee">
                      {prod.price}
                    </span>
                  </div>

                  <p className="card-text">{prod.description.slice(0, 20)}</p>
                </div>
                <div className="card-footer">
                  <button
                    onClick={() => handleAddClick(prod)}
                    className="btn btn-primary   bi bi-cart"
                  >
                    <span className="ms-2 fw-bold ">Add to cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Cart Items{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <div className="d-flex">
              total Items in cart{" "}
              <span className="badge bg-success">{cartItems.length}</span>
              <span className="ms-2 ">Total</span><span className="ms-2 text-success fw-bold ">{cartItems.reduce((ac,cur)=>ac+=cur.price,0).toFixed(2)}</span>
              </div>
              {cartItems.map((itm) => (
                <div className="card p-2 mt-2 ">
                  <img
                    className="card-img w-25 "
                    src={itm.image}
                    width={60}
                    alt="Products"
                  />
                  <p className="card-text">{itm.title}</p>
                  <span>Price {itm.price}</span>
                  <button className="btn btn-danger w-25">Remove</button>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
