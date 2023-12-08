<script>
    // TODO renommé le fichier pour differencier de la route /tournee ???
    
    /** @type {string} */
    export let nomTournee;
    /** @type {string} */
    export let livreur;

    /** @type {() => void} */
    export let supprimerTournee;
</script>

<div class="tournee ligneItem">
    <h3>Tournée : {nomTournee}</h3>
    <p>Livreur : {livreur} <button on:click={supprimerTournee}>x</button></p>
</div>