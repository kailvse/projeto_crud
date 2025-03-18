package br.com.produtos.crudprodutos.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.produtos.crudprodutos.produtos.modelo.ProdutoModelo;
import br.com.produtos.crudprodutos.produtos.servico.ProductService;

@RestController
public class ProductController {

  @Autowired
  private ProductService ps;

  @PostMapping("/cadastrar")
  public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo pm){
    return ps.cadastrar(pm);
  }

  @GetMapping("/listar")
  public Iterable<ProdutoModelo> listar(){
    return ps.listar();
  }

  @GetMapping("/")
  public String rota() {
    return "API esta funcionando!";
  }
}