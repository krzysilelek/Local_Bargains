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
  <input
    type="username"
    name="username"
    placeholder="Username"
    value={form?.data?.username ?? ""}
  />
  <label for="username" class="label">
    {#if form?.errors?.username}
      <span class="label-text-alt text-error">{form?.errors?.username[0]}</span>
    {/if}
  </label>
  <input
    type="text"
    name="email"
    placeholder="Email"
    value={form?.data?.email ?? ""}
  />
  <label for="email" class="label">
    {#if form?.errors?.email}
      <span class="label-text-alt text-error">{form?.errors?.email[0]}</span>
    {/if}
  </label>
  <input type="password" name="password" placeholder="Password" />
  <label for="password" class="label">
    {#if form?.errors?.password}
      <span class="label-text-alt text-error">{form?.errors?.password[0]}</span>
    {/if}
  </label>
  <input
    type="password"
    name="passwordConfirm"
    placeholder="Password Confirm"
  />
  <label for="passwordConfirm" class="label">
    {#if form?.errors?.passwordConfirm}
      <span class="label-text-alt text-error"
        >{form?.errors?.passwordConfirm[0]}</span
      >
    {/if}
  </label>
  <button type="submit" formaction="?/form&redirectTo={redirectTo}">
    Register
  </button>
</form>
