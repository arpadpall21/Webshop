import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.module.scss';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import store from './store/store';

import MainLayout from './MainLayout';
import ProductListPage from './ProductListPage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<ProductListPage />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='/cart' element={<CartPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
