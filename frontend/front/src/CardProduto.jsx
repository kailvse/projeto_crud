// CardProduto.jsx - Adicionada exibição da Quantidade
import React from 'react';

function CardProduto({ produto, selecionar, indice }) {
  // Função para lidar com erro de imagem
  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = '/placeholder-image.png'; 
    e.target.alt = 'Imagem indisponível';
  };

  return (
    <div className="card-produto">
      <img 
        src={produto.imageUrl || '/placeholder-image.png'} 
        alt={`Imagem de ${produto.nome}`}
        onError={handleImageError} 
        className="card-produto-imagem"
      />
      <div className="card-produto-info">
        <h3>{produto.nome || 'Nome Indisponível'}</h3>
        <p><strong>Marca:</strong> {produto.marca || 'Marca Indisponível'}</p>
        <p><strong>Preço:</strong> R$ {produto.preco !== null && produto.preco !== undefined ? parseFloat(produto.preco).toFixed(2).replace('.', ',') : 'Preço Indisponível'}</p>
        {/* Adicionar exibição da Quantidade */}
        <p><strong>Quantidade:</strong> {produto.quantidade !== null && produto.quantidade !== undefined ? produto.quantidade : 'Indisponível'}</p> 
        <p><small><strong>ID:</strong> {produto.id !== null && produto.id !== undefined ? produto.id : 'N/A'}</small></p>
        <button 
          className="btn btn-success btn-selecionar-card"
          onClick={() => selecionar(indice)}
          title="Selecionar este produto para edição"
        >
          Selecionar
        </button>
      </div>
    </div>
  );
}

export default CardProduto;

