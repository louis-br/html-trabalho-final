function limparTabela() {

    let tabela = document.getElementById('categorias')

    tabela.innerHTML = ""

}

function listarCategorias () {

    var url = 'http://loja.buiar.com/?key=8t4b2j&c=categoria&t=listar&f=json'

    criarRequest(url, true)

}

function incluirCategoria () {

    var nome = document.getElementById('nomeCategoriaIncluir').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=categoria&t=inserir&nome=${nome}&f=json`
    
    criarRequest(url, false)
    
}

function excluirCategoria () {
    
    var id = document.getElementById('idCategoriaExcluir').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=categoria&t=remover&id=${id}&f=json`
    
    criarRequest(url, false)
    
}

function alterarCategoria () {
    
    var id = document.getElementById('idCategoriaAlterar').value.toString()
    var nome = document.getElementById('nomeCategoriaAlterar').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=categoria&t=alterar&id=${id}&nome=${nome}&f=json`

    criarRequest(url, false)

}

function criarRequest (url, listar) {

    var request = new XMLHttpRequest()
    var response

    request.open('GET', url)
    request.responseType = 'json'

    request.onreadystatechange = function () {

        if(request.readyState === XMLHttpRequest.DONE) {

            var status = request.status;

            if (status === 0 || (status >= 200 && status < 400))
                if (listar)
                    gerarTabela(request.response) 

        }
    }

    request.send()

}

function gerarTabela(response) {

    let tabela = document.getElementById('categorias')

    dados = response.dados

    limparTabela()

    for (let i = 0; i < dados.length; i++) {

        let tr = document.createElement('tr')
        let nome = document.createElement('td')
        let id = document.createElement('td')

        tabela.appendChild(tr)
        nome.innerText = dados[i].nome 
        id.innerText = dados[i].id 
        tr.appendChild(nome)
        tr.appendChild(id)

    }

}