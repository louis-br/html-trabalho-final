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

var requestProdutosURL = 'http://loja.buiar.com/?key=8t4b2j&c=produto&t=listar&f=json'

var requestProduto = new XMLHttpRequest()

    requestProduto.open('POST', requestProdutosURL)
    requestProduto.responseType = 'json'
    requestProduto.send()
    requestProduto.onload = function(){carregarProdutos()}


window.onload = function() {
    let input = document.getElementById('inputListaProdAlterar')
    input.addEventListener('change', preencheNome);
};

let produtos = {}

function limparTabela (tipo) {

    let tabela = document.getElementById(tipo)

    tabela.innerHTML = ""

}

function converterEntradaNumerica(valor) {

    valor = valor.replace(/\./g, "")
    valor = valor.replace(/,/g, ".")
    valor = valor.replace(/[^\d.]/g, "")

    console.log(valor)

    return Number(valor)

}

function limparCampos () {

    document.getElementById('nomeCategoriaIncluir').value = ""
    document.getElementById('inputListaExcluir').value = ""
    document.getElementById('nomeCategoriaAlterar').value = ""
    document.getElementById('nomeProduto').value = ""
    document.getElementById('codigoProduto').value = ""
    document.getElementById('descricaoProduto').value = ""
    document.getElementById('precoProduto').value = ""
    document.getElementById('imagemProduto').value = ""
    document.getElementById('pesoProduto').value = ""
    document.getElementById('inputLista').value = ""
    document.getElementById('inputListaProdAlterar').value = ""
    document.getElementById('nomeProdutoAlterar').value = ""
    document.getElementById('codigoProdutoAlterar').value = ""
    document.getElementById('descricaoProdutoAlterar').value = ""
    document.getElementById('precoProdutoAlterar').value = ""
    document.getElementById('imagemProdutoAlterar').value = ""
    document.getElementById('pesoProdutoAlterar').value = ""
    document.getElementById('inputListaCPAlterar').value = ""

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

    var nome = document.getElementById('nomeProduto').value.toString()
    var codigo = document.getElementById('codigoProduto').value.toString()
    var descricao = document.getElementById('descricaoProduto').value.toString()
    var preco = document.getElementById('precoProduto').value.toString()
    var imagem = document.getElementById('imagemProduto').value.toString()
    var peso = document.getElementById('pesoProduto').value.toString()
    var idCategoria = document.getElementById('inputLista').value.toString()

    preco = formatarNumeroDotsemMilhar(preco)
    peso = formatarNumeroDotsemMilhar(peso)

    var url = `http://loja.buiar.com/?key=8t4b2j&c=produto&t=inserir&categoria=${idCategoria}&codigo=${codigo}&nome=${nome}&descricao=${descricao}&peso=${peso}&preco=${preco}&imagem=${imagem}&f=json`

    criarRequest(url, 'incluirProduto')
    limparCampos()
    listarProdutos()

}

function excluirCategoria () {
    
    var id = document.getElementById('inputListaExcluir').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=categoria&t=remover&id=${id}&f=json`
    
    criarRequest(url, 'excluirCategoria')
    limparCampos()
    listarCategorias()
    
}

function excluirProduto () {

    var id = document.getElementById('inputListaPExluir').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=produto&t=remover&id=${id}&f=json`

    criarRequest(url, 'excluirProduto')
    limparCampos()
    listarProdutos()

}

function alterarCategoria () {
    
    var id = document.getElementById('inputListaCAlterar').value.toString()
    var nome = document.getElementById('nomeCategoriaAlterar').value.toString()
    var url = `http://loja.buiar.com/?key=8t4b2j&c=categoria&t=alterar&id=${id}&nome=${nome}&f=json`

    criarRequest(url, 'alterarCategoria', -1)
    limparCampos()
    listarCategorias()

}

function alterarProduto () {

    var id = document.getElementById('inputListaProdAlterar').value.toString()
    var nome = document.getElementById('nomeProdutoAlterar').value.toString()
    var codigo = document.getElementById('codigoProdutoAlterar').value.toString()
    var descricao = document.getElementById('descricaoProdutoAlterar').value.toString()
    var preco = document.getElementById('precoProdutoAlterar').value.toString()
    var imagem = document.getElementById('imagemProdutoAlterar').value.toString()
    var peso = document.getElementById('pesoProdutoAlterar').value.toString()
    var idCategoria = document.getElementById('inputListaCPAlterar').value.toString()

    preco = formatarNumeroDotsemMilhar(preco)
    peso = formatarNumeroDotsemMilhar(peso)
    
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

function formatarNumerorDot(value) {
    value = convertToFloatNumber(value);
    return value.formatMoney(2, ',', '.');
}

function formatarNumeroVirg(value) {
    value = convertToFloatNumber(value);
    return value.formatMoney(2, ',', '.');
}

function formatarNumeroDotsemMilhar(value) {
    value = convertToFloatNumber(value);
    return value.formatMoney(2, '.', '');
}

var convertToFloatNumber = function(value) {
    value = value.toString();
     if (value.indexOf('.') !== -1 && value.indexOf(',') !== -1) {
         if (value.indexOf('.') <  value.indexOf(',')) {
            //inglês
            return parseFloat(value.replace(/,/gi,''));
         } else {
           //português
           return parseFloat(value.replace(/\./gi,'').replace(/,/gi,'.'));
         }      
     } else {
        return parseFloat(value);
     }
  }

  Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

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

function criarRequestPedido () {

    let id = document.getElementById('idPedido').value
    var url = `http://loja.buiar.com/?key=8t4b2j&c=item&t=listar&f=json&pedido=${id}`
    var request = new XMLHttpRequest()

    request.open('POST', url)
    request.responseType = 'json'
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            listarItensPedido(request.response)
        }
    }
    request.send()
}

function listarItensPedido (response) {

    limparPedidos()
    let dados = response.dados
    let total = 0

    let items = `
    <tr>
        <th>Imagem</th>
        <th>Nome</th>
        <th>Preço</th>
        <th>Quantidade</th>
    </tr>`

    for (let i = 0; i < dados.length; i++) {
        let prod = produtos[dados[i].produto]
        total += parseFloat(prod.preco* dados[i].qtd)

        items += `
        <tr id="modeloItem">
            <td name="iconeItem"><img height="25px" src="${prod.imagem}"></td>
            <td name="nomeItem">${prod.nome}</td>
            <td name="precoItem">R$${Number(prod.preco).toFixed(2)}</td>
            <td name="quantidadeItem">${dados[i].qtd}</td>
        </tr>`
    }
    items += `<tr><td colspan="4" style="text-align: center">Total: R$${Number(total).toFixed(2)}</td></tr>`
    document.getElementById("tabelaPedido").innerHTML = items
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
    let listaAlterar = document.getElementById('listaCategoriasAlterar')
    let listaExcluir = document.getElementById('listaCategoriasExcluir')
    let dados = requestCategorias.response.dados

    for (let i = 0; i < dados.length; i++) {

        let option = document.createElement('option')
        let option1 = document.createElement('option')
        let option2 = document.createElement('option')
        let option3 = document.createElement('option')

        option.innerText = dados[i].nome
        option.value = dados[i].id
        option1.innerText = dados[i].nome
        option1.value = dados[i].id
        option2.innerText = dados[i].nome
        option2.value = dados[i].id
        option3.innerText = dados[i].nome
        option3.value = dados[i].id
        listaCp.appendChild(option)
        listaCpAlterar.appendChild(option1)
        listaAlterar.appendChild(option2)
        listaExcluir.appendChild(option3)
    }
}

function carregarProdutos(){
    let lista1 = document.getElementById('listaProdutosExcluir')
    let lista2 = document.getElementById('listaProdutosAlterar')

    let dados = requestProduto.response.dados

    for (let i = 0; i < dados.length; i++) {

        let option1 = document.createElement('option')
        let option2 = document.createElement('option')

        option1.innerText = dados[i].nome
        option1.value = dados[i].id
        option2.innerText = dados[i].nome
        option2.value = dados[i].id
        lista1.appendChild(option1)
        lista2.appendChild(option2)
        produtos[dados[i].id] = dados[i]
    }
    console.log(produtos)
}

function preencheNome(){
    let id = document.getElementById('inputListaProdAlterar')
    console.log(id.value)
    if(id.value)
    {
        let nome = document.getElementById('nomeProdutoAlterar')
        let codigo = document.getElementById('codigoProdutoAlterar')
        let descricao = document.getElementById('descricaoProdutoAlterar')
        let preco = document.getElementById('precoProdutoAlterar')
        let imagem = document.getElementById('imagemProdutoAlterar')
        let peso = document.getElementById('pesoProdutoAlterar')
        let categoria = document.getElementById('inputListaCPAlterar')
    
        nome.value = produtos[id.value].nome
        codigo.value = produtos[id.value].codigo
        descricao.value = produtos[id.value].descricao
        preco.value = produtos[id.value].preco
        imagem.value = produtos[id.value].imagem
        peso.value = produtos[id.value].peso
        categoria.value = produtos[id.value].categoria
        console.log(produtos[id.value].nome)
    }
}

function selecionarPagina(opcao){
    document.getElementById('paginaListarCategorias').style.display = 'none'
    document.getElementById('paginaIncluirCategoria').style.display = 'none'
    document.getElementById('paginaExcluirCategoria').style.display = 'none'
    document.getElementById('paginaAlterarCategoria').style.display = 'none'
    document.getElementById('paginaListarProdutos').style.display = 'none'
    document.getElementById('paginaInserirProduto').style.display = 'none'
    document.getElementById('paginaExcluirProduto').style.display = 'none'
    document.getElementById('paginaAlterarProduto').style.display = 'none'
    document.getElementById('paginaListarPedidos').style.display = 'none'
    document.getElementById('paginaDetalhePedidos').style.display = 'none'
    if(opcao == 'listCat'){
        document.getElementById('paginaListarCategorias').style.display = 'block'
    }
    else if(opcao == 'incluCat'){
        document.getElementById('paginaIncluirCategoria').style.display = 'block'
    }
    else if(opcao == 'excluCat'){
        document.getElementById('paginaExcluirCategoria').style.display = 'block'
    }
    else if(opcao == 'altCat'){
        document.getElementById('paginaAlterarCategoria').style.display = 'block'
    }
    else if(opcao == 'listProd'){
        document.getElementById('paginaListarProdutos').style.display = 'block'
    }
    else if(opcao == 'incluProd'){
        document.getElementById('paginaInserirProduto').style.display = 'block'
    }
    else if(opcao == 'excluProd'){
        document.getElementById('paginaExcluirProduto').style.display = 'block'
    }
    else if(opcao == 'altProd'){
        document.getElementById('paginaAlterarProduto').style.display = 'block'
    }
    else if(opcao == 'listPed'){
        document.getElementById('paginaListarPedidos').style.display = 'block'
    }
    else if(opcao == 'listItens'){
        document.getElementById('paginaDetalhePedidos').style.display = 'block'
    }
    else{
        console.log(opcao)
    }
}