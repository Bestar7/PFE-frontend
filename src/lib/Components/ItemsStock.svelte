<script>
  import ItemLine from "./ItemLine.svelte";

  /** @type { { label: string; qty: number; }[] }*/ // TODO utiliser un model (et changer le @type)
  export let ListItems
</script>

{#each ListItems as item}
  <ItemLine {...item} /> <!--TODO click sur les buttons -> 'required' alert si les champs requis sont vide-->
{/each}