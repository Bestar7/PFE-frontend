<script> 
  import Livreur from '$lib/Components/Livreur.svelte';
import {currentLivreur , livreurs} from '../../../store';

  import HelloWorld from "$lib/Components/HelloWorld.svelte";
  import { onMount } from "svelte";
  
  let name = "loadin...";
  onMount(async () => {
      const response = await fetch('/api/livreur');
      const json = await response.json();
      name = json.name
  })
</script>
<Livreur {name}/>



