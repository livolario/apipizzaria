//Atualizar o index.js
import 'dotenv/config';

//1. Importa a ferramenta Express
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; //Necessário para recriar o '__dirname'.

// //Importando as rotas.
// Importa as rotas de autenticação
//import authRoutes from './routes/authRoutes.js';
import authRoutes from './routes/authRoutes.js'; 

import clienteRoutes from './routes/clienteRoutes.js';

//import produtoRoutes from './routes/produtoRoutes.js';

// --- Configurações ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
};

//2. Cria a nossa aplicação (nosso servidor)
const app = express();


//---- MIDDLEWARES ----
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json());

//Servindo a pasta 'public' para arquivos estáticos (CSS, JS, imagens).
app.use(express.static(path.join(__dirname, '..', 'public')));

//--- ROTAS ---
//Rota principal que serve a página HTML
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'pages', 'home.html'));//alterar
    //req = requisição (dados do pedido do cliente)
    // res = resposta (o que vamos enviar de volta)
});
//Rotas da API prefixadas, isso evita conflitos e deixa claro quais rotas pertencem à API
const apiPrefix = '/api';
//Rotas gerais da API (ex: /api/sandro)
app.use(`${apiPrefix}/clientes`, clienteRoutes); // ex.: /api/clientes/

app.use(`${apiPrefix}/login`, authRoutes); //Rota de login ex.: /api/login

//app.use(`${apiPrefix}/produtos`, produtoRoutes); //ex: /api/produtos/

// --- TRATAMENTO DE ERROS ---
// Um middleware de erro centralizado
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor!');
});

//Inicialização do servidor
const PORTA = process.env.PORT || 3333;
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

    console.log("Criamos um novo cliente:", novoCliente)

    res.json({message: `Cliente ${novoCliente.nome} cadastro com sucesso!`, data: novoCliente});
});