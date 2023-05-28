import {React, lazy, createRef} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './style/style.scss';

const MainPage = lazy(() => import('./components/pages/MainPage'));
const ComicsPage = lazy(() => import('./components/pages/ComicsPage'));
const SingleComicPage = lazy(() => import('./components/pages/SingleComicPage/SingleComicPage'));

const allRoutes = [
  { path: '/', Component: <MainPage/>, nodeRef: createRef() },
  { path: '/comics', Component: <ComicsPage/>, nodeRef: createRef() },
  { path: '/comics/:comicId', Component: <SingleComicPage/>, nodeRef: createRef()}
]

const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: allRoutes.map((route) => ({
          index: route.path === '/',
          path: route.path === '/' ? undefined : route.path,
          element: route.Component 
      })),
  },
])

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <>
      <RouterProvider router={router}/>
    </>
  );