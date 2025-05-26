// ProdutoModelo.java - Adicionado campo quantidade

package br.com.anm.projeto_crud.produtos.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "produtos")
public class ProdutoModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @Column(name = "id_aleatorio", updatable = false, nullable = false, unique = true)
    private Integer id;

    private String nome;
    private String marca;

    @Column(precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(length = 2048)
    private String imageUrl;

    // Novo campo para quantidade
    @Column(nullable = false) // Quantidade não pode ser nula
    private Integer quantidade;

}

