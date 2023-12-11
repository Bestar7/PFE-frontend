<script>
  import { onMount } from "svelte";
  import Navbar from "$lib/Components/Navbar.svelte";

  let tournee;
  let datePicked = "2023-12-13";
  let commandesTournee = [];
  onMount(async () => {
     await getInfosTournee()
  });

  async function getInfosTournee() {
  try {
    console.log("On exécute la fonction getInfosTournee ");
    const response = await fetch("");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    tournee = await response.json();
    console.log(tournee);

    return tournee;
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de la tournée:", error);
  }
}
async function getCommandesTournee(){
  try {
    console.log("On exécute la fonction getCommandesTournee ");
    const response = await fetch("/api/commandes");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    commandesTournee = await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes de la tournée:", error);
  }
}

  function handleTourneeInfos(){
    getInfosTournee();
    console.log("handle" , tournee);
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
            {tournee ? tournee.id_tournee: ''}
          </span>
        </ul>
        <ul>
          <label for="creche"> Livreur : </label>
          <span id="creche">{tournee ?tournee.nom_livreur + " " + tournee.prenom_livreur: ''} </span>
        </ul>
      </div>
      <div class="right-column">
        <ul>
          <label for="date"> Date : </label>
          <span id="date">{tournee ?tournee.date : ''} </span>
        </ul>
        <ul>
          <label for="ordre"> Statut : </label>
          <span id="ordre">{tournee ?tournee.statut : ''}</span>
        </ul>
      </div>
    </div>
  </div>
  <table> 
  <tbody>
    {#each commandesTournee as commande (commande)}
      <tr>
        <td>
          {commande.id_commande}
        </td>
        <td>
          <!-- {caisse}-->
          <button
            on:click={() => /*todo incrementer*/ console.log("hello")}
            >+</button
          >
          <button
            on:click={() => /***todo decrementer*/ console.log("bye")}
            >-</button
          >
        </td>
        <td>
          <button
            on:click={() => /*todo decrementer*/ console.log("hello")}
            >+</button
          >
          <button
            on:click={() => /*todo incrementer*/ console.log("bye")}
            >-</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>
</body>
