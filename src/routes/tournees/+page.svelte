<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
    import TourneeTableau from "$lib/Components/TourneeTableau.svelte";

  /**
   * @typedef {import("$lib/Model/Tournee").Tournee} Tournee
   */

  const tabs = {
    TourneeDate: "TourneeDate",
    TourneeDefault: "TourneeDefault",
  };
  let selectedTab = tabs.TourneeDate;
  let datePicked = new Date().toLocaleDateString("en-CA"); // = date.now() avec format YYY-MM-DD comme l'input du form
  

  /** @type {Tournee[]} */
  let tournees = [];
  onMount(() => {
    getTourneesDate();
    console.log("onMount", tournees);
  });

  let currentDate = new Date();
  console.log(currentDate);
  let dateString = currentDate.toISOString().split("T")[0];
  console.log("date ", dateString);

  let datePicked =dateString;


  async function getTourneesDate() {
    const response = await fetch(`/api/tournees/date/${datePicked}`);
    tournees = await response.json();
    console.log("getTourneesDate", tournees)
  }
  async function getTourneesDefault() {
    const response = await fetch(`/api/tourneesParDefaut`);
    tournees = await response.json();
    console.log("getTourneesDefault", tournees)
  }

  function selectHistory() {
    selectedTab = tabs.TourneeDate;
    getTourneesDate();
    console.log("handleDateChange", tournees)
  }
  function selectDefault(){
    selectedTab = tabs.TourneeDefault;
    getTourneesDefault();
  }

  /**
   * @param {Tournee} tournee
   */
  function selectTournee(tournee) {
    if (selectedTab == tabs.TourneeDate)
      goto(`/tournees/${tournee.id_tournee}`);
    if (selectedTab == tabs.TourneeDefault)
      goto(`/tournees/${tournee.id_tournee}`); // TODO autre page ou pas (et remove if-else) ???
    else
      console.log("error in /tournees/+page.svelte")//TODO handle error
  }
</script>

<Navbar />
<div class="container"><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
  <div class="centered">

    <div class="tab-selection">
      <input type="date" on:change={selectHistory} bind:value={datePicked} />
      <button on:click={selectDefault}>Tournées par défaut</button>
    </div>

    {#if selectedTab==tabs.TourneeDate}
    <h2>Tournée du {datePicked}</h2>
    {:else}
    <h2>Tournée par défaut</h2>
    {/if}

    <div class="show-tournees">
      <TourneeTableau {tournees} onSelectOne={selectTournee} isDefault={selectedTab==tabs.TourneeDefault}/>
    </div>

    <button on:click={() => history.back()}>Retour</button>
  </div>
  <button on:click={() => history.back()}>Retour</button>
</div>
<foot>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Formulaire avec mise en page</title>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
