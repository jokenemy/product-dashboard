# **Product Dashboard API**

A API do **Product Dashboard** é uma API RESTful que permite o acesso e a manipulação dos módulos do sistema de gerenciamento.

Recursos disponíveis para acesso via API:

* [**Usuários**](https://www.google.com/search?q=%23group-recursos/group-usurios)  
* [**Categorias**](https://www.google.com/search?q=%23group-recursos/group-categorias)  
* [**Fornecedores**](https://www.google.com/search?q=%23group-recursos/group-fornecedores)  
* [**Clientes**](https://www.google.com/search?q=%23group-recursos/group-clientes)  
* [**Produtos**](https://www.google.com/search?q=%23group-recursos/group-produtos)  
* [**Pedidos**](https://www.google.com/search?q=%23group-recursos/group-pedidos)  
* [**Avaliações**](https://www.google.com/search?q=%23group-recursos/group-avaliaes)

## **URLs de Acesso**

A API não possui um ambiente de homologação (sandbox) separado. O desenvolvimento e os testes devem ser feitos em um ambiente local.

URL base para o ambiente de desenvolvimento: http://localhost:5000

## **Métodos**

As requisições para a API devem seguir os padrões RESTful:

| Método | Descrição |
| :---- | :---- |
| GET | Retorna informações de um ou mais registros. |
| POST | Utilizado para criar um novo registro. |
| PUT | Atualiza dados de um registro existente. |
| DELETE | Remove um registro do sistema. |

## **Respostas**

Os códigos de resposta HTTP indicam o sucesso ou falha da requisição:

| Código | Descrição |
| :---- | :---- |
| 200 | Requisição executada com sucesso (OK). |
| 201 | Recurso criado com sucesso (Created). |
| 400 | Requisição inválida (Bad Request). |
| 404 | Recurso não encontrado (Not Found). |
| 500 | Erro interno do servidor (Internal Server Error). |

## **Autenticação**

Atualmente, a API não requer autenticação, sendo os endpoints abertos para acesso em um ambiente de desenvolvimento. Para um ambiente de produção, é altamente recomendável implementar um sistema de autenticação, como OAuth2 ou JWT (JSON Web Tokens), para proteger os endpoints.

## **\<a id="group-recursos"\>\</a\>Recursos**

### **\<a id="group-recursos/group-usurios"\>\</a\>Usuários \[/usuarios\]**

Recurso para gerenciar os usuários do sistema.

#### **Listar \[GET /usuarios\]**

Retorna uma lista de todos os usuários cadastrados.

* Response 200 (application/json)  
  \[  
    {  
      "id": 1,  
      "nome": "João da Silva",  
      "idade": 30,  
      "salario": 5000.50  
    },  
    {  
      "id": 2,  
      "nome": "Maria Oliveira",  
      "idade": 25,  
      "salario": 4200.00  
    }  
  \]

#### **Novo \[POST /usuarios\]**

Cria um novo usuário.

* Attributes (object)  
  * nome (string, required) \- Nome do usuário.  
  * idade (integer, required) \- Idade do usuário.  
  * salario (float, required) \- Salário do usuário.  
* Request (application/json)  
  * Body  
    {  
      "nome": "Carlos Pereira",  
      "idade": 42,  
      "salario": 7500.00  
    }

* Response 201 (application/json)  
  * Body  
    {  
      "id": 3,  
      "nome": "Carlos Pereira",  
      "idade": 42,  
      "salario": 7500.00  
    }

#### **Detalhar \[GET /usuarios/{id}\]**

Busca um usuário específico pelo seu id.

* Parameters  
  * id (required, number, 1\) \- ID do usuário.  
* Response 200 (application/json)  
  * Body  
    {  
      "id": 1,  
      "nome": "João da Silva",  
      "idade": 30,  
      "salario": 5000.50  
    }

#### **Editar \[PUT /usuarios/{id}\]**

Atualiza os dados de um usuário existente.

* Parameters  
  * id (required, number, 1\) \- ID do usuário.  
* Request (application/json)  
  * Body  
    {  
      "nome": "João da Silva Junior",  
      "idade": 31,  
      "salario": 5500.75  
    }

* Response 200 (application/json)  
  * Body  
    {  
      "id": 1,  
      "nome": "João da Silva Junior",  
      "idade": 31,  
      "salario": 5500.75  
    }

#### **Remover \[DELETE /usuarios/{id}\]**

Exclui um usuário do sistema.

* Parameters  
  * id (required, number, 1\) \- ID do usuário.  
* Response 200 (application/json)  
  * Body  
    {  
      "id": 1,  
      "nome": "João da Silva Junior",  
      "idade": 31,  
      "salario": 5500.75  
    }

### **\<a id="group-recursos/group-categorias"\>\</a\>Categorias \[/categorias\]**

Recurso para gerenciar as categorias de produtos.

#### **Listar \[GET /categorias\]**

* Response 200 (application/json)  
  \[  
    {  
      "id": 1,  
      "nome": "Camisetas",  
      "tamanho": "P-M-G",  
      "sexo": "Unissex"  
    },  
    {  
      "id": 2,  
      "nome": "Calças",  
      "tamanho": "38-40-42",  
      "sexo": "Masculino"  
    }  
  \]

#### **Novo \[POST /categorias\]**

* Attributes (object)  
  * nome (string, required) \- Nome da categoria.  
  * tamanho (string, required) \- Tamanhos disponíveis (ex: "P, M, G").  
  * sexo (string, required) \- Gênero associado à categoria.  
* Request (application/json)  
  * Body  
    {  
      "nome": "Acessórios",  
      "tamanho": "Único",  
      "sexo": "Unissex"  
    }

* Response 201 (application/json)  
  * Body  
    {  
      "id": 3,  
      "nome": "Acessórios",  
      "tamanho": "Único",  
      "sexo": "Unissex"  
    }

#### **Detalhar \[GET /categorias/{id}\]**

* Parameters  
  * id (required, number, 1\) \- ID da categoria.  
* Response 200 (application/json)  
  * Body  
    {  
      "id": 1,  
      "nome": "Camisetas",  
      "tamanho": "P-M-G",  
      "sexo": "Unissex"  
    }

#### **Editar \[PUT /categorias/{id}\]**

* Parameters  
  * id (required, number, 1\) \- ID da categoria.  
* Request (application/json)  
  * Body  
    {  
      "nome": "Camisetas de Algodão",  
      "tamanho": "P-M-G-GG",  
      "sexo": "Unissex"  
    }

* Response 200 (application/json)  
  * Body  
    {  
      "id": 1,  
      "nome": "Camisetas de Algodão",  
      "tamanho": "P-M-G-GG",  
      "sexo": "Unissex"  
    }

#### **Remover \[DELETE /categorias/{id}\]**

* Parameters  
  * id (required, number, 1\) \- ID da categoria.  
* Response 200 (application/json)  
  * Body  
    {  
      "id": 1,  
      "nome": "Camisetas de Algodão",  
      "tamanho": "P-M-G-GG",  
      "sexo": "Unissex"  
    }

### **\<a id="group-recursos/group-fornecedores"\>\</a\>Fornecedores \[/fornecedores\]**

Recurso para gerenciar os fornecedores de produtos.

#### **Listar \[GET /fornecedores\]**

* Response 200 (application/json)  
  \[  
    {  
      "id": 1,  
      "nome": "Fornecedor Têxtil S.A.",  
      "email": "contato@textilsa.com",  
      "contato": "51999998888"  
    }  
  \]

#### **Novo \[POST /fornecedores\]**

* Attributes (object)  
  * nome (string, required) \- Nome do fornecedor.  
  * email (string, required) \- E-mail do fornecedor (deve ser único).  
  * contato (string, required) \- Telefone ou forma de contato.  
* Request (application/json)  
  * Body  
    {  
      "nome": "Malharia do Sul Ltda.",  
      "email": "vendas@malhariasul.com.br",  
      "contato": "4833334444"  
    }

* Response 201 (application/json)  
  * Body  
    {  
      "id": 2,  
      "nome": "Malharia do Sul Ltda.",  
      "email": "vendas@malhariasul.com.br",  
      "contato": "4833334444"  
    }

### **\<a id="group-recursos/group-clientes"\>\</a\>Clientes \[/clientes\]**

Recurso para gerenciar os clientes da loja.

#### **Listar \[GET /clientes\]**

* Response 200 (application/json)  
  \[  
    {  
      "id": 1,  
      "nome": "Ana Costa",  
      "idade": 28,  
      "sexo": "Feminino",  
      "email": "ana.costa@example.com",  
      "contato": "11988887777"  
    }  
  \]

#### **Novo \[POST /clientes\]**

* Attributes (object)  
  * nome (string, required) \- Nome do cliente.  
  * idade (integer, required) \- Idade do cliente.  
  * sexo (string, required) \- Gênero do cliente.  
  * email (string, required) \- E-mail do cliente (deve ser único).  
  * contato (string, required) \- Telefone de contato.  
* Request (application/json)  
  * Body  
    {  
      "nome": "Bruno Lima",  
      "idade": 35,  
      "sexo": "Masculino",  
      "email": "bruno.lima@example.com",  
      "contato": "21977776666"  
    }

* Response 201 (application/json)  
  * Body  
    {  
      "id": 2,  
      "nome": "Bruno Lima",  
      "idade": 35,  
      "sexo": "Masculino",  
      "email": "bruno.lima@example.com",  
      "contato": "21977776666"  
    }

### **\<a id="group-recursos/group-produtos"\>\</a\>Produtos \[/produtos\]**

Recurso para gerenciar os produtos.

#### **Listar \[GET /produtos\]**

* Response 200 (application/json)  
  \[  
    {  
      "id": 1,  
      "nome": "Camisa Polo Vermelha",  
      "descricao": "Camisa de algodão piquet.",  
      "preco": 129.90,  
      "estoque": 50,  
      "imagemUrl": "\[http://example.com/imagem.png\](http://example.com/imagem.png)",  
      "categoriaId": 1,  
      "fornecedorId": 1,  
      "categoria": {  
        "id": 1,  
        "nome": "Camisetas",  
        "tamanho": "P-M-G",  
        "sexo": "Unissex"  
      },  
      "fornecedor": {  
        "id": 1,  
        "nome": "Fornecedor Têxtil S.A.",  
        "email": "contato@textilsa.com",  
        "contato": "51999998888"  
      }  
    }  
  \]

#### **Novo \[POST /produtos\]**

* Attributes (object)  
  * nome (string, required) \- Nome do produto.  
  * descricao (string, required) \- Descrição detalhada do produto.  
  * preco (float, required) \- Preço de venda.  
  * estoque (integer, required) \- Quantidade em estoque.  
  * imagemUrl (string, optional) \- URL da imagem do produto.  
  * categoriaId (integer, required) \- ID da categoria.  
  * fornecedorId (integer, required) \- ID do fornecedor.  
* Request (application/json)  
  * Body  
    {  
      "nome": "Calça Jeans Skinny",  
      "descricao": "Calça jeans com elastano.",  
      "preco": 199.90,  
      "estoque": 100,  
      "imagemUrl": "\[http://example.com/imagem2.png\](http://example.com/imagem2.png)",  
      "categoriaId": 2,  
      "fornecedorId": 2  
    }

* Response 201 (application/json)  
  * Body  
    {  
      "id": 2,  
      "nome": "Calça Jeans Skinny",  
      "descricao": "Calça jeans com elastano.",  
      "preco": 199.90,  
      "estoque": 100,  
      "imagemUrl": "\[http://example.com/imagem2.png\](http://example.com/imagem2.png)",  
      "categoriaId": 2,  
      "fornecedorId": 2  
    }

### **\<a id="group-recursos/group-pedidos"\>\</a\>Pedidos \[/pedidos\]**

Recurso para gerenciar os pedidos (ordens de compra).

#### **Listar \[GET /pedidos\]**

* Response 200 (application/json)  
  \[  
    {  
      "id": 1,  
      "data": "2025-09-25T18:30:00.000Z",  
      "total": 259.80,  
      "clienteId": 1,  
      "cliente": {  
        "id": 1,  
        "nome": "Ana Costa",  
        "email": "ana.costa@example.com"  
      },  
      "items": \[  
        {  
          "id": 1,  
          "quantidade": 2,  
          "preco": 129.90,  
          "orderId": 1,  
          "produtoId": 1,  
          "produto": {  
            "id": 1,  
            "nome": "Camisa Polo Vermelha"  
          }  
        }  
      \]  
    }  
  \]

#### **Novo \[POST /pedidos\]**

* Attributes (object)  
  * clienteId (integer, required) \- ID do cliente.  
  * total (float, required) \- Valor total do pedido.  
  * items (array, required) \- Lista de itens do pedido.  
    * produtoId (integer, required) \- ID do produto.  
    * quantidade (integer, required) \- Quantidade do produto.  
    * preco (float, required) \- Preço unitário do produto no momento da compra.  
* Request (application/json)  
  * Body  
    {  
      "clienteId": 2,  
      "total": 199.90,  
      "items": \[  
        {  
          "produtoId": 2,  
          "quantidade": 1,  
          "preco": 199.90  
        }  
      \]  
    }

* Response 201 (application/json)  
  * Body  
    {  
      "id": 2,  
      "data": "2025-09-25T19:00:00.000Z",  
      "total": 199.90,  
      "clienteId": 2,  
      "items": \[  
          {  
              "id": 2,  
              "quantidade": 1,  
              "preco": 199.90,  
              "orderId": 2,  
              "produtoId": 2  
          }  
      \]  
    }

### **\<a id="group-recursos/group-avaliaes"\>\</a\>Avaliações \[/avaliacoes\]**

Recurso para gerenciar as avaliações dos produtos.

#### **Listar \[GET /avaliacoes\]**

* Response 200 (application/json)  
  \[  
    {  
      "id": 1,  
      "nota": 5,  
      "comentario": "Produto de excelente qualidade\!",  
      "produtoId": 1,  
      "clienteId": 1,  
      "produto": {  
        "id": 1,  
        "nome": "Camisa Polo Vermelha"  
      },  
      "cliente": {  
        "id": 1,  
        "nome": "Ana Costa"  
      }  
    }  
  \]

#### **Novo \[POST /avaliacoes\]**

* Attributes (object)  
  * nota (integer, required) \- Nota da avaliação (de 1 a 5).  
  * comentario (string, required) \- Comentário da avaliação.  
  * produtoId (integer, required) \- ID do produto avaliado.  
  * clienteId (integer, required) \- ID do cliente que avaliou.  
* Request (application/json)  
  * Body  
    {  
      "nota": 4,  
      "comentario": "Bom caimento, mas a cor é um pouco diferente da foto.",  
      "produtoId": 2,  
      "clienteId": 2  
    }

* Response 201 (application/json)  
  * Body  
    {  
      "id": 2,  
      "nota": 4,  
      "comentario": "Bom caimento, mas a cor é um pouco diferente da foto.",  
      "produtoId": 2,  
      "clienteId": 2  
    }  
