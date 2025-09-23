import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarPedidos, listarAvaliacoes } from '../api';
import { Box, Typography, Card, CardContent, CircularProgress, Button, Grid, Paper } from '@mui/material';

export default function Home() {
  const [pedidos, setPedidos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const [resPedidos, resAvaliacoes] = await Promise.all([
          listarPedidos(),
          listarAvaliacoes()
        ]);
        
        // Adicionando uma verificação de segurança antes de usar os dados
        setPedidos(resPedidos.data ? resPedidos.data.slice(0, 5) : []);
        setAvaliacoes(resAvaliacoes.data ? resAvaliacoes.data.slice(0, 5) : []);

      } catch (error) {
        console.error("Erro ao carregar dados do dashboard", error);
        setPedidos([]); // Garante que nunca será undefined em caso de erro
        setAvaliacoes([]); // Garante que nunca será undefined em caso de erro
      } finally {
        setLoading(false);
      }
    }
    carregarDashboard();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Button variant="contained" onClick={() => navigate('/produtos-visual')} sx={{ mb: 4 }}>
        Visualizar todos os produtos
      </Button>

      <Grid container spacing={3}>
        {/* Coluna de Pedidos */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: '12px' }}>
            <Typography variant="h5" gutterBottom>Últimos Pedidos</Typography>
            {pedidos.length > 0 ? pedidos.map(pedido => (
              <Card key={pedido.id} variant="outlined" sx={{ mb: 1, borderRadius: '8px' }}>
                <CardContent>
                  <Typography><b>Cliente:</b> {pedido.cliente?.nome || 'Não informado'}</Typography>
                  <Typography><b>Produto:</b> {pedido.produto?.nome || 'Não informado'}</Typography>
                  <Typography><b>Total:</b> R$ {pedido.total.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            )) : <Typography>Nenhum pedido recente.</Typography>}
          </Paper>
        </Grid>

        {/* Coluna de Avaliações */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: '12px' }}>
            <Typography variant="h5" gutterBottom>Últimas Avaliações</Typography>
            {avaliacoes.length > 0 ? avaliacoes.map(review => (
              <Card key={review.id} variant="outlined" sx={{ mb: 1, borderRadius: '8px' }}>
                <CardContent>
                  <Typography><b>Produto:</b> {review.produto?.nome}</Typography>
                  <Typography><b>Nota:</b> {'⭐'.repeat(review.nota)}</Typography>
                  <Typography sx={{ fontStyle: 'italic' }}>"{review.comentario}" - {review.cliente?.nome}</Typography>
                </CardContent>
              </Card>
            )) : <Typography>Nenhuma avaliação recente.</Typography>}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}