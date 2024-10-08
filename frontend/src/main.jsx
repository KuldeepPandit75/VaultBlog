import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import store from './App/store.js'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/home/Home.jsx'
import Login from './components/account/Login.jsx'
import CreatePost from './components/create/CreatePost.jsx'

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
        <Route path='/' element={<Layout isAuthenticated={isAuthenticated} />}>
          <Route path="" element={<Home />} />
          <Route path="create" element={<CreatePost/>}/>
        </Route>
      </>
    )
  )

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
