function buscarCep() {
	let url = 'https://viacep.com.br/ws/' + cep.value + '/json';
    console.log("acessando " + url);
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
  	    let data = request.response;
  	    console.log(request.response);
        logradouro.value = data.logradouro;
        bairro.value = data.bairro;
        cidade.value = data.cidade;
        uf.value = data.uf;
    };
	
} 