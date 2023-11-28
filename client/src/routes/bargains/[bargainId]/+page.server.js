import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

const CommentScheme = z.object({
  comment: z
    .string({ required_error: "Comment is required!" })
    .min(1, { message: "Comment is required!" })
    .max(1000, { message: "Comment must be less than 1000 characters!" })
    .trim()
})

export async function load({ params }) {
  let response = await fetch(`http://localhost:3000/api/bargain/${params.bargainId}`, {
    method: "get",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const bargain = await response.json();

  response = await fetch(`http://localhost:3000/api/comments/${params.bargainId}`, {
    method: "get",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const comments = await response.json();

  return { bargain, comments };
}

export const actions = {
  addComment: async ({ request, cookies, url }) => {
    const formData = Object.fromEntries(await request.formData());
    try {
      CommentScheme.parse(formData);
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

    const response = await fetch("http://localhost:3000/api/comments/add", {
      method: "post",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `accessToken=${cookies.get("accessToken")}`
      },
      body: reqBody,
    });
    throw redirect(303, url.pathname)
  }
}
