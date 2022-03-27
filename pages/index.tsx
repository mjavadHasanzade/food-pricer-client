import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = ({ data }) => {
  console.log(data);
  return (
    <div>
      
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const res = await fetch(process.env.API_URL || "http://localhost:5000");
  const data = await res.json();
  console.log(data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
