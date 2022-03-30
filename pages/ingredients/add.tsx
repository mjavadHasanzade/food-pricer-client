import Button from "@/atoms/button";
import Input from "@/atoms/input";
import Title from "@/atoms/title";
import Seo from "@/molecules/seo";
import Layout from "@/organisms/layout";
import { getAxiosInstanse } from "api/api";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const AddNew: NextPage = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  const handleForm = async () => {
    const ingredient = {
      name: name,
      quantity: quantity,
      price: price,
      isComplete: isComplete,
    };

    await getAxiosInstanse()
      .post("ingredients", ingredient)
      .then((res) => router.push("/ingredients"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Seo title="Ingredients"></Seo>
      <Layout translations={""}>
        <Title>Add New Ingredient</Title>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Input
                name="name"
                placeHolder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <Input
                name="quantity"
                placeHolder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <Input
                name="price"
                placeHolder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <Input
                name="isComplete"
                placeHolder="isComplete"
                value={String(isComplete)}
                onChange={(e) => setIsComplete(Boolean(e.target.value))}
              />
            </div>
            <div className="col-12">
              <Button onClick={() => handleForm()}>Save</Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddNew;

export async function getServerSideProps() {
  const ingredientRes = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "ingredients" || "http://localhost:5000"
  );
  const ingredients = await ingredientRes.json();

  return {
    props: { ingredients }, // will be passed to the page component as props
  };
}
