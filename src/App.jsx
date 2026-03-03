import { useState } from 'react'
// import { AppRouting } from '@/routing/app-routing';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/theme-provider';
import './App.css'
import './css/styles.css'
// import './css/global.css'

import { AppRouting } from './routing/app-routing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <AppRouting/>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
