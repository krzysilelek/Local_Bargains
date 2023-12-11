<script>
  import { Paginator } from "@skeletonlabs/skeleton";
  import { fly } from "svelte/transition";

  export let data;
  export let form;
  let addForm = form?.data?.addFormValue === "true" ?? false;
  let source = data.tags;
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

  let editForm = form?.data?.editFormValue === "true" ?? false;
  let selectedTagId = form?.data?.tagId ?? null;

  let deleteForm = false;
</script>

<svelte:head>
  <title>Local Bargains! - Administrator Panel - Tags</title>
</svelte:head>

<div
  class="flex justify-center w-full h-full"
  in:fly={{ y: 200, duration: 500 }}
>
  <div class="xl:mx-96 p-24 w-full h-full card">
    <button
      on:click={() => {
        addForm = true;
      }}
      type="button"
      class="btn variant-filled-primary mb-10"
    >
      Add a new tag!
    </button>

    <h2 class="h2 mb-3">Tags:</h2>
    {#if paginatedSource}
      {#each paginatedSource as row}
        <div class="mb-10 p-10 border-4 border-green-500 flex">
          <h2 class="h2">
            {row.tag_name}
          </h2>
          <button
            name={row.id}
            on:click={(event) => {
              editForm = true;
              selectedTagId = event.target.name;
            }}
            type="button"
            class="btn variant-filled-warning m-3"
          >
            🖉
          </button>
          <button
            name={row.id}
            on:click={(event) => {
              deleteForm = true;
              selectedTagId = event.target.name;
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

{#if addForm === true}
  <div
    class="absolute w-screen h-screen top-0 flex justify-center items-center z-10"
    in:fly={{ y: 200, duration: 500 }}
  >
    <div
      class="card bg-gradient-to-br variant-gradient-primary-secondary w-96 h-auto"
    >
      <header class="h2 p-4">A new tag</header>
      <section class="p-4">
        <form class="label" method="post">
          <input type="hidden" name="addFormValue" value={addForm} />
          <label for="name">
            <span class="label">Name</span>
            <input
              class="input"
              type="text"
              name="name"
              placeholder="Name"
              value={form?.data?.name ?? ""}
            />
            {#if form?.errors?.name}
              <span class="label text-red-700">
                {form?.errors?.name[0]}
              </span>
            {/if}
          </label>

          <button
            on:click={() => {
              addForm = false;
            }}
            class="btn variant-filled-secondary mt-8 border-4"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="btn variant-filled-secondary mt-8 border-4"
            formaction="?/addTag"
          >
            Add a new tag!
          </button>
        </form>
      </section>
    </div>
  </div>
{/if}

{#if editForm === true}
  <div
    class="absolute w-screen h-screen top-0 flex justify-center items-center z-10"
    in:fly={{ y: 200, duration: 500 }}
  >
    <div
      class="card bg-gradient-to-br variant-gradient-primary-secondary w-96 h-auto"
    >
      <header class="h2 p-4">Edit the tag</header>
      <section class="p-4">
        <form class="label" method="post">
          <input type="hidden" name="editFormValue" value={editForm} />
          <input type="hidden" name="tagId" value={selectedTagId} />
          <label for="name">
            <span class="label">Name</span>
            <input
              class="input"
              type="text"
              name="name"
              placeholder="Name"
              value={form?.data?.name ?? ""}
            />
            {#if form?.errors?.name}
              <span class="label text-red-700">
                {form?.errors?.name[0]}
              </span>
            {/if}
          </label>

          <button
            on:click={() => {
              editForm = false;
            }}
            class="btn variant-filled-secondary mt-8 border-4"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="btn variant-filled-secondary mt-8 border-4"
            formaction="?/editTag"
          >
            Edit the the tag!
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
      <header class="h2 p-4">Delete the tag?</header>
      <section class="p-4">
        <form class="label" method="post">
          <input type="hidden" name="tagId" value={selectedTagId} />
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
            formaction="?/deleteTag"
          >
            Yes
          </button>
        </form>
      </section>
    </div>
  </div>
{/if}
