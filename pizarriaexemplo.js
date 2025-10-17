//index.js
function fazerPizza(sabor) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve(`Pizza de ${sabor} quentinha!`);
    }, 3000 ); 

    });    
}
// Criamos uma função 'async' para poder usar 'await'
async function pedirPizza() {
    console.log(`Pedido enviado para a cozinha. Aguardando...`);
    try {
        //O 'await' pausa a execução AQUI até a pizza ficar pronta
        const resultadoDaPizza = await fazerPizza('Frango com Catupiry');

        //Essa linha só executa DEPOIS que o await termina
        
        console.log(`Finalmente! Chegou: ${resultadoDaPizza}`);
    } catch (error) {
      console.error(`Deu muito ruim: ${error}`);  
    }
    
}
// chamamos a nossa função principal
pedirPizza();