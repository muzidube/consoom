import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../context/auth';

export default function Hero() {
  const { user } = useContext(AuthContext);

  const [memberSince, setMemberSince] = useState('Loading');

  useEffect(() => {
    setMemberSince(user.createdAt);
    document.querySelector('.profile-page-hero').style.backgroundImage =
      'url(/images/red-lines.svg)';
  });
  return (
    <section className="profile-page-hero max-w-screen-xl min-h-300px h-heroHeight max-h-360px bg-top-center bg-cover bg-no-repeat text-white flex flex-wrap justify-center items-start content-start w-full box-border mx-auto">
      <div className="w-full h-full z-0 box-border bg-profile-gradient">
        <div className="media discover h-full flex content-center items-center justify-center w-full flex-wrap box-border text-white">
          <div className="w-full flex justify-center content-start items-start box-border text-white">
            <div className="content-wrapper flex-wrap max-w-screen-xl w-full flex items-start content-start px-10 py-7 box-border text-white">
              <span className="min-w-150px w-150px h-150px box-border text-white">
                <div className="block m-0 w-full h-full">
                  <span className="w-full h-full inline-flex flex-nowrap items-center justify-center text-4em rounded-50% bg-red-primary">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </span>
              <div className="title mb-1.25 box-border text-white my-auto pl-10">
                <h2 className="text-2em font-bold leading-none m-0 p-0 box-border text-white">
                  {user.username}
                </h2>
                <h3 className="text-1.5em m-0 p-0 box-border text-white italic">
                  Member since {memberSince.split('T')[0]}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
