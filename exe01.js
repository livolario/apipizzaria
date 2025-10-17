import fs from 'node:fs/promises'

async function lerCardapio() {
    try {
       const cardapio = await  fs.readFile('pizzas.txt','utf-8')
       
       console.log(`O cardápio da pizza é ${cardapio}`)
    
    } catch (error) {
        console.error(`Cardápio errado ${error}`)  
    }
}

lerCardapio();
