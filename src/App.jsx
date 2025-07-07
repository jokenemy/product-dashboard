import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import carregarProdutos  from './api.js';
import Css from './css.jsx';
import './index.css';
import  Home from './componentes.jsx';
import React from 'react';


 export default function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchdados() {
      let dados= await carregarProdutos()
     setProdutos(dados)
    }

    fetchdados();
  }, []);

    return (
      <Router>
      <nav>
        <Link to="/">Página inicial</Link> 
      </nav>
  
      <Routes>
        <Route
          path="/"
          element={<Css produtos={produtos} />}/>
        </Routes>
      </Router>
    );
   }
    