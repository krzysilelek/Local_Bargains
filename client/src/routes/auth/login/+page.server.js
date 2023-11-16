import { fail, redirect } from '@sveltejs/kit';
import * as set_cookie_parser from 'set-cookie-parser';

export const actions = {
  form: async ({ request, url, cookies }) => {
    const data = await request.formData();
    const email = data.get('email').trim();
    const password = data.get('password').trim();

    if (!email || !password) {
      return fail(400, {
        email,
        message: 'Missing username or password!'
      });
    }
    const reqBody = new URLSearchParams();
    reqBody.append("email", email);
    reqBody.append("password", password);
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: reqBody,
    });
    if (response.status === 418) {
      return fail(400, {
        email,
        message: 'Bad email!'
      });
    } else if (response.status === 401) {
      return fail(400, {
        email,
        message: 'Bad password!'
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
