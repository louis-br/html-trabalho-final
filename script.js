function alertaMensagem(texto) {

    alert(texto);
    
}

function tabela() {

    console.log('Entrou')

    for(let k = 0; k <= 10; k++){

        let item = document.createElement('li');
        item.innerHTML = '7 x ' + k + ' = ' + (k * 7);
        document.getElementById('lista').appendChild(item);

    }

}

function testeFuncao() {

    console.log('Teste')

    let list = document.getElementById('lista')
    let li = document.createElement('li')
    li.innerHTML = '<b> ola </b>'
    list.appendChild(li)

}