// App.jsx - Integrado campo Quantidade no fluxo

import { useEffect, useState, useRef } from 'react';
import './App.css';
import './CardProduto.css';
import Formulario from './Formulario';
import CardProduto from './CardProduto';

function App() {
  // Estados
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  // Adicionar quantidade ao estado inicial
  const [objProduto, setObjProduto] = useState({ 
    codigo: null, 
    nome: '', 
    marca: '', 
    preco: '',
    quantidade: '', // Adicionado quantidade
    imageUrl: '',
    id: null
  }); 
  const [produtoSelecionadoIndice, setProdutoSelecionadoIndice] = useState(null);

  // Ref para scroll
  const formSectionRef = useRef(null);

  // useEffect para carregar produtos
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido))
      .catch(erro => console.error("Erro ao carregar produtos:", erro));
  }, []);

  // aoDigitar (sem alterações, já lida com qualquer campo pelo name)
  const aoDigitar = (e) => {
    const { name, value } = e.target;
    setObjProduto({...objProduto, [name]: value });
  }

  // cadastrar - Incluir quantidade
  const cadastrar = () => {
    const produtoParaCadastrar = { 
      nome: objProduto.nome,
      marca: objProduto.marca,
      preco: objProduto.preco === '' ? null : parseFloat(objProduto.preco),
      quantidade: objProduto.quantidade === '' ? null : parseInt(objProduto.quantidade, 10), // Incluir quantidade (inteiro)
      imageUrl: objProduto.imageUrl || null
    };

    // Validação frontend (incluindo quantidade)
    if (!produtoParaCadastrar.nome || !produtoParaCadastrar.marca || produtoParaCadastrar.preco === null || produtoParaCadastrar.quantidade === null) {
      alert("Por favor, preencha Nome, Marca, Preço e Quantidade.");
      return;
    }
    if (produtoParaCadastrar.preco < 0 || produtoParaCadastrar.quantidade < 0) {
      alert("Preço e Quantidade não podem ser negativos.");
      return;
    }

    fetch("http://localhost:8080/cadastrar", {
      method: 'post',
      body: JSON.stringify(produtoParaCadastrar),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => {
       if (!retorno.ok) {
         return retorno.json().then(err => { throw new Error(err.resposta || 'Erro desconhecido') });
       }
       return retorno.json();
     })
    .then(retorno_convertido => {
      setProdutos([...produtos, retorno_convertido]);
      limparFormulario();
      alert('Produto cadastrado com sucesso!');
    })
    .catch(erro => {
        console.error("Erro ao cadastrar:", erro);
        alert(`Erro ao cadastrar: ${erro.message}`);
    });
  }

  // selecionarProduto - Incluir quantidade
  const selecionarProduto = (indice) => {
    setProdutoSelecionadoIndice(indice);
    const produtoSel = produtos[indice];
    // Incluir quantidade ao definir o objeto para o formulário
    setObjProduto({
        ...produtoSel,
        preco: produtoSel.preco !== null && produtoSel.preco !== undefined ? produtoSel.preco.toString() : '',
        quantidade: produtoSel.quantidade !== null && produtoSel.quantidade !== undefined ? produtoSel.quantidade.toString() : '' // Converter quantidade para string
    }); 
    setBtnCadastrar(false);

    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // alterar - Incluir quantidade
  const alterar = () => {
    if (!objProduto || objProduto.codigo === null || objProduto.codigo === undefined) {
        alert("Erro ao alterar: Selecione um produto válido.");
        return;
    }

    const produtoParaAlterar = { 
      codigo: objProduto.codigo,
      nome: objProduto.nome,
      marca: objProduto.marca,
      preco: objProduto.preco === '' ? null : parseFloat(objProduto.preco),
      quantidade: objProduto.quantidade === '' ? null : parseInt(objProduto.quantidade, 10), // Incluir quantidade
      imageUrl: objProduto.imageUrl || null,
      id: objProduto.id
    };

    // Validação frontend (incluindo quantidade)
    if (!produtoParaAlterar.nome || !produtoParaAlterar.marca || produtoParaAlterar.preco === null || produtoParaAlterar.quantidade === null) {
      alert("Por favor, preencha Nome, Marca, Preço e Quantidade.");
      return;
    }
    if (produtoParaAlterar.preco < 0 || produtoParaAlterar.quantidade < 0) {
      alert("Preço e Quantidade não podem ser negativos.");
      return;
    }

    fetch("http://localhost:8080/alterar", {
      method: 'put',
      body: JSON.stringify(produtoParaAlterar), 
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => {
       if (!retorno.ok) {
         return retorno.json().then(err => { throw new Error(err.resposta || 'Erro desconhecido') });
       }
       return retorno.json();
     })
    .then(retorno_convertido => {
      let vetorTemp = [...produtos];
      let indice = vetorTemp.findIndex(p => p.codigo === objProduto.codigo);
      if (indice !== -1) {
          vetorTemp[indice] = retorno_convertido;
          setProdutos(vetorTemp);
          limparFormulario();
          alert('Produto alterado com sucesso!');
      } else {
          alert("Erro ao atualizar a lista após alteração.");
      }
    })
    .catch(erro => {
        console.error("Erro ao alterar:", erro);
        alert(`Erro ao alterar: ${erro.message}`);
    });
  }

  // remover (sem alterações)
  const remover = () => {
    // ... (lógica existente) ...
     if (!objProduto || objProduto.codigo === null || objProduto.codigo === undefined) {
        alert("Erro ao remover: Selecione um produto válido.");
        return;
    }
    fetch("http://localhost:8080/remover/" + objProduto.codigo, { 
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.resposta || 'Erro ao remover produto') });
        }
        return response.json().catch(() => ({ resposta: 'Produto removido com sucesso (sem corpo JSON)' })); 
    })
    .then(retorno_convertido => {
      let vetorTemp = [...produtos];
      let indice = vetorTemp.findIndex(p => p.codigo === objProduto.codigo);
      if (indice !== -1) {
          vetorTemp.splice(indice, 1);
          setProdutos(vetorTemp);
          limparFormulario();
          alert(retorno_convertido.resposta || 'Produto removido com sucesso!');
      } else {
          alert("Erro ao atualizar a lista após remoção.");
      }
    })
    .catch(erro => {
        console.error("Erro ao remover:", erro);
        alert(`Erro ao remover: ${erro.message}`);
    });
  };

  // cancelar (sem alterações)
  const cancelar = () => {
    limparFormulario();
  }

  // limparFormulario - Incluir quantidade
  const limparFormulario = () => {
    setObjProduto({ codigo: null, nome: '', marca: '', preco: '', quantidade: '', imageUrl: '', id: null }); // Resetar quantidade
    setBtnCadastrar(true);
    setProdutoSelecionadoIndice(null);
  }

  // Estrutura JSX (sem alterações na estrutura, apenas passa o objProduto atualizado)
  return (    
    <div className="app-container">
      <section id="secao-formulario" ref={formSectionRef} className="secao-formulario-estilo">
        <Formulario 
          botao={btnCadastrar} 
          eventoTeclado={aoDigitar} 
          cadastrar={cadastrar} 
          obj={objProduto}
          cancelar={cancelar}
          remover={remover}
          alterar={alterar}
        />
      </section>
      
      <section id="secao-produtos" className="secao-produtos-estilo">
        <h2>Produtos Cadastrados</h2>
        <div className="container-cards">
          {produtos.length > 0 ? (
            produtos.map((produto, indice) => (
              <CardProduto 
                key={produto.codigo !== undefined ? produto.codigo : indice}
                produto={produto} 
                selecionar={selecionarProduto} 
                indice={indice} 
              />
            ))
          ) : (
            <p>Nenhum produto cadastrado.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default App;

