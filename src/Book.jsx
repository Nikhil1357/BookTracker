import React from 'react'
import Edit from './assets/edit.png';

function Book({bookdata, onEdit}) {
  const { isbn, title, author:{id, name, age}, pagesread, totalpages } = bookdata;

  const progress = totalpages > 0 ? Math.min(100, Math.round((pagesread / totalpages) * 100)) : 0;

  return (
    <div style={{
      padding:'6px 0',
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
          fontSize:'clamp(13px, 1.1vw, 16px)',
          fontWeight:600,
          color:'#2b2b2b',
          whiteSpace:'nowrap',
          overflow:'hidden',
          textOverflow:'ellipsis',
          marginRight:'8px'
        }}>
          {title}
        </span>
        <div style={{display:'flex', alignItems:'center', gap:'6px', flexShrink:0}}>
          <span style={{fontSize:'clamp(11px, 0.9vw, 13px)', color:'#999', whiteSpace:'nowrap'}}>
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
            <img src={Edit} height={14} width={14} />
          </button>
        </div>
      </div>

      {totalpages > 0 && (
        <div style={{display:'flex', alignItems:'center', gap:'6px', marginTop:'4px'}}>
          <div style={{flex:1, height:'3px', borderRadius:'2px', background:'#eee', overflow:'hidden'}}>
            <div style={{width:`${progress}%`, height:'100%', background:'#b8ab98', borderRadius:'2px'}} />
          </div>
          <span style={{fontSize:'clamp(10px, 0.8vw, 12px)', color:'#aaa', whiteSpace:'nowrap'}}>
            {pagesread}/{totalpages}
          </span>
        </div>
      )}
    </div>
  )
}
export default Book