<script>
  import { goto } from "$app/navigation";
  import Navbar from "$lib/Components/Navbar.svelte";
  import { setAuth, resetAuth, auth } from "$lib/Auth/auth";
  $: isAuth = $auth?.role;
  let connected;

  function logout(){
    resetAuth()
    goto("/")
  }

  /** @type {string} */
  let email
  /** @type {string} */
  let password
  /** @type {boolean} */
  let rememberMe = false // TODO : true => localStorage / false => sessionStorage
  async function login(){

    //setAuth(email)// TODO take the appropriate field
    const response = await fetch("/api/utilisateurs", {
      method:"POST",
      body:JSON.stringify({identifiant:email, mot_de_passe:password}),
      headers: {
        "Content-Type": "application/json",
      },
    })

    password = ''
    connected = await response.json()
    setAuth(connected)
  }
</script>

<Navbar /> <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<form on:submit|preventDefault={login}>
  <label>Login
    <input type="text" bind:value={email} required>
  </label>

  <label>Mot de passe
  <input type="password" bind:value={password} required>
  </label>

  <label>Se souvenir de moi
  <input type="checkbox" bind:checked={rememberMe}>
  </label>

  <button type="submit">Connexion</button>
</form>

{#if isAuth}
  <button on:click={ logout }>Se déconnecter</button>
{/if}
<button on:click={() => history.back() }>Retour</button>