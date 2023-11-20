<script>
  export let data;
  const bargain = data.bargain;
</script>

<svelte:head>
  <title>Local Bargains! - {bargain?.title}</title>
</svelte:head>

<div>
  <h2>{bargain?.title}</h2>
  <h3>{bargain?.description}</h3>
  <h4>{bargain?.tag}</h4>
</div>
