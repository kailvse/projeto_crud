// ProdutoServico.java - Adicionada validação e lógica para quantidade

package br.com.anm.projeto_crud.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.anm.projeto_crud.produtos.modelo.ProdutoModelo;
import br.com.anm.projeto_crud.produtos.modelo.RespostaModelo;
import br.com.anm.projeto_crud.produtos.repositorio.ProdutoRepositorio;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Random;

@Service
public class ProdutoServico {
    
    @Autowired
    private ProdutoRepositorio pr;

    @Autowired
    private RespostaModelo rm;

    private Random random = new Random();

    // Lista todos os produtos
    public Iterable<ProdutoModelo> listar(){
        return pr.findAll();
    }

    // Método para gerar um ID aleatório único de 5 dígitos
    private Integer gerarIdAleatorioUnico() {
        int tentativas = 0;
        int maxTentativas = 100; 
        while (tentativas < maxTentativas) {
            Integer novoId = 10000 + random.nextInt(90000);
            // TODO: Idealmente, criar um método findByIdAleatorio no repo.
            if (!pr.existsById(novoId.longValue())) { 
                return novoId;
            }
            tentativas++;
        }
        throw new RuntimeException("Não foi possível gerar um ID aleatório único após " + maxTentativas + " tentativas.");
    }

    // Método unificado para cadastrar ou alterar produtos
    @Transactional
    public ResponseEntity <?> cadastrarAlterar(ProdutoModelo pm, String acao){
        // Validações existentes
        if(pm.getNome() == null || pm.getNome().trim().isEmpty()){
            rm.setResposta("O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(pm.getMarca() == null || pm.getMarca().trim().isEmpty()){
            rm.setResposta("A marca do produto é obrigatória!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getPreco() == null) {
             rm.setResposta("O preço do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getPreco().compareTo(BigDecimal.ZERO) < 0) {
             rm.setResposta("O preço do produto não pode ser negativo!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getImageUrl() != null && pm.getImageUrl().trim().isEmpty()) {
             rm.setResposta("A URL da imagem não pode ser vazia se fornecida.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
        // Nova validação para Quantidade
        else if (pm.getQuantidade() == null) {
             rm.setResposta("A quantidade do produto é obrigatória!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getQuantidade() < 0) {
             rm.setResposta("A quantidade do produto não pode ser negativa!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
         else {
            if(acao.equals("cadastrar")){
                Integer idAleatorio = gerarIdAleatorioUnico();
                pm.setId(idAleatorio);
                pm.setCodigo(null);
                // Salva o novo produto (incluindo quantidade)
                ProdutoModelo novoProduto = pr.save(pm);
                return new ResponseEntity<ProdutoModelo>(novoProduto, HttpStatus.CREATED);
                
            } else { // Ação "alterar"
                if (pm.getCodigo() == null) {
                    rm.setResposta("Código do produto inválido para alteração.");
                    return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
                }
                Optional<ProdutoModelo> produtoExistenteOpt = pr.findById(pm.getCodigo());

                if (produtoExistenteOpt.isPresent()) {
                    ProdutoModelo produtoExistente = produtoExistenteOpt.get();
                    // Atualiza campos (incluindo quantidade)
                    produtoExistente.setNome(pm.getNome());
                    produtoExistente.setMarca(pm.getMarca());
                    produtoExistente.setPreco(pm.getPreco());
                    produtoExistente.setImageUrl(pm.getImageUrl());
                    produtoExistente.setQuantidade(pm.getQuantidade()); // Atualiza quantidade
                    
                    ProdutoModelo produtoAtualizado = pr.save(produtoExistente);
                    return new ResponseEntity<ProdutoModelo>(produtoAtualizado, HttpStatus.OK);
                } else {
                    rm.setResposta("Produto não encontrado para alteração com o código: " + pm.getCodigo());
                    return new ResponseEntity<RespostaModelo>(rm, HttpStatus.NOT_FOUND);
                }
            }
        }
    }

    // Remove um produto pelo código (Long)
    @Transactional
    public ResponseEntity<RespostaModelo> remover(long codigo){
        if (pr.existsById(codigo)) { 
            pr.deleteById(codigo);
            rm.setResposta("O produto foi removido com sucesso!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
        } else {
            rm.setResposta("Produto não encontrado com o código: " + codigo);
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.NOT_FOUND);
        }
    }
}

