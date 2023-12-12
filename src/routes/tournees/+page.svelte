<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  /**
   * @typedef {import("$lib/Model/Tournee").Tournee} Tournee
   */
  
  const tabs = {
    TourneeDate: "TourneeDate",
    TourneeDefault: "TourneeDefault",
    TourneeSupplement: "TourneeSupplement",
  };
  let selectedTab = tabs.TourneeDate;
  let datePicked = new Date().toLocaleDateString("en-CA"); // = date.now() avec format YYY-MM-DD comme l'input du form

  /** @type {Tournee[]} */
  let tournees = [];
  onMount(() => {
    getTourneesDate();
    console.log("getTourneesDate", tournees);
  });

  async function getTourneesDate() {
    const response = await fetch(`/api/tournees/date/${datePicked}`);
    tournees = await response.json();
  }
  async function getTourneesDefault() {
    const response = await fetch(`/api/tournees/default/${datePicked}`); //TODO verifier path
    tournees = await response.json();
  }

  function handleDateChange() {
    getTourneesDate();
    selectedTab = tabs.TourneeDate;
    console.log("tournee", tournees)
  }
  function handleDefault() {
    getTourneesDefault();
    selectedTab = tabs.TourneeDefault;
  }

  /**
   * @param {Tournee} tournee
   */
  function eventHandler(tournee) {
    sessionStorage.setItem("idTournee", tournee.id_tournee);
    console.log("ici", sessionStorage.getItem("idTournee"));
    goto(`/tournees/${tournee.id_tournee}`);
  }
</script>

<Navbar />
<div class="container"><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
  <div class="centered">
    <div class="tab-selection">
      <input type="date" on:change={handleDateChange} bind:value={datePicked} />
      <button on:click={handleDefault}>Tournées par défaut</button>
    </div>
    <div class="show-tournee">
      <h2>Tournée du {datePicked}</h2>
      <table>
        <tbody>
          {#each tournees as tournee}
          <tr on:click={()=>eventHandler(tournee)} class="tab-infos">
            <td>{tournee.prenom_livreur} {tournee.nom_livreur}</td>
            <td>{tournee.date}</td>
            <td>{tournee.nom}</td>
            <td>{tournee.statut}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <button on:click={() => history.back()}>Retour</button>
</div>


<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tab-infos {
    border: 1px solid #ddd; /* Ajoute une bordure autour du conteneur */
    padding: 10px; /* Ajoute de l'espace intérieur pour le contenu */
    margin-bottom: 10px;
    background-color: #f2f2f2; /* Ajoute une couleur de fond grise */
    display: flex;
    justify-content: space-between;
    width: 500px;
  }

  table {
    border-collapse: collapse;
    width: 400px;
    margin: 20px;
  }
</style>
