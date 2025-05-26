// Formulario.jsx - Adicionado campo Quantidade

function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar }) {
    return (
        <form>
            {/* Campo Nome */}
            <input 
                type="text" 
                value={obj.nome || ""} 
                onChange={eventoTeclado} 
                name="nome" 
                placeholder="Nome" 
                className="form-control" 
            />
            
            {/* Campo Marca */}
            <input 
                type="text" 
                value={obj.marca || ""} 
                onChange={eventoTeclado} 
                name="marca" 
                placeholder="Marca" 
                className="form-control" 
            />

            {/* Campo Preço */}
            <input 
                type="number" 
                value={obj.preco !== null && obj.preco !== undefined ? obj.preco : ""} 
                onChange={eventoTeclado} 
                name="preco" 
                placeholder="Preço (ex: 19.99)" 
                className="form-control" 
                step="0.01" 
                min="0" 
            />

            {/* Campo Quantidade (NOVO) */}
            <input 
                type="number" 
                value={obj.quantidade !== null && obj.quantidade !== undefined ? obj.quantidade : ""} // Exibe quantidade se existir
                onChange={eventoTeclado} 
                name="quantidade" 
                placeholder="Quantidade" 
                className="form-control" 
                step="1" // Apenas inteiros
                min="0" // Quantidade não pode ser negativa
            />

            {/* Campo URL da Imagem */}
            <input 
                type="text" 
                value={obj.imageUrl || ""} 
                onChange={eventoTeclado} 
                name="imageUrl" 
                placeholder="URL da Imagem (ex: https://.../imagem.jpg)" 
                className="form-control" 
            />

            {/* Campo ID (Somente Leitura) */}
            <input 
                type="text" 
                value={obj.id !== null && obj.id !== undefined ? obj.id : ""} 
                name="id" 
                placeholder="ID (Gerado automaticamente)" 
                className="form-control" 
                readOnly 
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

