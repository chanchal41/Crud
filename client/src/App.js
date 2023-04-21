import React from 'react'
import Product from './Product'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
   <BrowserRouter>
      <Routes>
      <Route path="/" element={<Product />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App