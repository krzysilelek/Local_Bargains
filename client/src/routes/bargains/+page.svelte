<script>
  const limits = [1, 2];
  let selectedLimit;
  let pageNumer = 1;
  export let data;
  const bargains = data.bargains;
</script>

<svelte:head>
  <title>Local Bargains! - Bargains</title>
</svelte:head>

<form method="post">
  <select name="limit" bind:value={selectedLimit}>
    {#each limits as limit}
      <option value={limit}>
        {limit}
      </option>
    {/each}
  </select>
  <button type="submit"> Submit </button>
</form>

{#if bargains}
  {#each bargains as bargain}
    <a href="/bargains/{bargain?.id}">
      <div>
        <h2>{bargain?.title}</h2>
        <h3>{bargain?.description}</h3>
        <h4>{bargain?.tag}</h4>
      </div>
    </a>
  {/each}
{/if}
