import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Wrapper } from './components/utils/Wrapper'

import { Routes } from './routes/Routes'

function App() {

  return (
    <BrowserRouter>
      <Wrapper >
        <Routes />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App
