import React from 'react';
import './detail.css'

const Detail = (props) => {
  return (
    <div className='detail-container'>
      <div className="left-side">
        <input type="text" name='nameInput' value={props.nameInput} className="input is-link"
          placeholder="Enter To Do Name" onChange={(e) => props.handleInput(e)}
        />
        <textarea type="text" name='descriptionInput'
          value={props.descriptionInput} className="textarea is-link" rows='5'
          placeholder="Enter To Do Description" onChange={(e) => props.handleInput(e)}
        />
        <button className="button is-dark" onClick={props.sendItem}>Send Item</button>
      </div>
      <div className="right-side">
        <div className="list-container">
          {props.list.length > 0 ? <>
            {
              props.list.map(listItem => (
                <div key={listItem.id} className={listItem.completed ? 'item complete' : 'item incomplete'}>
                  <p>{listItem.name}: {listItem.description}</p>
                  <div className="item-buttons">
                    <button
                      className={listItem.completed ? 'button is-small is-link' : 'button is-small is-success'}
                      onClick={() => props.toggleItemComplete(listItem.id, listItem.completed)}>
                      {listItem.completed ? <i className='fas fa-angle-double-left'></i>
                        : <i className="fas fa-check"></i>}
                    </button>
                    <button className="button is-small is-danger"
                      onClick={() => { props.deleteItem(listItem.id) }}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>

                </div>
              ))
            }
          </> : // props list length is 0
            <div className='emptyList'>

            </div>
          }

        </div>
      </div>
    </div>

  );
}

export default Detail;