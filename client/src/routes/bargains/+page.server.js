export async function load() {
  const response = await fetch("http://localhost:3000/api/bargains/2/0", {
    method: "get",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const bargains = await response.json();
  return { bargains };
}

export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { limit } = formData;
    const response = await fetch(`http://localhost:3000/api/bargains/${limit}/0`, {
      method: "get",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    const bargains = await response.json();
    return { bargains };
  }
}
