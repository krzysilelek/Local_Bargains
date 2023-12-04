<script>
  import { Paginator } from "@skeletonlabs/skeleton";
  import { fly } from "svelte/transition";
  import { base64 } from "@sveu/browser";

  export let data;
  export let form;
  let addForm = form?.data?.addFormValue === "true" ?? false;
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

  let file;
  $: file_result = base64(file);

  function on_file_input(e) {
    file = e.target.files?.[0];
  }

  let editForm = false;
</script>

<svelte:head>
  <title>Local Bargains! - User's Bargains</title>
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
      Add a new bargain!
    </button>

    <h2 class="h2 mb-3">Your bargains:</h2>
    {#if paginatedSource}
      {#each paginatedSource as row}
        <div class="mb-10 p-10 border-4 border-green-500 flex">
          <a href="../bargains/{row.id}">
            <h2>
              {row.title}
            </h2>
            <h2>
              {row.tag.tag_name}
            </h2>
            <h3>
              {row.description}
            </h3>
          </a>
          <button
            on:click={() => {
              editForm = true;
            }}
            type="button"
            class="btn variant-filled-warning m-3"
          >
            🖉
          </button>
          <button
            name={row.id}
            on:click={() => {
              editForm = true;
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
      <header class="h2 p-4">A new bargain</header>
      <section class="p-4">
        <form class="label" method="post" enctype="multipart/form-data">
          <input type="hidden" name="addFormValue" value={addForm} />
          <label for="title">
            <span class="label">Title</span>
            <input
              class="input"
              type="text"
              name="title"
              placeholder="Title"
              value={form?.data?.title ?? ""}
            />
            {#if form?.errors?.title}
              <span class="label text-red-700">
                {form?.errors?.title[0]}
              </span>
            {/if}
          </label>

          <label for="description">
            <span class="label">Description</span>
            <textarea
              class="textarea h-36 resize-none"
              type="text"
              name="description"
              placeholder="Description"
              value={form?.data?.description ?? ""}
            />
            {#if form?.errors?.description}
              <span class="label text-red-700">
                {form?.errors?.description[0]}
              </span>
            {/if}
          </label>

          <label for="tag">
            <span class="label">Tag</span>
            <select name="tag" class="select">
              {#each data?.tags as tag}
                {#if form?.data?.tag === tag.id}
                  <option value={tag.id} selected>{tag.tag_name}</option>
                {:else}
                  <option value={tag.id}>{tag.tag_name}</option>
                {/if}
              {/each}
            </select>
            {#if form?.errors?.tag}
              <span class="label text-red-700">
                {form?.errors?.tag[0]}
              </span>
            {/if}
          </label>

          <label for="localization">
            <span class="label">Localization</span>
            <input
              class="input"
              type="text"
              name="localization"
              placeholder="Localization"
              value={form?.data?.localization ?? ""}
            />
            {#if form?.errors?.localization}
              <span class="label text-red-700">
                {form?.errors?.localization[0]}
              </span>
            {/if}
          </label>

          <label for="picture">
            <span class="label">Picture (optional)</span>
            <input
              class="input"
              type="file"
              name="picture"
              accept="image/jpeg, image/png, image/jpg"
              maxlength="5242880"
              on:input={on_file_input}
            />
            {#if form?.errors?.picture}
              <span class="label text-red-700">
                {form?.errors?.picture[0]}
              </span>
            {/if}
          </label>

          <input type="hidden" name="base64Photo" value={$file_result} />

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
            formaction="?/addBargain"
          >
            Add a new bargain!
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
      class="card bg-gradient-to-br variant-gradient-warning-error w-96 h-96"
    >
      <header class="h2 p-4">What happened? Tell us!</header>
      <section class="p-4">
        <form class="label" method="post">
          <input type="hidden" name="reportFormValue" value={addForm} />
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
              editForm = false;
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
