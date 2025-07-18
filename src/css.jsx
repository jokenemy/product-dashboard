import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Css({ produtos }) {
  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ marginBottom: '30px', textAlign: 'center' }}>
        <Typography variant="h5" color="blue">
          Seja Bem-vindo à melhor loja de roupas do nordeste
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            backgroundColor: 'aqua',
            display: 'inline-block',
            padding: '10px 20px',
            border: '4px dashed aqua',
            borderRadius: '8px',
            margin: '10px 0',
          }}
        >
          STUDIO YAY
        </Typography>
        <Typography variant="subtitle1">
          Uma loja de roupas e acessórios ideal para você!!
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
        }}
      >
        {produtos.map((produto) => (
          <Card key={produto.id} sx={{ width: 250, boxShadow: 4 }}>
            <CardMedia
              component="img"
              height="220"
              image={produto.imagem}
              alt={produto.nome}
              sx={{ objectFit: 'cover' 
              
              }}
            />
            <CardContent>
              <Typography variant="h6">{produto.nome}</Typography>
              <Typography variant="body2" color="text.secondary">
                {produto.descricao}
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ marginTop: '8px' }}>
                Preço: R$ {produto.preco.toFixed(2)}
              </Typography>
            </CardContent>
             <DeleteIcon />
    
          </Card>
        ))}
      </Box>
    </Box>
  );
}

  
