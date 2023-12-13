<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Navbar from "$lib/Components/Navbar.svelte";
  import { goto } from "$app/navigation";

  export let isDefault = false;

  const idTournee = $page.params.tournee;
  const idCreche = $page.params.creche;
  let commandes = [];

  let role = "admin";
  
  onMount(async () => {
    await getCommande(idTournee);
    cleanCommande();
    console.log("cleanCommande", commandes)
  });

  async function getCommande(idTournee) {
    const response = await fetch(`/api/commandes/${idTournee}`);
    commandes = await response.json();
    console.log("getCommande", commandes)
  }

  function cleanCommande(){
    commandes.forEach((commande)=>{ 
      if (commande.creche.id_creche == idCreche)
      commandes = commande; // TODO PAS CORRECT DE MODIFIER List pendant son propre forEach
    })
  }

  function modifyOrder(isDefault){
    if (isDefault)
      goto(`/creches/${idCreche}`)
    else
      goto(`/commandes/${commandes.id_commande}/${idCreche}`) // TODO modifier la route
  }

</script>

<Navbar />
<div class="container">
  <div class="tab-infos">
    <div class="left-column">

      <ul>
        <label for="tournee"> Tournee : </label>
        <span id="tournee">{commandes?.tournee?.nom ?? commandes?.tournee?.id_tournee}</span>
      </ul>

      <ul>
        <label for="creche"> Creche : </label>
        <span id="creche">{commandes?.creche?.nom ?? commandes?.creche?.id_creche}</span>
      </ul>

    </div>
    <div class="right-column">

      <ul>
        <label for="date"> Date : </label>
        <span id="date"> {commandes?.tournee?.date ?? ""}</span>
      </ul>

      <ul>
        <label for="ordre"> Ordre : </label>
        <span id="ordre"> {commandes?.tournee?.ordre ?? ""}</span>
      </ul>

      <ul>
        <label for="statut"> Statut : </label>
        <span id="statut"> {commandes?.tournee?.statut ?? ""}</span>
      </ul>

    </div>
  </div>

  {#if role !== "livreur"}
    <div class="buttons">
      <button on:click={() => modifyOrder(isDefault)}>
        Modifier la commande {#if isDefault}par défaut{:else}du {commandes?.tournee?.date}{/if}
      </button><!--TODO gere defaut/date avec un export boolean ?-->
    </div>
  {/if}
  <button on:click={() => history.back()}>Retour</button>
</div>

<style>

  table {
    border-collapse: collapse;
    width: 400px;
    margin: 20px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .data-table{
    margin-bottom:20px;
  }

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #333;
    color: #fff;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .buttons {
    display: flex;
    justify-content: space-around; /* Ajustement de l'espacement entre les boutons */

    margin-top: 20px; /* Ajout d'une marge en haut des boutons */
  }

  .tab-infos {
    display: flex;
    width: 400px;
  }

  .left-column, .right-column {
    width: 100%;
    margin-top: 10px; /* Ajout d'une marge entre les colonnes */
  }

  label, span {
    display: inline-block;
    margin-bottom: 8px;
  }
</style>
