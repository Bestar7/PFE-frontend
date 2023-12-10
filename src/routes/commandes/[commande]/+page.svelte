<script>
  import { onMount } from "svelte";
  import { articlesStore } from "../store";

  /**
   * @type {Object}
   */
  onMount(async () => {
    const response = await fetch('http://localhost:9000/articles');
    const articles = await response.json();
    articlesStore.set(articles);
  });
  console.log("2 eme ", articlesStore);

  function saveChanges() {
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

<div class="container">
  <div class="tab-infos">
    <div class="left-column">
      <ul>
        <label for="tournee"> Tournee : </label>
        <span id="tournee"> {creche.id}</span>
      </ul>
      <ul>
        <label for="creche"> Creche : </label>
        <span id="creche"> {creche.nom}</span>
      </ul>
    </div>
    <div class="right-column">
      <ul>
        <label for="date"> Date : </label>
        <span id="date"> {creche.date}</span>
      </ul>
      <ul>
        <label for="ordre"> Ordre : </label>
        <span id="ordre"> {creche.ordre}</span>
      </ul>
    </div>
  </div>

  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th>Article</th>
          <th>Caisses</th>
          <th>Unités</th>
        </tr>
      </thead>
      <tbody>
        {#each $articlesStore as article (article)}
          <tr>
            <td>
              {article.libelle}
              {article.taille !== undefined ? ` - ${article.taille}` : ""}
            </td>
            <td>
              <!-- {caisse}-->
              <button on:click={() => /*todo incrementer*/ console.log("hello")}
                >+</button
              >
              <button on:click={() => /***todo decrementer*/ console.log("bye")}
                >-</button
              >
            </td>
            <td>
              <button on:click={() => /*todo decrementer*/ console.log("hello")}
                >+</button
              >
              <button on:click={() => /*todo incrementer*/ console.log("bye")}
                >-</button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="buttons">
    <button on:click={() => saveChanges()}> Sauvegarder </button>
    <button on:click={() => cancelChanges()}> Annuler</button>
  </div>
</div>

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
  .data-table {
    margin-bottom: 20px;
  }

  th,
  td {
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
    align-items: center;
    margin: 0;
  }

  .tab-infos {
    display: flex;

    width: 400px;
  }

  .left-column,
  .right-column {
    width: 100%;
    margin-top: 10px; /* Ajout d'une marge entre les colonnes */
  }

  .date-input {
    width: 100%;
  }
  label,
  span {
    display: inline-block;
    margin-bottom: 8px;
  }
</style>
