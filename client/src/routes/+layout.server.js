export async function load({ cookies }) {
  if (!cookies.get('accessToken')) return;

  const accessToken = cookies.get('accessToken');
  const response = await fetch("http://localhost:3000/api/user/getId", {
    method: "get",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": `accessToken=${accessToken}`
    }
  });
  const { id } = await response.json();
  return {
    accessToken,
    id
  };
}
