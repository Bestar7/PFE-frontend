<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { crecheStore } from "./store";
  import { get } from 'svelte/store'
  import { goto } from "$app/navigation";

  // TODO replace with content from GET/creche/defaultOrder (or other name)

  let listCreche = []

  onMount(async ()=>{
    await getAllCreche()
    //console.log("onMount", listCreche)
    console.log("onMount", get(crecheStore))
  })

  async function getAllCreche(){
    listCreche = await (await fetch("/api/creches")).json()
  }

  function selectOneCreche(creche){
    crecheStore.set(creche)
    console.log("get", get(crecheStore))
    //document.location.href = `/api/creche/${creche.id_creche}` //TODO verifier le path
    goto(`/creches/${creche.id_creche}`)
  }

</script>


<Navbar /> <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<table>
  <thead>
    <th>nom</th>
    <th>rue</th>
    <th>ville</th>
  </thead>
  <tbody>
    {#each listCreche as creche}
    <tr on:click={()=>selectOneCreche(creche)}>
      <td>{creche.nom}</td>
      <td>{creche.rue}</td>
      <td>{creche.ville}</td>
    </tr>
    {/each}
  </tbody>
</table>