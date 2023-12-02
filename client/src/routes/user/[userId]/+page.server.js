export async function load({ fetch }) {
  const response = await fetch("http://localhost:3000/api/bargainsOfUser", {
    method: "get",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const bargains = await response.json();
  return { bargains };
}

