import React from 'react'
import './login.css'

const Login = (props) => {
  return (
    <div className="flex-container">
      <div className="login-container">
        <div className="hero is-info">
          <div className="hero-body has-text-centered">
            <h1 className="title">{props.login ? "Login" : "SignUp"}</h1>
          </div>
        </div>
        <div className="form-bottom">

          {props.login ?
            <div>
              {/* Login Form */}
              <input
                type="text"
                name='emailInput'
                value={props.emailInput}
                placeholder='Enter Email...'
                className="input" onChange={(e) => props.handleInput(e)}
              />
              <input
                type="password"
                name='passwordInput'
                value={props.emailInput}
                placeholder='Enter Password...'
                className="input"
                onChange={(e) => props.handleInput(e)}
              />
              <div className="button-holder">
                <button className="button is-success" onClick={props.loginUser}>Submit</button>
                <button className="button is-info" onClick={props.switchLoginSignup}>Not Signed Up?</button>
              </div>

            </div>
            :
            <div>
              {/* Sign Up Form */}
              <input
                type="text"
                name='usernameInput'
                value={props.usernameInput}
                placeholder='Enter Username...'
                className="input" onChange={(e) => props.handleInput(e)}
              />
              <input
                type="text"
                name='emailInput'
                value={props.emailInput}
                placeholder='Enter Email...'
                className="input" onChange={(e) => props.handleInput(e)}
              />
              <input
                type="password"
                name='passwordInput'
                value={props.emailInput}
                placeholder='Enter Password...'
                className="input"
                onChange={(e) => props.handleInput(e)}
              />
              <div className="button-holder">
                <button className="button is-success rightBtn" onClick={props.loginUser}>Submit</button>
                <button className="button is-info" onClick={props.switchLoginSignup}>Already Signed Up?</button>
              </div>

            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Login;