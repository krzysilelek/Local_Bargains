<script>
  import { Paginator } from "@skeletonlabs/skeleton";
  import { fly } from "svelte/transition";
  export let data;
  let source = data.reports;
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
  <title>Local Bargains! - Administrator Panel - Report</title>
</svelte:head>

<div
  class="flex justify-center w-full h-full"
  in:fly={{ y: 200, duration: 500 }}
>
  <div class="xl:mx-96 p-24 w-full h-full card">
    {#if paginatedSource}
      {#each paginatedSource as row}
        <a href="reports/{row.bargain_id}">
          <div class="mb-10 p-10 border-4 border-green-500">
            <h2 class="h2">
              Bargain: {row.bargain_id}
            </h2>
            <h3 class="h3">
              Number of reports: {row.report_count}
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
  </div>
</div>
