// Tabela.jsx final - Adicionada coluna ID entre Marca e Selecionar

function Tabela({ vetor, selecionar, produtoSelecionado, chaveProduto = "codigo" }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th>ID</th> {/* Coluna ID adicionada aqui */} 
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr 
                            key={obj[chaveProduto] !== undefined ? obj[chaveProduto] : indice} 
                            className={produtoSelecionado === indice ? "bg-info" : ""}
                        >
                            <td>{indice + 1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.marca}</td>
                            <td>{obj.id !== null && obj.id !== undefined ? obj.id : "N/A"}</td> {/* Exibe o ID numérico */} 
                            <td>
                                <button 
                                    className="btn btn-success"
                                    onClick={() => selecionar(indice)}
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
