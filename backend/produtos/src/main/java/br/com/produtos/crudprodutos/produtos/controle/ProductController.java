package br.com.produtos.crudprodutos.produtos.controle;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

  @GetMapping("/")
  public String route() {
    return "API esta funcionando!";
  }
}