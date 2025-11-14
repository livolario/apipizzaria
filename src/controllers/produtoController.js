import * as produtoService from '../services/produtoService.js'
import Joi from 'joi';

//Usando 'export const'
export const produtoCreateSchema = Joi.object({
    idProduto:,
    nome: Joi.string().required().max(30),
    descricao:Joi.string().required().max(100),
    tipo:
    imagem:



})