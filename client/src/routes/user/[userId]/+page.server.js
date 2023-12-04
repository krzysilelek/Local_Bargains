import { redirect } from "@sveltejs/kit";
import { z } from 'zod';
import { freeFormSearch } from '@simple-nominatim/core'

const BargainScheme = z.object({
  title: z
    .string({ required_error: "Title is required!" })
    .min(1, { message: "Title is required!" })
    .max(64, { message: "Title must be less than 64 characters!" })
    .trim(),
  description: z
    .string({ required_error: "Description is required!" })
    .min(1, { message: "Description is required!" })
    .max(1000, { message: "Description must be less than 1000 characters!" })
    .trim(),
  tag: z
    .string()
    .uuid(),
  localization: z
    .string({ required_error: "Localization is required!" })
    .min(1, { message: "Localization is required!" })
    .max(128, { message: "Localization must be less than 128 characters!" })
    .trim(),
});

export async function load({ fetch, cookies, url }) {

  if (!cookies.get('accessToken')) {
    throw redirect(307, `/auth/login?redirectTo=${url.pathname}`);
  }

  let response = await fetch("http://localhost:3000/api/bargainsOfUser", {
    method: "get",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const bargains = await response.json();

  response = await fetch("http://localhost:3000/api/tags", {
    method: "get",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const tags = await response.json();

  return { bargains, tags };
}

export const actions = {
  addBargain: async ({ request, cookies, url }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      BargainScheme.parse(formData);
    } catch (err) {
      const { fieldErrors: errors } = err.flatten();
      const { picture, base64Photo, ...rest } = formData;
      return {
        data: rest,
        errors
      };
    }

    const result = await freeFormSearch({ query: formData.localization }, { format: 'jsonv2' })
    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }
    reqBody.append("latitude", result[0].lat);
    reqBody.append("longitude", result[0].lon);
    reqBody.delete("picture");
    reqBody.delete("addFormValue");
    reqBody.delete("localization");
    const response = await fetch("http://localhost:3000/api/bargains/add", {
      method: "post",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `accessToken=${cookies.get("accessToken")}`
      },
      body: reqBody,
    });

    throw redirect(303, url.pathname);
  }
}
