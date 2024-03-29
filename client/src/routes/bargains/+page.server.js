import { BACKEND_ADDRESS } from '$env/static/private';

export async function load({ fetch, url }) {
  const client_lat = url.searchParams.get("client_lat");
  const client_lon = url.searchParams.get("client_lon");
  const radius = url.searchParams.get("radius");
  const tags = url.searchParams.get("tags")
  const response = await fetch(`http://${BACKEND_ADDRESS}/api/bargains/getLocal/${client_lat}/${client_lon}/${radius}/${tags}`, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const bargains = await response.json();
  return { bargains };
}


