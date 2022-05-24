var requestURL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='04-07-2021'&@dataFinalCotacao='07-20-2021'&$top=10000&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao"


var dados = [ ['dataHoraCotacao', 'cotacaoVenda'] ]
var options = {

    title: 'Cotação de venda',
    legend: { position: 'bottom' }
  
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


function atualizarURL() {

    var moeda = document.getElementById('moeda').value.toString()
    var dataInicial = document.getElementById('dataInicial').value.toString()
    var dataFinalCotacao = document.getElementById('dataFinalCotacao').value.toString()
    var url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${moeda}'&@dataInicial='${dataInicial}'&@dataFinalCotacao='${dataFinalCotacao}'&$top=10000&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao`
    
    console.log(url)

    var request = new XMLHttpRequest()

    request.open('GET', requestURL)
    request.responseType = 'json'
    request.send()
    request.onload = function() {

        console.log(request.response)
        mostrarTabela(request.response)

    }

}

function drawChart() {

    var chart = new google.visualization.LineChart(document.getElementById('grafico'));
    var request = new XMLHttpRequest();
        
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {			

        let dadosJson =  request.response.value;
        for (k=0; k<dadosJson.length; k++) {

            dados.push( [
                dadosJson[k].dataHoraCotacao,
                parseFloat(dadosJson[k].cotacaoVenda)
            ]);

        }

        var dadosGC = google.visualization.arrayToDataTable(dados);					
        chart.draw(dadosGC, options);

    }

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