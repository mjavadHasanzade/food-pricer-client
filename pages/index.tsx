import Seo from "@/molecules/seo";
import Layout from "@/organisms/layout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Seo title="Home"></Seo>
      <Layout translations={""}>1</Layout>
    </>
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
