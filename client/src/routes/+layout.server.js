import { BACKEND_ADDRESS } from '$env/static/private';

export async function load({ cookies, url }) {
  const redirectTo = url.pathname;
  if (!cookies.get('accessToken')) return { redirectTo };

  const accessToken = cookies.get('accessToken');
  const response = await fetch(`http://${BACKEND_ADDRESS}/api/user/getInfo`, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": `accessToken=${accessToken}`
    }
  });
  const { id, role } = await response.json();
  return {
    accessToken,
    id,
    role,
    redirectTo
  };
}
