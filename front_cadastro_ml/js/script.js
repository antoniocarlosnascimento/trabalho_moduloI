/* 
* Projetos desenvolvidos (quero que desenvolvam pelo menos esse):
    * Formulário de cadastro no Mercado Livre:
    * Dados pessoais (validação de email, CPF, ...);
    * Endereço (fazer consulta de CEP utilizando AJAX - JQuery);
    *  Cartão de Crédito (igual ao do mercado livre) com preenchimento dos dados na imagem de um cartão (ao digitar no campo), inclusive fazendo FLIP para preencher o código de segurança na parte de trás;
    * Formação Acadêmica.
*/

// Flip cartão
// ==================================
const selecaoElemento = document.querySelector('#cod');
const cardVerso = document.querySelector('.cadastro__cartao__verso');
const cardFrente = document.querySelector('.cadastro__cartao__frente')

const imputsForm = document.querySelectorAll('.form');

imputsForm.forEach((item) => {
  item.addEventListener('focus', function(){
    cardVerso.classList.remove('flip');
    cardFrente.classList.add('flip');    

    // cardVerso.style.display = "none";
    cardFrente.style.display = "";
  })
})

selecaoElemento.addEventListener('focus', function(){
  cardVerso.classList.add('flip');
  cardFrente.classList.remove('flip');

  // cardVerso.style.display = "";
  cardFrente.style.display = "none";
  
});


// Dados do cartao
// ==================================
function alterarDadosCartao(input, campoCartao) {
  $(input).on('keyup', function(){
    const value = $(input).val();
    $(campoCartao).text(value);
  })
}
alterarDadosCartao('input[name="numero_cartao"]', '.numero_cartao');
alterarDadosCartao('input[name="titular_cartao"]', '.nome_cartao');
alterarDadosCartao('input[name="venc"]', '.data_vencimento');
alterarDadosCartao('input[name="cod"]', '.cod_cartao p');



// Mascara de campo
// ==================================
$(function(){
  // $('#cpf').mask('000.000.000-00')
  $('#rg').mask('00.000.000-0')
  $('#fone').mask('(00)0000-0000')
  $('#celular1').mask('(00)00000-0000')
	$('#celular2').mask('(00)00000-0000')
	$('#cep').mask('00000-000')
	
  $('#numero_cartao').mask('0000 0000 0000 0000')
  $('#venc').mask('00/00')
  $('#cod').mask('000')
})

// Validador de CPF
// ==================================
class ValidarCpf {
  constructor(element){
    this.element = element;
  }
  limpar(cpf){
    return cpf.replace(/\D/g, '');
  }
  construir(cpf){
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
  formatar(cpf){
    const cpfLimpo = this.limpar(cpf);
    return this.construir(cpfLimpo);
  }
  validar(cpf){
    const matchCpf = cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/);
    return (matchCpf && matchCpf[0] === cpf)
  }
  validarNaMudanca(cpfElement){
    if(this.validar(cpfElement.value)){
      cpfElement.value = this.formatar(cpfElement.value);
      cpfElement.classList.add('valido');
      cpfElement.classList.remove('erro');
      cpfElement.nextElementSibling.classList.remove('ativar');
    }else{
      cpfElement.classList.remove('valido');
      cpfElement.classList.add('erro');

      cpfElement.nextElementSibling.classList.add('ativar');
    }
  }
  adicionarEvento(){
    this.element.addEventListener('change', () =>{
      this.validarNaMudanca(this.element);
    })
  }
  adicionarErroSpan(){
    const erroElement = document.createElement('span');
    erroElement.classList.add('erro-text');
    erroElement.innerText = 'CPF inválido';
    this.element.parentElement.insertBefore(erroElement, this.element.nextElementSibling);
  }
  iniciar(){
    this.adicionarEvento();
    this.adicionarErroSpan();
    return this;
  }
}

const cpf = document.querySelector('#cpf')
const validaCpf = new ValidarCpf(cpf).iniciar();


// Validação email
// ==================================
function validacaoEmail(field) {
  usuario = field.value.substring(0, field.value.indexOf("@"));
  dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
      document.getElementById("msgemail").innerHTML = "";
  } else 
    document.getElementById("msgemail").innerHTML = "<font color='red'>E-mail inválido </font>";  
}


// Busca Cep
// =============================
$(document).ready(function(){
	$("#cep").on("change", function(){
		if(this.value){
			$.ajax({
				url: 'http://api.postmon.com.br/v1/cep/'+this.value,
				dateType: "json",
				crossDomain: true,
					statusCode:{
						200: function(data){

							$("#cep").addClass("is-valid");
							$("#endereco").val(data.logradouro);
							$("#bairro").val(data.bairro);
							$("#cidade").val(data.cidade);
							$("#estado").val(data.estado);
						},
						404:function(data){
							alert("Cep inválido");
						}
					}
			})
		}
	});
});