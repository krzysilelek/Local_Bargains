<script>
  import { onMount, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import { browser } from "$app/environment";
  import { geocodeReverse } from "@simple-nominatim/core";
  import { Paginator } from "@skeletonlabs/skeleton";

  export let form;
  export let data;
  const bargain = data.bargain;
  let mapElement;
  let map;
  let source = data.comments;

  let paginationSettings = {
    page: 0,
    limit: 5,
    size: source.length,
    amounts: [1, 2, 5, 10],
  };

  let reportForm = form?.data?.reportFormValue === "true" ?? false;

  $: paginationSettings.size = source.length;

  $: paginatedSource = source.slice(
    paginationSettings.page * paginationSettings.limit,
    paginationSettings.page * paginationSettings.limit +
      paginationSettings.limit,
  );

  function formalizeDate(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  }

  onMount(async () => {
    if (browser) {
      const leaflet = await import("leaflet");
      const result = await geocodeReverse(
        { latitude: bargain.latitude, longitude: bargain.longitude },
        { format: "jsonv2" },
      );
      map = leaflet
        .map(mapElement)
        .setView([bargain.latitude, bargain.longitude], 13);

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(map);

      leaflet
        .marker([bargain.latitude, bargain.longitude])
        .addTo(map)
        .bindPopup(result.display_name)
        .openPopup();
    }
  });

  onDestroy(async () => {
    if (map) {
      map.remove();
    }
  });

  function convertIntoASCII(decimal) {
    let imgASCII = "";
    for (let number of decimal) {
      imgASCII += String.fromCharCode(number);
    }
    return imgASCII;
  }
</script>

<svelte:head>
  <title>Local Bargains! - {bargain?.title}</title>
</svelte:head>

<div
  class="flex justify-center w-full h-full"
  in:fly={{ y: 200, duration: 500 }}
>
  <div class="xl:mx-96 p-24 w-full h-full card">
    <div>
      <h2 class="h2">{bargain?.title}</h2>
      <h3 class="h3">{bargain?.description}</h3>
      {#if bargain?.picture?.data.length !== 0}
        <img
          class="w-96"
          src={convertIntoASCII(bargain?.picture?.data)}
          alt="bargain"
        />
      {/if}
      <h4 class="h4">{bargain?.tag.tag_name}</h4>
    </div>

    <div
      id="map"
      class="xl:w-128 xl:h-128 w-96 h-96"
      bind:this={mapElement}
    ></div>

    {#if data?.accessToken}
      <button
        on:click={() => {
          reportForm = true;
        }}
        type="button"
        class="btn variant-filled-warning m-3"
      >
        ⚐
      </button>
    {/if}

    <div class="p-24 w-full h-full card">
      {#if data?.accessToken}
        <form class="label mb-10" method="post">
          <input type="hidden" name="bargain_id" value={bargain?.id} />
          <label for="comment">
            <span>Your comment</span>
            <textarea
              class="textarea"
              type="text"
              name="comment"
              placeholder="My comment..."
              value={form?.data?.comment ?? ""}
            />
            {#if form?.errors?.comment}
              <span class="label text-red-700">
                {form?.errors?.comment[0]}
              </span>
            {/if}
          </label>
          <button
            type="submit"
            class="btn variant-filled-primary mt-3"
            formaction="?/addComment"
          >
            Add a comment
          </button>
        </form>
      {/if}
      {#if paginatedSource}
        {#each paginatedSource as row}
          <div class="mb-10 p-10 border-4 border-green-500">
            <h3 class="h3">
              {row.user.username} - {formalizeDate(new Date(row.date))}
            </h3>
            <p class="p mt-3">
              {row.description}
            </p>
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
</div>

{#if reportForm === true}
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

<style>
  @import "leaflet/dist/leaflet.css";
  #map {
    z-index: 0;
  }
</style>
