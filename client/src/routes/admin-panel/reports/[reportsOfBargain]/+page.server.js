import { BACKEND_ADDRESS } from '$env/static/private';
import { redirect } from "@sveltejs/kit";

export async function load({ fetch, params }) {
  let response = await fetch(`http://${BACKEND_ADDRESS}/api/bargain/${params.reportsOfBargain}/getCreatorInfo`, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const info = await response.json();


  response = await fetch(`http://${BACKEND_ADDRESS}/api/reports/ofBargain/${params.reportsOfBargain}`, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const reports = await response.json();

  return { info, reports };
}

export const actions = {
  deleteBargain: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData());
    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }
    const response = await fetch(`http://${BACKEND_ADDRESS}/api/bargains/delete`, {
      method: "delete",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `accessToken=${cookies.get("accessToken")}`
      },
      body: reqBody,
    });
    throw redirect(303, "/admin-panel/reports");
  },
  deleteReport: async ({ request, cookies, url }) => {
    const formData = Object.fromEntries(await request.formData());
    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }
    const response = await fetch(`http://${BACKEND_ADDRESS}/api/reports/delete`, {
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
