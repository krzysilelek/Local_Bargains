<script>
  import { AppBar } from "@skeletonlabs/skeleton";
  import "../app.pcss";
  export let data;
</script>

<AppBar>
  <svelte:fragment slot="lead"
    ><a href="/"><h1 class="h1">Welcome to Local Bargains!</h1></a
    ></svelte:fragment
  >
  <svelte:fragment slot="trail">
    {#if data.accessToken}
      {data.accessToken}
      <a href="/auth/logout"> Log out </a>
    {:else}
      <a href="/auth/register" class="btn variant-filled-primary"> Sign up </a>
      <a href="/auth/login" class="btn variant-filled-primary"> Sign in </a>
    {/if}
  </svelte:fragment>
</AppBar>

<slot />
