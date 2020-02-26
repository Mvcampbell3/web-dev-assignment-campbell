import React from 'react';

const Detail = (props) => {
  return (
    <div className='detail-container'>
      <input type="text" name='nameInput' value={props.nameInput} className="input" placeholder="Enter Name" onChange={(e) => props.handleInput(e)} />
      <input type="text" name='descriptionInput' value={props.descriptionInput} className="input" placeholder="Enter Description" onChange={(e) => props.handleInput(e)} />
      <button className="button is-dark" onClick={props.sendItem}>Send Item</button>
      <button className="button is-danger" onClick={props.signOutUser}>Sign Out</button>
      <div className="list-container">
        {props.list.map(listItem => (
          <div key={listItem.id}>
            <p>{listItem.name}: {listItem.description}</p>
            <button className="button is-small is-danger" onClick={() => { props.deleteItem(listItem.id) }}>Delete</button>
            <button className="button is-small is-warning" onClick={() => props.toggleItemComplete(listItem.id, listItem.completed)}>{listItem.completed ? "Completed" : "Incomplete"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detail;