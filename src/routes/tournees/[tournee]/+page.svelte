<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Navbar from "$lib/Components/Navbar.svelte";

  /**
   * @typedef {import("$lib/Model/Tournee").Tournee} Tournee
   */

  /** @type {Tournee} */
  let tournee = [];
  let resumeTournee = [];
  let commandes = [];

  onMount(async () => {
    let idTournee = $page.params.tournee;
    console.log("idTournee", idTournee);

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
  async function getCommandesTournee(tournee) {
    const response = await fetch(`/api/commandes/tournee/${tournee}`);
    commandes = await response.json();
    console.log("getCommandesTournee", commandes);
  }

  function handleTourneeInfos() {
    getInfosTournee();
    console.log("handle", tournee);
  }
  function ouvrirDetailsCreche(idCommande) {
    //sessionStorage.setItem("idCreche", idCommande);

    goto(`/commandes/${idCommande}`);
  }

  async function supprimerCreche(idCommande) {
    commandes = commandes.filter(commande => commande.id_commande !== idCommande);
    // Mettez en œuvre la logique pour supprimer la crèche avec l'ID de commande donné
    const response = await fetch(`/api/commandes/tournee/${tournee}`); // TODO delete
  }
</script>

<Navbar />
<div class="container">
  <div class="tournee-info">
    <ul>
      
      <li>
        <label for="tournee"> Tournee : </label>
        <span id="tournee">{tournee ? tournee.nom : ""}</span>
      </li>

      <li>
        <label for="creche"> Livreur : </label><!--TODO remplacer par uninput (déroulant ?) pour choisir un autre livreur-->
        <span id="creche">{tournee ? tournee.nom_livreur + " " + tournee.prenom_livreur : ""}</span>
      </li>

      <li>
        <label for="date"> Date : </label>
        <input type="date" id="date" on:change={()=>console.log(tournee.date)} bind:value={tournee.date} /><!--TODO pouvoir changer la date de la tournee-->
      </li>

      <li>
        <label for="ordre"> Statut : </label>
        <span id="ordre">{tournee ? tournee.statut : ""}</span><!--seul le livreur change ça, pas admin-->
      </li>

    </ul>
  </div>

  <div class="tournee-commande">
    <table>
      <tbody>
        {#each resumeTournee as article (article)}
          <tr>
            <td>
              {article.libelle}
              {article.taille !== undefined ? ` - ${article.taille}` : ""}
            </td>
            <td>
              caisses: {article.nb_caisses}
              unités : {article.nb_unites}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="tournee-creche">
    <table>
      <tbody>
        {#each commandes as commande (commande.id_commande)}
          <tr>
            <td>
              <button class="ligne-creche bouton-creche" on:click={() => ouvrirDetailsCreche(commande.creche.id_creche)}>
                Creche: {commande.creche.nom} - Statut: {commande.statut}
              </button>
            </td>
            <td>
              <button class="bouton-creche" on:click={() => supprimerCreche(commande.id_commande)}>
                &#10006;
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .ligne-creche {
    cursor: pointer;
    background-color: #f2f2f2;
    padding: 10px;
    margin-bottom: 5px;
  }

  .bouton-creche {
    color: black;
    background-color: #f2f2f2;

    border: none;
    cursor: pointer;
  }
</style>
