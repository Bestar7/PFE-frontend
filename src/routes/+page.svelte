<script>
    import Navbar from "$lib/Components/Navbar.svelte";
    import { onMount } from "svelte";

    let name = "loading...";
    onMount(async () => {
        const response = await fetch('/api/helloWorld');
        const json = await response.json();
        name = json.name
    })
</script>

<Navbar /> <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
