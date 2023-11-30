export function load({ cookies, locals }) {
  const accessToken = cookies.get('accessToken');
  const userId = locals.userId;
  return {
    accessToken,
    userId
  };
}
