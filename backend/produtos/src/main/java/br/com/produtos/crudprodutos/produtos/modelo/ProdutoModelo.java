package br.com.produtos.crudprodutos.produtos.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "produtos")
@Getter
@Setter
public class ProdutoModelo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long code;
  private String name;
  private String marca;
}