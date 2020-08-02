import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

function Header() {
  return (
    <header id='main-header'>
      <div className='header-content'>
        <Link className='logo' to='/'>
          Bblog
        </Link>
        <Link to='/login'>Login</Link>
      </div>
    </header>
  );
}

export default Header;
