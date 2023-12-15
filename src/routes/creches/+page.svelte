<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { crecheStore } from "./store";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";
  import { host } from "$lib/Api/config";

  // TODO replace with content from GET/creche/defaultOrder (or other name)

  let listCreche = [];

  onMount(async () => {
    await getAllCreche();
    //console.log("onMount", listCreche)
    console.log("onMount", get(crecheStore));
  });

  async function sauvegarderCreche() {
    // Ajoutez ici la logique pour sauvegarder la crèche
    // Vous pouvez accéder aux valeurs du formulaire ici
    const nomCreche = document.getElementById("nom").value;
    const rueCreche = document.getElementById("rue").value;
    const villeCreche = document.getElementById("ville").value;

    // Créez un objet avec les valeurs du formulaire
    const nouvelleCreche = { nom, rue, ville };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: nomCreche,
        ville: villeCreche,
        rue: rueCreche,
      }),
    };
    const response = await fetch(
      `${host}/creches`,
      options
    );
    console.log("reponse du changement de statut", response);
    getAllCreche();
  }

  async function getAllCreche() {
    listCreche = await (await fetch("/api/creches")).json();
  }

  function selectOneCreche(creche) {
    crecheStore.set(creche);
    console.log("get", get(crecheStore));
    //document.location.href = `/api/creche/${creche.id_creche}` //TODO verifier le path
    goto(`/creches/${creche.id_creche}`);
  }
</script>

<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
  <Navbar />
  <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
  <table>
    <thead>
      <th>nom</th>
      <th>rue</th>
      <th>ville</th>
    </thead>
    <tbody>
      {#each listCreche as creche}
        <tr on:click={() => selectOneCreche(creche)}>
          <td>{creche.nom}</td>
          <td>{creche.rue}</td>
          <td>{creche.ville}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <form on:submit|preventDefault={sauvegarderCreche}>
    <label for="nom">Nom:</label>
    <input type="text" id="nom" required />

    <label for="rue">Rue:</label>
    <input type="text" id="rue" required />

    <label for="ville">Ville:</label>
    <input type="text" id="ville" required />

    <button type="submit">Sauvegarder</button>
  </form>
</UnauthorizedWrapper>
