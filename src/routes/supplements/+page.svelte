<script>
  import { onMount } from "svelte";
  import Navbar from "$lib/Components/Navbar.svelte";
  /** @typedef {import("$lib/Model/Article").Article} Article */
  
  
  /** @type {Article[]} */
  let listArticles = []

  onMount(() => {
    fillListArticles()
  });

  async function fillListArticles(){
    const response = await fetch("/api/supplements"); // aussi ok : "" si +server.ts est dans le meme dossier que cette page
    console.log(response);
    /** @type {Article[]}*/
    const articles = await response.json()

    articles.sort((a, b) => a.id_article - b.id_article)
    listArticles = articles;
  }

  /**
  * @param {number} id_article
  * @param {number} nouvelleValeur
  */
  function savePourcentage(id_article, nouvelleValeur) {
    fetch("/supplements", {
        method: 'POST',
        body: JSON.stringify({ id_article, nouvelleValeur }),
    })
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
        {#each listArticles as article (article)}
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
              >Save</button>
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
