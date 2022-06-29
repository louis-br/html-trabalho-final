var requestCategoriasURL = 'http://loja.buiar.com/?key=8t4b2j&c=categoria&t=listar&f=json'

var requestCategorias = new XMLHttpRequest()

    requestCategorias.open('POST', requestCategoriasURL)
    requestCategorias.responseType = 'json'
    requestCategorias.send()
    requestCategorias.onload = function () { carregarListaCategorias() }

var requestPedidosURL = 'http://loja.buiar.com/?key=8t4b2j&c=item&t=listar&f=json'

var requestPedidos = new XMLHttpRequest()

    requestPedidos.open('POST', requestPedidosURL)
    requestPedidos.responseType = 'json'
    requestPedidos.send()

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

function listarPedidos () {

    var url = 'http://loja.buiar.com/?key=8t4b2j&c=pedido&t=listar&f=json'

    criarRequest(url, 'pedidos')
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

    criarRequest(url, 'alterarCategoria', -1)
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

    criarRequest(url, 'alterarProduto', -1)
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

                else if (nome == 'pedidos')
                    gerarTabela(request.response, 'pedidos')

                else if (nome == 'listarItensPedido')
                    gerarPedidos(request.response)

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

    return ((valor).toLocaleString("pt-BR", opcoes))

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

    if ( tipo == 'produtos') {

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

    else if (tipo == 'pedidos') {

        let cpfA = document.createElement('th')
        let cepA = document.createElement('th')
        let ruaA = document.createElement('th')
        let numeroA = document.createElement('th')
        let complementoA = document.createElement('th')
        let bairroA = document.createElement('th')
        let cidadeA = document.createElement('th')
        let ufA = document.createElement('th')

        cpfA.innerText = 'CPF'
        cepA.innerText = 'CEP'
        ruaA.innerText = 'Rua'
        numeroA.innerText = 'Numero'
        complementoA.innerText = 'Complemento'
        bairroA.innerText = 'Bairro'
        cidadeA.innerText = 'Cidade'
        ufA.innerText = 'UF'

        atributos.appendChild(cpfA)
        atributos.appendChild(cepA)
        atributos.appendChild(ruaA)
        atributos.appendChild(numeroA)
        atributos.appendChild(complementoA)
        atributos.appendChild(bairroA)
        atributos.appendChild(cidadeA)
        atributos.appendChild(ufA)

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

        else if (tipo == 'pedidos') {

            id.setAttribute('onclick', "listarItensPedido(this)")

            let cpf = document.createElement('td')
            let cep = document.createElement('td')
            let rua = document.createElement('td')
            let numero = document.createElement('td')
            let complemento = document.createElement('td')
            let bairro = document.createElement('td')
            let cidade = document.createElement('td')
            let uf = document.createElement('td')

            cpf.innerText = dados[i].cpf
            cep.innerText = dados[i].cep
            rua.innerText = dados[i].rua
            numero.innerText = dados[i].numero
            complemento.innerText = dados[i].complemento
            bairro.innerText = dados[i].bairro
            cidade.innerText = dados[i].cidade
            uf.innerText = dados[i].uf

            tr.appendChild(cpf)
            tr.appendChild(cep)
            tr.appendChild(rua)
            tr.appendChild(numero)
            tr.appendChild(complemento)
            tr.appendChild(bairro)
            tr.appendChild(cidade)
            tr.appendChild(uf)

        }

    }

}

function listarItensPedido (element) {

    console.log(element.innerText)
    var url = `http://loja.buiar.com/?key=8t4b2j&c=item&t=listar&f=json&pedido=${element.innerText}`

    criarRequest(url, 'listarItensPedido')

}

function limparPedidos(){

    pedidos = document.getElementById('divPedidos').innerHTML = ""

}

function gerarPedidos (response, idPedido) {

    limparPedidos()

    pedidos = document.getElementById('divPedidos')
    let dados = response.dados

    for (let i = 0; i < dados.length; i++) {
        
        console.log(dados[i].pedido)
        let div = document.createElement('div')
        let p = document.createElement('p')

        div.setAttribute('class', 'column')
        div.appendChild(p)
        p.setAttribute('class', 'label')
        p.innerText = "Produto: " + dados[i].produto + " - " + dados[i].qtd
        pedidos.appendChild(div)

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
