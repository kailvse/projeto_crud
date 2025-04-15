function Formulario({botao}){
    return(
        
        <form>
            <h1>Formulario</h1>
            <input ClassName="form-control" type='texto' placeholder='Nome'></input>
            <input ClassName="form-control" type='texto' placeholder='Marca'></input>
            {
            botao
            ?
            <input ClassName = "btn btn-success" type='button' value='Cadastrar'/>
            :
            <div>
                <input ClassName = "btn btn-primary" type='button' value='Alterar'/>
                <input ClassName = "btn btn-danger" type='button' value='Remover'/>
                <input ClassName = "btn btn-warning" type='button' value='Cancelar'/>
            </div>
            }
        </form>
    )
}
export default Formulario;