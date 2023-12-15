<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import TourneeTableau from "$lib/Components/TourneeTableau.svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";
  import { host } from "$lib/Api/config";

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
  let newDateTournee = new Date().toLocaleDateString("en-CA");


  /** @type {Tournee[]} */
  let tournees = [];
  onMount(() => {
    getTourneesDate();
    console.log("onMount", tournees);
  });

  async function getTourneesDate() {
    const response = await fetch(`/api/tournees/date/${datePicked}`);
    tournees = await response.json();
    console.log("getTourneesDate", tournees);
  }
  async function getTourneesDefault() {
    const response = await fetch(`/api/tourneesParDefaut`);
    tournees = await response.json();
    console.log("getTourneesDefault", tournees);
  }

  function selectHistory() {
    selectedTab = tabs.TourneeDate;
    getTourneesDate();
    console.log("handleDateChange", tournees);
  }

  function selectDefault() {
    selectedTab = tabs.TourneeDefault;
    getTourneesDefault();
  }

  async function deleteTournee(id) {
    console.log("id delete", id);
    let response;
    if (selectedTab == tabs.TourneeDefault) {
      response = await fetch(`/api/tourneesParDefaut/${id}`, {
        method: "DELETE",
      });
    } else {
      response = await fetch(`/api/tournees/${id}`, {
        method: "DELETE",
      });
    }

    console.log("deleted", await response.json());
  }




 


  async function terminerTournee(idTournee, nomTournee) {
    tournees= tournees.filter(tournee=> tournee.id_tournee !== idTournee);

    const url = `${host}/tournees/${idTournee}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom : nomTournee,
        statut: 'terminée',
      }),
    };

    const response = await fetch(`${host}/tournees/${idTournee}`, options);
     getTourneesDate();

    console.log("reponse du changement de statut de la tournee", response);

  }
  async function addTourneeParDefaut(nomParDefaut) {
    const response = await fetch(`/api/tourneesParDefaut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom_par_defaut: nomParDefaut,
      }),
    });
    console.log("addTourneeParDefaut", response);
  }

  function eventHandler() {
    window.location.href = `/tourneesParDefaut`;
  }


  async function handleSubmit(date) {
    try {
      // Make a POST request to the backend API
      const response = await fetch(`${host}/tournees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({date}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the response as needed
      const responseData = await response.json();
      console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

  /**
   * @param {Tournee} tournee
   */
  function selectTournee(tournee) {
    console.log ("ici",selectedTab);
    if (selectedTab == tabs.TourneeDate)
      goto(`/tournees/${tournee.id_tournee}`);
    if (selectedTab == tabs.TourneeDefault)
      goto(
        `/tourneesParDefaut/${tournee.id_tournee_par_defaut}`
      ); // TODO autre page ou pas (et remove if-else) ???
    else console.log("error in /tournees/+page.svelte"); //TODO handle error
  }
</script>

<Navbar />

<UnauthorizedWrapper roleRequis={[roles.admin, roles.livreur]}>

<div class="container"><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
  <div class="centered">

    <div class="tab-selection">
      <input type="date" on:change={selectHistory} bind:value={datePicked} />
      <button on:click={() => eventHandler()}>Tournées par défaut</button>
    </div>

    {#if selectedTab==tabs.TourneeDate}
    <h2>Tournée du {datePicked}</h2>
    {:else}
    <h2>Tournée par défaut</h2>
    {/if}

    <div class="show-tournees">
      <TourneeTableau {tournees} deleteOne={deleteTournee}  onSelectOne={selectTournee} terminerTournee = {terminerTournee} isDefault={selectedTab==tabs.TourneeDefault}/>
    </div>

    <form on:submit|preventDefault={handleSubmit(newDateTournee)}>
      <input type="date" bind:value={newDateTournee} required />
  
      <button type="submit">Ajouter une tournée</button>
    </form>

    <button on:click={() => history.back()}>Retour</button>
  </div>
</UnauthorizedWrapper>
