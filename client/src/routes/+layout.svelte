<script>
  import { AppBar } from "@skeletonlabs/skeleton";
  import { Avatar } from "@skeletonlabs/skeleton";
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
      <a href="/user/{data?.id}" class="btn variant-filled-primary">
        Manage Your Bargains!
      </a>
      <Avatar
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mmarocks.pl%2Fwp-content%2Fuploads%2F2019%2F06%2Fpuidzix.jpg&f=1&nofb=1&ipt=458d294900f249e8074eb325fa48f77f4c284cc8734786168c6db2894024f8a5&ipo=images"
        width="w-10"
        rounded="rounded-full"
      />
      <a
        href="/auth/logout?redirectTo={data?.redirectTo}"
        class="btn variant-filled-primary"
      >
        Log out
      </a>
    {:else}
      <a
        href="/auth/register?redirectTo={data?.redirectTo}"
        class="btn variant-filled-primary"
      >
        Sign up
      </a>
      <a
        href="/auth/login?redirectTo={data?.redirectTo}"
        class="btn variant-filled-primary"
      >
        Sign in
      </a>
    {/if}
  </svelte:fragment>
</AppBar>

<slot />
