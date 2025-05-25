// Formulario.jsx final - Adicionado campo ID somente leitura

function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar }) {
    return (
        <form>
            {/* Campo Nome */}
            <input 
                type="text" 
                value={obj.nome || ""} // Garante que o valor seja sempre string
                onChange={eventoTeclado} 
                name="nome" 
                placeholder="Nome" 
                className="form-control" 
            />
            
            {/* Campo Marca */}
            <input 
                type="text" 
                value={obj.marca || ""} // Garante que o valor seja sempre string
                onChange={eventoTeclado} 
                name="marca" 
                placeholder="Marca" 
                className="form-control" 
            />

            {/* Campo ID (Somente Leitura) - Adicionado */}
            <input 
                type="text" 
                value={obj.id !== null && obj.id !== undefined ? obj.id : ""} // Exibe ID se existir, senão vazio
                name="id" 
                placeholder="ID (Gerado automaticamente)" 
                className="form-control" 
                readOnly // Torna o campo somente leitura
            />

            {/* Botões */}
            {
                botao
                ? <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary" />
                : <div>
                    <input type="button" value="Alterar" onClick={alterar} className="btn btn-warning" />
                    <input type="button" value="Remover" onClick={remover} className="btn btn-danger" />
                    <input type="button" value="Cancelar" onClick={cancelar} className="btn btn-secondary" />
                  </div>
            }
        </form>
    )
}

export default Formulario;
