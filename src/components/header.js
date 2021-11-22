import { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import { AuthContext } from '../context/auth';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="h-16 bg-red-primary fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full px-5">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Consume logo">
                <img src="/images/Consume-Media-Logo.png" alt="Consume" className="my-2 w-150px" />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <button type="button" title="Sign Out" onClick={logout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-6 w-8 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.username}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${user.username}.jpg`}
                      alt={user.username}
                    />
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
