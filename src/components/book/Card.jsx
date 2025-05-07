import React, { useState } from "react";
import Swal from "sweetalert2";
import EditModal from "./EditModal";

const Card = ({ data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the book entry.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Book has been removed.", "success");
      }
    });
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleSave = (updatedBook) => {
    setData((prev) =>
      prev.map((item) => (item.id === updatedBook.id ? updatedBook : item))
    );
  
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Book updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  

  return (
    <>
      <div className="grid gap-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="relative w-full bg-white hover:shadow-lg transition-shadow duration-300 shadow-sm p-5 border border-gray-200 rounded-xl flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => handleEdit(item)}
              className="absolute top-3 right-16 mx-5  bg-emerald-500 text-white text-sm px-3 py-1 rounded-md transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition"
            >
              Delete
            </button>

            {item.url && (
              <img
                src={item.url}
                alt={item.title}
                className="w-full sm:w-32 h-32 object-cover rounded-lg border"
              />
            )}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                <p className="text-sm">
                  <span className="font-semibold">Author:</span> {item.author}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Genre:</span> {item.genre}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Price:</span> ${item.price}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Stock:</span> {item.stock}
                </p>
              </div>

              <div className="text-right text-xs text-gray-400 mt-2">
                {item.createdAt}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedBook && (
        <EditModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          book={selectedBook}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default Card;
