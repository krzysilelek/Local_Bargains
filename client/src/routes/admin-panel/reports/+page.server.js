import { BACKEND_ADDRESS } from '$env/static/private';

export async function load({ fetch }) {

  const response = await fetch(`http://${BACKEND_ADDRESS}/api/reports/get`, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const reports = await response.json();

  return { reports };
}

