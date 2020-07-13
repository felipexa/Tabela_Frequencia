// Felipe Xavier, Aparicio Neto, Igor de Lara
window.onload = function(){ 
	document.getElementById("divNumeros").style.display = "block"; 
	document.getElementById("divTabela").style.display = "none"; 
}

novoArray = []

function inserir(){
	if(document.getElementById("numero").value !== ''){
		var numeros = Number(document.getElementById("numero").value)
		novoArray.push(numeros)
		document.getElementById("form1").reset();
		document.getElementById("numero").focus()

		var mostrar = document.getElementById('mostrar');
		mostrar.innerHTML = novoArray
	} else {
		alert('Insira um valor!')
	}
}

function entrar(){
	

	if(novoArray.length !== 0){
		document.getElementById("divNumeros").style.display = "none"; 
		document.getElementById("divTabela").style.display = "block"; 

		novoArray.sort(function(a, b) {
			return a - b;
		});

		var m = Math.min.apply(Math, novoArray);
		var M = Math.max.apply(Math, novoArray);
		var k = 1 + (3.3 * Math.log10(novoArray.length));

		var h = (Number(M) - Number(m))/ Number(k)
		var classes = k

		if(Number.isInteger(classes)){
			classes = classes
		} else {
			classes = Math.ceil(classes)
		}
		
		var decimal = Number((h - Math.floor(h)).toFixed(1))

		if(Number.isInteger(h)){
			intervalo = h
		} else {
			if(decimal === 0.0){
				intervalo = h.toFixed()
			} else {
				intervalo = Math.ceil(h)
			}
		}

		console.log(h)

		tabelaIntervalo = [];
		acesso = {
			inicio: 0,
			final: 0
		}

		let auxiliar = Number(m)

		for(var i = 0; i <= classes - 1; i++){
		
			var teste = auxiliar
			auxiliar = auxiliar + (Number(intervalo))
			acesso.inicio = teste
			acesso.final = auxiliar

			tabelaIntervalo[i] = acesso

			acesso = {
				inicio: 0,
				final: 0,
				frequencias: 0
			}
		}
		
		this.frequencias(tabelaIntervalo)
	} else {
		alert('Você não pode gerar uma tabela vazia!')
	}
}

function frequencias(tabelas){

	var teste = 0
	while(teste <= tabelas.length - 1){
		var count = 0
		for(var j = 0; j <= novoArray.length-1; j++){
			if(novoArray[j] >= tabelas[teste].inicio && novoArray[j] < tabelas[teste].final){
				count = count + 1
			} else {
				continue
			}
		}
		tabelas[teste].frequencias = count
		teste = teste + 1
	}	
	console.log(tabelas)
	
	$("#dataTable").html("");
	$("#dataTable").html(
		"<thead>"+
		"	<tr>"+
		"	<th>Classes</th>"+
		"	<th>f</th>"+
		"	<th>F</th>"+
		"	<th>fr(%)</th>"+
		"	<th>FR(%)</th>"+
		"	</tr>"+
		"</thead>"+
		"<tbody style='border: none'>"+
		"</tbody>"+
		"<tfoot style='border-top: solid 2px #eeeeee;border-bottom: solid 2px #eeeeee'>"+
		"</tfoot>"
		);

	var acumulada = 0
	var totalFrequencia = 0
	for(var j = 0; j <= tabelas.length -1;j++){
		acumulada = acumulada + tabelas[j].frequencias
		totalFrequencia = totalFrequencia  + ((tabelas[j].frequencias / novoArray.length) * 100)
		if(tabelas[j].frequencias !== 0){
			$("#dataTable tbody").append(
				"	<tr style='color:red;'>"+
				"	<td>"+tabelas[j].inicio+" - "+tabelas[j].final+"</td>" + 
				"	<td>"+tabelas[j].frequencias+"</td>" + 
				"	<td>"+acumulada+"</td>" + 
				"	<td>"+((tabelas[j].frequencias / novoArray.length) * 100).toFixed(2)+"</td>" + 
				"	<td>"+((acumulada / novoArray.length) * 100).toFixed(2)+"</td>" + 											
				"</tr>"
			);
		}
		
	}

	$("#dataTable tfoot").append(
		"	<tr>"+
		"	<th>Total</th>" + 
		"	<td>"+novoArray.length+"</td>" +
		"	<td></td>" +	
		"	<td>"+(totalFrequencia).toFixed()+"%</td>" +	
		"	<td></td>" +								
		"</tr>"
	);
	
}

function limpar(){
	novoArray= []
	mostrar.innerHTML = novoArray
}

function voltar(){
	novoArray= []
	mostrar.innerHTML = novoArray
	document.getElementById("divNumeros").style.display = "block"; 
	document.getElementById("divTabela").style.display = "none"; 
}