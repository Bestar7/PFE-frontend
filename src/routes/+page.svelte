 <script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getAuth, roles } from "$lib/Auth/auth";


    onMount(()=>{
        console.log("getAuth()", getAuth())
        if (!getAuth())
            goto("/connexion")
        else if (getAuth() == roles.livreur)
            goto("/tournees") // TODO choisir la 'page d'acceuil' d'un livreur
        else if (getAuth() == roles.admin)
            goto("/tournees") // TODO choisir la 'page d'acceuil' d'un admin
    })
</script>

<h1>ERROR</h1>