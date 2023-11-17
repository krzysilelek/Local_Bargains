<script>
  import { page } from "$app/stores";
  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<svelte:head>
  <title>Local Bargains! - Logout</title>
</svelte:head>

<h1>Are you sure to logout?</h1>
<form method="post">
  <button type="submit" formaction="?/back&redirectTo={redirectTo}">
    No
  </button>
  <button type="submit" formaction="?/logout&redirectTo=/"> Yes </button>
</form>
