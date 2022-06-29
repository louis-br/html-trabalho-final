let produtos = {}

var requestCategoriasURL = 'http://loja.buiar.com/?key=8t4b2j&c=categoria&t=listar&f=json'

var requestCategorias = new XMLHttpRequest()

    requestCategorias.open('POST', requestCategoriasURL)
    requestCategorias.responseType = 'json'
    requestCategorias.send()
    requestCategorias.onload = function () { gerarCategorias(requestCategorias.response, 'categorias') }

    function listarCategorias () {

        var url = 'http://loja.buiar.com/?key=8t4b2j&c=categoria&t=listar&f=json'
    
        criarRequest(url, 'categorias')
    
    }

function gerarCategorias (response, tipo) {

    let lista = document.getElementById(tipo)
    let dados = response.dados

    for (let i = 0; i < dados.length; i++) {

        let nome = document.createElement('li')
        let idCategoria = document.createElement('li')

        lista.appendChild(nome)
        lista.appendChild(idCategoria)
        nome.innerText = dados[i].nome 
        idCategoria.innerText = dados[i].id 
        idCategoria.setAttribute('class', 'categorias')
        nome.setAttribute('class', 'categorias')
        nome.setAttribute('onclick', "listarProdutos(this)")
        idCategoria.setAttribute('hidden', 'hidden')

    }

}

function criarRequest (url, nome, idCategoria) {

    var request = new XMLHttpRequest()

    request.open('POST', url)
    request.responseType = 'json'
    request.onreadystatechange = function () {

        if (request.readyState === XMLHttpRequest.DONE) {

            var status = request.status;

            if (status === 0 || (status >= 200 && status < 400)) {

                if (nome == 'categorias')
                    gerarCategorias(request.response, 'categorias')

                else if (nome == 'produtos')
                    gerarProdutos(request.response, 'produtos', idCategoria)

                else console.log(request)

            } 

        }
    }

    request.send()

}

function listarProdutos (element) {

    var url = 'http://loja.buiar.com/?key=8t4b2j&c=produto&t=listar&f=json'

    criarRequest(url, 'produtos', resgatarIdCategoria(element.innerText))

}

function resgatarIdCategoria (name) {

    let data = requestCategorias.response.dados
    
    for (let i = 0; i < data.length; i++) {

        if(data[i].nome == name)
            return data[i].id

    }

    return -1

}

function gerarProdutos (response, tipo, idCategoria) {

    limparProdutos()

    produtos = document.getElementById('divProdutos')
    let dados = response.dados

    for (let i = 0; i < dados.length; i++) {

        {
            let id = Number(dados[i].id)
            produtos[id] = dados[i]
        }

        if(dados[i].categoria == idCategoria) {

            let div = document.createElement('div')
            let image = document.createElement('img')
            let p = document.createElement('p')
            
            for (let e of [div, image]) {
                e.setAttribute('dataid', dados[i].id)
                e.setAttribute('draggable', true)
                e.addEventListener('dragstart', drag)
            }
            image.addEventListener('dblclick', duploClick)

            div.setAttribute('class', 'column')
            div.appendChild(p)
            div.appendChild(image)
            p.setAttribute('class', 'label')
            image.setAttribute('src', dados[i].imagem)
            image.setAttribute('alt', 'Image could not be loaded')
            image.setAttribute('class', 'product')
            p.innerText = dados[i].nome + " - Preço: R$ " + dados[i].preco
            produtos.appendChild(div)

        }

    }

}

function limparProdutos () {

    document.getElementById('divProdutos').innerHTML = ""

}

function mostrarPagina(pagina) {
    for (let p of document.getElementsByClassName('pagina')) {
        p.style.display = "none"
        if (p.id == `pagina${pagina}`) {
            p.style.display = "block"
        }
    }
}

function duploClick(ev) {
    carrinhoAdicionarItem(ev.target.getAttribute('dataid'))
}

function allowDrop(ev) {
    ev.preventDefault()
}

function drop(ev) {
    ev.preventDefault()
    let data = ev.dataTransfer.getData("text")
    carrinhoAdicionarItem(data)
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute('dataid'))
}

let carrinho = {}

function mostrarCarrinho() {
    let pagina = document.getElementById('paginaCarrinho')
    pagina.style.display = pagina.style.display == "block" ? "none" : "block"
}

function gerarCarrinho() {
    let items = `
    <tr>
        <th>Imagem</th>
        <th>Nome</th>
        <th>Quantidade</th>
        <th>Alterar</th>
        <th>Excluir</th>
    </tr>`
    for (let [id, quantidade] of Object.entries(carrinho)) {
        item = produtos[id]
        let preco = parseFloat(item.preco * carrinho[id])
        items += `
        <tr id="modeloItem">
            <td name="iconeItem"><img height="25px" src="${item.imagem}"></td>
            <td name="nomeItem">${item.nome}</td>
            <td name="quantidadeItem">${quantidade}</td>
            <td>
                <input type="button" name="plus-button" onClick="carrinhoAdd(${id})" value="+"></button>
            </td>
            <td>
                <input type="number" name="alterarQuantidadeItem" onchange="carrinhoAlterarItem(event, ${id})" placeholder="${quantidade}">
            </td>
            <td>
                <input type="button" name="minus-button" onClick="carrinhoSub(${id})" value="-"></button>
            </td>
            <td>
                <button name="excluirItem" style="position:static;" onclick="carrinhoExcluirItem(${id})">X</button>
            </td>
            <td>
                ${preco}
            </td>
        </tr>`
    }
    items += `<tr><td><button onclick="confirmarPedido()">Confirmar pedido</button></td></tr>`
    document.getElementById("tabelaCarrinho").innerHTML = items
}

function confirmarPedido() {
    document.getElementById('paginaConfirmacao').style.display = 'block'
    document.getElementById('paginaProdutos').style.display = 'none'
    document.getElementById('menuCategorias').style.display = 'none'
}

function abrirConfirmacaoPedido() {

    console.log('entrou')
    document.getElementById('paginaConfirmacao').style.display = 'none'
    document.getElementById('paginaProdutos').style.display = 'none'
    document.getElementById('paginaCarrinho').style.display = 'none'
    document.getElementById('confirmacaoDados').style.display = 'block'

    let dados = document.getElementById('confirmacaoDados')

    let nome = document.createElement('p')
    nome.setAttribute('class', 'confirmDados')
    nome.innerText ='Nome: ' + document.getElementById('name').value
    let cpf = document.createElement('p')
    cpf.setAttribute('class', 'confirmDados')
    cpf.innerText ='CPF: ' + document.getElementById('cpf').value
    let cep = document.createElement('p')
    cep.setAttribute('class', 'confirmDados')
    cep.innerText ='CEP: ' + document.getElementById('cep').value
    let logradouro = document.createElement('p')
    logradouro.setAttribute('class', 'confirmDados') 
    logradouro.innerText ='Rua: ' + document.getElementById('logradouro').value
    let bairro = document.createElement('p') 
    bairro.setAttribute('class', 'confirmDados')
    bairro.innerText ='Bairro: ' + document.getElementById('bairro').value
    let cidade = document.createElement('p') 
    cidade.setAttribute('class', 'confirmDados')
    cidade.innerText ='Cidade: ' + document.getElementById('cidade').value
    let uf = document.createElement('p')
    uf.setAttribute('class', 'confirmDados')
    uf.innerText ='UF: ' + document.getElementById('uf').value
    let numero = document.createElement('p')
    numero.setAttribute('class', 'confirmDados')
    numero.innerText ='Numero: ' +  document.getElementById('numero').value
    let complemento = document.createElement('p')
    complemento.setAttribute('class', 'confirmDados')
    complemento.innerText ='Complemento: ' +  document.getElementById('complemento').value
    let botao = document.createElement('button')
    botao.innerHTML = 'Confirmar dados'
    botao.setAttribute("onclick", "enviarPedido()")
    botao.setAttribute('class', 'botaoConfirm')
    
    let items = ``
    let preco = 0

    for (let [id, quantidade] of Object.entries(carrinho)) {
        let item = produtos[id]
        preco += parseInt(item.preco * Number(carrinho[id]))
        items += `
        <tr>
            <td><img height="25px" src="${item.imagem}">&nbsp</td>
            <td>${item.nome}&nbsp</td>
            <td>${quantidade}</td>
        </tr>`
    }

    let listaItens = document.createElement('tr')
    listaItens.innerHTML = items

    let precoP = document.createElement('p')
    precoP.innerText = 'Preco: ' + preco

    dados.appendChild(nome)
    dados.appendChild(cpf)
    dados.appendChild(cep)
    dados.appendChild(logradouro)
    dados.appendChild(bairro)
    dados.appendChild(cidade)
    dados.appendChild(uf)
    dados.appendChild(numero)
    dados.appendChild(complemento)
    dados.appendChild(listaItens)
    dados.appendChild(precoP)
    dados.appendChild(botao)
    
}

function carrinhoAdicionarItem(id) {
    id = Number(id)
    if ((id in produtos)) {
        carrinho[id] = carrinho[id] + 1 || 1
    }
    gerarCarrinho()
}

function carrinhoAdd(id){
    id = Number(id)
    carrinho[id] = carrinho[id] + 1
    gerarCarrinho()
}

function carrinhoSub(id){
    id = Number(id)
    carrinho[id] = carrinho[id] - 1
    if(carrinho[id] <= 0)
    {
        delete carrinho[id]
    }
    gerarCarrinho()
}

function carrinhoAlterarItem(ev, id) {
    carrinho[id] = Number(ev.target.value)
    if (carrinho[id] <= 0) {
        delete carrinho[id]
    }
    gerarCarrinho()
}

function carrinhoExcluirItem(id) {
    delete carrinho[id]
    gerarCarrinho()
}

function buscarCep() {
	let url = 'https://viacep.com.br/ws/' + cep.value + '/json';
    console.log("acessando " + url);
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
  	    let data = request.response;
  	    console.log(request.response);
        logradouro.value = data.logradouro;
        bairro.value = data.bairro;
        cidade.value = data.localidade;
        uf.value = data.uf;
    };
	
} 

function enviarPedido () {

    let nome = document.getElementById('name').value 
    let cpf = document.getElementById('cpf').value 
    let cep = document.getElementById('cep').value 
    let logradouro = document.getElementById('logradouro').value 
    let bairro = document.getElementById('bairro').value 
    let cidade = document.getElementById('cidade').value 
    let uf = document.getElementById('uf').value 
    let numero = document.getElementById('numero').value 
    let complemento = document.getElementById('complemento').value 

    let url = `http://loja.buiar.com/?key=8t4b2j&c=pedido&t=inserir&nome=${nome}&cpf=${cpf}&cep=${cep}&rua=${logradouro}&bairro=${bairro}&cidade=${cidade}&uf=${uf}&numero=${numero}&complemento=${complemento}&f=json`

    criarRequestPedido(url)
    limparCamposPedido()
    console.log("Pedido enviado")

}

function criarRequestPedido (url) {

    var request = new XMLHttpRequest()

    request.open('POST', url)
    request.responseType = 'json'
    request.send()
    request.onload = function(){
        processarPedido(this.response.dados.id);
    }

}

function limparCamposPedido () {

    document.getElementById('name').value = ''
    document.getElementById('cpf').value = ''
    document.getElementById('cep').value = ''
    document.getElementById('logradouro').value = '' 
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('uf').value = ''
    document.getElementById('numero').value = ''
    document.getElementById('complemento').value = '' 

}

function processarPedido(pedido){
    
    for (let [id, quantidade] of Object.entries(carrinho)) {
        var request = new XMLHttpRequest()

        let url = `http://loja.buiar.com/?key=8t4b2j&c=item&t=inserir&pedido=${pedido}&produto=${id}&qtd=${carrinho[id]}&f=json`
        request.open('POST', url)
        request.responseType = 'json'
        request.send()
        console.log('item adicionado')
    }
    gerarBoleto(pedido)
}

function gerarBoleto(pedido){
    document.getElementById('confirmacaoDados').style.display = 'none'
    let boleto = document.getElementById('Boleto')
    boleto.style.display = 'block'
    let url = `http://loja.buiar.com/?key=8t4b2j&c=boleto&t=listar&id=${pedido}&f=json`

    document.getElementById('linkBoleto').href = url
}