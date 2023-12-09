<script>
    import Navbar from "$lib/Components/Navbar.svelte";
    
    import { onMount } from "svelte";
    const endpoint= "http://localhost:9000/articles";
    let posts=[];
    onMount(async function(){
        const response= await fetch(endpoint);
        const data= await response.json();
        console.log(data);
    });
</script>

<Navbar /> <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
