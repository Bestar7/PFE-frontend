<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Navbar from "$lib/Components/Navbar.svelte";

  let tournee;
  let datePicked = "2023-12-13";
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
    console.log("getInfosTournee", tournee)
  }
  async function getResumeTournee(idTournee) {
    const response = await fetch(`/api/tournees/${idTournee}/resume`);
    resumeTournee = await response.json();
    console.log("getResumeTournee", resumeTournee)
  }

  async function getCommandesTournee(tournee) {
    const response = await fetch(`/api/commandes/tournee/${tournee}`);
    commandes = await response.json();
  }

  function handleTourneeInfos() {
    getInfosTournee();
    console.log("handle", tournee);
  }
  function ouvrirDetailsCreche(idCommande) {
    // Mettez en œuvre la logique pour ouvrir les
    sessionStorage.setItem("idCreche", idCommande);

    goto(`/commandes/${idCommande}`);
  }

  async function supprimerCreche(idCommande) {
    commandes = commandes.filter(commande => commande.id_commande !== idCommande);
    // Mettez en œuvre la logique pour supprimer la crèche avec l'ID de commande donné
    const response = await fetch(`/api/commandes/tournee/${tournee}`);
  }
</script>

<Navbar />
<div class="container">
  <input type="date" name="dateTournee" on:change={handleTourneeInfos} bind:value={datePicked} />
  <div class="tab-infos">
    <div class="left-column">
      <ul>
        <label for="tournee"> Tournee : </label>
        <!-- pourquoi ici la tournées undefined alors que ca fonctionne bien, dans /tournees on fait exactement la meme chose : en sortant de
          la fonction async le tournes[] est aussi vite mais dans le html il marche POURQUOI ? ²-->
        <span id="tournee">
          {tournee ? tournee.id_tournee : ""}
        </span>
      </ul>
      <ul>
        <label for="creche"> Livreur : </label>
        <span id="creche"
          >{tournee ? tournee.nom_livreur + " " + tournee.prenom_livreur : ""}
        </span>
      </ul>
    </div>
    <div class="right-column">
      <ul>
        <label for="date"> Date : </label>
        <span id="date">{tournee ? tournee.date : ""} </span>
      </ul>
      <ul>
        <label for="ordre"> Statut : </label>
        <span id="ordre">{tournee ? tournee.statut : ""}</span>
      </ul>
    </div>
  </div>
</div>
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
<table>
  <tbody>
    {#each commandes as commande (commande.id_commande)}
      <tr>
        <td>
          <button
            class="ligne-creche bouton-creche"
            on:click={() => ouvrirDetailsCreche(commande.id_creche)}
          >
            Creche: {commande.creche.nom} - Statut: {commande.statut}
          </button>
        </td>
        <td>
          <button
            class="bouton-creche"
            on:click={() => supprimerCreche(commande.id_commande)}
          >
            &#10006;
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

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
