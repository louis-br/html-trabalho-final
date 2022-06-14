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

        if(dados[i].categoria == idCategoria) {

            let div = document.createElement('div')
            let image = document.createElement('img')
            let p = document.createElement('p')
            
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