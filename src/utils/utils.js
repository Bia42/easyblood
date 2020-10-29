import Cookies from 'universal-cookie';

export const URL_BASE = "https://doemais-prd.herokuapp.com";
export const cookies = new Cookies();

export function novoRequestInfo(body) {
    let auth = localStorage.getItem("Authorization");
    if(auth == null)
        return null;

    return {
        headers:{
            Authorization: auth
        },
        body: body
    };
}

export function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

export function usuarioLogado() {
    var patrocinador =localStorage.getItem('Dados');

    return patrocinador;
}

export function decodeBase64Image(dataString) {
    console.log(dataString);
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
  }

export function validaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    var i;
  if (strCPF == "00000000000") return false;
     
  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export function validaTelefone(strTel) {
    var regex = new RegExp('^\\(((1[1-9])|([2-9][0-9]))\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$'); 
    if (regex.test(strTel)) { 
        return true;
    }
    else return false;
}

export function logout() {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("Dados");

}

export function setCookie(userLogado) {
  cookies.set('userLogado', userLogado, { path: '/' });
}

export function getCookie() {
  return cookies.get('userLogado');
}

export function retornaDataHoraAtual(){
  var dNow = new Date();
  var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1)  + '-' + dNow.getDate();
  return localdate;
  }