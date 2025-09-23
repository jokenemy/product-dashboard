import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarClientes } from '../api';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await listarClientes();
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Clientes Cadastrados</Typography>
      {clientes.map(cliente => (
        <Card key={cliente.id} variant="outlined" sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardContent>
            <Typography variant="h6">{cliente.nome}</Typography>
            <Typography color="text.secondary">{cliente.email}</Typography>
          </CardContent>
          <IconButton color="primary" sx={{ mr: 2 }} onClick={() => navigate(`/clientes/editar/${cliente.id}`)}>
            <EditIcon />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
}