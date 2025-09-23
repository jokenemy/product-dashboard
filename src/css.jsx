import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardMedia, CardContent, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField, Alert, Snackbar, CardActions, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { listarProdutos, atualizarProduto, removerProduto } from './api'; // CORRIGIDO AQUI

export default function Css() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [dadosEdicao, setDadosEdicao] = useState({});
  const [loadingAction, setLoadingAction] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const response = await listarProdutos(); // CORRIGIDO AQUI
      setProdutos(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: `Erro ao carregar produtos: ${error.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleEditClick = (produto) => {
    setProdutoSelecionado(produto);
    setDadosEdicao({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl || '',
      estoque: produto.estoque || 0,
    });
    setEditModalOpen(true);
  };

  const handleDeleteClick = (produto) => {
    setProdutoSelecionado(produto);
    setDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setProdutoSelecionado(null);
    setDadosEdicao({});
  };

  const handleSalvarEdicao = async () => {
    if (!produtoSelecionado) return;
    setLoadingAction(true);
    try {
      await atualizarProduto(produtoSelecionado.id, dadosEdicao);
      setSnackbar({ open: true, message: 'Produto atualizado com sucesso!', severity: 'success' });
      handleCloseModals();
      carregarProdutos(); // Recarrega os produtos para ver a alteração
    } catch (error) {
      setSnackbar({ open: true, message: `Erro ao atualizar produto: ${error.message}`, severity: 'error' });
    } finally {
      setLoadingAction(false);
    }
  };

  const handleConfirmarExclusao = async () => {
    if (!produtoSelecionado) return;
    setLoadingAction(true);
    try {
      await removerProduto(produtoSelecionado.id);
      setSnackbar({ open: true, message: 'Produto removido com sucesso!', severity: 'success' });
      handleCloseModals();
      carregarProdutos(); // Recarrega os produtos
    } catch (error) {
      setSnackbar({ open: true, message: `Erro ao remover produto: ${error.message}`, severity: 'error' });
    } finally {
      setLoadingAction(false);
    }
  };

  const handleInputChange = (campo, valor) => {
    setDadosEdicao(prev => ({ ...prev, [campo]: valor }));
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ marginBottom: '30px', textAlign: 'center' }}>
        <Typography variant="h5" color="blue">Seja Bem-vindo à melhor loja de roupas do nordeste</Typography>
        <Typography variant="h2" sx={{ fontWeight: 'bold', backgroundColor: 'aqua', display: 'inline-block', padding: '10px 20px', border: '4px dashed aqua', borderRadius: '8px', margin: '10px 0' }}>
          STUDIO YAY
        </Typography>
        <Typography variant="subtitle1">Uma loja de roupas e acessórios ideal para você!!</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {produtos.map((produto) => (
          <Card key={produto.id} sx={{ width: 250, boxShadow: 4 }}>
            <CardMedia
              component="img"
              height="220"
              image={produto.imagemUrl || 'https://via.placeholder.com/250x220.png?text=Sem+Imagem'}
              alt={produto.nome}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6">{produto.nome}</Typography>
              <Typography variant="body2" color="text.secondary">{produto.descricao}</Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ marginTop: '8px' }}>
                Preço: R$ {produto.preco.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', padding: '8px 16px' }}>
              <IconButton color="primary" onClick={() => handleEditClick(produto)} title="Editar produto"><EditIcon /></IconButton>
              <IconButton color="error" onClick={() => handleDeleteClick(produto)} title="Excluir produto"><DeleteIcon /></IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Dialog open={editModalOpen} onClose={handleCloseModals} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
            <TextField label="Nome" value={dadosEdicao.nome || ''} onChange={(e) => handleInputChange('nome', e.target.value)} fullWidth required />
            <TextField label="Descrição" value={dadosEdicao.descricao || ''} onChange={(e) => handleInputChange('descricao', e.target.value)} fullWidth multiline rows={3} />
            <TextField label="Preço" type="number" value={dadosEdicao.preco || ''} onChange={(e) => handleInputChange('preco', parseFloat(e.target.value) || 0)} fullWidth required inputProps={{ min: 0, step: 0.01 }} />
            <TextField label="URL da Imagem" value={dadosEdicao.imagemUrl || ''} onChange={(e) => handleInputChange('imagemUrl', e.target.value)} fullWidth />
            <TextField label="Estoque" type="number" value={dadosEdicao.estoque || ''} onChange={(e) => handleInputChange('estoque', parseInt(e.target.value) || 0)} fullWidth inputProps={{ min: 0 }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModals} disabled={loadingAction}>Cancelar</Button>
          <Button onClick={handleSalvarEdicao} variant="contained" disabled={loadingAction || !dadosEdicao.nome}>
            {loadingAction ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteModalOpen} onClose={handleCloseModals}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir o produto "{produtoSelecionado?.nome}"?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>Esta ação não pode ser desfeita.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModals} disabled={loadingAction}>Cancelar</Button>
          <Button onClick={handleConfirmarExclusao} variant="contained" color="error" disabled={loadingAction}>
            {loadingAction ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}