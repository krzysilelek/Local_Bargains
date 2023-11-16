<script>
  import { page } from "$app/stores";
  export let form;
  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<svelte:head>
  <title>Local Bargains! - Register</title>
</svelte:head>

<h1>Sign up!</h1>
<form method="post">
  <p>{form?.message || ""}</p>
  <input
    type="username"
    name="username"
    placeholder="Username"
    value={form?.username ?? ""}
  />
  <input
    type="text"
    name="email"
    placeholder="Email"
    value={form?.email ?? ""}
  />
  <input type="password" name="password" placeholder="Password" />
  <button type="submit" formaction="?/form&redirectTo={redirectTo}">
    Register
  </button>
</form>
