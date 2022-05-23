var requestURL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='04-07-2021'&@dataFinalCotacao='07-20-2021'&$top=10000&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao"
var request = new XMLHttpRequest()

request.open('GET', requestURL)
request.responseType = 'json'
request.send()
request.onload = function() {

    console.log(request.response)
    mostrarTabela(request.response)

}

function mostrarTabela (v) {

    let tabela = document.getElementById('tabela')

    for (k = 0; k < v.value.length; k++) {

        let tr = document.createElement('tr')
        tabela.appendChild(tr)
        let td = document.createElement('td')
        td.innerText = v.value[k].dataHoraCotacao
        tr.appendChild(td)
        td = document.createElement('td')
        td.innerText = v.value[k].cotacaoVenda
        tr.appendChild(td);

    }

}