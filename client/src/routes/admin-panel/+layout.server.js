import { redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies, url }) {

  if (!cookies.get('accessToken')) {
    throw redirect(307, `/auth/login?redirectTo=${url.pathname}`);
  }
  const response = await fetch("http://localhost:3000/api/user/getInfo", {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": `accessToken=${cookies.get('accessToken')}`
    }
  });
  const { role } = await response.json();
  if (role !== "Administrator") {
    throw redirect(303, "/");
  }
}

