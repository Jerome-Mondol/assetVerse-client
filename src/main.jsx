import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
  </React.StrictMode>
)
