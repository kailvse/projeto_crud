package br.com.produtos.crudprodutos.produtos.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.produtos.crudprodutos.produtos.modelo.ProdutoModelo;

@Repository
public interface ProductRepository extends CrudRepository<ProdutoModelo, Long> {

}