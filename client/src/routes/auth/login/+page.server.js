import { fail, redirect } from '@sveltejs/kit';
import * as set_cookie_parser from 'set-cookie-parser';
import { z } from 'zod';

const LoginScheme = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .min(1, { message: "Email is required!" })
    .max(64, { message: "Email must be less than 64 characters!" })
    .email({ message: "Email must be a valid email address!" }),
  password: z
    .string({ required_error: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" })
    .max(64, { message: "Password must be less than 64 characters!" })
    .trim()
});

export const actions = {
  form: async ({ request, url, cookies }) => {
    const formData = Object.fromEntries(await request.formData());
    try {
      LoginScheme.parse(formData);
    } catch (err) {
      const { fieldErrors: errors } = err.flatten();
      const { password, ...rest } = formData;
      return {
        data: rest,
        errors
      };
    }

    const reqBody = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      reqBody.append(key, value);
    }

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: reqBody,
    });

    if (response.status === 418) {
      const { email } = formData;
      return fail(400, {
        data: { email },
        errors: { email: ["Email is not in database!"] }
      });
    } else if (response.status === 401) {
      const { email } = formData;
      return fail(400, {
        data: { email },
        errors: { password: ["Bad password!"] }
      });
    } else if (response.status === 403) {
      const { email } = formData;
      return fail(400, {
        data: { email },
        errors: { email: ['Your account is inactive. Please contact customer support.'] }
      });
    }
    const { headers } = response;
    for (const str of set_cookie_parser.splitCookiesString(headers.get('set-cookie'))) {
      const { name, value, ...options } = set_cookie_parser.parseString(str);
      cookies.set(name, value, { ...options });
    }
    throw redirect(303, url.searchParams.get('redirectTo') || '/');
  }
}
