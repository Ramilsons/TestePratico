// usando o pacote fs do node pois precisaremos dele para escrever no nosso arquivo saida.json
const fs = require('fs')

// pegando o arquivo broken-database.json
const values = require('./broken-database.json')


// função para formatar o nome
function nameFormated(name){
    const letterInitial = ['æ','¢','ø','ß']
    const lettterFormated = ['a','c', 'o', 'b']

    let arrLetter = name.split('')
    let newArrLetter = []

    arrLetter.forEach((element, index)=>{
        const returnLetter = findLetterInitial(element)
        newArrLetter.push(returnLetter)
    })
    
    function findLetterInitial(letter){
        for(let i = 0; i < letterInitial.length; i++){
            if(letterInitial[i] == letter){
                letter = lettterFormated[i]
            }
        }
        return letter
    }

    newArrLetter = newArrLetter.join('')
    return newArrLetter
}

// função para formatar a quantidade
function quantityFormated(quantity){
    if(quantity === undefined || quantity == null){
        quantity = 0
    }
    return quantity
}

// função para formatar o preço
function priceFormated(price){
    
    return price = parseFloat(price)
}

// mandando para o arquivo saida.json os valores corrigidos
function sendValues(){
    fs.writeFile('./saida.json', JSON.stringify(values) , function(err){
        if(err){
            return console.log('erro: '+err)
        }else{
            const newValues = require('./saida.json')
            list(newValues)
            calculatorPriceOfCategory(newValues)
        }
    })
}

// list
function list(products){

    products.sort(function(a, b) {
        if (a.category < b.category) {
            return -1;
        }
        if (a.category > b.category) {
            return 1;
        }
        if (a.category == b.category){
            return a.id - b.id;
        }
    });
   
    let namesOrdered = []
    
    products.forEach(element => namesOrdered.push(element.name))

    namesOrdered.forEach((element, index) => {
        console.log(`${index+1}º:  ${element}`)
    })
}


// calculando qual é o valor total do estoque por categoria
function calculatorPriceOfCategory(products) {
    let categories = {}

    products.forEach(element => {
        if(categories[element.category] == undefined){
            categories[element.category] = element.price * element.quantity
        }else{
            categories[element.category] += (element.price * element.quantity)
        }
    })
    
    /*
    console.group('Preço total por categoria é:')
    console.log(categories)
    console.groupEnd()
    */
}


// para cada elemento do array vamos chamar as funções para formatar as propriedades
values.forEach((element, index) =>{
    element.name = nameFormated(element.name)
    element.quantity = quantityFormated(element.quantity)
    element.price = priceFormated(element.price)
})
sendValues()
