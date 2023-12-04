import React from "react";
import style from "./index.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios("https://northwind.vercel.app/api/products/" + id).then((res) => {
      setProduct(res.data);
    });
  }, []);
  return (
    <>
      <div className={style.details}>Details</div>;<h1>{product.id}</h1>
    </>
  );
}

export default Details;
