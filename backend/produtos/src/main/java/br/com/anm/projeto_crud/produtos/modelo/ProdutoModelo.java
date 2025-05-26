// ProdutoModelo.java final - ID como Integer aleatório de 5 dígitos, com preco e imageUrl

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
    
    // Mantém o campo "codigo" como ID primário autoincrementado da tabela
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    // Campo "id" como Integer (5 dígitos), gerado manualmente no serviço
    // Mapeado para a coluna "id_aleatorio" no banco.
    @Column(name = "id_aleatorio", updatable = false, nullable = false, unique = true)
    private Integer id; // Tipo do campo agora é Integer

    private String nome;
    private String marca;

    // Novo campo para preço
    @Column(precision = 10, scale = 2) // Define precisão e escala para valores monetários
    private BigDecimal preco;

    // Novo campo para URL da imagem
    @Column(length = 2048) // Define um tamanho razoável para URL
    private String imageUrl;

    // Lombok cuidará dos getters e setters
    // O ID aleatório será gerado e definido no ProdutoServico antes de persistir.
    // O "updatable = false" garante que ele não será alterado em updates.
}

