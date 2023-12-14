<script>
  import { onMount } from "svelte";
  import { readable } from "svelte/store";
  import Navbar from "$lib/Components/Navbar.svelte";
  import { getRequest } from "@sveltejs/kit/node";
  import { host } from "$lib/Api/config";
  let role = "livreur";
  let commande;
  let responseUpdatedCommande;

  var updatedCommande = {
    ordre: 1,
    statut: "en attente",
    lignes_commande: [
      {
        id_commande: 3,
        id_article: 1,
        nb_caisses: 69,
        nb_unites: 0,
      },
      {
        id_commande: 3,
        id_article: 2,
        nb_caisses: 69,
        nb_unites: 0,
      },
      {
        id_commande: 3,
        id_article: 3,
        nb_caisses: 69,
        nb_unites: 0,
      },
      {
        id_commande: 3,
        id_article: 4,
        nb_caisses: 69,
        nb_unites: 0,
      },
      {
        id_commande: 3,
        id_article: 5,
        nb_caisses: 69,
        nb_unites: 0,
      },
      {
        id_commande: 3,
        id_article: 6,
        nb_caisses: 69,
        nb_unites: 0,
      },
    ],
  };

  /**
   * @type {Object}
   */
  onMount(async () => {
    //TODO attention pour l'instant hardcodage de id car pas de page COMMANDES, faire que quand on clique sur une commande pour la modifier
    // on rajoute dans le localStrorage
     const  idCommande = sessionStorage.getItem("idCommande");
     console.log("id recup ", idCommande);

     getCommande(idCommande);

  });

  async function getCommande(idCommande) {
    try {
      const response = await fetch(`${host}/commandes/${idCommande}`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      commande = await response.json();

      updatedCommande = commande;

      console.log("commande ", commande);
      console.log("updatedCommande : ", updatedCommande);
    } catch (error) {
      console.error("Erreur lors de la récupération de la commande:", error);
    }
  }

  function displayRequest(updatedCommande, idCommande) {
    const requestPayload = {
      new_ordre: updatedCommande.ordre,
      new_statut: updatedCommande.statut,
      new_lignes_commande: updatedCommande.lignes_commande.map((ligne) => ({
        id_commande: ligne.id_commande,
        id_article: ligne.id_article,
        new_nb_caisses: ligne.nb_caisses,
        new_nb_unites: ligne.nb_caisses,
      })),
    };

    console.log("Requête envoyée au backend :", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    // Appelez la fonction updateCommande pour envoyer réellement la requête
    updateCommande(updatedCommande, idCommande);
  }
  /**
   * modification d'une commande.
   */
  async function updateCommande(updatedCommande, recu) {
    try {
      //POURQUOI L'idCOMMANDE EST NULL ALORS QU4ON LE PRENDS DANS LE SESSIONSTORE ??
      //console.log("l'id de la commande est", idCommande);
      //aussi hardcodé car pas de localStore avec l'id dedans
      const response = await fetch(`${host}/commandes/${idCommande}/modifier`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_ordre: updatedCommande.ordre,
          new_statut: updatedCommande.statut,
          new_lignes_commande: updatedCommande.lignes_commande.map((ligne) => ({
            id_commande: lidCommande,
            //ligne.id_article undefined
            id_article: 1,
            new_nb_caisses: ligne.nb_caisses,
            new_nb_unites: ligne.nb_caisses,
          })),
        }),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      console.log("reponse : ", response);
      responseUpdatedCommande = await response.text();
      console.log("Commande mise à jour :", responseUpdatedCommande);
    } catch (error) {
      console.error("Erreur lors de la modification de la commande:", error);
    }
  }

  function saveChanges() {
    // Ajoutez ici la logique pour sauvegarder les modifications
    console.log("Modifications sauvegardées!");
  }

  function cancelChanges() {
    // Ajoutez ici la logique pour annuler les modifications
    console.log("Modifications annulées!");
  }

  let creche = {
    id: 1,
    nom: "enghien",
    status: "livré",
    ordre: 1,
    date: "ajd",
  };
</script>

<body>
  <div class="container">
    <Navbar />

    <div class="tab-infos">
      <div class="left-column">
        <ul>
          <label for="tournee"> Tournee : </label>
          <span id="tournee"
            >{commande?.tournee?.nom ?? commande?.tournee?.id_tournee ?? ""}
          </span>
        </ul>
        <ul>
          <label for="creche"> Creche : </label>
          <span id="creche">
            {commande?.creche?.nom ?? commande?.creche?.id_creche ?? ""}</span
          >
        </ul>
      </div>
      <div class="right-column">
        <ul>
          <label for="date"> Date : </label>
          <span id="ordre"> {commande ? commande.ordre : ""}</span>

          <!--<span id="date"> {commande ? commande.tournee.date : " "}</span>-->
        </ul>
        <ul>
          <label for="ordre"> Ordre : </label>
          <span id="ordre"> {commande ? commande.ordre : ""}</span>
        </ul>
        <ul>
          <label for="statut"> Statut : </label>
          <span id="statut"> {commande ? commande.statut : ""}</span>
        </ul>
      </div>
    </div>

    <div class="data-table">
      {#if commande  }
        {#if commande && commande.lignes_commande}
          <table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Caisses</th>
                <th>Unités</th>
              </tr>
            </thead>

            <tbody>
              {#each commande.lignes_commande as ligne, index (index)}
                {#if ligne !== undefined}
                  <tr key={index}>
                    <td>
                      {ligne.article ? ligne.article.libelle : ''}
                    </td>
                    <td>
                      <input
                        type="number"
                        bind:value={updatedCommande.lignes_commande[index]
                          .nb_caisses}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        bind:value={updatedCommande.lignes_commande[index]
                          .nb_unites}
                      />
                    </td>
                  </tr>
                {/if}
              {/each}
              <button
                on:click={() => /*todo modifier la commande*/ {
                  console.log("la nouvelle commande est : ", updatedCommande);
                  displayRequest(updatedCommande, 0);
                }}
              >
                Update
              </button>
            </tbody>

            <!-- ... (reste du code) ... -->
          </table>
        {:else}
          <p>Aucune ligne de commande disponible.</p>
        {/if}
      {:else}
        <p>cette commande a deja été livree, impossible de la modifier</p>
      {/if}
    </div>
    {#if role !== "livreur"}
      <div class="buttons">
        <button on:click={() => saveChanges()}> Sauvegarder </button>
        <button on:click={() => cancelChanges()}> Annuler</button>
      </div>
    {/if}
  </div>
</body>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulaire avec mise en page</title>
    <style>
    table {
    border-collapse: collapse;
    width: 400px;
    margin: 20px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .data-table{
    margin-bottom:20px;
  }

  th, td {
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
    justify-content: space-around; /* Ajustement de l'espacement entre les boutons */

    margin-top: 20px; /* Ajout d'une marge en haut des boutons */
  }

    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      height: 100vh;
      align-items:center
      margin: 0;
    }

    .tab-infos {
      display: flex;
      
      width: 400px;
    }

    .left-column, .right-column {
      width: 100%;
      margin-top: 10px; /* Ajout d'une marge entre les colonnes */


    }
    

    .date-input {
      width: 100%;
    }
    label, span {
      display: inline-block;
      margin-bottom: 8px;
    }
    </style>
  </head>
</html>
