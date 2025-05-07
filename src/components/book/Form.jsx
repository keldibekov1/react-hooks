import React, { useRef } from "react";
import Swal from "sweetalert2";

const Form = ({ setData }) => {
  const title = useRef(null);
  const desc = useRef(null);
  const price = useRef(null);
  const author = useRef(null);
  const stock = useRef(null);
  const genre = useRef(null);
  const url = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: new Date().getTime(),
      createdAt: new Date().toLocaleString(),
      title: title.current.value,
      desc: desc.current.value,
      price: price.current.value,
      author: author.current.value,
      stock: stock.current.value,
      genre: genre.current.value,
      url: url.current.value,
    };
    setData((prev) => [...prev, newBook]);

    [title, desc, price, author, stock, genre, url].forEach((ref) => {
      ref.current.value = "";
    });

    Toast.fire({
      icon: "success",
      title: "Book added successfully!"
    });
  };

  const inputClass =
    "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200";

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow p-5 border border-gray-100 rounded flex flex-col gap-3 my-6"
    >
      <input ref={title} type="text" placeholder="Title" required className={inputClass} />
      <input ref={desc} type="text" placeholder="Description" required className={inputClass} />
      <input ref={price} type="number" placeholder="Price" required className={inputClass} />
      <input ref={author} type="text" placeholder="Author" required className={inputClass} />
      <input ref={stock} type="number" placeholder="Stock" required className={inputClass} />
      <input ref={genre} type="text" placeholder="Genre" required className={inputClass} />
      <input ref={url} type="url" placeholder="Image URL" className={inputClass} />
      <button className="h-10 bg-slate-800 text-white px-5 rounded hover:bg-slate-700 transition">
        Submit
      </button>
    </form>
  );
};

export default Form;
