export default async function carregarProdutos() {
    try {
      const response = await fetch('/dados.json');

      if (!response.ok) {
        throw new Error('Erro ao carregar os dados');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      return[]; 
    }
  }
