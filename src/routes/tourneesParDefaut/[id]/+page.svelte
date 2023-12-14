<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Navbar from "$lib/Components/Navbar.svelte";
  import CrecheTableau from "$lib/Components/CrecheTableau.svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";

  /**
   * @typedef {import("$lib/Model/Tournee").Tournee} Tournee
   */

  /** @type {Tournee} */
  let commandes = [];
  const idTournee = $page.params.id
  let newIdCreche;
  let newOrdre;

  onMount(async () => {
    getTourneeDefaut(-1, idTournee);
  });

  async function getTourneeDefaut(idCommande, idTournee) {
    const response = await fetch(`/api/commandesParDefaut/tourneeParDefaut/${idTournee}`);
    commandes = await response.json();
    console.log("getTourneeDefaut", commandes, idTournee);
  }

  function ouvrirDetailsCreche(idCommande, idCreche) {
    goto(`/creches/${idCreche}`); // TODO route correct
  }

  async function deleteCommandeParDefaut(idCommande) {
    const response = await fetch(`/api/commandesParDefaut/${idCommande}`, {
      method: "DELETE",
    });
    console.log("deleteCommandeParDefaut", response)
  }

  async function addCommandeParDefaut(new_id_creche, new_ordre) {
    const response = await fetch(`/api/commandesParDefaut/${idTournee}`, {
      method: "POST",
      body: JSON.stringify({
        id_creche: new_id_creche,
        ordre: new_ordre
      })
    });
    console.log("deleteCommandeParDefaut", response)
  }
</script>

<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
<Navbar />
<div class="container">
  
  <div class="tournee-creche">
    <CrecheTableau {commandes} {ouvrirDetailsCreche} supprimerCreche={deleteCommandeParDefaut}/>
  </div>

  <div class="new-commande">
    <form on:submit|preventDefault={addCommandeParDefaut(newIdCreche,newOrdre)}>
      <label>ID Crèche:
        <input type="number" bind:value={newIdCreche} /><!--TODO chosir parmis la liste des creches et non id-->
      </label>
      <label>Ordre:
        <input type="number" bind:value={newOrdre} />
      </label>
      <button type="submit">Sauvegarder</button>
    </form>
  </div>
  
</div>
</UnauthorizedWrapper>