<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import TourneeTableau from "$lib/Components/TourneeTableau.svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";

  /**
   * @typedef {import("$lib/Model/Tournee").Tournee} Tournee
   */

  const tabs = {
    TourneeDate: "TourneeDate",
    TourneeDefault: "TourneeDefault",
  };
  let selectedTab = tabs.TourneeDate;
  let datePicked = new Date().toLocaleDateString("en-CA"); // = date.now() avec format YYY-MM-DD comme l'input du form
  let nomTournee = ""

  /** @type {Tournee[]} */
  let tournees = [];
  onMount(() => {
    getTourneesDate();
    console.log("onMount", tournees);
  });

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

  async function deleteTournee(id) {
    console.log("id delete", id)
    let response
    if (selectedTab==tabs.TourneeDefault){
      response = await fetch(`/api/tourneesParDefaut/${id}`, { 
        method: 'DELETE' 
      });
    } else {
      response = await fetch(`/api/tournees/${id}`, { 
        method: 'DELETE' 
      });
    }
    
    console.log("deleted", await response.json())
  }
  async function addTourneeParDefaut(nomParDefaut) {
    const response = await fetch(`/api/tourneesParDefaut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nom_par_defaut: nomParDefaut
      })
    });
    console.log("addTourneeParDefaut", response)
  }

  /**
   * @param {Tournee} tournee
   */
  function selectTournee(tournee) {
    if (selectedTab == tabs.TourneeDate)
      goto(`/tournees/${tournee.id_tournee}`);
    if (selectedTab == tabs.TourneeDefault)
      goto(`/tourneesParDefaut/${tournee.id_tournee_par_defaut}`); // TODO autre page ou pas (et remove if-else) ???
    else
      console.log("error in /tournees/+page.svelte")//TODO handle error
  }
</script>

<Navbar />
<UnauthorizedWrapper roleRequis={[roles.admin, roles.livreur]}>
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
      <TourneeTableau {tournees} deleteOne={deleteTournee} onSelectOne={selectTournee} isDefault={selectedTab==tabs.TourneeDefault}/>
    </div>

    <div class="ajouter-tournee">
    <h3>Ajouter une tournée par défaut</h3>
    <label for="nomTournee">Nom Tournee:
      <input type="text" bind:value={nomTournee} />
    </label>
    <button on:click={() => {addTourneeParDefaut(nomTournee)}}>
      Sauvegarder
    </button>
    </div>

    <button on:click={() => history.back()}>Retour</button>
  </div>
</div>
</UnauthorizedWrapper>


