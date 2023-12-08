export async function load({ fetch, url }) {
  const client_lat = url.searchParams.get("client_lat");
  const client_lon = url.searchParams.get("client_lon");
  const radius = url.searchParams.get("radius");
  const response = await fetch(`http://localhost:3000/api/bargains/getLocal/${client_lat}/${client_lon}/${radius}`, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const bargains = await response.json();
  return { bargains };
}


