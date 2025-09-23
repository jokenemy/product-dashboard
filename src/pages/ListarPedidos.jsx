import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarPedidos } from '../api';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const response = await listarPedidos();
        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao carregar pedidos", error);
      } finally {
        setLoading(false);
      }
    }
    carregarPedidos();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Pedidos Realizados</Typography>
      {pedidos.length === 0 ? (
        <Typography>Nenhum pedido encontrado.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {pedidos.map(pedido => (
            <Card key={pedido.id} variant="outlined">
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">Pedido ID: {pedido.id}</Typography>
                  <Typography><b>Cliente:</b> {pedido.cliente?.nome || 'Não informado'}</Typography>
                  <Typography><b>Produto:</b> {pedido.produto?.nome || 'Não informado'}</Typography>
                  <Typography><b>Total:</b> R$ {pedido.total.toFixed(2)}</Typography>
                </Box>
                <IconButton color="primary" onClick={() => navigate(`/pedidos/editar/${pedido.id}`)}>
                  <EditIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}