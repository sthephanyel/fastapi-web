import { useState } from 'react'
// import { AppRouting } from '@/routing/app-routing';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/theme-provider';
import { QueryProvider } from './providers/query-provider';
import { TooltipsProvider } from './providers/tooltips-provider';
import { Toaster } from '@/components/ui/sonner';
// import './App.css'
import './css/styles.css'
// import './css/global.css'

import { AppRouting } from './routing/app-routing'

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <TooltipsProvider>
          <BrowserRouter>
            <Toaster />
            <AppRouting/>
          </BrowserRouter>
        </TooltipsProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
