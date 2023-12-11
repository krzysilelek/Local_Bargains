import { redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies, url }) {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": `accessToken=${cookies.get("accessToken")}`
    }
  });
  const users = await response.json();
  return { users };
}

export const actions = {
  switchStatus: async ({ request, cookies, url }) => {
    const formData = Object.fromEntries(await request.formData());
    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }
    const response = await fetch("http://localhost:3000/api/users/switchActive", {
      method: "put",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `accessToken=${cookies.get("accessToken")}`
      },
      body: reqBody,
    });
    throw redirect(303, url.pathname);
  },
  deleteUser: async ({ request, cookies, url }) => {
    const formData = Object.fromEntries(await request.formData());
    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }
    const response = await fetch("http://localhost:3000/api/users/delete", {
      method: "delete",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `accessToken=${cookies.get("accessToken")}`
      },
      body: reqBody,
    });
    throw redirect(303, url.pathname);
  }
}
