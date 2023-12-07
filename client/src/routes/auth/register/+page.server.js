import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod'

const registerScheme = z.object({
  username: z
    .string({ required_error: "Username is required!" })
    .min(1, { message: "Username is required!" })
    .max(64, { message: "Username must be less than 64 characters!" })
    .trim(),
  email: z
    .string({ required_error: "Email is required!" })
    .min(1, { message: "Email is required!" })
    .max(64, { message: "Email must be less than 64 characters!" })
    .email({ message: "Email must be a valid email address!" }),
  password: z
    .string({ required_error: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" })
    .max(64, { message: "Password must be less than 64 characters!" })
    .trim(),
  passwordConfirm: z
    .string({ required_error: "Password confirm is required!" })
    .min(6, { message: "Password confirm must be at least 6 characters!" })
    .max(64, { message: "Password confirm must be less than 64 characters!" })
    .trim()
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"]
});


export const actions = {
  form: async ({ request, url }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      registerScheme.parse(formData);
    } catch (err) {
      const { fieldErrors: errors } = err.flatten();
      const { password, passwordConfirm, ...rest } = formData;
      return {
        data: rest,
        errors
      };
    }

    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: reqBody,
    });
    if (response.status === 409) {
      const { password, passwordConfirm, ...rest } = formData;
      return fail(400, {
        data: rest,
        errors: { email: ["Email is already used!"] }
      });
    }

    throw redirect(303, url.searchParams.get('redirectTo') || '/');
  }
}
