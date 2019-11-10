export const URL_BASE = "http://localhost:8080";

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