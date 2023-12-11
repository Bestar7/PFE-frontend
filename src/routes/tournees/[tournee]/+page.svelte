<script>
  import { onMount } from "svelte";
  import Navbar from "$lib/Components/Navbar.svelte";
  let tournee;
  let datePicked = "2023-12-13";

  onMount(() => {
    getInfosTournee()
  });

  async function getInfosTournee() {
    console.log("on exexcute la fonction getInfosTournee ");
    const response = await fetch("");
    const data = await response.json();
    tournee = data;

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
          
          </span>
        </ul>
        <ul>
          <label for="creche"> Creche : </label>
          <span id="creche"> {tournee.id_livreur}</span>
        </ul>
      </div>
      <div class="right-column">
        <ul>
          <label for="date"> Date : </label>
          <span id="date"> </span>
        </ul>
        <ul>
          <label for="ordre"> Ordre : </label>
          <span id="ordre"></span>
        </ul>
      </div>
    </div>
  </div>
</body>
