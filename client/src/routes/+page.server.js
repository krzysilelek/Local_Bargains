export function load({ cookies }) {
  const accessToken = cookies.get('accessToken');
  return {
    accessToken
  };
}
