<script>
  import { getAuth } from "$lib/Auth/auth";
  export let roleRequis = [];
  const authorized = roleRequis.indexOf(getAuth()) < 0
</script>

{#if false} <!--TODO replace with 'authorized' in prod-->
<h1>ACCES INTERDIT</h1>
<p>serieusement, connect-toi...<a href="/">acceuil</a></p>
<p>ou peut-être que tu a oublié d'envoyer roleRequis en param sur cette page</p><!--TODO remove this for prod-->
{:else}
<slot />
{/if}
