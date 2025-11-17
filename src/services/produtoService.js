//scr/services/produtoService.js
import db from '../db/db.js'

export const findAll = async (minValor, maxValor, nome, id, tipo) => {
    //1. Define a consulta SQL base
    let sql = 'SELECT * FROM produto';
    //2. Cria um array para as condições WHERE
    const conditions = [];
    //3. cira um array para os valores (para previnir SQL injection)
    const values = [];
    //4. Adiciona as condições dinamicamente
    //Adicionamos o filtro de menor valor
    if (minValor) {
        conditions.push('valor >= ?');
        values.push(minValor);
    }
    //Adicionamos o filtro de maior valor
    if (maxValor) {
        conditions.push('valor <= ?');
        values.push(maxValor);
    }
    //Adicionamos o filtro buscar por id
    if (id) {
        conditions.push('idProduto = ?');
        values.push(id);
    }
    //Adicionamos o filtro de nome
    if (nome) {
        conditions.push('LOWER(nome) LIKE ?');
        values.push(`%${nome.toLowerCase()}%`);
    }



    //5. se houver condições, anexa elas à consulta SQL
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    //6. Executa a consulta final
    const [rows] = await db.query(sql, values);
    return rows;
}
//Agora você pode combinar todos os filtros na mesma
//Buscar por nome (pizza) E preço (entre 30 e 50): GET http://localhost:3333/api/produtos?nome=pizza&minValor=30&maxValor=50
// Buscar por nome (borda) E preço (abaixo de 15): GET http://localhost:3333/api/produtos?nome=borda&maxValor=15
//Buscar por nome (calabresa): GET http://localhost:3333/api/produtos?nome=calabresa

export const create = async (produto) => {
    const [result] = await db.query('INSERT INTO produto SET ?', produto);
    return result.affectedRows > 0;
};

export const update = async (id, produto) => {
    const [result] = await db.query('UPDATE produto SET ? WHERE id = ?', [produto, id]);
    //Retorna true se uma linha foi afetada (produto existia), false caso contrário
    return result.affectedRows > 0;
};

export const remove = async (id) => {
    const [result] = await db.query('DELETE FROM produto WHERE id = ?', [id]);
    //Retorna true se uma linha foi afetada (produto existia), false caso contrário
    return result.affectedRows > 0;
};

