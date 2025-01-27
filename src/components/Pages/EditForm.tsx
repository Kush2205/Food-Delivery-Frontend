import React, { useState } from 'react';

function EditForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-900">
      <form onSubmit={handleSubmit} className="bg-neutral-800  rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Item</h2>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditForm;