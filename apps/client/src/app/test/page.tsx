import { auth } from "@clerk/nextjs/server";

const Test = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  console.log(token);

  const res = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data);

  return <div>Test</div>;
};
export default Test;
