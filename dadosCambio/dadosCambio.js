var requestURL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='04-07-2021'&@dataFinalCotacao='07-20-2021'&$top=10000&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao"

var options = {
    
    title: 'Cotação de venda',
    legend: { position: 'bottom' }
  
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function makeRequest(url, k, r, m, moeda)
{
    var request = new XMLHttpRequest()

    request.open('GET', url)
    request.responseType = 'json'
    request.send()
    request.onload = function()
    {
        addK(k)
        r.push({moeda: moeda, response: request.response})

        if(k.value == m.length)
        {
            mostrarTabela(r, m)
        }
    }
}

function addK(k)
{
    k.value = k.value + 1
}

function atualizarURL() {
    
    var checkboxs = document.querySelectorAll('input.moedas')
    var moedas = []
    var url = []    
    var dataInicial = document.getElementById('dataInicial').value.toString()
    var dataFinalCotacao = document.getElementById('dataFinalCotacao').value.toString()
    
    for( var i = 0; i < checkboxs.length; i++)
    {
        if(checkboxs[i].checked)
        {
            moedas.push(checkboxs[i])
            url.push(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${checkboxs[i].value}'&@dataInicial='${dataInicial}'&@dataFinalCotacao='${dataFinalCotacao}'&$top=10000&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao`)
        }
    }
    
    var resposta = []
    var k = {value: 0}

    for( var i = 0; i < moedas.length; i++)
    {
        var moeda = moedas[i].value
        makeRequest(url[i], k, resposta, moedas, moeda)
        console.log(k.value)
    }

}

function drawChart(v, m) {

    var chart = new google.visualization.LineChart(document.getElementById('grafico'));

    if(m.length == 1)
        {
            var dados = [ ['dataHoraCotacao', v[0].moeda] ]
        }
        if(m.length == 2)
        {
            var dados = [ ['dataHoraCotacao', v[0].moeda, v[1].moeda] ]
        }
        if(m.length == 3)
        {
            var dados = [ ['dataHoraCotacao', v[0].moeda, v[1].moeda, v[2].moeda] ]
        }
    
    for (i = 0; i < v[0].response.value.length; i++) {
        if(m.length == 1)
        {
            dados.push( [
                v[0].response.value[i].dataHoraCotacao,
                parseFloat(v[0].response.value[i].cotacaoVenda)
            ]);
        }
        if(m.length == 2)
        {
            dados.push( [
                v[0].response.value[i].dataHoraCotacao,
                parseFloat(v[0].response.value[i].cotacaoVenda),
                parseFloat(v[1].response.value[i].cotacaoVenda)
            ]);
        }
        if(m.length == 3)
        {
            dados.push( [
                v[0].response.value[i].dataHoraCotacao,
                parseFloat(v[0].response.value[i].cotacaoVenda),
                parseFloat(v[1].response.value[i].cotacaoVenda),
                parseFloat(v[2].response.value[i].cotacaoVenda)
            ]);
        }
    }

    var dadosGC = google.visualization.arrayToDataTable(dados);					
    chart.draw(dadosGC, options);

}

function mostrarTabela (v, m) {

    let tabela = document.getElementById('tBody')

    let tr = document.createElement('tr')
    tr.setAttribute("id","linhaTabela")
    tabela.appendChild(tr)

    let th = document.createElement('th')
    th.innerText = 'Data e hora'
    tr.appendChild(th)

    for(var i = 0; i < m.length; i++)
    {
        let th = document.createElement('th')
        th.innerText = v[i].moeda
        tr.appendChild(th)
    }

    for (k = 0; k < v[0].response.value.length; k++) {

        let tr = document.createElement('tr')
        tr.setAttribute("id","linhaTabela")
        tabela.appendChild(tr)

        let td = document.createElement('td')
        td.innerText = v[0].response.value[k].dataHoraCotacao
        tr.appendChild(td)
        for(var i = 0; i < m.length; i++)
        {
            td = document.createElement('td')
            td.innerText = v[i].response.value[k].cotacaoVenda
            tr.appendChild(td);
        }

    }

    drawChart(v, m)
}

function limparTabela()
{
    let tabela = document.getElementById('tabela')
    let tBody = document.getElementById('tBody')
    
    let new_tbody = document.createElement('tbody')
    new_tbody.setAttribute("id", "tBody")
    tabela.replaceChild(new_tbody, tBody)
}