<script>
  import { onMount } from "svelte";
  import Navbar from "$lib/Components/Navbar.svelte";
  let tournee;
  let datePicked = "2023-12-13";

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
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de la tournée:", error);
  }
}

  function handleTourneeInfos(){
    getInfosTournee();
    console.log(tournee);
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
          <span id="date"> </span>
        </ul>
        <ul>
          <label for="ordre"> Statut : </label>
          <span id="ordre">tournee</span>
        </ul>
      </div>
    </div>
  </div>
</body>
