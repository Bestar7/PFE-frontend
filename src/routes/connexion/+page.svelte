<script>
  //import {resetAuth, setAuth, authStore} from "$lib/Auth/auth"
  import { onMount } from "svelte"
  import Navbar from "$lib/Components/Navbar.svelte";
  //$: auth
  let connected;

  onMount(()=>{
    //auth = ($authStore != "")
  })

  function logout(){
    resetAuth()
    history.back()
  }

  /** @type {string} */
  let email
  /** @type {string} */
  let password
  /** @type {boolean} */
  let rememberMe = false // TODO : true => localStorage / false => sessionStorage
  async function login(){

    //setAuth(email)// TODO take the appropriate field
    connected = await fetch("/api/utilisateurs", {
      method:"POST",
      body:JSON.stringify({identifiant:email, mot_de_passe:password}),
      headers: {
        "Content-Type": "application/json",
      },
    })
    password = ''
    console.log("connect", connected)
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

{#if password}
  <button on:click={ logout }>Se déconnecter</button>
{/if}
<button on:click={() => history.back() }>Retour</button>