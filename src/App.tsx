import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ProductList from './ProductList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
