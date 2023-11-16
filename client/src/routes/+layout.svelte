<script>
  export let data;
</script>

<h1>Welcome to Local Bargains</h1>
{#if data.accessToken}
  {data.accessToken}
{:else}
  <a href="/auth/register"> Sign up </a>
  <a href="/auth/login"> Sign in </a>
{/if}

<slot />
