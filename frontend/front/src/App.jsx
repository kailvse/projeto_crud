// Proposta de configuração dos botões para o projeto CRUD
// App.jsx CORRIGIDO para usar 'codigo' em vez de 'id'

import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {
  // Estados para gerenciar o formulário e os produtos
  const [btnCadastrar, setBtnCadastrar] = useState(true); // Começa com botão de cadastrar visível
  const [produtos, setProdutos] = useState([]);
  // Inicializa objProduto com codigo como null ou undefined
  const [objProduto, setObjProduto] = useState({ codigo: null, nome: '', marca: '' }); 
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // UseEffect para carregar produtos ao iniciar
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido))
      .catch(erro => console.error("Erro ao carregar produtos:", erro));
  }, []);

  // Função para coletar dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]: e.target.value});
  }

  // Função para cadastrar produto
  const cadastrar = () => {
    // Cria um objeto sem o campo 'codigo' para o cadastro
    const produtoParaCadastrar = { nome: objProduto.nome, marca: objProduto.marca };
    fetch("http://localhost:8080/cadastrar", {
      method: 'post',
      body: JSON.stringify(produtoParaCadastrar),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      // Adiciona o novo produto à lista (assumindo que o backend retorna o produto com codigo)
      setProdutos([...produtos, retorno_convertido]);
      
      // Limpa o formulário
      limparFormulario();
      
      // Feedback visual
      alert('Produto cadastrado com sucesso!');
    })
    .catch(erro => console.error("Erro ao cadastrar:", erro));
  }

  // Função para selecionar produto
  const selecionarProduto = (indice) => {
    setProdutoSelecionado(indice);
    // Garante que o objeto completo, incluindo 'codigo', seja definido
    setObjProduto(produtos[indice]); 
    setBtnCadastrar(false); // Muda para os botões de alterar/remover/cancelar
  }

  // Função para alterar produto
  const alterar = () => {
    // Verifica se objProduto e objProduto.codigo existem
    if (!objProduto || objProduto.codigo === null || objProduto.codigo === undefined) {
        console.error("Erro: Código do produto não encontrado para alteração.");
        alert("Erro ao alterar: Selecione um produto válido.");
        return;
    }
    fetch("http://localhost:8080/alterar", {
      method: 'put',
      // Envia o objeto completo, incluindo o 'codigo'
      body: JSON.stringify(objProduto), 
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      // Cria uma cópia do vetor de produtos
      let vetorTemp = [...produtos];
      
      // Encontra a posição do produto alterado usando 'codigo'
      let indice = vetorTemp.findIndex(p => p.codigo === objProduto.codigo);
      
      // Verifica se o índice foi encontrado
      if (indice !== -1) {
          // Substitui o produto alterado
          vetorTemp[indice] = retorno_convertido;
          // Atualiza o vetor de produtos
          setProdutos(vetorTemp);
          // Limpa o formulário
          limparFormulario();
          // Feedback visual
          alert('Produto alterado com sucesso!');
      } else {
          console.error("Erro ao encontrar o produto para alterar no estado local.");
          alert("Erro ao atualizar a lista de produtos após alteração.");
      }
    })
    .catch(erro => console.error("Erro ao alterar:", erro));
  }

  // Função para remover produto
  const remover = () => {
    // Verifica se objProduto e objProduto.codigo existem
    if (!objProduto || objProduto.codigo === null || objProduto.codigo === undefined) {
        console.error("Erro: Código do produto não encontrado para remoção.");
        alert("Erro ao remover: Selecione um produto válido.");
        return;
    }
    // Usa objProduto.codigo na URL
    fetch("http://localhost:8080/remover/" + objProduto.codigo, { 
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    // A API de remoção pode não retornar um JSON, apenas status ou uma mensagem simples
    .then(response => {
        if (!response.ok) {
            // Se a resposta não for OK, tenta ler como texto para ver a mensagem de erro
            return response.text().then(text => { throw new Error(text || 'Erro ao remover produto') });
        }
        // Se a resposta for OK, tenta ler como JSON (se houver corpo) ou retorna um objeto de sucesso
        // A API original parece retornar RespostaModelo, então tentamos JSON
        return response.json().catch(() => ({ mensagem: 'Produto removido com sucesso (sem corpo JSON)' })); 
    })
    .then(retorno_convertido => {
      // Cria uma cópia do vetor de produtos
      let vetorTemp = [...produtos];
      
      // Encontra a posição do produto removido usando 'codigo'
      let indice = vetorTemp.findIndex(p => p.codigo === objProduto.codigo);
      
      // Verifica se o índice foi encontrado
      if (indice !== -1) {
          // Remove o produto
          vetorTemp.splice(indice, 1);
          // Atualiza o vetor de produtos
          setProdutos(vetorTemp);
          // Limpa o formulário
          limparFormulario();
          // Feedback visual (usando a mensagem do backend se disponível)
          alert(retorno_convertido.mensagem || 'Produto removido com sucesso!');
      } else {
          console.error("Erro ao encontrar o produto para remover no estado local.");
          alert("Erro ao atualizar a lista de produtos após remoção.");
      }
    })
    .catch(erro => {
        console.error("Erro ao remover:", erro);
        alert(`Erro ao remover: ${erro.message}`);
    });
  }

  // Função para cancelar operação e limpar formulário
  const cancelar = () => {
    limparFormulario();
  }

  // Função para limpar formulário
  const limparFormulario = () => {
    // Reseta objProduto para o estado inicial, incluindo codigo: null
    setObjProduto({ codigo: null, nome: '', marca: '' }); 
    setBtnCadastrar(true); // Volta para o botão de cadastrar
    setProdutoSelecionado(null);
  }

  return (    
    <div>        
      <Formulario 
        botao={btnCadastrar} 
        eventoTeclado={aoDigitar} 
        cadastrar={cadastrar} 
        obj={objProduto}
        cancelar={cancelar}
        remover={remover}
        alterar={alterar}
      />
      {/* Passa o 'codigo' como chave para Tabela, se disponível */}
      <Tabela 
        vetor={produtos} 
        selecionar={selecionarProduto}
        produtoSelecionado={produtoSelecionado}
        chaveProduto="codigo" // Informa à Tabela qual campo usar como chave única
      />
    </div>
  )
}

export default App;
