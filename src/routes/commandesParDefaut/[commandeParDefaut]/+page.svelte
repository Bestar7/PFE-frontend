<script>
    import Navbar from "$lib/Components/Navbar.svelte";
    import { host } from "$lib/Api/config";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    
    let idCommandeParDefaut;
    let commandeParDefaut = [];
    let tourneeParDefaut = [];
    let creche = [];
    let maxOrdre;

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
        getMaxOrdre(tourneeParDefaut.id_tournee_par_defaut)

        } catch (error) {
        console.error(error);
        }
    }

    async function changeOrder(id_commandeParDefaut, newOrdre){
        try {
      const response = await fetch(`${host}/commandesParDefaut/${id_commandeParDefaut}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_ordre: newOrdre,
        }),
      });
      console.log("New ordre: " + await response.json())
      getCommandeParDefaut(idCommandeParDefaut)
 

    } catch (error) {
      console.error('Error during update:', error);
      // Handle any network or other errors here
    }
    }

    export async function getMaxOrdre(id) {
    try {
      const response = await fetch(`${host}/commandesParDefaut/tourneeParDefaut/${id}`);
      const data = await response.json();
      console.log(data); // Handle the fetched data as needed
      maxOrdre = data.length
      console.log("Max ordre: " + maxOrdre)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

    

</script>
<Navbar/>
<h1> Commande par défaut </h1>
<h3>Tournee : {tourneeParDefaut.nom_par_defaut}</h3>
<h3>Creche : {creche.nom}</h3>
<h3>Ordre :
    <input type="number" bind:value={commandeParDefaut.ordre} min="1" max="{maxOrdre}"/>
    <button
        on:click={() =>
        changeOrder(commandeParDefaut.id_commande_par_defaut, commandeParDefaut.ordre)}
    >Sauvegarder</button>
</h3>
<button on:click={() => goto(`/creches/${creche.id_creche}`)}>Modifier les articles par defaut</button>
