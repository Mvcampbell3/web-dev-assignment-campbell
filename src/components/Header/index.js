import React from 'react';

const Header = (props) => {
  return (
    <nav className="navbar is-info">
      <div className="navbar-brand">
        <div className="navbar-item logo point" onClick={props.toggleViewLanding}>To Do App</div>

        <div className={props.displayMenu ? 'navbar-burger is-active' : 'navbar-burger'} onClick={props.toggleMobileNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={props.displayMenu ? 'navbar-menu is-active' : 'navbar-menu'}>
        <div className="navbar-end">
          <div className="navbar-item point" onClick={props.toggleViewAboutPage}>About</div>
          {props.userId ? <div className='navbar-item point' onClick={props.signOutUser}>Signout</div> : null}
        </div>
      </div>
    </nav>
  );
}

export default Header;