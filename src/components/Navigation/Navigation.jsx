import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logoutThunk } from '../../redux/auth/authOperations';

export const Navigation = () => {
  const user = useSelector(selectUser);
  const IsLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <div>
      <header>
        {user.name && <h3>{user.email}</h3>}
        <nav className={s.nav}>
          <NavLink className={({ isActive }) => clsx(s.link, isActive && s.active)} to="/">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => clsx(s.link, isActive && s.active)} to="/contacts">
            Contacts
          </NavLink>
          {!IsLoggedIn && (
            <>
              <NavLink
                className={({ isActive }) => clsx(s.link, isActive && s.active)}
                to="/register"
              >
                Register
              </NavLink>
              <NavLink className={({ isActive }) => clsx(s.link, isActive && s.active)} to="/login">
                Login
              </NavLink>
            </>
          )}
          {IsLoggedIn && <button onClick={() => dispatch(logoutThunk())}>Logout</button>}
        </nav>
      </header>
    </div>
  );
};
