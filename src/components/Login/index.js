import React from 'react'
import './login.css'

const Login = (props) => {
  return (
    <div className='login-bg'>
      <div className="login-container">
        <div className="hero is-info is-small is-bold">
          <div className="hero-body has-text-centered">
            <h1 className="title">{props.login ? "Login" : "SignUp"}</h1>
          </div>
        </div>
        <div className="form-bottom">

          {props.login ?
            <div>
              {/* Login Form */}
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="text"
                    name='emailInput'
                    value={props.email}
                    autoComplete='off'
                    placeholder='Enter Email...'
                    className="input" onChange={(e) => props.handleInput(e)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="password"
                    name='passwordInput'
                    value={props.password}
                    placeholder='Enter Password...'
                    className="input"
                    onChange={(e) => props.handleInput(e)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>


              <div className="button-holder">
                <button className="button is-success" onClick={props.loginUser}>Submit</button>
                <button className="button is-info" onClick={props.switchLoginSignup}>Not Signed Up?</button>
              </div>

            </div>
            :
            <div>
              {/* Sign Up Form */}
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="text"
                    name='usernameInput'
                    value={props.username}
                    placeholder='Enter Username...'
                    className="input" onChange={(e) => props.handleInput(e)}
                  />
                  <span className="icon is-left is-small">
                    <i className="fas fa-user"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="text"
                    name='emailInput'
                    autoComplete='off'
                    value={props.email}
                    placeholder='Enter Email...'
                    className="input" onChange={(e) => props.handleInput(e)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="password"
                    name='passwordInput'
                    value={props.password}
                    placeholder='Enter Password...'
                    className="input"
                    onChange={(e) => props.handleInput(e)}
                  />
                  <span className="icon is-left is-small">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>

              <div className="button-holder">
                <button className="button is-success" onClick={props.loginUser}>Submit</button>
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