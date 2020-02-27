import React from 'react';

const ErrorModal = (props) => {
  return (
    <div className='modal is-active'>
      <div className="modal-background" onClick={props.toggleShowErrorModal}></div>
      <div className="modal-content">
        <div className="notification is-info">
          <button className="delete" onClick={props.toggleShowErrorModal}></button>
          <h3 className="title">Whoops!</h3>
          {props.errorMsgs.map((errMsg, i) =>
            <p key={i}>{errMsg}</p>
          )}
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={props.toggleShowErrorModal}></button>
    </div>
  );
}

export default ErrorModal;