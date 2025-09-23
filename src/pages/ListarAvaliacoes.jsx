import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarAvaliacoes } from '../api';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function ListarAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await listarAvaliacoes();
        setAvaliacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar avaliações:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Avaliações Recebidas</Typography>
      {avaliacoes.map(review => (
        <Card key={review.id} variant="outlined" sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardContent>
            <Typography variant="h6">Produto: {review.produto?.nome}</Typography>
            <Typography><b>Nota:</b> {'⭐'.repeat(review.nota)}</Typography>
            <Typography sx={{ fontStyle: 'italic' }}>"{review.comentario}" - por {review.cliente?.nome}</Typography>
          </CardContent>
          <IconButton color="primary" sx={{ mr: 2 }} onClick={() => navigate(`/avaliacoes/editar/${review.id}`)}>
            <EditIcon />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
}