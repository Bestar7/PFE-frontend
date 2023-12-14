<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getAuth, roles } from "$lib/Auth/auth";
    
    /*
    onMount(() => {
        console.log("getAuth()", getAuth());
        if (!getAuth())
            goto("/connexion");
        else if (getAuth() == roles.livreur)
            goto("/tournees"); // TODO choisir la 'page d'acceuil' d'un livreur
        else if (getAuth() == roles.admin) goto("/tournees"); // TODO choisir la 'page d'acceuil' d'un admin
    });
    */



    let deferredPrompt;

    onMount(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            deferredPrompt = event;
        })
        /*
        if ('BeforeInstallPromptEvent' in window){
                window.addEventListener("beforeinstallprompt", (event) => {
                    event.preventDefault();
                    deferredPrompt = event;
                })
        } else {
            if (!getAuth())
                goto("/connexion");
            else if (getAuth() == roles.livreur)
                goto("/tournees"); // TODO choisir la 'page d'acceuil' d'un livreur
            else if (getAuth() == roles.admin)
                goto("/tournees"); // TODO choisir la 'page d'acceuil' d'un admin
        }   */
    })

    // Trigger install when your custom button is clicked
    function install() {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the install prompt");
            } else {
                console.log("User dismissed the install prompt");
            }
            // Reset deferredPrompt for the next install prompt
            deferredPrompt = null;
        });
    }
</script>

<h1>ERROR</h1>
<button on:click={install}>Install App</button>
