<script>
  /**
   * @type {string}
   */
  export let name
  /**
   * @type {string}
   */
  export let role

  /**
   * @type {(name : string) => void}
   */
  export let connectAs;
</script>

<div>
  <button on:click={() => connectAs(name)}>{name} {role}</button>
</div>