package br.com.produtos.crudprodutos.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.produtos.crudprodutos.produtos.repositorio.ProductRepository;
import br.com.produtos.crudprodutos.produtos.modelo.ProdutoModelo;
import br.com.produtos.crudprodutos.produtos.modelo.RespostaModelo;

@Service
public class ProductService {

    @Autowired
    private ProductRepository pr;
    
    @Autowired
    private RespostaModelo rm;
    //Listar Produto
    public Iterable<ProdutoModelo> listar(){
        return pr.findAll();
    }

    public ResponseEntity <?> cadastrarAlterar(ProdutoModelo pm, String acao){
        if(pm.getName().equals("")){
            rm.setResposta("O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else if(pm.getMarca().equals("")){
            rm.setResposta("A marca do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }else{
            if(acao.equals("cadastrar")){
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.OK);
                
            }
        }
    }
    
    public ResponseEntity<RespostaModelo> remover(long codigo){
    pr.deleteById(codigo);
    rm.setResposta("O produto foi removido com sucesso!");
    return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}


