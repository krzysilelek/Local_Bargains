export async function load({ cookies, url }) {
  const redirectTo = url.pathname;
  if (!cookies.get('accessToken')) return { redirectTo };

  const accessToken = cookies.get('accessToken');
  const response = await fetch("http://localhost:3000/api/user/getId", {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": `accessToken=${accessToken}`
    }
  });
  const { id } = await response.json();
  return {
    accessToken,
    id,
    redirectTo
  };
}
