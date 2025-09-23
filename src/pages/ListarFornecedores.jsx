import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarFornecedores } from '../api';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function ListarFornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await listarFornecedores();
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Fornecedores Cadastrados</Typography>
      {fornecedores.map(forn => (
        <Card key={forn.id} variant="outlined" sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardContent>
            <Typography variant="h6">{forn.nome}</Typography>
            <Typography color="text.secondary">{forn.email} | {forn.contato}</Typography>
          </CardContent>
          <IconButton color="primary" sx={{ mr: 2 }} onClick={() => navigate(`/fornecedores/editar/${forn.id}`)}>
            <EditIcon />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
}