import React from 'react';
import './about.css'

const About = (props) => {
  return (
    <div className="about-container">
      <div className="hero is-dark is-small">
        <div className="hero-body has-text-centered">
          <h1 className="title">About To Do App</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <h3 className="subtitle">How do you use this website?</h3>
        </div>
      </div>
      <div className="columns">
        <div className="column"></div>
        <div className="column is-two-thirds">
          <p className="content">This is a simple website where all you need to do is sign in with an email and password, and then you can jump right into making to-do's! </p>
        </div>
        <div className="column"></div>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <h3 className="subtitle">What technologies were used to create this website?</h3>
        </div>
      </div>
      <div className="columns">
        <div className="column"></div>
        <div className="column is-two-thirds">
          <p className="content">To Do App uses Google's Firebase platform, the React JS library, and the Bulma CSS framework. This website is also being hosted on Netlify.</p>
        </div>
        <div className="column"></div>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <h3 className="subtitle">Created By: Michael Campbell</h3>
        </div>
      </div>

      <div className="columns">
        <div className="column">

        </div>
        <div className="column is-two-thirds">
          <div className="level is-mobile">
            <div className="level-item">
              <div className="tags has-addons">
                <i className="tag is-dark fab fa-github"></i>
                <a className='tag is-info' href="https://github.com/Mvcampbell3" rel='noopener noreferrer' target='_blank'>GitHub</a>
              </div>
            </div>
            <div className="level-item">
              <div className="tags has-addons">
                <i className="tag is-dark fas fa-user-tie"></i>
                <a className='tag is-info' href="https://mvcampbell3.com" rel='noopener noreferrer' target='_blank'>Portfolio</a>
              </div>
            </div>
            <div className="level-item">
              <div className="tags has-addons">
                <i className="tag is-dark fab fa-linkedin"></i>
                <a className='tag is-info' href="https://www.linkedin.com/in/mvcampbell3/" rel='noopener noreferrer' target='_blank'>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
        <div className="column">

        </div>

      </div>
    </div>

  );
}

export default About;