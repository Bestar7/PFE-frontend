<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Navbar from "$lib/Components/Navbar.svelte";

  let tournee;
  let datePicked = "2023-12-13";
  let resumeTournee = [];
  let commandes = [];
  onMount(async () => {
    let idTournee = sessionStorage.getItem('idTournee');
    console.log("idTournee", idTournee);

    let idCreche= sessionStorage.getItem('idCreche');
    console.log("idCreche", idCreche);

    await getInfosTournee(idTournee);
    await getResumeTournee(idTournee);
   // await getCommandesTournee(idTournee);
  });

  async function getInfosTournee(idTournee) {
    try {
      const response = await fetch(`http://localhost:9000/tournees/${idTournee}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      tournee = await response.json();
      console.log("tournee: ", tournee);
      return tournee;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de la tournée:",
        error
      );
    }
  }
  async function getResumeTournee(idTournee) {
    try {
      //comment passer l'id a ce genre de route ? 
      const response = await fetch(`http://localhost:9000/tournees/${idTournee}/resume`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      resumeTournee = await response.json();
      console.log("resume de la tournee", resumeTournee);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des resumes de la tournée:",
        error
      );
    }
  }

  async function getCommandesTournee(tournee) {
    try {
      const response = await fetch(
        `http://localhost:9000/commandes/tournee/${tournee}`
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      commandes = await response.json();
      console.log("les commandes de la tournée sont ", commandes);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des commandes de la tournee:",
        error
      );
    }
  }

  function handleTourneeInfos() {
    getInfosTournee();
    console.log("handle", tournee);
  }
  function ouvrirDetailsCreche(idCommande) {
      // Mettez en œuvre la logique pour ouvrir les
      sessionStorage.setItem('idCreche',idCommande);
     
     goto(`/commandes/${idCommande}`);
     
    }
  
    function supprimerCreche(idCommande) {
      // Mettez en œuvre la logique pour supprimer la crèche avec l'ID de commande donné
      
    }
</script>

<Navbar />

<body>
  <div>
    <form>
      <input
        type="date"
        name="dateTournee"
        on:change={handleTourneeInfos}
        bind:value={datePicked}
      />
    </form>
  </div>
  <div class="container">
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
            <button class="ligne-creche bouton-creche" on:click={() => ouvrirDetailsCreche(commande.id_creche)}>
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

  
  <script>
    function supprimerCreche(idCommande) {
      // Mettez en œuvre la logique pour supprimer la crèche avec l'ID de commande donné
      // Vous pouvez utiliser la méthode filter pour créer une nouvelle liste sans la crèche à supprimer
      commandes = commandes.filter(commande => commande.id_commande !== idCommande);
    }
  </script>
  
</body>

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
