<script>
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<svelte:head>
  <title>Local Bargains! - Logout</title>
</svelte:head>

<div
  class="flex justify-center w-full h-full"
  in:fly={{ y: 200, duration: 500 }}
>
  <div class="xl:mx-96 p-24 w-full h-full card flex flex-wrap justify-center">
    <h2 class="h2 w-full flex justify-center">Log out?</h2>
    <form method="post" class="flex flex-wrap justify-center h-full w-96">
      <button
        class="btn variant-filled-error mt-3 mr-3"
        type="submit"
        formaction="?/back&redirectTo={redirectTo}"
      >
        No
      </button>
      <button
        class="btn variant-filled-primary mt-3"
        type="submit"
        formaction="?/logout&redirectTo=/"
      >
        Yes
      </button>
    </form>
  </div>
</div>
