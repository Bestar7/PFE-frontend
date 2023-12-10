<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import Tournee from "$lib/Components/Tournee.svelte";
  import { onMount } from "svelte";

  /**
  * @typedef {import("$lib/Model/Tournee").Tournee} Tournee
  */

  onMount(() => {
    getTourneesDate();
  });

  /** @type {Tournee[]} */
  let tournees = [];
  let datePicked = new Date().toLocaleDateString('en-CA'); // = date.now() avec format YYY-MM-DD comme l'input du form
  async function getTourneesDate() {
    tournees = await (await fetch(`tournees/date/${datePicked}`)).json();
    console.log("tournees", tournees);
  }

  function handleDateSearch() {
    getTourneesDate();
    selectedTab = tabs.TourneeDate;
  }
  function handleDefault() {
    // TODO search tournee for this date GET /Tournee/default}
    selectedTab = tabs.TourneeDefault;
    console.log("selectedTab", selectedTab);
  }

  const tabs = {
    TourneeDate: "TourneeDate",
    TourneeDefault: "TourneeDefault",
    TourneeSupplement: "TourneeSupplement",
  };
  function eventHandler() {
    window.location.href = "/";
  }
  let selectedTab = tabs.TourneeDate;

</script>

<Navbar />
<!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<div class="container">
  <div class="centered">
    <div>
      
      <div class="tab-selection">
        <form>
          <input type="date" name="dateTournee" on:change={handleDateSearch} bind:value={datePicked} />
        </form>
        <div class="button">
          <!--TODO Button or a:link ??-->
          <button on:click={handleDefault}>Tournées par défaut</button>
        </div>
      </div>

      {#if selectedTab==tabs.TourneeDate}
      <h2>Tournée du {datePicked}</h2>
      {:else}
      <h2>Tournée par défaut</h2>
      {/if}

      <table class="tab-infos">
        <thead>
          <th>Tournee</th>
          <th>Livreur</th>
          <th>Date</th>
          <th>Statut</th>
        </thead>
        <tbody>
        {#each tournees as tournee (tournee)}
        <!-- warning car il n'aime pas que un div soit clickable, ok si c est un button mais alors il faut modifier CSS-->
        <!-- TODO affihcer la bonne nouvelle page /tournees/id-->
          <tr onclick={() => eventHandler()}>
            <td>{tournee.nom}</td>
            <td>{tournee.prenom_livreur}</td>
            <td>{tournee.date}</td>
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
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    margin: 0;
  }

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

    justify-content: space-between;
    width: 500px;
  }

  .left-column,
  .right-column {
    width: 100%;
    margin-top: 10px;
  }

  .flex-container {
    display: flex;
    justify-content: space-between;
  }

  .data-table {
    margin-bottom: 20px;
  }

  table {
    border-collapse: collapse;
    width: 400px;
    margin: 20px;
  }

  th,
  td {
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
    justify-content: space-around;
    margin-top: 20px;
  }

  .date-input {
    width: 100%;
  }

  label,
  span {
    display: inline-block;
    margin-bottom: 8px;
  }
</style>
