import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {

}
export const actions = {
  logout: async ({ cookies }) => {
    cookies.set('accessToken', '', { path: '/', expires: 0, maxAge: 0 });
    cookies.set('refreshToken', '', { path: '/', expires: 0, maxAge: 0 });
    throw redirect(303, '/');
  },
  back: async ({ url }) => {
    throw redirect(303, url.searchParams.get('redirectTo') || '/');
  }
}
