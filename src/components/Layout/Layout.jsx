// import { Outlet } from 'react-router-dom';
// import { Navigation } from '../Navigation/Navigation';
// // за допомогою лояута або аутлета я можу відокремити сторінку
// export const Layout = () => {
//   return (
//     <div>
//       <Navigation />
//       <Outlet />
//     </div>
//   );
// };

import { Outlet } from 'react-router-dom';
import { AppBar } from '../AppBar/AppBar';

export const Layout = () => {
  return (
    <div>
      <AppBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
