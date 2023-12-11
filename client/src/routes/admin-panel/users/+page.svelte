<script>
  import { Paginator } from "@skeletonlabs/skeleton";
  import { fly } from "svelte/transition";
  export let data;
  let source = data.users;
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

  let selectedUserId = null;
  let banForm = false;
  let deleteForm = false;
</script>

<svelte:head>
  <title>Local Bargains! - Administrator Panel - Users</title>
</svelte:head>

<div
  class="flex justify-center w-full h-full"
  in:fly={{ y: 200, duration: 500 }}
>
  <div class="xl:mx-96 p-24 w-full h-full card">
    {#if paginatedSource}
      {#each paginatedSource as row}
        <div class="mb-10 p-10 border-4 border-green-500">
          <h3 class="h3">
            {row.username}
          </h3>
          <h4 class="h4">{row.id}</h4>
          <button
            name={row.id}
            on:click={(event) => {
              banForm = true;
              selectedUserId = event.target.name;
            }}
            type="button"
            class="btn variant-filled-warning m-3"
          >
            {#if row.active === true}
              Ban
            {:else}
              Unban
            {/if}
          </button>
          <button
            name={row.id}
            on:click={(event) => {
              deleteForm = true;
              selectedUserId = event.target.name;
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

{#if banForm === true}
  <div
    class="absolute w-screen h-screen top-0 flex justify-center items-center z-10"
    in:fly={{ y: 200, duration: 500 }}
  >
    <div
      class="card bg-gradient-to-br variant-gradient-primary-secondary w-96 h-auto"
    >
      <header class="h2 p-4">Do it?</header>
      <section class="p-4">
        <form class="label" method="post">
          <input type="hidden" name="userId" value={selectedUserId} />
          <button
            on:click={() => {
              banForm = false;
            }}
            class="btn variant-filled-secondary mt-8 border-4"
          >
            No
          </button>

          <button
            type="submit"
            class="btn variant-filled-secondary mt-8 border-4"
            formaction="?/switchStatus"
          >
            Yes
          </button>
        </form>
      </section>
    </div>
  </div>
{/if}

{#if deleteForm === true}
  <div
    class="absolute w-screen h-screen top-0 flex justify-center items-center z-10"
    in:fly={{ y: 200, duration: 500 }}
  >
    <div
      class="card bg-gradient-to-br variant-gradient-primary-secondary w-96 h-auto"
    >
      <header class="h2 p-4">Delete the user?</header>
      <section class="p-4">
        <form class="label" method="post">
          <input type="hidden" name="userId" value={selectedUserId} />
          <button
            on:click={() => {
              deleteForm = false;
            }}
            class="btn variant-filled-secondary mt-8 border-4"
          >
            No
          </button>

          <button
            type="submit"
            class="btn variant-filled-secondary mt-8 border-4"
            formaction="?/deleteUser"
          >
            Yes
          </button>
        </form>
      </section>
    </div>
  </div>
{/if}
