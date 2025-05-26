// App.jsx - Atualizado com divisão de seções e scroll suave

import { useEffect, useState, useRef } from 'react'; // Importar useRef
import './App.css';
import './CardProduto.css';
import Formulario from './Formulario';
import CardProduto from './CardProduto';

function App() {
  // Estados (sem alterações)
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState({ 
    codigo: null, 
    nome: '', 
    marca: '', 
    preco: '',
    imageUrl: '',
    id: null
  }); 
  const [produtoSelecionadoIndice, setProdutoSelecionadoIndice] = useState(null);

  // Ref para a seção do formulário (NOVO)
  const formSectionRef = useRef(null);

  // useEffect (sem alterações)
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido))
      .catch(erro => console.error("Erro ao carregar produtos:", erro));
  }, []);

  // aoDigitar (sem alterações)
  const aoDigitar = (e) => {
    const { name, value } = e.target;
    setObjProduto({...objProduto, [name]: value });
  }

  // cadastrar (sem alterações)
  const cadastrar = () => {
    const produtoParaCadastrar = { 
      nome: objProduto.nome,
      marca: objProduto.marca,
      preco: objProduto.preco === '' ? null : parseFloat(objProduto.preco),
      imageUrl: objProduto.imageUrl || null
    };

    if (!produtoParaCadastrar.nome || !produtoParaCadastrar.marca || produtoParaCadastrar.preco === null) {
      alert("Por favor, preencha Nome, Marca e Preço.");
      return;
    }
    if (produtoParaCadastrar.preco < 0) {
      alert("O preço não pode ser negativo.");
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

  // selecionarProduto - Adicionar scroll (ATUALIZADO)
  const selecionarProduto = (indice) => {
    setProdutoSelecionadoIndice(indice);
    const produtoSel = produtos[indice];
    setObjProduto({
        ...produtoSel,
        preco: produtoSel.preco !== null && produtoSel.preco !== undefined ? produtoSel.preco.toString() : ''
    }); 
    setBtnCadastrar(false);

    // Scroll suave para a seção do formulário (NOVO)
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // alterar (sem alterações)
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
      imageUrl: objProduto.imageUrl || null,
      id: objProduto.id
    };

    if (!produtoParaAlterar.nome || !produtoParaAlterar.marca || produtoParaAlterar.preco === null) {
      alert("Por favor, preencha Nome, Marca e Preço.");
      return;
    }
     if (produtoParaAlterar.preco < 0) {
      alert("O preço não pode ser negativo.");
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
  }

  // cancelar (sem alterações)
  const cancelar = () => {
    limparFormulario();
  }

  // limparFormulario (sem alterações)
  const limparFormulario = () => {
    setObjProduto({ codigo: null, nome: '', marca: '', preco: '', imageUrl: '', id: null }); 
    setBtnCadastrar(true);
    setProdutoSelecionadoIndice(null);
  }

  // Estrutura JSX com divisão de seções (ATUALIZADO)
  return (    
    <div className="app-container"> {/* Container principal */}
      {/* Seção do Formulário */}
      <section id="secao-formulario" ref={formSectionRef} className="secao-formulario-estilo">
        {/* Você pode adicionar um título ou outros elementos aqui se desejar */}
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
      
      {/* Seção dos Produtos */}
      <section id="secao-produtos" className="secao-produtos-estilo">
        <h2>Produtos Cadastrados</h2> {/* Título para a seção de produtos */}
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

