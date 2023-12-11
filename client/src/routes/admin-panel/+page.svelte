<script>
  import { fly } from "svelte/transition";
</script>

<svelte:head>
  <title>Local Bargains! - Administrator Panel</title>
</svelte:head>
<div
  class="flex justify-center w-full h-auto"
  in:fly={{ y: 200, duration: 500 }}
>
  <div
    class="xl:mx-96 p-24 w-full h-full card flex justify-center space-x-4 flex-wrap"
  >
    <h3 class="h3 w-full text-center">Administrator Panel</h3>
    <a href="admin-panel/users" class="btn variant-filled-primary mt-3">
      Manage Users
    </a>
    <a href="admin-panel/tags" class="btn variant-filled-primary mt-3">
      Manage Tags
    </a>
    <a href="admin-panel/reports" class="btn variant-filled-primary mt-3">
      Manage Reports
    </a>
  </div>
</div>
