# Desafio 2 - Back-end - Ecommerce

***Como funciona***

##### Para adicionar um Novo Pedido e um Novo Produto é necessário que sejam passados em formato de array, assim há a possibilidade da adição de +1 em uma vez só,

##### NOVO PRODUTO ENTRADA - FORMATO: id: number; nome: string; peso *opcional, em gramas*: number; quantidade: number; valor: number
***Os valores adicionados não devem ser em centavos***
##### NOVO PEDIDO ENTRADA - FORMATO: id: number; idCliente: string ou number
***Primeiro cria-se um pedido válido para depois adicionar produtos ao mesmo:***
##### ADICIONANDO PRODUTOS NO PEDIDO - FORMATO: id *do produto*: number ; quantidade: number
***Caso queira remover um produto de um pedido, basta atualizar sua quantidade para zero***
##### O Valor Total é sempre atualizado e não é possível adicionar ou atualizar um produto para uma quantidade fora dos intervalos [0,Estoque-Máximo]

##### Na url: localhost:8081/orders/:id com o método PUT é tanto possível adicionar produtos na lista de um pedido (caso exista no body um id de um produto válido e a quantidade a ser adicionada) tanto como atualizar o estado de um pedido que não tenha o status = "incompleto" com a lista de produtos vazia.
***Uma vez que o status mude de incompleto, não terá como voltar a se tornar novamente***
##### Para atualizar a quantidade de um produto já adicionado em um pedido é necessário utilizar o método PUT na url: localhost:8081/orders/:idPedido?produto=:idProduto, e adicionar no body uma quantidade válida

##### Ao deletar um pedido, as quantidades dos produtos são revertídas e o status muda para cancelado