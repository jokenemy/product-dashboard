**Product** **Dashboard** **API**

A API do **Product** **Dashboard** é uma API RESTful que permite o
acesso e a manipulação dos módulos do sistema de gerenciamento.

Recursos disponíveis para acesso via API:

> ●
> [**<u>Usuários</u>**](https://www.google.com/search?q=%23group-recursos/group-usurios)
>
> ●
> [**<u>Categorias</u>**](https://www.google.com/search?q=%23group-recursos/group-categorias)
>
> ●
> [**<u>Fornecedores</u>**](https://www.google.com/search?q=%23group-recursos/group-fornecedores)
> ●
> [**<u>Clientes</u>**](https://www.google.com/search?q=%23group-recursos/group-clientes)
>
> ●
> [**<u>Produtos</u>**](https://www.google.com/search?q=%23group-recursos/group-produtos)
> ●
> [**<u>Pedidos</u>**](https://www.google.com/search?q=%23group-recursos/group-pedidos)
>
> ●
> [**<u>Avaliações</u>**](https://www.google.com/search?q=%23group-recursos/group-avaliaes)

**URLs** **de** **Acesso**

A API não possui um ambiente de homologação (sandbox) separado. O
desenvolvimento e os testes devem ser feitos em um ambiente local.

URL base para o ambiente de desenvolvimento: http://localhost:5000

**Métodos**

As requisições para a API devem seguir os padrões RESTful:

||
||
||
||
||
||
||

**Respostas**

Os códigos de resposta HTTP indicam o sucesso ou falha da requisição:

||
||
||

||
||
||
||
||
||

**Limites** **(Throttling)**

Atualmente, não há um limite de requisições por minuto implementado.
Para ambientes de produção, a implementação de um rate limit é
recomendada.

As ações de listar retornam todos os registros de uma vez, pois não há
paginação implementada.

**Group** **Autenticação**

Atualmente, a API não requer autenticação, sendo os endpoints abertos
para acesso em um ambiente de desenvolvimento. Para um ambiente de
produção, é altamente recomendável implementar um sistema de
autenticação, como OAuth2 ou JWT (JSON Web Tokens), para proteger os
endpoints.

**Group** **Recursos** **Group** **Usuários** **\[/usuarios\]** Recurso
para gerenciar os usuários do sistema.

**Listar** **(List)** **\[GET** **/usuarios\]**

Retorna uma lista de todos os usuários cadastrados.

> ● Request (application/json)
>
> ● Response 200 (application/json) \[
>
> {
>
> "id": 1,
>
> "nome": "João da Silva", "idade": 30,
>
> "salario": 5000.50
>
> }, {
>
> "id": 2,
>
> "nome": "Maria Oliveira", "idade": 25,
>
> "salario": 4200.00 }
>
> \]

**Novo** **(Create)** **\[POST** **/usuarios\]**

Cria um novo usuário.

> ● Attributes (object)
>
> ○ nome (string, required) - Nome do usuário. ○ idade (integer,
> required) - Idade do usuário. ○ salario (float, required) - Salário do
> usuário.
>
> ● Request (application/json) ○ Body
>
> {
>
> "nome": "Carlos Pereira", "idade": 42,
>
> "salario": 7500.00 }
>
> ● Response 201 (application/json) ○ Body
>
> {
>
> "id": 3,
>
> "nome": "Carlos Pereira", "idade": 42,
>
> "salario": 7500.00 }

**Detalhar** **(Read)** **\[GET** **/usuarios/{id}\]**

Busca um usuário específico pelo seu id.

> ● Parameters
>
> ○ id (required, number, 1) ... ID do usuário. ● Request
> (application/json)
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1,
>
> "nome": "João da Silva", "idade": 30,
>
> "salario": 5000.50 }

**Editar** **(Update)** **\[PUT** **/usuarios/{id}\]**

Atualiza os dados de um usuário existente.

> ● Parameters
>
> ○ id (required, number, 1) ... ID do usuário. ● Request
> (application/json)
>
> ○ Body {
>
> "nome": "João da Silva Junior", "idade": 31,
>
> "salario": 5500.75 }
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1,
>
> "nome": "João da Silva Junior", "idade": 31,
>
> "salario": 5500.75 }

**Remover** **(Delete)** **\[DELETE** **/usuarios/{id}\]**

Exclui um usuário do sistema.

> ● Parameters
>
> ○ id (required, number, 1) ... ID do usuário. ● Request
> (application/json)
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1,
>
> "nome": "João da Silva Junior", "idade": 31,
>
> "salario": 5500.75 }

**Group** **Categorias** **\[/categorias\]** Recurso para gerenciar as
categorias de produtos.

**Listar** **(List)** **\[GET** **/categorias\]**

> ● Request (application/json)
>
> ● Response 200 (application/json) \[
>
> {
>
> "id": 1,
>
> "nome": "Camisetas", "tamanho": "P-M-G", "sexo": "Unissex"
>
> }, {
>
> "id": 2,
>
> "nome": "Calças", "tamanho": "38-40-42", "sexo": "Masculino"
>
> } \]

**Novo** **(Create)** **\[POST** **/categorias\]**

> ● Attributes (object)
>
> ○ nome (string, required) - Nome da categoria.
>
> ○ tamanho (string, required) - Tamanhos disponíveis (ex: "P, M, G"). ○
> sexo (string, required) - Gênero associado à categoria.
>
> ● Request (application/json) ○ Body
>
> {
>
> "nome": "Acessórios", "tamanho": "Único", "sexo": "Unissex"
>
> }
>
> ● Response 201 (application/json) ○ Body
>
> {
>
> "id": 3,
>
> "nome": "Acessórios",
>
> "tamanho": "Único", "sexo": "Unissex"
>
> }

**Detalhar** **(Read)** **\[GET** **/categorias/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID da categoria. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1,
>
> "nome": "Camisetas", "tamanho": "P-M-G", "sexo": "Unissex"
>
> }

**Editar** **(Update)** **\[PUT** **/categorias/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID da categoria. ● Request
> (application/json)
>
> ○ Body {
>
> "nome": "Camisetas de Algodão", "tamanho": "P-M-G-GG",
>
> "sexo": "Unissex" }
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1,
>
> "nome": "Camisetas de Algodão", "tamanho": "P-M-G-GG",
>
> "sexo": "Unissex" }

**Remover** **(Delete)** **\[DELETE** **/categorias/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID da categoria.
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1,
>
> "nome": "Camisetas de Algodão", "tamanho": "P-M-G-GG",
>
> "sexo": "Unissex" }

**Group** **Fornecedores** **\[/fornecedores\]** Recurso para gerenciar
os fornecedores de produtos.

**Listar** **(List)** **\[GET** **/fornecedores\]**

> ● Request (application/json)
>
> ● Response 200 (application/json) \[
>
> {
>
> "id": 1,
>
> "nome": "Fornecedor Têxtil S.A.", "email": "contato@textilsa.com",
> "contato": "51999998888"
>
> } \]

**Novo** **(Create)** **\[POST** **/fornecedores\]**

> ● Attributes (object)
>
> ○ nome (string, required) - Nome do fornecedor.
>
> ○ email (string, required) - E-mail do fornecedor (deve ser único). ○
> contato (string, required) - Telefone ou forma de contato.
>
> ● Request (application/json) ○ Body
>
> {
>
> "nome": "Malharia do Sul Ltda.", "email": "vendas@malhariasul.com.br",
> "contato": "4833334444"
>
> }
>
> ● Response 201 (application/json) ○ Body
>
> {
>
> "id": 2,
>
> "nome": "Malharia do Sul Ltda.", "email": "vendas@malhariasul.com.br",
> "contato": "4833334444"
>
> }

**Detalhar** **(Read)** **\[GET** **/fornecedores/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do fornecedor. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1,
>
> "nome": "Fornecedor Têxtil S.A.", "email": "contato@textilsa.com",
> "contato": "51999998888"
>
> }

**Editar** **(Update)** **\[PUT** **/fornecedores/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do fornecedor. ● Request
> (application/json)
>
> ○ Body {
>
> "nome": "Fornecedor Têxtil S.A.", "email": "comercial@textilsa.com",
> "contato": "51999998877"
>
> }
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1,
>
> "nome": "Fornecedor Têxtil S.A.", "email": "comercial@textilsa.com",
> "contato": "51999998877"
>
> }

**Remover** **(Delete)** **\[DELETE** **/fornecedores/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do fornecedor. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1,
>
> "nome": "Fornecedor Têxtil S.A.", "email": "comercial@textilsa.com",
> "contato": "51999998877"
>
> }

**Group** **Clientes** **\[/clientes\]** Recurso para gerenciar os
clientes da loja.

**Listar** **(List)** **\[GET** **/clientes\]**

> ● Request (application/json)
>
> ● Response 200 (application/json) \[
>
> {
>
> "id": 1,
>
> "nome": "Ana Costa", "idade": 28,
>
> "sexo": "Feminino",
>
> "email": "ana.costa@example.com", "contato": "11988887777"
>
> } \]

**Novo** **(Create)** **\[POST** **/clientes\]**

> ● Attributes (object)
>
> ○ nome (string, required) - Nome do cliente. ○ idade (integer,
> required) - Idade do cliente. ○ sexo (string, required) - Gênero do
> cliente.
>
> ○ email (string, required) - E-mail do cliente (deve ser único). ○
> contato (string, required) - Telefone de contato.
>
> ● Request (application/json) ○ Body
>
> {
>
> "nome": "Bruno Lima", "idade": 35,
>
> "sexo": "Masculino",
>
> "email": "bruno.lima@example.com", "contato": "21977776666"
>
> }
>
> ● Response 201 (application/json) ○ Body
>
> {
>
> "id": 2,
>
> "nome": "Bruno Lima", "idade": 35,
>
> "sexo": "Masculino",
>
> "email": "bruno.lima@example.com", "contato": "21977776666"
>
> }

**Detalhar** **(Read)** **\[GET** **/clientes/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do cliente. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1,
>
> "nome": "Ana Costa", "idade": 28,
>
> "sexo": "Feminino",
>
> "email": "ana.costa@example.com", "contato": "11988887777"
>
> }

**Editar** **(Update)** **\[PUT** **/clientes/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do cliente. ● Request
> (application/json)
>
> ○ Body {
>
> "nome": "Ana Costa Silva", "idade": 29,
>
> "sexo": "Feminino",
>
> "email": "ana.costa@example.com", "contato": "11988887777"
>
> }
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1,
>
> "nome": "Ana Costa Silva", "idade": 29,
>
> "sexo": "Feminino",
>
> "email": "ana.costa@example.com", "contato": "11988887777"
>
> }

**Remover** **(Delete)** **\[DELETE** **/clientes/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do cliente. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1,
>
> "nome": "Ana Costa Silva", "idade": 29,
>
> "sexo": "Feminino",
>
> "email": "ana.costa@example.com", "contato": "11988887777"
>
> }

**Group** **Produtos** **\[/produtos\]** Recurso para gerenciar os
produtos.

**Listar** **(List)** **\[GET** **/produtos\]**

> ● Request (application/json)
>
> ● Response 200 (application/json) \[
>
> {
>
> "id": 1,
>
> "nome": "Camisa Polo Vermelha", "descricao": "Camisa de algodão
> piquet.", "preco": 129.90,
>
> "estoque": 50,
>
> "categoriaId": 1, "fornecedorId": 1, "categoria": {
>
> "id": 1,
>
> "nome": "Camisetas", "tamanho": "P-M-G", "sexo": "Unissex"
>
> }, "fornecedor": {
>
> "id": 1,
>
> "nome": "Fornecedor Têxtil S.A.", "email": "contato@textilsa.com",
> "contato": "51999998888"
>
> } }
>
> \]

**Novo** **(Create)** **\[POST** **/produtos\]**

> ● Attributes (object)
>
> ○ nome (string, required) - Nome do produto.
>
> ○ descricao (string, required) - Descrição detalhada do produto. ○
> preco (float, required) - Preço de venda.
>
> ○ estoque (integer, required) - Quantidade em estoque. ○ categoriaId
> (integer, required) - ID da categoria.
>
> ○ fornecedorId (integer, required) - ID do fornecedor. ● Request
> (application/json)
>
> ○ Body {
>
> "nome": "Calça Jeans Skinny", "descricao": "Calça jeans com
> elastano.", "preco": 199.90,
>
> "estoque": 100, "categoriaId": 2, "fornecedorId": 2
>
> }
>
> ● Response 201 (application/json) ○ Body
>
> {
>
> "id": 2,
>
> "nome": "Calça Jeans Skinny", "descricao": "Calça jeans com
> elastano.",
>
> "preco": 199.90, "estoque": 100, "categoriaId": 2, "fornecedorId": 2
>
> }

**Detalhar** **(Read)** **\[GET** **/produtos/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do produto. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1,
>
> "nome": "Camisa Polo Vermelha", "descricao": "Camisa de algodão
> piquet.", "preco": 129.90,
>
> "estoque": 50, "categoriaId": 1, "fornecedorId": 1, "categoria": {
>
> "id": 1,
>
> "nome": "Camisetas", "tamanho": "P-M-G", "sexo": "Unissex"
>
> }, "fornecedor": {
>
> "id": 1,
>
> "nome": "Fornecedor Têxtil S.A.", "email": "contato@textilsa.com",
> "contato": "51999998888"
>
> } }

**Editar** **(Update)** **\[PUT** **/produtos/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do produto. ● Request
> (application/json)
>
> ○ Body {
>
> "nome": "Camisa Polo Azul",
>
> "descricao": "Camisa de algodão piquet, cor azul.",
>
> "preco": 139.90, "estoque": 45, "categoriaId": 1, "fornecedorId": 1
>
> }
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1,
>
> "nome": "Camisa Polo Azul",
>
> "descricao": "Camisa de algodão piquet, cor azul.", "preco": 139.90,
>
> "estoque": 45, "categoriaId": 1, "fornecedorId": 1
>
> }

**Remover** **(Delete)** **\[DELETE** **/produtos/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do produto. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1,
>
> "nome": "Camisa Polo Azul",
>
> "descricao": "Camisa de algodão piquet, cor azul.", "preco": 139.90,
>
> "estoque": 45, "categoriaId": 1, "fornecedorId": 1
>
> }

**Group** **Pedidos** **\[/pedidos\]**

Recurso para gerenciar os pedidos (ordens de compra).

**Listar** **(List)** **\[GET** **/pedidos\]**

> ● Request (application/json)
>
> ● Response 200 (application/json) \[
>
> {
>
> "id": 1,
>
> "data": "2025-09-18T18:30:00.000Z", "quantidade": 2,
>
> "total": 259.80, "produtoId": 1, "clienteId": 1, "produto": {
>
> "id": 1,
>
> "nome": "Camisa Polo Vermelha", "descricao": "Camisa de algodão
> piquet.", "preco": 129.90,
>
> "estoque": 50 },
>
> "cliente": { "id": 1,
>
> "nome": "Ana Costa",
>
> "email": "ana.costa@example.com" }
>
> } \]

**Novo** **(Create)** **\[POST** **/pedidos\]**

> ● Attributes (object)
>
> ○ quantidade (integer, required) - Quantidade de itens do produto. ○
> total (float, required) - Valor total do pedido.
>
> ○ produtoId (integer, required) - ID do produto. ○ clienteId (integer,
> required) - ID do cliente.
>
> ● Request (application/json) ○ Body
>
> {
>
> "quantidade": 1, "total": 199.90, "produtoId": 2, "clienteId": 2
>
> }
>
> ● Response 201 (application/json) ○ Body
>
> {
>
> "id": 2,
>
> "data": "2025-09-18T19:00:00.000Z",
>
> "quantidade": 1, "total": 199.90, "produtoId": 2, "clienteId": 2
>
> }

**Detalhar** **(Read)** **\[GET** **/pedidos/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do pedido. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1,
>
> "data": "2025-09-18T18:30:00.000Z", "quantidade": 2,
>
> "total": 259.80, "produtoId": 1, "clienteId": 1,
>
> "produto": { "id": 1, "nome": "Camisa Polo Vermelha" }, "cliente": {
> "id": 1, "nome": "Ana Costa" }
>
> }

**Editar** **(Update)** **\[PUT** **/pedidos/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do pedido. ● Request
> (application/json)
>
> ○ Body {
>
> "quantidade": 3, "total": 389.70, "produtoId": 1, "clienteId": 1
>
> }
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1,
>
> "data": "2025-09-18T18:30:00.000Z", "quantidade": 3,
>
> "total": 389.70,
>
> "produtoId": 1, "clienteId": 1
>
> }

**Remover** **(Delete)** **\[DELETE** **/pedidos/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID do pedido. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1,
>
> "data": "2025-09-18T18:30:00.000Z", "quantidade": 3,
>
> "total": 389.70, "produtoId": 1, "clienteId": 1
>
> }

**Group** **Avaliações** **\[/avaliacoes\]** Recurso para gerenciar as
avaliações dos produtos.

**Listar** **(List)** **\[GET** **/avaliacoes\]**

> ● Request (application/json)
>
> ● Response 200 (application/json) \[
>
> {
>
> "id": 1, "nota": 5,
>
> "comentario": "Produto de excelente qualidade!", "produtoId": 1,
>
> "clienteId": 1,
>
> "produto": { "id": 1, "nome": "Camisa Polo Vermelha" }, "cliente": {
> "id": 1, "nome": "Ana Costa" }
>
> } \]

**Novo** **(Create)** **\[POST** **/avaliacoes\]**

> ● Attributes (object)
>
> ○ nota (integer, required) - Nota da avaliação (de 1 a 5).
>
> ○ comentario (string, required) - Comentário da avaliação. ○ produtoId
> (integer, required) - ID do produto avaliado.
>
> ○ clienteId (integer, required) - ID do cliente que avaliou. ● Request
> (application/json)
>
> ○ Body {
>
> "nota": 4,
>
> "comentario": "Bom caimento, mas a cor é um pouco diferente da foto.",
> "produtoId": 2,
>
> "clienteId": 2 }
>
> ● Response 201 (application/json) ○ Body
>
> {
>
> "id": 2, "nota": 4,
>
> "comentario": "Bom caimento, mas a cor é um pouco diferente da foto.",
> "produtoId": 2,
>
> "clienteId": 2 }

**Detalhar** **(Read)** **\[GET** **/avaliacoes/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID da avaliação. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1, "nota": 5,
>
> "comentario": "Produto de excelente qualidade!", "produtoId": 1,
>
> "clienteId": 1 }

**Editar** **(Update)** **\[PUT** **/avaliacoes/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID da avaliação. ● Request
> (application/json)
>
> ○ Body {
>
> "nota": 5,
>
> "comentario": "Produto de excelente qualidade! Recomendo a todos.",
> "produtoId": 1,
>
> "clienteId": 1 }
>
> ● Response 200 (application/json) ○ Body
>
> {
>
> "id": 1, "nota": 5,
>
> "comentario": "Produto de excelente qualidade! Recomendo a todos.",
> "produtoId": 1,
>
> "clienteId": 1 }

**Remover** **(Delete)** **\[DELETE** **/avaliacoes/{id}\]**

> ● Parameters
>
> ○ id (required, number, 1) ... ID da avaliação. ● Response 200
> (application/json)
>
> ○ Body {
>
> "id": 1, "nota": 5,
>
> "comentario": "Produto de excelente qualidade! Recomendo a todos.",
> "produtoId": 1,
>
> "clienteId": 1 }
