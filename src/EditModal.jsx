import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

export default function EditModal({ isOpen, onClose, book, onBookUpdated }) {
  const [status, setStatus] = useState(book?.status || "WANT TO READ");
  const [pagesRead, setPagesRead] = useState(book?.pagesread ?? 0);
  const [totalPages, setTotalPages] = useState(book?.totalpages ?? "");

  if (!isOpen || !book) return null;

  const handleSubmit = async () => {
    const updatedBook = {
      ...book,
      status,
      pagesread: Number(pagesRead),
      totalpages: Number(totalPages)
    };

    try {
      const response = await axios.put(`https://booksapi-h1ch.onrender.com/books/${book.isbn}`, updatedBook);
      if (onBookUpdated) onBookUpdated(response.data);
      onClose();
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Update {book.title}</h2>

        <select className="modal-input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="WANT TO READ">Want to Read</option>
          <option value="READING">Reading</option>
          <option value="READ">Read</option>
        </select>

        <input className="modal-input" placeholder="Pages Read" type="number" value={pagesRead} onChange={(e) => setPagesRead(e.target.value)} />

        <button className="modal-submit-btn" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}