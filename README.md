# Projeto CRUD de Produtos

## Descrição

Este é um projeto de aplicação web front-end que implementa um sistema CRUD (Create, Read, Update, Delete) para gerenciamento de produtos. Ele permite cadastrar, visualizar, editar e remover informações de produtos, como nome, marca, preço, quantidade e imagem.

## Funcionalidades

*   **Cadastro de Produtos:** Formulário para adicionar novos produtos com nome, marca, preço, quantidade e URL da imagem.
*   **Visualização de Produtos:** Exibição dos produtos cadastrados em formato de tabela e/ou cards.
*   **Edição de Produtos:** Possibilidade de alterar as informações de um produto existente.
*   **Remoção de Produtos:** Opção para excluir produtos do cadastro.
*   **Interface Responsiva (Básico):** A estrutura básica do projeto permite adaptações para diferentes tamanhos de tela.

## Tecnologias Utilizadas

*   **React:** Biblioteca JavaScript para construção de interfaces de usuário.
*   **Vite:** Ferramenta de build e desenvolvimento rápido para projetos web modernos.
*   **JavaScript (ES6+):** Linguagem de programação principal.
*   **CSS:** Para estilização da interface.
*   **HTML:** Estrutura da página web.

## Estrutura do Projeto (Frontend)

```
projeto_crud/
└── frontend/
    └── front/
        ├── public/           # Arquivos estáticos (imagens, etc.)
        ├── src/
        │   ├── assets/       # Recursos como SVGs
        │   ├── App.css       # Estilos principais da aplicação
        │   ├── App.jsx       # Componente principal da aplicação
        │   ├── CardProduto.css # Estilos para os cards de produto
        │   ├── CardProduto.jsx # Componente para exibir produto em card
        │   ├── Formulario.jsx # Componente do formulário de produto
        │   ├── index.css     # Estilos globais
        │   ├── main.jsx      # Ponto de entrada da aplicação React
        │   └── Tabela.jsx    # Componente para exibir produtos em tabela
        ├── .gitignore
        ├── index.html        # Arquivo HTML principal
        ├── package.json      # Dependências e scripts do Node.js
        ├── package-lock.json
        ├── README.md         # Este arquivo
        └── vite.config.js    # Configuração do Vite
```

## Configuração e Instalação

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório (ou descompacte o arquivo .zip):**
    ```bash
    # Se for um repositório git
    # git clone <url_do_repositorio>
    # cd <nome_do_projeto>/frontend/front

    # Se descompactou o zip, navegue até a pasta correta
    cd /caminho/para/projeto_crud/frontend/front
    ```

2.  **Instale as dependências:**
    Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    # yarn dev
    ```

4.  Abra o navegador e acesse o endereço fornecido (geralmente `http://localhost:5173` ou similar).

## Uso

Após iniciar a aplicação:

*   Utilize o formulário para cadastrar novos produtos.
*   Visualize os produtos cadastrados na tabela ou nos cards abaixo do formulário.
*   Clique nos botões "Alterar" ou "Remover" na tabela/cards para editar ou excluir um produto.
*   O botão "Cancelar" no formulário limpa os campos ou cancela a edição.

**Observação:** Este é um projeto focado no front-end. A persistência dos dados (salvar em um banco de dados) não está implementada nesta versão e dependeria de uma API backend para integração.

