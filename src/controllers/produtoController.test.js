import { produtoCreateSchema } from './produtoController.js';

import Joi from 'joi';

describe ("Testes para validar os produtos", () => {
    
    it("Deve validar um produto com dados corretos", () => {
        const produtoValido = ({
            idProduto: "12345",
            nome: "Frango com Barbecue",
            descricao: "Frango, barbecue, mussarela, creme de leite",
            tipo: "Pizza",
            imagem: "frangobarbecue.jpg",
            valor: 12.55
        })
        
        const {error} = produtoCreateSchema.validate(produtoValido)
        expect(error).toBeFalsy();
    }  
    )
    it ("Deve rejeitar um produto sem nome", () => {
        const produtoSemNome = ({
            idProduto: "12345",
            nome: "",
            descricao: "Frango, barbecue, mussarela, creme de leite",
            tipo: "Pizza",
            imagem: "frangobarbecue.jpg",
            valor: 12.55
        })

        const {error} = produtoCreateSchema.validate(produtoSemNome)
        expect(error).toBeTruthy();
    })
    it ("Deve rejeitar um produto com valor negativo", () => {
        const valorNegativo = ({
            idProduto: "12345",
            nome: "",
            descricao: "Frango, barbecue, mussarela, creme de leite",
            tipo: "Pizza",
            imagem: "frangobarbecue.jpg",
            valor: -1.00
        })

        const {error} = produtoCreateSchema.validate(valorNegativo)
        expect(error).toBeTruthy();
    })
    it ("Deve permitir um produto com imagem em branco", () => {
        const imagem = ({
            idProduto: "12345",
            nome: "",
            descricao: "Frango, barbecue, mussarela, creme de leite",
            tipo: "Pizza",
            imagem: "",
            valor: -1.00
        })

        const{error} = produtoCreateSchema.validate(imagem)
        expect(error).toBeTruthy();

    })

})


