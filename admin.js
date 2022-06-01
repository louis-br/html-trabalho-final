var requestCategoriasURL = 'http://loja.buiar.com/?key=8t4b2j&c=categoria&t=listar&f=json'

var requestCategorias = new XMLHttpRequest()

    requestCategorias.open('POST', requestCategoriasURL)
    requestCategorias.responseType = 'json'
    requestCategorias.send()
    requestCategorias.onload = function () { carregarListaCategorias() }

function limparTabela (tipo) {

    let tabela = document.getElementById(tipo)

    tabela.innerHTML = ""

}

function converterEntradaNumerica(valor) {
    valor = valor.replace(/\./g, "")
    valor = valor.replace(/,/g, ".")
    valor = valor.replace(/[^\d.]/g, "")
    return Number(valor)
}

function limparCampos () {

    document.getElementById('nomeCategoriaIncluir').value = ""
    document.getElementById('idCategoriaExcluir').value = ""
    document.getElementById('idCategoriaAlterar').value = ""
    document.getElementById('nomeCategoriaAlterar').value = ""
    document.getElementById('idProduto').value = ""
    document.getElementById('nomeProduto').value = ""
    document.getElementById('codigoProduto').value = ""
    document.getElementById('descricaoProduto').value = ""
    document.getElementById('precoProduto').value = ""
    document.getElementById('imagemProduto').value = ""
    document.getElementById('pesoProduto').value = ""
    document.getElementById('inputLista').value = ""
    document.getElementById('idProdutoAlterar').value = ""
    document.getElementById('nomeProdutoAlterar').value = ""
    document.getElementById('codigoProdutoAlterar').value = ""
    document.getElementById('descricaoProdutoAlterar').value = ""
    document.getElementById('precoProdutoAlterar').value = ""
    document.getElementById('imagemProdutoAlterar').value = ""
    document.getElementById('pesoProdutoAlterar').value = ""
    document.getElementById('inputListaAlterar').value = ""

}

function listarCategorias () {

    var url = 'http://loja.buiar.com/?key=8t4b2j&c=categoria&t=listar&f=json'

    criarRequest(url, 'categorias')
    limparCampos()

}

function listarProdutos () {

    var url = 'http://loja.buiar.com/?key=8t4b2j&c=produto&t=listar&f=json'

    criarRequest(url, 'produtos')
    limparCampos()

}

function incluirCategoria () {

    var nome = document.getElementById('nomeCategoriaIncluir').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=categoria&t=inserir&nome=${nome}&f=json`
    
    criarRequest(url, 'incluirCategoria')
    limparCampos()
    listarCategorias()
    
}

function incluirProduto () {

    var id = document.getElementById('idProduto').value.toString()
    var nome = document.getElementById('nomeProduto').value.toString()
    var codigo = document.getElementById('codigoProduto').value.toString()
    var descricao = document.getElementById('descricaoProduto').value.toString()
    var preco = document.getElementById('precoProduto').value.toString()
    var imagem = document.getElementById('imagemProduto').value.toString()
    var peso = document.getElementById('pesoProduto').value.toString()
    var idCategoria = document.getElementById('inputLista').value.toString()

    preco = converterEntradaNumerica(preco)
    peso = converterEntradaNumerica(peso)

    var url = `http://loja.buiar.com/?key=8t4b2j&c=produto&t=inserir&categoria=${idCategoria}&codigo=${codigo}&nome=${nome}&descricao=${descricao}&peso=${peso}&preco=${preco}&id=${id}&imagem=${imagem}&f=json`

    criarRequest(url, 'incluirProduto')
    limparCampos()
    listarProdutos()

}

function excluirCategoria () {
    
    var id = document.getElementById('idCategoriaExcluir').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=categoria&t=remover&id=${id}&f=json`
    
    criarRequest(url, 'excluirCategoria')
    limparCampos()
    listarCategorias()
    
}

function excluirProduto () {

    var id = document.getElementById('idProdutoExcluir').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=produto&t=remover&id=${id}&f=json`

    criarRequest(url, 'excluirProduto')
    limparCampos()
    listarProdutos()

}

function alterarCategoria () {
    
    var id = document.getElementById('idCategoriaAlterar').value.toString()
    var nome = document.getElementById('nomeCategoriaAlterar').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=categoria&t=alterar&id=${id}&nome=${nome}&f=json`

    criarRequest(url, 'alterarCategoria')
    limparCampos()
    listarCategorias()

}

function alterarProduto () {

    var id = document.getElementById('idProdutoAlterar').value.toString()
    var nome = document.getElementById('nomeProdutoAlterar').value.toString()
    var codigo = document.getElementById('codigoProdutoAlterar').value.toString()
    var descricao = document.getElementById('descricaoProdutoAlterar').value.toString()
    var preco = document.getElementById('precoProdutoAlterar').value.toString()
    var imagem = document.getElementById('imagemProdutoAlterar').value.toString()
    var peso = document.getElementById('pesoProdutoAlterar').value.toString()
    var idCategoria = document.getElementById('inputListaAlterar').value.toString()

    preco = converterEntradaNumerica(preco)
    peso = converterEntradaNumerica(peso)

    var url = `http://loja.buiar.com/?key=8t4b2j&c=produto&t=alterar&id=${id}&nome=${nome}&codigo=${codigo}&descricao=${descricao}&preco=${preco}&imagem=${imagem}&peso=${peso}&categoria=${idCategoria}&f=json`

    criarRequest(url, 'alterarProduto')
    limparCampos()
    listarProdutos()

}

function criarRequest (url, nome) {

    var request = new XMLHttpRequest()

    request.open('POST', url)
    request.responseType = 'json'
    request.onreadystatechange = function () {

        if (request.readyState === XMLHttpRequest.DONE) {

            var status = request.status;

            if (status === 0 || (status >= 200 && status < 400)) {

                if (nome == 'categorias')
                    gerarTabela(request.response, 'categorias')

                else if (nome == 'produtos')
                    gerarTabela(request.response, 'produtos')

                else console.log(request)

            } 

        }
    }

    request.send()

}

function formatarLocalizado(valor, monetario) {
    valor = Number(valor)
    opcoes = {
        minimumFractionDigits: 3
    }
    if (monetario) {
        opcoes = {
            style: "currency",
            currency: "BRL",
        }
    }
    return ((valor).toLocaleString("pt-BR", opcoes)
    )
}

function formatarPeso(valor) {
    return formatarLocalizado(valor) + "\xA0kg"
}

function gerarTabela (response, tipo) {

    let tabela = document.getElementById(tipo)
    let atributos = document.createElement('tr')
    let idAtributo = document.createElement('th')
    let nomeAtributo = document.createElement('th')
    let dados = response.dados

    limparTabela(tipo)

    idAtributo.innerText = 'ID'
    nomeAtributo.innerText = 'Nome'
    tabela.appendChild(atributos)
    atributos.appendChild(idAtributo)
    atributos.appendChild(nomeAtributo)

    if( tipo == 'produtos') {

        let codigoAtributo = document.createElement('th')
        let categoriaAtributo = document.createElement('th')
        let descricaoAtributo = document.createElement('th')
        let precoAtributo = document.createElement('th')
        let imagemAtributo = document.createElement('th')
        let pesoAtributo = document.createElement('th')

        codigoAtributo.innerText = 'Código'
        categoriaAtributo.innerText = 'Categoria'
        descricaoAtributo.innerText = 'Descrição'
        precoAtributo.innerText = 'Preço'
        imagemAtributo.innerText = 'Imagem'
        pesoAtributo.innerText = 'Peso'

        atributos.appendChild(codigoAtributo)
        atributos.appendChild(categoriaAtributo)
        atributos.appendChild(descricaoAtributo)
        atributos.appendChild(precoAtributo)
        atributos.appendChild(imagemAtributo)
        atributos.appendChild(pesoAtributo)

    }

    for (let i = 0; i < dados.length; i++) {

        let tr = document.createElement('tr')
        let id = document.createElement('td')
        let nome = document.createElement('td')

        tabela.appendChild(tr)
        nome.innerText = dados[i].nome 
        id.innerText = dados[i].id 
        tr.appendChild(id)
        tr.appendChild(nome)
        
        if (tipo == 'produtos') {
            
            let codigo = document.createElement('td')
            let categoria = document.createElement('td')
            let descricao = document.createElement('td')
            let preco = document.createElement('td')
            let imagem = document.createElement('td')
            let peso = document.createElement('td')

            codigo.innerText = dados[i].codigo
            categoria.innerText = dados[i].categoria
            descricao.innerText = dados[i].descricao
            preco.innerText = formatarLocalizado(dados[i].preco, true)
            imagem.innerText = dados[i].imagem
            peso.innerText = formatarPeso(dados[i].peso)

            tr.appendChild(codigo)
            tr.appendChild(categoria)
            tr.appendChild(descricao)
            tr.appendChild(preco)
            tr.appendChild(imagem)
            tr.appendChild(peso)

        }

    }

}

function carregarListaCategorias () {

    let listaCp = document.getElementById('listaCategoriasProdutos')
    let listaCpAlterar = document.getElementById('listaCategoriasProdutosAlterar')
    let dados = requestCategorias.response.dados

    for (let i = 0; i < dados.length; i++) {

        let option = document.createElement('option')
        let optionAlterar = document.createElement('option')

        option.innerText = dados[i].nome
        option.setAttribute('value', dados[i].id)
        optionAlterar.innerText = dados[i].nome
        optionAlterar.setAttribute('value', dados[i].id)
        listaCp.appendChild(option)
        listaCpAlterar.appendChild(optionAlterar)

    }

}
