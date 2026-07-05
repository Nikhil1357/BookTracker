import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

export default function AddModal({ isOpen, onClose, onBookAdded }) {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorAge, setAuthorAge] = useState("");
  const [status, setStatus] = useState("");
  const [totalPages, setTotalPages] = useState("");

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle("");
    setIsbn("");
    setAuthorId("");
    setAuthorName("");
    setAuthorAge("");
    setStatus("");
    setTotalPages("");
  };

  const handleSubmit = async () => {
    const newBook = {
      isbn,
      title,
      author: {
        id: authorId,
        name: authorName,
        age: authorAge
      },
      status,
      totalPages,
      pagesRead: 0
    };

    try {
      const response = await axios.put(`https://booksapi-h1ch.onrender.com/books/${isbn}`, newBook);
      console.log("Book added:", response.data);
      if (onBookAdded) onBookAdded(response.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Add Book</h2>

        <input
          className="modal-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="modal-input"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <input
          className="modal-input"
          placeholder="Author Id"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        />
        <input
          className="modal-input"
          placeholder="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <input
          className="modal-input"
          placeholder="Author Age"
          value={authorAge}
          onChange={(e) => setAuthorAge(e.target.value)}
        />
        <input
          className="modal-input"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          className="modal-input"
          placeholder="Total Pages"
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
        />

        <button className="modal-submit-btn" onClick={handleSubmit}>
          Proceed
        </button>
      </div>
    </div>
  );
}