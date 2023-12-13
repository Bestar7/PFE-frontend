<script>
    import Navbar from "$lib/Components/Navbar.svelte";
    import { host } from "$lib/Api/config";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    
    let idCommandeParDefaut;
    let commandeParDefaut = [];
    let tourneeParDefaut = [];
    let creche = [];

    onMount(() => {
        getIDCommandeParDefaut(),
        getCommandeParDefaut(idCommandeParDefaut)
    })


    async function getIDCommandeParDefaut(){
        const currentUrl = window.location.href;
        const id_CommandeParDefaut = currentUrl.split('/').pop();
        // console.log(idTourneeParDefaut);
        idCommandeParDefaut = id_CommandeParDefaut;
        console.log("Id commande " + idCommandeParDefaut)
    }


    async function getCommandeParDefaut(id){
        try {
            const response = await fetch(`${host}/commandesParDefaut/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        commandeParDefaut = await response.json();
        tourneeParDefaut = commandeParDefaut.tournee_par_defaut
        creche = commandeParDefaut.creche

        } catch (error) {
        console.error(error);
        }
    }

    

</script>
<Navbar/>
<h1> Commande par défaut </h1>
<h3>Tournee : {tourneeParDefaut.nom_par_defaut}</h3>
<h3>Creche : {creche.nom}</h3>
<h3>Ordre : {commandeParDefaut.ordre}</h3>
<button on:click={() => goto(`/creches/${creche.id_creche}`)}>Click me</button>