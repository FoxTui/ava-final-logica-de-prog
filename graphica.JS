const prompt = require("prompt-sync")()
const { log } = require("console")
const fs = require("fs")

const produtos = []
const tipo = []
const preco = []

function inclusao() { 
    console.log("\nInclusão de Produto")
    console.log("=================================================================")
    
    const x = prompt("Produto: ")  
    const y = prompt("Tipo...: ")
    const z = Number(prompt("Preço..: "))
    
    produtos.push(x)
    tipo.push(y)
    preco.push(z)
   
    console.log("Ok! Produto Cadastrado com Sucesso!")
}

function listagem() {
    console.log("\nLista de Produtos Cadastrados")
    console.log("=================================================================")
    console.log("Nº: Produto..................: Tipo................: Preço......:")
    console.log("=================================================================")

    for(let i = 0; i < produtos.length; i++) {
        console.log(`${String(i+1).padStart(2)} ${produtos[i].padStart(26)} ${tipo[i].padStart(21)} ${preco[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(12)}`)
    }
}

function gravaDados() {
    const servicos = []

    for(let i = 0; i < produtos.length; i++){
        servicos.push(produtos[i]+";"+tipo[i]+";"+preco[i])
    }

    fs.writeFileSync("servicos.txt", servicos.join("\n"))

    console.log("Dados salvos em arquivo...");
}

function carregaDados() {
    if(fs.existsSync("servicos.txt")){
        const servicos = fs.readFileSync("servicos.txt", "utf-8").split("\n")

        for(let i = 0; i < servicos.length; i++){
            const partes = servicos[i].split(";")

            produtos.push(partes[0])
            tipo.push(partes[1])
            preco.push(Number(partes[2]))
        }
    }
    
}
carregaDados()

function pesquisaProd() {
    console.log("\n")
    const prodPesquisar = prompt("Digite o Produto: ");

    console.log("\nLista de Produtos Pesquisados")
    console.log("=================================================================")
    console.log("Nº: Produto..................: Tipo................: Preço......:")
    console.log("=================================================================")

    for (let i = 0; i < produtos.length; i++) {
    
        if (produtos[i].toLowerCase() === prodPesquisar.toLowerCase()) {
            console.log(`${String(i+1).padStart(2)} ${produtos[i].padStart(26)} ${tipo[i].padStart(21)} ${preco[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(12)}`)
        }
    }
}

function pesquisaPreco() {
    console.log("\n")
    const precoInicial = Number(prompt("Preço Inicial R$: "))
    const precoFinal = Number(prompt("Preço Final R$: "))

    console.log("\nLista de Produtos Pesquisados")
    console.log("=================================================================")
    console.log("Nº: Produto..................: Tipo................: Preço......:")
    console.log("=================================================================")

    for (let i = 0; i < produtos.length; i++){
        if (preco[i] >= precoInicial && preco[i] <= precoFinal) {
            console.log(`${String(i+1).padStart(2)} ${produtos[i].padStart(26)} ${tipo[i].padStart(21)} ${preco[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(12)}`)
        }
    }
}

function alteracao(){
    console.log("\nLista de Produtos Cadastrados")
    console.log("=================================================================")
    console.log("Nº: Produto..................: Tipo................: Preço......:")
    console.log("=================================================================")
    for(let i = 0; i < produtos.length; i++) {
        console.log(`${String(i+1).padStart(2)} ${produtos[i].padStart(26)} ${tipo[i].padStart(21)} ${preco[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(12)}`)
    }

    console.log("\n")
    const numProduto = Number(prompt("Informe o nº do Produto: "))-1
    let novoPreco = Number(prompt("Informe o novo Preço - R$: "))

    if (numProduto >= 0 && numProduto < produtos.length) {
        preco[numProduto] = novoPreco
        console.log("\nPreço Alterado com Sucesso!")
    } else {
        console.log("\nNº de Produto Inválido!")
    }  
}

function exclusao() {
    console.log("\nLista de Produtos Cadastrados")
    console.log("=================================================================")
    console.log("Nº: Produto..................: Tipo................: Preço......:")
    console.log("=================================================================")
    for(let i = 0; i < produtos.length; i++) {
        console.log(`${String(i+1).padStart(2)} ${produtos[i].padStart(26)} ${tipo[i].padStart(21)} ${preco[i].toLocaleString("pt-br", {minimumFractionDigits: 2}).padStart(12)}`)
    }

    console.log("\n")
    const numProduto = Number(prompt("Informe o nº do Produto: "))-1

    if (numProduto >= 0 && numProduto < produtos.length) {
        
        produtos.splice(numProduto, 1)
        tipo.splice(numProduto, 1)
        preco.splice(numProduto, 1)

        console.log("\nProduto Excluído com Sucesso!")
    } else {
        console.log("\nNº de Produto Inválido")
    }        
}


//----------------------------------------------------------------------PROGRAMA PRINCIPAL
do {
    console.log("\nGráfica - Catálogo de Produtos")
    console.log("=================================================")
    console.log("1.Inclusão de Produtos")
    console.log("2.Lista de Produtos Cadastrados");
    console.log("3.Pesquisa por Produto")
    console.log("4.Pesquisa por Intervalos de Preço")
    console.log("5.Alteração de Preço de Produto")
    console.log("6.Exclusão de Produto")
    console.log("7.Finalizar")
    const opcao = Number(prompt("Opção: "))
    if(opcao == 1){
        inclusao() 
    } else if(opcao == 2){
        listagem()
    } else if(opcao == 3){
        pesquisaProd()
    } else if(opcao == 4){
        pesquisaPreco()
    } else if(opcao == 5){
        alteracao()
    } else if(opcao == 6){
        exclusao()
    } else{
        break
    }

} while (true)

gravaDados()
