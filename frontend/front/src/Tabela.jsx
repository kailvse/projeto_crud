// Proposta de atualização do componente Tabela.jsx (CORRIGIDO v2 - Removidas aspas escapadas)

function Tabela({ vetor, selecionar, produtoSelecionado, chaveProduto = "codigo" }) { // Usa "codigo" por padrão
    return (
        <table className="table"> {/* Usando aspas duplas padrão */}
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
                {
                    vetor.map((obj, indice) => (
                        // Usa o campo definido em chaveProduto (default "codigo") como key
                        // Mantém o destaque visual baseado no índice selecionado
                        <tr 
                            key={obj[chaveProduto] !== undefined ? obj[chaveProduto] : indice} 
                            className={produtoSelecionado === indice ? "bg-info" : ""} /* Usando aspas duplas padrão */
                        >
                            <td>{indice + 1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.marca}</td>
                            <td>
                                <button 
                                    className="btn btn-success" /* Usando aspas duplas padrão */
                                    onClick={() => selecionar(indice)} // A seleção ainda usa o índice para pegar o objeto do vetor
                                    title="Selecionar este produto para edição"
                                >
                                    Selecionar
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Tabela;
