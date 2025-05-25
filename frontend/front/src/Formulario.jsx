// Proposta de atualização do componente Formulario.jsx

function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar }) {
    return (
        <form>
            <h2>Sistema Gestor de Produtos</h2>
            
            <input 
                className="form-control" 
                type="text" 
                name="nome"
                placeholder="Nome" 
                onChange={eventoTeclado}
                value={obj.nome || ''}
            />
            
            <input 
                className="form-control" 
                type="text" 
                name="marca"
                placeholder="Marca" 
                onChange={eventoTeclado}
                value={obj.marca || ''}
            />
            
            {
                botao
                ?
                <input 
                    className="btn btn-success" 
                    type="button" 
                    value="Cadastrar" 
                    onClick={cadastrar}
                    disabled={!obj.nome || !obj.marca}
                    title="Clique para cadastrar um novo produto"
                />
                :
                <div>
                    <input 
                        className="btn btn-warning" 
                        type="button" 
                        value="Cancelar" 
                        onClick={cancelar}
                        title="Cancelar operação e limpar formulário"
                    />
                    <input 
                        className="btn btn-primary" 
                        type="button" 
                        value="Alterar" 
                        onClick={alterar}
                        disabled={!obj.nome || !obj.marca}
                        title="Salvar alterações no produto selecionado"
                    />
                    <input 
                        className="btn btn-danger" 
                        type="button" 
                        value="Remover" 
                        onClick={remover}
                        title="Remover o produto selecionado"
                    />
                </div>
            }
        </form>
    )
}

export default Formulario;
