<script>
  import { page } from "$app/stores";
  export let form;
  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<svelte:head>
  <title>Local Bargains! - Login</title>
</svelte:head>

<h1>Sign in!</h1>
<form method="post">
  <p>{form?.message || ""}</p>
  <input
    type="text"
    name="email"
    placeholder="Email"
    value={form?.email ?? ""}
  />
  <input type="password" name="password" placeholder="Password" />
  <button type="submit" formaction="?/form&redirectTo={redirectTo}">
    Login
  </button>
</form>
