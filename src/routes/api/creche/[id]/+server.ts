import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

/* this GET one creche by id  // TODO move in correct /api/folder
const apiRoute = "creches";
export async function GET({params}) {
    try {
        const reponse = await fetch(`${host}/${apiRoute}/${params.id}`);
        if (reponse.ok) {
            const json = await reponse.json();
            return jsonResponse(json)
        } else {
            throw new Error(reponse.statusText);
        }
    } catch (error) {
        return new Response(JSON.stringify("KO")) // TODO handle error
    }
}
*/

const apiRoute = "creches"; // TODO move in correct /api/folder
async function getAllCrecheInfo(id_creche: string){
    try {
        const reponse = await fetch(`${host}/${apiRoute}/${id_creche}`);
        if (reponse.ok) {
            const json = await reponse.json();
            return json
        } else {
            throw new Error(reponse.statusText);
        }
    } catch (error) {
        return "KO" // TODO handle error
    }
}

async function getAllArticles(){
    try {
        const reponse = await fetch(`${host}/articles`); // todo extract articles
        if (reponse.ok) {
            const json = await reponse.json();
            return json
        } else {
            throw new Error(reponse.statusText);
        }
    } catch (error) {
        return "KO" // TODO handle error
    }
}

export async function GET({params}) {
    const creche = await getAllCrecheInfo(params.id)
    const articles = await getAllArticles()
    return jsonResponse({ creche: creche, articles: articles})
}