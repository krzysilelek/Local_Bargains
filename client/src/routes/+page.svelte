<script>
  import { fly } from "svelte/transition";
  export let form;
</script>

<svelte:head>
  <title>Local Bargains!</title>
</svelte:head>
<div
  class="flex justify-center w-full h-auto"
  in:fly={{ y: 200, duration: 500 }}
>
  <div class="xl:mx-96 p-24 w-full h-full card">
    <h3 class="h3">Let's find some bargains!</h3>
    <form method="post">
      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <select class="select" name="radius">
          <option value="2">+2km</option>
          <option value="5">+5km</option>
          <option value="10">+10km</option>
          <option value="30">+30km</option>
          <option value="50">+50km</option>
          <option value="75">+75km</option>
          <option value="100">+100km</option>
        </select>
        <input
          type="search"
          placeholder="Your localization"
          name="localization"
          value={form?.data.localization ?? ""}
        />
        <button type="submit" class="variant-filled-primary">Submit</button>
      </div>
    </form>
    {#if form?.errors?.localization}
      <span class="label w-full text-red-700"
        >{form?.errors?.localization[0]}</span
      >
    {/if}
  </div>
</div>
