function Jogo(dados = 5,lados = 6){
	console.log('model: executar constructor de jogo');
	this.dados = dados;
	this.lados = lados;
	this.pontos = 0;
	this.n = 0;
	this.contSemJogo = 0;
}

Jogo.prototype.novoJogo = function(){
	console.log('model: novoJogo');
	this.pontos = 0;
	this.n = 0;
}

Jogo.prototype.lancarUmDado = function(){
	var valorAleatorio = Math.random(); // No intervalo[ 0 e 1]
	var lado = 1 + Math.floor(valorAleatorio * (this.lados));
	return lado;
}

Jogo.prototype.lancarDados = function(){
	console.log('model: lancarDados');
	var lancamento = []
	for (var i = 0; i < this.dados; i++){
		lancamento[i] = this.lancarUmDado();
	}
	return lancamento;
}

Jogo.prototype.contarDados = function(lancamento){
	var contagem = Array(this.lados).fill(0);
	for (var i = 0; i < lancamento.length; i++){
		var numero = lancamento[i];
		contagem[numero-1] += 1;
	}
	return contagem;
	
}



const GENERALA = {jogo : 'Generala', pontos : 100}
const POKER = {jogo : 'poker', pontos : 50}
const FULL = {jogo : 'Full', pontos : 30}
const NADA = {jogo : 'Nenhum', pontos : 0}

Jogo.prototype.analisarLancamento = function(lancamento){

	var contagem = this.contarDados(lancamento);

	var resultado;

	if ( contagem.find(e => e === 5) ){
		resultado = GENERALA;
	
	this.pontuou = true;
}
	else if ( contagem.find(e => e === 4) ){
		resultado = POKER;
	
	this.pontuou = true;
	}

	else if ( contagem.find(e => e === 3) && contagem.find(e =>e ===2) ){
		resultado = FULL;
	
	this.pontuou = true;
}

	else 
		resultado = NADA;
	


	return resultado;
}


	
Jogo.prototype.novoLancamento = function(){
	console.log('model: novoLancamento');
	var lancamento = this.lancarDados();
	console.log('model: analisarLancamento');
	var analisarLancamento = this.analisarLancamento(lancamento);
	this.pontos += analisarLancamento.pontos;

	var interacao = this.interacao(analisarLancamento);

	console.log('model: prepara resultado');

	var resultado = {
		pontosAcumulados : this.pontos,
		nLancamentos : this.n,
		lancamento : lancamento,
		jogoLancamento : analisarLancamento.jogo,
		pontosLancamento : analisarLancamento.pontos,
		contSemJogo : interacao.contSemJogo,
		msg : interacao.msg,
		pontuou : this.pontuou
		
	};
	/*this.n += 1;
	if (analisarLancamento.pontos == 0)
		this.contSemJogo += 1;
	else
		this.contSemJogo = 0;
	msg = "";
	// se o resto da divisão de contSemJogo por 5 for 0
	if(this.contSemJogo > 0 && this.contSemJogo == 5 )
		msg = "Voce esta sem sorte";
	else if(this.contSemJogo > 0 && this.contSemJogo == 10 )
		msg = "pqp se é muito rum";*/

	return resultado;
}

Jogo.prototype.interacao = function(analisarLancamento){
	console.log('model: interacao');
	console.log('model: analisarLancamento');
		this.n += 1;
	if (analisarLancamento.pontos == 0)
		this.contSemJogo += 1;
	else
		this.contSemJogo = 0;
	msg = "";
	// se o resto da divisão de contSemJogo por 5 for 0
	if(this.contSemJogo > 0 && this.contSemJogo == 5 )
		msg = "Nada ainda ? Voce esta sem sorte :(";
	else if(this.contSemJogo > 0 && this.contSemJogo == 10 )
		msg = "Realmente hoje não é o seu dia hehe...";
	else if(this.contSemJogo > 0 && this.contSemJogo == 15 )
		msg = "Ja pensou em tentar fazer outra coisa?...";
	else if(this.contSemJogo > 0 && this.contSemJogo == 20 )
		msg = "Ta bom chega...va no google e pesquise:Jogo da velha";
	var resultado = {
		contSemJogo : this.contSemJogo,
		msg : msg
	};
	return resultado;

	
}



jogo = new Jogo();
lancamento = jogo.lancarDados();
contagem = jogo.contarDados(lancamento);
resultado = jogo.analisarLancamento(lancamento);
console.log('Dados sorteados:', lancamento);
console.log('Contagem:', contagem);
console.log('analise do lançamento', resultado);
module.exports.Jogo = Jogo;