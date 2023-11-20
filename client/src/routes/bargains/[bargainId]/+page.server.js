export async function load({ params }) {
  const response = await fetch(`http://localhost:3000/api/bargain/${params.bargainId}`, {
    method: "get",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });

  const bargain = await response.json();
  return { bargain };
}
