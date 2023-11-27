<script>
  import { Paginator } from "@skeletonlabs/skeleton";
  import Layout from "../+layout.svelte";
  export let data;
  let source = data.bargains;
  let paginationSettings = {
    page: 0,
    limit: 5,
    size: source.length,
    amounts: [1, 2, 5, 10],
  };

  $: paginationSettings.size = source.length;

  $: paginatedSource = source.slice(
    paginationSettings.page * paginationSettings.limit,
    paginationSettings.page * paginationSettings.limit +
      paginationSettings.limit,
  );
</script>

<svelte:head>
  <title>Local Bargains! - Bargains</title>
</svelte:head>

{#if paginatedSource}
  {#each paginatedSource as row}
    <a href="bargains/{row.id}">
      <div>
        <h2>
          {row.title}
        </h2>
        <h3>
          {row.description}
        </h3>
      </div>
    </a>
  {/each}
{/if}

<Paginator
  bind:settings={paginationSettings}
  showFirstLastButtons={true}
  showPreviousNextButtons={true}
  showNumerals
  maxNumerals={1}
/>
