import React from 'react';
import './App.css';
import ProjectRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <ProjectRoutes />
    </>
  );
}

export default App;
