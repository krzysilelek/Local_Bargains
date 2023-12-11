import { redirect } from "@sveltejs/kit";
import { z } from 'zod';

const TagScheme = z.object({
  name: z
    .string({ required_error: "Title is required!" })
    .min(1, { message: "Title is required!" })
    .max(20, { message: "Title must be less than 20 characters!" })
    .trim()
});

export async function load({ fetch }) {
  const response = await fetch("http://localhost:3000/api/tags", {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const tags = await response.json();

  return { tags };
}

export const actions = {
  addTag: async ({ request, cookies, url }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      TagScheme.parse(formData);
    } catch (err) {
      const { fieldErrors: errors } = err.flatten();
      return {
        data: formData,
        errors
      };
    }

    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }

    const response = await fetch("http://localhost:3000/api/tags/add", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `accessToken=${cookies.get("accessToken")}`
      },
      body: reqBody,
    });

    throw redirect(303, url.pathname);
  },
  editTag: async ({ request, cookies, url }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      TagScheme.parse(formData);
    } catch (err) {
      const { fieldErrors: errors } = err.flatten();
      return {
        data: formData,
        errors
      };
    }

    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }

    const response = await fetch("http://localhost:3000/api/tags/edit", {
      method: "put",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `accessToken=${cookies.get("accessToken")}`
      },
      body: reqBody,
    });

    throw redirect(303, url.pathname);
  },
  deleteTag: async ({ request, cookies, url }) => {
    const formData = Object.fromEntries(await request.formData());
    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }
    const response = await fetch("http://localhost:3000/api/tags/delete", {
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
