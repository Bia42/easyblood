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

export function logout() {
    localStorage.removeItem("Authorization");
}

