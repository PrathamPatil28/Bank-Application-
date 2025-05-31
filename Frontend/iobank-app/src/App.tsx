

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core'
import Redirect from './Pages/Redirect'
import Login from './Pages/Login'
import Regsiter from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import RegistrationSuccessful from './Pages/RegistrationSuccessful'
import { Provider } from 'react-redux'; 
import store from './Store/Store';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Redirect />
    }, {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Regsiter />
    },
    {
      path: "/dashboard/*",
      element: <Dashboard />
    },
    {
      path: "/successful",
      element: <RegistrationSuccessful />
    }
  ])


  return (
    <Provider store={store}>
    <MantineProvider >
      <RouterProvider router={routes}>
      </RouterProvider>
    </MantineProvider>
    </Provider>
  )
}

export default App
