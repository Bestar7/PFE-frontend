<script> 

import { onMount } from "svelte";
import { articlesStore } from "../store";
import Navbar from "$lib/Components/Navbar.svelte";
onMount(async () => {
      const response = await fetch('http://localhost:9000/articles');
      const articles = await response.json();
      articles.sort((a, b) => a.id_article - b.id_article);
      articlesStore.set(articles);
      console.log(articles);
});
console.log(articlesStore);

let selectedArticleId = 1; 

async function savePourcentage(id_article,nouvelleValeur) {

    try {
      console.log(nouvelleValeur);
      const response = await fetch(
        `http://localhost:9000/articles/${id_article}/modifierPourcentage`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_pourcentage: nouvelleValeur,
            // Ajoutez d'autres données si nécessaire
          }),
        },
      );

      console.log(response);
      console.log(response.json);

      if (response.ok) {
        console.log("Modifications sauvegardées avec succès !");
        // Mettez à jour les articles après la modification
        // updateArticles();
      } else {
        const errorText = await response.text();
        console.error("Erreur lors de la sauvegarde :", errorText);
      }
    } catch (error) {
      const errorText = await response.text();
      console.error("Erreur lors de la requête :", errorText);
    }
    // Ajoutez ici la logique pour sauvegarder les modifications
  }
</script>

<Navbar />
<div class="container">
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th>Article</th>
          <th>% supplementaires a prévoir</th>
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
              <input type="number" bind:value={article.pourcentage} />
              <button
                on:click={() =>
                  savePourcentage(article.id_article, article.pourcentage)}
                >Save</button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
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

  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    margin: 0;
  }
</style>
