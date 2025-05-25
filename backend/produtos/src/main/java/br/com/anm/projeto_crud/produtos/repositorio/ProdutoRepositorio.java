// ProdutoRepositorio.java final - Adicionado método para verificar existência por ID aleatório (Integer)

package br.com.anm.projeto_crud.produtos.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.anm.projeto_crud.produtos.modelo.ProdutoModelo;

@Repository
public interface ProdutoRepositorio extends CrudRepository<ProdutoModelo, Long>{
    
    // Método para verificar se um produto com o ID aleatório (Integer) específico já existe
    // Spring Data JPA infere a query pelo nome do método
    boolean existsById(Integer id);

}

