// ProdutoServico.java final - Geração de ID aleatório de 5 dígitos com validação

package br.com.anm.projeto_crud.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.anm.projeto_crud.produtos.modelo.ProdutoModelo;
import br.com.anm.projeto_crud.produtos.modelo.RespostaModelo;
import br.com.anm.projeto_crud.produtos.repositorio.ProdutoRepositorio;

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
            if (!pr.existsById(novoId)) {
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
        // Validação dos campos Nome e Marca (conforme solicitado)
        if(pm.getNome() == null || pm.getNome().trim().isEmpty()){
            rm.setResposta("O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if(pm.getMarca() == null || pm.getMarca().trim().isEmpty()){
            rm.setResposta("A marca do produto é obrigatória!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if(acao.equals("cadastrar")){
                // 1. Gera um ID aleatório único de 5 dígitos. Se falhar, a exceção fará o rollback.
                Integer idAleatorio = gerarIdAleatorioUnico();
                pm.setId(idAleatorio);
                // 2. Limpa o código (chave primária da tabela).
                pm.setCodigo(null);
                // 3. Salva o novo produto.
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
                    // Atualiza apenas nome e marca (ID aleatório é imutável)
                    produtoExistente.setNome(pm.getNome());
                    produtoExistente.setMarca(pm.getMarca());
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

