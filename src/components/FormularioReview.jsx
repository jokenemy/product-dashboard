import React, { useState, useEffect } from 'react';
import { criarAvaliacao, listarProdutos, listarClientes } from '../api';
import './CadastrarProduto.css';

// URL da imagem padrão que aparece antes de selecionar um produto
const imagemPadrao = "url('https://media.licdn.com/dms/image/v2/C4D12AQGkTaBt8lGt3Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1564945281536?e=2147483647&v=beta&t=mhkffLn5TqxMXgT07cKALizhnehopWftQMEq3_3kdxY')";

export default function FormularioReview({ onSuccess }) {
    const [formData, setFormData] = useState({
        nota: 5,
        comentario: '',
        produtoId: '',
        clienteId: '',
    });
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [imagemExibida, setImagemExibida] = useState(imagemPadrao);

    useEffect(() => {
        async function carregarDados() {
            try {
                const resProdutos = await listarProdutos();
                setProdutos(resProdutos.data);
                const resClientes = await listarClientes();
                setClientes(resClientes.data);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }
        carregarDados();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // --- LÓGICA PARA ATUALIZAR A IMAGEM ---
        if (name === 'produtoId') {
            const produtoSelecionado = produtos.find(p => p.id === parseInt(value));
            if (produtoSelecionado && produtoSelecionado.imagemUrl) {
                setImagemExibida(`url('${produtoSelecionado.imagemUrl}')`);
            } else {
                setImagemExibida(imagemPadrao);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dadosReview = {
                ...formData,
                nota: parseInt(formData.nota),
                produtoId: parseInt(formData.produtoId),
                clienteId: parseInt(formData.clienteId),
            };
            await criarAvaliacao(dadosReview);
            setMensagem('Avaliação enviada com sucesso!');
            if (onSuccess) onSuccess();
        } catch (error) {
            setMensagem(`Erro ao enviar avaliação: ${error.message}`);
        }
    };

    return (
        <div className="cadastro-card">
            <div className="form-section">
                <h2>Fazer uma Avaliação de Produto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Cliente *</label>
                        <select name="clienteId" value={formData.clienteId} onChange={handleChange} required>
                            <option value="">Selecione um cliente</option>
                            {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Produto *</label>
                        <select name="produtoId" value={formData.produtoId} onChange={handleChange} required>
                            <option value="">Selecione um produto</option>
                            {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Nota (1 a 5) *</label>
                        <select name="nota" value={formData.nota} onChange={handleChange} required>
                            <option value={5}>5 (Excelente)</option>
                            <option value={4}>4 (Bom)</option>
                            <option value={3}>3 (Razoável)</option>
                            <option value={2}>2 (Ruim)</option>
                            <option value={1}>1 (Péssimo)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comentário *</label>
                        <textarea name="comentario" value={formData.comentario} onChange={handleChange} required />
                    </div>
                    <button type="submit">Enviar Avaliação</button>
                </form>
                {mensagem && <div className="mensagem">{mensagem}</div>}
            </div>
            <div 
              className="image-section"
              style={{ 
                backgroundImage: imagemExibida,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f4f1e5',
                backgroundPosition: 'center'
              }}
            />
        </div>
    );
}