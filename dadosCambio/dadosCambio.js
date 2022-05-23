var requestURL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?'@moeda=''&@dataCotacao=''&$format=json"
var request = new XMLHttpRequest()

request.open('GET', requestURL)
request.responseType('json')
request.send()
request.onload = function() {

    mostrarTabela(request.response)

}

function mostrarTabela (c) {

    let tabela = document.getElementById('tabela')

    for (k = 0; k < c.length; k++) {

        let tr = document.createElement('tr')
        tabela.appendChild(tr)
        let td = document.createElement('td')
        td.innerText = c[k].dataHoraCotacao
        tr.appendChild(td)
        td = document.createElement('td')
        td.innerText = c[k].cotacaoCompra
        tr.appendChild(td);

    }

}