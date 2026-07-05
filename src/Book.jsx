// Book.jsx
import React from 'react'
import Edit from './assets/edit.png';

function Book({bookdata, onEdit}) {
  const { isbn, title, author:{id, name, age}, pagesread, totalpages } = bookdata;

  const progress = totalpages > 0 ? Math.min(100, Math.round((pagesread / totalpages) * 100)) : 0;

  return (
    <div style={{
      padding:'0.35rem 0',
      borderBottom:'1px solid #e5e2dc',
      minWidth:0
    }}>
      <div style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'baseline',
        minWidth:0
      }}>
        <span style={{
          fontSize:'0.6rem',
          fontWeight:600,
          color:'#2b2b2b',
          whiteSpace:'nowrap',
          overflow:'hidden',
          textOverflow:'ellipsis',
          marginRight:'0.5rem'
        }}>
          {title}
        </span>
        <div style={{display:'flex', alignItems:'center', gap:'0.35rem', flexShrink:0}}>
          <span style={{fontSize:'0.45rem', color:'#999', whiteSpace:'nowrap'}}>
            {name}
          </span>
          <button
            onClick={() => onEdit(bookdata)}
            style={{
              color:'#b8ab98',
              background:'none',
              border:'none',
              cursor:'pointer',
              padding:0
            }}
          >
            <img src={Edit} height={8} width={8} />
          </button>
        </div>
      </div>

      {totalpages > 0 && (
        <div style={{display:'flex', alignItems:'center', gap:'0.35rem', marginTop:'0.25rem'}}>
          <div style={{flex:1, height:'3px', borderRadius:'2px', background:'#eee', overflow:'hidden'}}>
            <div style={{width:`${progress}%`, height:'100%', background:'#b8ab98', borderRadius:'2px'}} />
          </div>
          <span style={{fontSize:'0.4rem', color:'#aaa', whiteSpace:'nowrap'}}>
            {pagesread}/{totalpages}
          </span>
        </div>
      )}
    </div>
  )
}
export default Book