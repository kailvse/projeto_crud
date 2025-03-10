package br.com.produtos.crudprodutos.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.produtos.crudprodutos.produtos.repositorio.ProductRepository;
import br.com.produtos.crudprodutos.produtos.modelo.ProdutoModelo;

@Service
public class ProductService {

    @Autowired
    private ProductRepository pr;

    public Iterable<ProdutoModelo> listar(){
        return pr.findAll();
    }

}