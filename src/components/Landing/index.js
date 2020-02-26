import React from 'react';
import './landing.css'

const Landing = (props) => {
  return (
    <div className="landing-container">
      <div className="flyer" onClick={props.toggleViewLanding}>To Do App</div>
      <div className="content">
        <p>What do you want to do today?</p>
      </div>
    </div>
  );
}

export default Landing;