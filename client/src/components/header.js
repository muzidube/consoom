import { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import { AuthContext } from '../context/auth';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="h-16 bg-red-primary fixed top-0 left-0 w-full z-20">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full px-5">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Consoom logo">
                <p className="font-bebas text-2.5em text-center text-white">Consoom</p>
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <button
                  type="button"
                  title="Sign Out"
                  className="font-bold text-sm rounded text-white w-20 h-8"
                  onClick={logout}
                >
                  Sign Out
                </button>
                <div className="flex items-center cursor-pointer text-black">
                  <Link to={`/p/${user.username}`} className="min-w-46px">
                    <span className="min-w-46px w-46px h-46px box-border text-white">
                      <div className="block m-0 w-full h-full">
                        <span className="w-full h-full inline-flex flex-nowrap items-center justify-center text-2em rounded-50% bg-red-tertiary">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button type="button" className="font-bold text-sm rounded text-white w-20 h-8">
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button type="button" className="font-bold text-sm rounded text-black w-20 h-8">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
