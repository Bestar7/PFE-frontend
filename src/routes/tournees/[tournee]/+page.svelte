<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Navbar from "$lib/Components/Navbar.svelte";
  import CrecheTableau from "$lib/Components/CrecheTableau.svelte";
  import Order from "$lib/Components/Order.svelte";
  import TourneeInfo from "$lib/Components/TourneeInfo.svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";

  /**
   * @typedef {import("$lib/Model/Tournee").Tournee} Tournee
   */

  /** @type {Tournee} */
  let tournee = [];
  import { host } from "$lib/Api/config";

  let resumeTournee = [];
  let commandes = [];
  const idTournee = $page.params.tournee

  onMount(async () => {
    getInfosTournee(idTournee);
    getResumeTournee(idTournee);
    getCommandesTournee(idTournee);
  });

  async function getInfosTournee(idTournee) {
    const response = await fetch(`/api/tournees/${idTournee}`);
    tournee = await response.json();
    console.log("getInfosTournee", tournee);
  }
  async function getResumeTournee(idTournee) {
    const response = await fetch(`/api/tournees/${idTournee}/resume`);
    resumeTournee = await response.json();
    console.log("getResumeTournee", resumeTournee);
  }
  async function getCommandesTournee(idTournee) {
    const response = await fetch(`/api/commandes/tournee/${idTournee}`);
    commandes = await response.json();
    console.log("getCommandesTournee", commandes);
  }

  function ouvrirDetailsCreche(idCommande, idCreche) {
    sessionStorage.setItem('idCommande', idCommande);
    goto(`/commandes/${idCommande}`);
  }

  async function supprimerCreche(idCommande) {
    commandes = commandes.filter(commande => commande.id_commande !== idCommande);
    // Mettez en œuvre la logique pour supprimer la crèche avec l'ID de commande donné
    const response = await fetch(`/api/commandes/tournee/${tournee}`); // TODO delete
  }
</script>

<Navbar />
<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
<div class="container">
  <div class="tournee-commande">
    <Order listItem={resumeTournee}/>
  </div>
  
  <div class="tournee-info">
    <TourneeInfo {tournee}/>
  </div>
  
  <div class="tournee-creche">
    <CrecheTableau {commandes} {ouvrirDetailsCreche} {supprimerCreche}/>
  </div>
  
</div>
</UnauthorizedWrapper>