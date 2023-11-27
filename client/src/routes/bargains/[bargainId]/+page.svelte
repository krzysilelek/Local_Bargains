<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { geocodeReverse } from "@simple-nominatim/core";

  export let data;
  const bargain = data.bargain;

  let mapElement;
  let map;

  onMount(async () => {
    if (browser) {
      const leaflet = await import("leaflet");
      const result = await geocodeReverse(
        { latitude: bargain.latitude, longitude: bargain.longitude },
        { format: "jsonv2" },
      );
      console.log(result);
      map = leaflet
        .map(mapElement)
        .setView([bargain.latitude, bargain.longitude], 13);

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(map);

      leaflet
        .marker([bargain.latitude, bargain.longitude])
        .addTo(map)
        .bindPopup(result.display_name)
        .openPopup();
    }
  });

  onDestroy(async () => {
    if (map) {
      console.log("Unloading Leaflet map.");
      map.remove();
    }
  });
</script>

<svelte:head>
  <title>Local Bargains! - {bargain?.title}</title>
</svelte:head>

<div>
  <h2>{bargain?.title}</h2>
  <h3>{bargain?.description}</h3>
  <h4>{bargain?.tag}</h4>
</div>

<div id="map" bind:this={mapElement}></div>

<style>
  @import "leaflet/dist/leaflet.css";
  #map {
    width: 48em;
    height: 48em;
  }
</style>
