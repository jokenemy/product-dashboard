import React, { useState, useEffect } from 'react';
import { criarPedido, listarProdutos, listarClientes } from '../api';
import './CadastrarProduto.css';
import { CircularProgress, Box, Button, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FormularioPedido({ onSuccess, dadosIniciais }) {
    const [clienteId, setClienteId] = useState('');
    const [carrinho, setCarrinho] = useState([]);
    const [total, setTotal] = useState(0);
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(true);

    const isEditMode = dadosIniciais && dadosIniciais.id;

    useEffect(() => {
        async function carregarDados() {
            try {
                const [resProdutos, resClientes] = await Promise.all([listarProdutos(), listarClientes()]);
                setProdutos(resProdutos.data || []);
                setClientes(resClientes.data || []);
                if (isEditMode) {
                    setClienteId(dadosIniciais.clienteId);
                    const carrinhoInicial = dadosIniciais.items.map(item => ({
                        produtoId: item.produto.id,
                        nome: item.produto.nome,
                        preco: item.preco,
                        quantidade: item.quantidade,
                    }));
                    setCarrinho(carrinhoInicial);
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        }
        carregarDados();
    }, [dadosIniciais, isEditMode]);

    useEffect(() => {
        const novoTotal = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
        setTotal(novoTotal);
    }, [carrinho]);

    const adicionarProdutoCarrinho = (produto) => {
        setCarrinho(prev => {
            const itemExistente = prev.find(item => item.produtoId === produto.id);
            if (itemExistente) {
                return prev.map(item =>
                    item.produtoId === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
                );
            }
            return [...prev, { produtoId: produto.id, nome: produto.nome, preco: produto.preco, quantidade: 1 }];
        });
    };

    const removerProdutoCarrinho = (produtoId) => {
        setCarrinho(prev => prev.filter(item => item.produtoId !== produtoId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!clienteId || carrinho.length === 0) {
            setMensagem("Por favor, selecione um cliente e adicione produtos ao carrinho.");
            return;
        }
        try {
            const dadosPedido = {
                clienteId: clienteId,
                items: carrinho.map(({ produtoId, quantidade, preco }) => ({ produtoId, quantidade, preco })),
                total: total,
            };
            await criarPedido(dadosPedido);
            setMensagem('Pedido criado com sucesso!');
            if (onSuccess) onSuccess();
        } catch (error) {
            setMensagem(`Erro ao criar pedido: ${error.message}`);
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress /></Box>;
    }

    return (
        <div className="form-section" style={{ width: '100%' }}>
            <h2>{isEditMode ? `Editar Pedido #${dadosIniciais.id}` : 'Criar Novo Pedido'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Cliente*</label>
                    <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                        <option value="">Selecione um cliente</option>
                        {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                </div>

                <Typography variant="h6" sx={{ mt: 2 }}>Produtos disponíveis</Typography>
                <List sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid #ddd', borderRadius: '4px' }}>
                    {produtos.map(p => (
                        <ListItem key={p.id} secondaryAction={
                            <Button variant="outlined" size="small" onClick={() => adicionarProdutoCarrinho(p)}>Adicionar</Button>
                        }>
                            <ListItemText primary={p.nome} secondary={`R$${p.preco.toFixed(2)}`} />
                        </ListItem>
                    ))}
                </List>

                <Typography variant="h6" sx={{ mt: 4 }}>Carrinho</Typography>
                <List>
                    {carrinho.map(item => (
                        <ListItem key={item.produtoId} secondaryAction={<IconButton edge="end" onClick={() => removerProdutoCarrinho(item.produtoId)}><DeleteIcon /></IconButton>}>
                            <ListItemText primary={item.nome} secondary={`Qtd: ${item.quantidade} - Subtotal: R$${(item.preco * item.quantidade).toFixed(2)}`} />
                        </ListItem>
                    ))}
                </List>

                <Typography variant="h5" sx={{ mt: 2 }}>Total: R$${total.toFixed(2)}</Typography>
                <Button type="submit" variant="contained" style={{ marginTop: '20px' }}>Finalizar Pedido</Button>
            </form>
            {mensagem && <div className="mensagem">{mensagem}</div>}
        </div>
    );
}