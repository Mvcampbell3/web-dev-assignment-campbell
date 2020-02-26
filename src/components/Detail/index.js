import React from 'react';

const Detail = (props) => {
  return (
    <div className='detail-container'>
      <input type="text" name='nameInput' value={props.nameInput} className="input" placeholder="Enter Name" onChange={(e) => props.handleInput(e)} />
      <input type="text" name='descriptionInput' value={props.descriptionInput} className="input" placeholder="Enter Description" onChange={(e) => props.handleInput(e)} />
      <button className="button is-dark" onClick={props.sendItem}>Send Item</button>
    </div>
  );
}

export default Detail;