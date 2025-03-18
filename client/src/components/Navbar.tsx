import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <div>
      <ul>
      {
        !loginCheck ? (
          <div className='nav'> 
            <li className='nav-title'>
              <Link to='/login'>Krazy Kanban Board</Link>
            </li>
            <li className='nav-item'>
              <button type='button'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          </div>
        ) : (
          <div className='nav'>
            <li className='nav-title'>
              <Link to='/'>Krazy Kanban Board</Link>
            </li>
            <li className='nav-item'>
              <button type='button' onClick={() => {
                auth.logout();
              }}>Logout</button>
          </li>
          </div>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;
