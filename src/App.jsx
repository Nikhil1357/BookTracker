import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import Book from './Book';
import ProfilePicture from './assets/add.png';
import AddModal from './AddModal';
import EditModal from './EditModal';

function App() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      const response = await axios.get(`https://booksapi-h1ch.onrender.com/books`);
      setItems(response.data.content);
    }
    fetchData();
  },[]) 

  const handleBookUpdated = (updatedBook) => {
    setItems(prev => prev.map(b => b.isbn === updatedBook.isbn ? updatedBook : b));
  };

  const columnStyle = {
    background:'#fff',
    borderRadius:'8px',
    padding:'clamp(6px, 1vw, 12px) clamp(8px, 1.2vw, 14px)',
    boxShadow:'0 1px 3px rgba(0,0,0,0.06)',
    minWidth:0
  };

  const headerStyle = {
    margin:'0 0 8px 0',
    textTransform:'uppercase',
    fontSize:'clamp(10px, 0.8vw, 12px)',
    fontWeight:600,
    letterSpacing:'0.05em',
    color:'#888'
  };

  const renderColumn = (statusValue) => {
    const filtered = items.filter(
      obj => obj != null && obj.status?.toUpperCase() === statusValue.toUpperCase()
    );
    return filtered.length > 0
      ? filtered.map(obj => <Book bookdata={obj} key={obj.isbn} onEdit={setEditingBook} />)
      : <p style={{fontSize:'clamp(11px, 0.8vw, 13px)', color:'#bbb', margin:'8px 0 0 0'}}>No books yet</p>;
  };

  const handleBookAdded = (newBook) => {
    setItems(prev => [...prev, newBook]);
  };

  return (
    <div style={{
      padding:'clamp(16px, 3vw, 32px)',
      margin:0,
      width:'100%',
      minHeight:'100vh',
      boxSizing:'border-box',
      fontFamily:'Roboto, sans-serif',
      textAlign:'left',
      backgroundColor:'#f5f4f1',
      overflowX:'hidden'
    }}>
      
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3 style={{padding:0, margin:'0 0 20px 0', fontSize:'clamp(18px, 2vw, 22px)', fontWeight:600, color:'#2b2b2b'}}>Book Tracker</h3>  
        <img
          src={ProfilePicture}
          height={25}
          width={25}
          alt="Add Book"
          style={{cursor:'pointer'}}
          onClick={()=> setIsModalOpen(true)}
        />
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px', alignItems:'start'}}>

        <div style={columnStyle}>
          <h5 style={headerStyle}>Want to Read</h5>
          {renderColumn('WANT TO READ')}
        </div>

        <div style={columnStyle}>
          <h5 style={headerStyle}>Reading</h5>
          {renderColumn('READING')}
        </div>

        <div style={columnStyle}>
          <h5 style={headerStyle}>Read</h5>
          {renderColumn('READ')}
        </div>

      </div>

      <AddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookAdded={handleBookAdded}
      />

      <EditModal
        isOpen={!!editingBook}
        book={editingBook}
        onClose={() => setEditingBook(null)}
        onBookUpdated={handleBookUpdated}
      />
    </div>
  )
}
export default App