
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

const[btnCadastrar] =useState(false);
const[produtos, setProdutos] =useState ([]);

useEffect (() => {
  fetch("http://localhost:8080/listar")
  .then(retorno => retorno.json())
  .then (retorno_convertido => setProdutos(retorno_convertido))
},[]);

return (    
      <div>
        <Formulario botao={btnCadastrar}/>
        <Tabela/>
      </div>
  )
}

export default App;
