import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Componentes e Páginas
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Css from './css.jsx';
import EditarProduto from './pages/EditarProdutos';
import CadastrarCategoria from './pages/CadastrarCategoria';
import CadastroProduto from './components/CadastrarProduto'; // <-- CAMINHO CORRIGIDO AQUI
import CadastrarFornecedor from './pages/CadastrarFornecedor';
import ListarFornecedores from './pages/ListarFornecedores';
import CadastrarCliente from './pages/CadastrarCliente';
import ListarClientes from './pages/ListarClientes';
import ListarPedidos from './pages/ListarPedidos';
import CadastrarPedido from './pages/CadastrarPedido';
import EditarPedido from './pages/EditarPedido';
import CadastrarReview from './pages/CadastrarReview';
import ListarAvaliacoes from './pages/ListarAvaliacoes';

const theme = createTheme();

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const timerRef = useRef(null);

  const handleSidebarOpen = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { setSidebarOpen(true); }, 500);
  };

  const handleSidebarClose = () => {
    clearTimeout(timerRef.current);
    setSidebarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', boxShadow: 'none', color: 'black' }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">Yay Gestor</Typography>
            </Toolbar>
          </AppBar>
          
          <Sidebar open={sidebarOpen} handleMouseEnter={handleSidebarOpen} handleMouseLeave={handleSidebarClose} />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos-visual" element={<Css />} />
              
              <Route path="/pedidos" element={<ListarPedidos />} />
              <Route path="/cadastro-pedido" element={<CadastrarPedido />} />
              <Route path="/pedidos/editar/:id" element={<EditarPedido />} />

              <Route path="/fornecedores" element={<ListarFornecedores />} />
              <Route path="/cadastro-fornecedor" element={<CadastrarFornecedor />} />
              
              <Route path="/clientes" element={<ListarClientes />} />
              <Route path="/cadastro-cliente" element={<CadastrarCliente />} />

              <Route path="/avaliacoes" element={<ListarAvaliacoes />} />
              <Route path="/cadastro-review" element={<CadastrarReview />} />

              <Route path="/cadastro" element={<CadastroProduto />} />
              <Route path="/produtos/editar/:id" element={<EditarProduto />} />
              <Route path="/cadastro-categoria" element={<CadastrarCategoria />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}