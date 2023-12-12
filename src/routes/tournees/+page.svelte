<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  /**
   * @typedef {import("$lib/Model/Tournee").Tournee} Tournee
   */

  let datePicked = new Date().toLocaleDateString("en-CA"); // = date.now() avec format YYY-MM-DD comme l'input du form

  /** @type {Tournee[]} */
  let tournees = [];
  onMount(() => {
    getTourneesDate();
    console.log("onMount", tournees);
  });

  async function getTourneesDate() {
    const response = await fetch(`/api/tournees/date/${datePicked}`);
    tournees = await response.json();
  }

  function handleDateChange() {
    getTourneesDate();
    console.log("handleDateChange", tournees)
  }

  /**
   * @param {Tournee} tournee
   */
  function selectTournee(tournee) {
    goto(`/tournees/${tournee.id_tournee}`);
  }
</script>

<Navbar />
<div class="container"><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
  <div class="centered">

    <input type="date" on:change={handleDateChange} bind:value={datePicked} />

    <h2>Tournée du {datePicked}</h2>

    <div class="show-tournees">
      <table>
        <tbody>
          {#each tournees as tournee}
          <tr on:click={()=>selectTournee(tournee)} class="tab-infos">
            <td>{tournee.prenom_livreur} {tournee.nom_livreur}</td>
            <td>{tournee.date}</td>
            <td>{tournee.nom}</td>
            <td>{tournee.statut}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <button on:click={() => history.back()}>Retour</button>
  </div>
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
