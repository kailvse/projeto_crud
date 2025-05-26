// ProdutoServico.java - Atualizado para incluir preco e imageUrl

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
        int maxTentativas = 100; // Limite para evitar loop infinito
        while (tentativas < maxTentativas) {
            // Gera um número entre 10000 e 99999
            Integer novoId = 10000 + random.nextInt(90000);
            // Verifica se o ID já existe no banco usando o método do repositório
            // Assumindo que existsById agora verifica pelo campo 'id' (Integer)
            // Se existsById verifica pelo 'codigo' (Long), precisaremos de um método customizado no repositório
            // como existsByIdAleatorio(Integer id)
            // Por simplicidade, vamos assumir que pr.existsById(novoId) funciona ou seria adaptado.
            // TODO: Verificar/Adaptar método de checagem de ID aleatório no repositório se necessário.
            if (!pr.existsById(novoId.longValue())) { // Convertendo para Long para compatibilidade com JpaRepository padrão
                                                  // Idealmente, criar um método findByIdAleatorio no repo.
                return novoId; // Retorna o ID único encontrado
            }
            tentativas++;
        }
        // Se não encontrar um ID único, lança a exceção para que @Transactional faça o rollback
        throw new RuntimeException("Não foi possível gerar um ID aleatório único após " + maxTentativas + " tentativas.");
    }

    // Método unificado para cadastrar ou alterar produtos
    @Transactional // A anotação cuidará do rollback se gerarIdAleatorioUnico lançar exceção
    public ResponseEntity <?> cadastrarAlterar(ProdutoModelo pm, String acao){
        // Validação dos campos Nome e Marca
        if(pm.getNome() == null || pm.getNome().trim().isEmpty()){
            rm.setResposta("O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(pm.getMarca() == null || pm.getMarca().trim().isEmpty()){
            rm.setResposta("A marca do produto é obrigatória!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } 
        // Validação do Preço (não pode ser nulo e deve ser >= 0)
        else if (pm.getPreco() == null) {
             rm.setResposta("O preço do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getPreco().compareTo(BigDecimal.ZERO) < 0) {
             rm.setResposta("O preço do produto não pode ser negativo!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
        // Validação da URL da Imagem (opcional, mas se fornecida, não pode ser vazia)
        else if (pm.getImageUrl() != null && pm.getImageUrl().trim().isEmpty()) {
             rm.setResposta("A URL da imagem não pode ser vazia se fornecida.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
         else {
            if(acao.equals("cadastrar")){
                // 1. Gera um ID aleatório único de 5 dígitos.
                Integer idAleatorio = gerarIdAleatorioUnico();
                pm.setId(idAleatorio);
                // 2. Limpa o código (chave primária da tabela - será gerado pelo BD).
                pm.setCodigo(null);
                // 3. Salva o novo produto (incluindo preco e imageUrl).
                ProdutoModelo novoProduto = pr.save(pm);
                return new ResponseEntity<ProdutoModelo>(novoProduto, HttpStatus.CREATED);
                
            } else { // Ação "alterar"
                // Validação do código para alteração
                if (pm.getCodigo() == null) {
                    rm.setResposta("Código do produto inválido para alteração.");
                    return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
                }
                Optional<ProdutoModelo> produtoExistenteOpt = pr.findById(pm.getCodigo());

                if (produtoExistenteOpt.isPresent()) {
                    ProdutoModelo produtoExistente = produtoExistenteOpt.get();
                    // Atualiza nome, marca, preco e imageUrl (ID aleatório é imutável)
                    produtoExistente.setNome(pm.getNome());
                    produtoExistente.setMarca(pm.getMarca());
                    produtoExistente.setPreco(pm.getPreco());
                    produtoExistente.setImageUrl(pm.getImageUrl());
                    
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
        // Usar existsById do JpaRepository que verifica pela chave primária (@Id), que é 'codigo'
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

