import * as produtoService from '../services/produtoService.js'
import Joi from 'joi';

//Usando 'export const'
export const produtoCreateSchema = Joi.object({
    idProduto:Joi.string().required(),
    nome: Joi.string().required(),
    descricao:Joi.string().required(),
    tipo: Joi.string().required(),
    imagem: Joi.string().required(),
    valor: Joi.number().positive().required()
})

//Schema para atualização (todos os campos opcionais)

export const produtoUpdateSchema = Joi.object ({
    idProduto: Joi.string(),
    nome: Joi.string(),
    descricao: Joi.string(),
    tipo: Joi.string(),
    imagem: Joi.string(),
    valor: Joi.number().positive()
}).min(1)

export const listarProdutos = async (req, res) => {
    try {
        //Capturamos os parâmetros de consulta da URL
        //ex: ?minValor=10 / ?maxValor=100 / ?nome=pizza / ?id=001
        const{ minValor, maxValor, nome, id} = req.query;
        //Passamos todos os filtros para o serviço
        const produtos = await produtoService.findAll(minValor, maxValor, nome, id)
        if (produtos.length === 0) {
            return res.status(404).json({ message: "Nenhum produto encontrado com esses filtros."});
        }
        res.json(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({error: 'Erro interno do serviço'}); 
    }
};

export const adicionarProduto = async (req, res) => {
    try {
        //A validação agora é feita pelo middleware na rota
        const novoProduto = await produtoService.create(req.body);
        res.status(201).json({ message: 'Produto adicionado com sucesso', data: novoProduto});
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'ID já cadastrado.'});
        }
        res.status(500).json({error: 'Erro ao adicionar produto'});
    }

};

export const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        //A validação agora é feita pelo middleware
        const atualizado = await produtoService.update(id, res.body);
        if (!atualizado) {
            return res.status(404).json({error: 'Produto não encontrado'})
        }
        res.json({ message: 'Produto atualizado com sucesso'})
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({error: 'Erro ao atualizar produto'});
    }
};

export const deletarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await produtoService.remove(id);
        if (!deletado) {
            return res.status(404).json({ error: 'Produto não encontrado'})
        }
        res.status(200).json({ message: 'Produto deletado com sucesso'});
    } catch (error) {
        console.error('Erro ao deletar produto:', error)
        res.status(500).json({error: 'Erro ao deletar produto'});
    }
};