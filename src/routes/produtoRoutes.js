import express from 'express';
import * as produtoController from '../controllers/produtoController.js';
import validate from '../middlewares/validate.js';
import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoController.js';
const router = express.Router();


//O prefixo '/api/produtos' será definido no index.js
router.get('/', produtoController.listarProdutos);
//Adiciona o middleware de validação do Joi
router.post('/', validate(produtoCreateSchema), produtoController.adicionarProduto);
//Adiciona o middleware de validação do Joi
router.put('/:id', validate(produtoUpdateSchema), produtoController.atualizarProduto);
router.delete('/:id', produtoController.deletarProduto);

export default router;
