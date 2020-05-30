export const URL_BASE = "https://doemais-hom.herokuapp.com";

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


export function imageToBase64(img)
{
    var canvas, ctx, dataURL, base64;
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL("image/png");
    base64 = dataURL.replace(/^data:image\/png;base64,/, "");
    return base64;
}

export function logout() {
    localStorage.removeItem("Authorization");
}

