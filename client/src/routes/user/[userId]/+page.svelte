<script>
  import { Paginator } from "@skeletonlabs/skeleton";
  import { fly } from "svelte/transition";
  export let data;
  let addForm = false;
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
  <title>Local Bargains! - User's Bargains</title>
</svelte:head>

<div
  class="flex justify-center w-full h-full"
  in:fly={{ y: 200, duration: 500 }}
>
  <div class="xl:mx-96 p-24 w-full h-full card">
    <h2 class="h2 mb-3">Your bargains:</h2>
    {#if paginatedSource}
      {#each paginatedSource as row}
        <a href="../bargains/{row.id}">
          <div class="mb-10 p-10 border-4 border-green-500">
            <h2>
              {row.title}
            </h2>
            <h2>
              {row.tag.tag_name}
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
  </div>
</div>

{#if addForm === true}
  <div
    class="absolute w-screen h-screen top-0 flex justify-center items-center z-10"
    in:fly={{ y: 200, duration: 500 }}
  >
    <div
      class="card bg-gradient-to-br variant-gradient-warning-error w-96 h-96"
    >
      <header class="h2 p-4">What happened? Tell us!</header>
      <section class="p-4">
        <form class="label" method="post">
          <input type="hidden" name="bargain_id" value={bargain?.id} />
          <input type="hidden" name="reportFormValue" value={reportForm} />
          <label for="report">
            <textarea
              class="textarea h-36 resize-none"
              type="text"
              name="report"
              placeholder="This bargain..."
              value={form?.data?.report ?? ""}
            />
            {#if form?.errors?.report}
              <span class="label text-red-700">
                {form?.errors?.report[0]}
              </span>
            {/if}
          </label>
          <button
            on:click={() => {
              reportForm = false;
            }}
            class="btn bg-gradient-to-br variant-gradient-warning-error mt-8 border-4"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="btn bg-gradient-to-br variant-gradient-warning-error mt-8 border-4"
            formaction="?/addReport"
          >
            Send a report
          </button>
        </form>
      </section>
    </div>
  </div>
{/if}
