import { BACKEND_ADDRESS } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import { freeFormSearch } from '@simple-nominatim/core'

export async function load() {
  const response = await fetch(`http://${BACKEND_ADDRESS}/api/tags`, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const tags = await response.json();

  return { tags };
}


export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    let result;
    try {
      result = await freeFormSearch({ query: formData.localization }, { format: 'jsonv2' });
    } catch (err) {
      return fail(400, {
        data: formData,
        errors: { localization: ["Unable to find a localization!"] }
      });

    }

    const tags = [];

    for (const data in formData) {
      if (data !== "localization" && data !== "radius") {
        tags.push(data);
      }
    }
    throw redirect(303, `/bargains?client_lat=${result[0].lat}&client_lon=${result[0].lon}&radius=${formData.radius}&tags=${tags}`);
  },
}
