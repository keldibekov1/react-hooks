import React, { useState } from "react";
import Modal from "react-modal";

const EditModal = ({ isOpen, onRequestClose, book, onSave }) => {
  const [formData, setFormData] = useState({ ...book });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onRequestClose();
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="bg-white max-w-md mx-auto mt-24 p-6 rounded shadow-lg outline-none"
    overlayClassName="fixed inset-0 bg-transparent flex justify-center items-start"
  >
  
      <h2 className="text-lg font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["title", "desc", "price", "author", "stock", "genre", "url"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
        ))}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
