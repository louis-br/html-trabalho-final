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
        items += `
        <tr id="modeloItem">
            <td name="iconeItem"><img height="25px" src="${item.imagem}"></td>
            <td name="nomeItem">${item.nome}</td>
            <td name="quantidadeItem">${quantidade}</td>
            <td>
                <input type="number" name="alterarQuantidadeItem" onchange="carrinhoAlterarItem(event, ${id})" placeholder="${quantidade}">
            </td>
            <td>
                <button name="excluirItem" style="position:static;" onclick="carrinhoExcluirItem(${id})">X</button>
            </td>
        </tr>`
    }
    items += `<a href="confirmacaoPedido.html">Confirmar pedido </a>`
    document.getElementById("tabelaCarrinho").innerHTML = items
}

function carrinhoAdicionarItem(id) {
    id = Number(id)
    if ((id in produtos)) {
        carrinho[id] = carrinho[id] + 1 || 1
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