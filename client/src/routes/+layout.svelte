<script>
  export let data;
</script>

<a href="/"><h1>Welcome to Local Bargains</h1></a>
{#if data.accessToken}
  {data.accessToken}
  <a href="/auth/logout"> Log out </a>
{:else}
  <a href="/auth/register"> Sign up </a>
  <a href="/auth/login"> Sign in </a>
{/if}

<slot />
