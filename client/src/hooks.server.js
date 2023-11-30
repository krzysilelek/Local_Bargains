import * as set_cookie_parser from 'set-cookie-parser';

export async function handle({ event, resolve }) {
  if (event.cookies.get("accessToken")) {
    const accessToken = event.cookies.get("accessToken");
    const response = await fetch("http://localhost:3000/api/user/getId", {
      method: "get",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `accessToken=${accessToken}`
      }
    });
    const info = await response.json();
    event.locals.userId = info.id;

    return await resolve(event);
  }

  const refreshToken = event.cookies.get("refreshToken");
  if (refreshToken === null) {
    return await resolve(event);
  }
  const response = await fetch("http://localhost:3000/api/auth/refresh", {
    method: "post",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": `refreshToken=${refreshToken}`
    }
  });
  const { headers } = response;
  for (const str of set_cookie_parser.splitCookiesString(headers.get('set-cookie'))) {
    const { name, value, ...options } = set_cookie_parser.parseString(str);
    event.cookies.set(name, value, { ...options });
  }
  return await resolve(event);
}
