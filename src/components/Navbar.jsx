import { NavLink } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <NavLink
        to='/'
        className={({ isActive }) =>
          isActive
            ? 'nav-link active'
            : 'nav-link'
        }
      >
        New
      </NavLink>

      <NavLink
        to='/history/1'
        className={({ isActive }) =>
          isActive
            ? 'nav-link active'
            : 'nav-link'
        }
      >
        History
      </NavLink>

      <NavLink
        to='/profile'
        className={({ isActive }) =>
          isActive
            ? 'nav-link active'
            : 'nav-link'
        }
      >
        Profile
      </NavLink>
    </nav>
  );
}