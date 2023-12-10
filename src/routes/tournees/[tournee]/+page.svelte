<script>
  import { onMount } from "svelte";
  import Navbar from "$lib/Components/Navbar.svelte";

  onMount(async ()=> {
    getInfosTournee();
  })
    async function getInfosTournee(){
        const response = await fetch("/");
        console.log(response);

        const data = await response.json();
        console.log(data);
    }

</script>



<Navbar />

<body>
  <div class="container">
    <div class="tab-infos">
      <div class="left-column">
        <ul>
          <label for="tournee"> Tournee : </label>
          <span id="tournee"></span>
        </ul>
        <ul>
          <label for="creche"> Creche : </label>
          <span id="creche"> </span>
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

