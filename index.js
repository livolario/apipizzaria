//Atualizar o index.js

//1. Importa a ferramenta Express
import express, { request, response } from 'express'

//2. Cria a nossa aplicação (nosso servidor)
const app = express();

//Habilita o Express para entender o formato JSON no corpo das requisições
app.use(express.json());

//3. Define a porta em que o servidor vai "escutar" os pedidos
const PORTA = 3333;

//Rota principal da aplicação
app.get('/', (request, response) => {
    //req = requisição (dados do pedido do cliente)
    // res = resposta (o que vamos enviar de volta)

    //Estamos enviando uma resposta no formato JSON
    response.json({message: `Bem-vindo à API da Pizzaria Senac!`});
});

//4. Manda o servidor ficar "escutando" na porta definida
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}. Acesse http://localhost:${PORTA}`)

});

//Seus dados mockados (simulando o banco de dados)
const listaDeClientes = [
    {id: 1, nome: "João Silva", email: "joao.silva@example.com"},
    {id: 2, nome: "Maria Santos", email: "maria.santos@example.com"},
    {id: 3, nome: "Pedro Almeida", email: "pedro.almeida@example.com"}

];

//Rota para listar todos os clientes (seu código original)
app.get('/clientes', (req, res) => {
    res.json(listaDeClientes);
});

//NOVA ROTA: rota para buscar UM cliente pelo ID
app.get('/clientes/:id', (req, res) => {
    //1. Captura o ID da URL e converte para número
    const idDoCliente = parseInt(req.params.id);
    //2. Procura o cliente no array usando o método find()
    const cliente = listaDeClientes.find(c => c.id === idDoCliente);
    //3. Verifica se o cliente foi encontrado
    if (cliente) {
        //Se encontrou, retorna o cliente com status 200 (OK)
        res.json(cliente);
    } else {
        //Se não encontrou, retorna um erro 404 (Not Found)
        res.status(404).json({ mensagem: "Cliente não encontrado"});
    }

});

app.post('/clientes', (req, res) => {
    //O middleware express.json() pega o corpo da requisição e o coloca em req.body
    const novoCliente = req.body;

    console.log("Recebemos um novo cliente:", novoCliente);

    res.json({message: `Cliente ${novoCliente.nome} cadastro com sucesso!`, data: novoCliente});
});