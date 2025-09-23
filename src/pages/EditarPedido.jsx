import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarPedidoPorId } from '../api';
import FormularioPedido from '../components/FormularioPedido';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import '../components/CadastrarProduto.css';

export default function EditarPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPedido() {
      try {
        const response = await buscarPedidoPorId(id);
        setPedido(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarPedido();
  }, [id]);

  const handleSuccess = () => {
    setTimeout(() => navigate('/pedidos'), 1500);
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pedido) {
    return <Typography variant="h5" color="error">Pedido não encontrado.</Typography>;
  }

  return (
    <div className="cadastro-container">
      <Paper elevation={3} className="cadastro-card">
        <FormularioPedido onSuccess={handleSuccess} dadosIniciais={pedido} />
      </Paper>
    </div>
  );
}