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

  let deleteBargainForm = false;
  let deleteReportForm = false;
  let selectedReportId = null;
</script>

<svelte:head>
  <title>Local Bargains! - User's Bargains</title>
</svelte:head>

<div
  class="flex justify-center w-full h-full"
  in:fly={{ y: 200, duration: 500 }}
>
  <div class="xl:mx-96 p-24 w-full h-full card">
    <h2 class="h2">Bargain: {data.info.id}</h2>
    <h3 class="h3">Creator: {data.info.user.username} - {data.info.user.id}</h3>
    <a href="/bargains/{data.info.id}" class="btn variant-filled-primary">
      See that bargain
    </a>
    <button
      on:click={() => {
        deleteBargainForm = true;
      }}
      type="button"
      class="btn variant-filled-error m-3"
    >
      Delete that bargain
    </button>

    <h2 class="h2 mb-3">Reports:</h2>
    {#if paginatedSource}
      {#each paginatedSource as row}
        <div class="mb-10 p-10 border-4 border-green-500 flex flex-wrap">
          <h2 class="h2 w-full">
            {row.user.username}
          </h2>
          <h3 class="h3 w-full">
            {row.user_id}
          </h3>
          <h4 class="h4 w-full mt-3">
            {row.description}
          </h4>
          <button
            name={row.id}
            on:click={(event) => {
              deleteReportForm = true;
              selectedReportId = event.target.name;
            }}
            type="button"
            class="btn variant-filled-error m-3"
          >
            ☓
          </button>
        </div>
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

{#if deleteBargainForm === true}
  <div
    class="absolute w-screen h-screen top-0 flex justify-center items-center z-10"
    in:fly={{ y: 200, duration: 500 }}
  >
    <div
      class="card bg-gradient-to-br variant-gradient-primary-secondary w-96 h-auto"
    >
      <header class="h2 p-4">Delete the bargain?</header>
      <section class="p-4">
        <form class="label" method="post">
          <input type="hidden" name="bargainId" value={data.info.id} />
          <button
            on:click={() => {
              deleteBargainForm = false;
            }}
            class="btn variant-filled-secondary mt-8 border-4"
          >
            No
          </button>

          <button
            type="submit"
            class="btn variant-filled-secondary mt-8 border-4"
            formaction="?/deleteBargain"
          >
            Yes
          </button>
        </form>
      </section>
    </div>
  </div>
{/if}

{#if deleteReportForm === true}
  <div
    class="absolute w-screen h-screen top-0 flex justify-center items-center z-10"
    in:fly={{ y: 200, duration: 500 }}
  >
    <div
      class="card bg-gradient-to-br variant-gradient-primary-secondary w-96 h-auto"
    >
      <header class="h2 p-4">Delete the report?</header>
      <section class="p-4">
        <form class="label" method="post">
          <input type="hidden" name="reportId" value={selectedReportId} />
          <button
            on:click={() => {
              deleteReportForm = false;
            }}
            class="btn variant-filled-secondary mt-8 border-4"
          >
            No
          </button>

          <button
            type="submit"
            class="btn variant-filled-secondary mt-8 border-4"
            formaction="?/deleteReport"
          >
            Yes
          </button>
        </form>
      </section>
    </div>
  </div>
{/if}
