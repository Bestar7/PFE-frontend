<script>
  export let tournee
</script>

<ul>
      
  <li>
    <label for="tournee"> Tournee : </label>
    <span id="tournee">{tournee ? tournee.nom : ""}</span>
  </li>

  <li>
    <label for="creche"> Livreur : </label><!--TODO remplacer par uninput (déroulant ?) pour choisir un autre livreur-->
    <span id="creche">{tournee ? tournee.nom_livreur + " " + tournee.prenom_livreur : ""}</span>
  </li>

  <li>
    <label for="date"> Date : </label>
    <input type="date" id="date" on:change={()=>console.log(tournee.date)} bind:value={tournee.date} /><!--TODO pouvoir changer la date de la tournee-->
  </li>

  <li>
    <label for="ordre"> Statut : </label>
    <span id="ordre">{tournee ? tournee.statut : ""}</span><!--seul le livreur change ça, pas admin-->
  </li>

</ul>