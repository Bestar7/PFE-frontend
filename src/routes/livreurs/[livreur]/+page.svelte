<script>
  import Livreur from "$lib/Components/Livreur.svelte";
  import { onMount } from "svelte";

  import Navbar from "$lib/Components/Navbar.svelte";

  let name = "loadin...";
  onMount(async () => {
    const response = await fetch("/api/livreur");
    const json = await response.json();
    name = json.name;
  });

  let livreur = {
    nom: "Nom existant",
    login: "Login existant",
    motDePasse: "MotDePasse existant",
    isAdmin: false,
  };

  function handleSubmit() {
    // Vous pouvez traiter les données ici (envoyer à un serveur, mettre à jour la base de données, etc.)
    console.log("Données soumises :", livreur);
  }
</script>

<Navbar /><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<Livreur {name} />

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Nom :
    <input bind:value={livreur.nom} type="text" />
  </label>

  <label>
    Login :
    <input bind:value={livreur.login} type="text" />
  </label>

  <label>
    Mot de passe :
    <input bind:value={livreur.motDePasse} type="password" />
  </label>

  <label>
    Admin :
    <input type="radio" bind:group={livreur.isAdmin} value={true} /> Oui
    <input type="radio" bind:group={livreur.isAdmin} value={false} /> Non
  </label>

  <button type="submit">Soumettre</button>
</form>
