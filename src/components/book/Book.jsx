import React, { useEffect, useState } from "react";
import Form from "./Form";
import Cards from "./Card";

const BookList = () => {
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("books")) || [];
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(data));
  }, [data]);

  return (
    <div className="container mx-auto">
      <h2 className="text-center text-2xl font-bold my-4">Book Store</h2>
      <Form setData={setData} />
      <Cards data={data} setData={setData} />
    </div>
  );
};

export default BookList;
