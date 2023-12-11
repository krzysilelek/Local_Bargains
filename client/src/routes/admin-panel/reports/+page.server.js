export async function load({ fetch }) {

  const response = await fetch("http://localhost:3000/api/reports/get", {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  });
  const reports = await response.json();

  return { reports };
}

