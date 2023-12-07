
/**
 * 
 * @returns {Promise<{ name: string }>}$
 * remplacer l'api nijacat par la notre et rentrer les infos necessaires
 */
export async function GET() {
    try {
        //const reponse = await fetch(`${url}:${port}/${api}`);
        const reponse = await fetch("https://catfact.ninja/fact") // working url
        if (reponse.ok) {
            const json = await reponse.json();
            return await new Response(JSON.stringify({ name : json.length })) // TODO json.???
        } else {
            throw new Error(reponse.statusText);
        }
    } catch (error) {
        return new Response(JSON.stringify({ name : "KO" }))
    }
}