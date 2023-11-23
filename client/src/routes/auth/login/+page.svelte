<script>
  import { focusTrap } from "@skeletonlabs/skeleton";
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";
  export let form;
  const redirectTo = $page.url.searchParams.get("redirectTo") || "/";
</script>

<svelte:head>
  <title>Local Bargains! - Login</title>
</svelte:head>

<div
  class="flex justify-center w-full h-full"
  in:fly={{ y: 200, duration: 500 }}
>
  <div class="xl:mx-96 p-24 w-full h-full card flex flex-wrap justify-center">
    <h2 class="h2 w-full flex justify-center">Sign in!</h2>
    <form
      use:focusTrap={true}
      method="post"
      class="flex flex-wrap justify-center h-full w-96"
    >
      <label for="email" class="label w-full mt-3">
        <span>Email</span>
        <input
          class="input"
          type="email"
          name="email"
          placeholder="Email"
          value={form?.data?.email ?? ""}
        />
        {#if form?.errors?.email}
          <span class="label w-full text-red-700">{form?.errors?.email[0]}</span
          >
        {/if}
      </label>

      <label for="password" class="label w-full mt-3">
        <span>Password</span>
        <input
          class="input"
          type="password"
          name="password"
          placeholder="Password"
        />
        {#if form?.errors?.password}
          <span class="label w-full text-red-700"
            >{form?.errors?.password[0]}</span
          >
        {/if}
      </label>

      <button
        class="btn variant-filled-primary mt-3"
        type="submit"
        formaction="?/form&redirectTo={redirectTo}"
      >
        Login
      </button>
    </form>
  </div>
</div>
