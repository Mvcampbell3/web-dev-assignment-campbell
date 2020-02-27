import React from 'react';
import './landing.css'

const Landing = (props) => {
  return (
    <div className="landing-container">
      <div className="flyer" onClick={props.toggleViewLanding}>To Do App</div>
      <p className="slider">What do you want to do today?</p>
    </div>
  );
}

export default Landing;