import React from 'react'
export default function Home({ produtos }) {
  return (
    <>
    
        <div id="titulo">
            <p id="tt">Seja Bem-vindo à melhor loja de roupas do nordeste</p>
            <p id="loja">STUDIO YAY</p>
            <p id="t2">Uma loja de roupas e acessórios ideal para você!!</p>
          </div>
    
          <div id="produtos">
            {produtos.map((produto) => (
              <div key={produto.id} className="roupa">
                <img src={produto.imagem} alt={produto.nome} />
                <p><strong>{produto.nome}</strong></p>
                <p>{produto.descricao}</p>
                <p>Preço: R$ {produto.preco.toFixed(2)}</p>
              </div>
            ))}
          </div>
          </>
 );
}
  