import Button from "@/atoms/button";
import Check from "@/atoms/check";
import Input from "@/atoms/input";
import Title from "@/atoms/title";
import Seo from "@/molecules/seo";
import Layout from "@/organisms/layout";
import { getAxiosInstanse } from "api/api";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

interface IEditIngredient {
  ingredient: IIngredient;
  id: number;
}

const EditIngredient: NextPage<IEditIngredient> = ({ ingredient, id }) => {
  const [name, setName] = useState(ingredient.name);
  const [quantity, setQuantity] = useState<number>(ingredient.quantity);
  const [price, setPrice] = useState<number>(ingredient.price);
  const [isComplete, setIsComplete] = useState<boolean>(
    ingredient.isComplete || false
  );
  const router = useRouter();
  const { addToast } = useToasts();

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const ingredient = {
      name: name,
      quantity: quantity,
      price: price,
      isComplete: isComplete,
    };

    await getAxiosInstanse()
      .put("ingredients/" + id, ingredient)
      .then((res) => {
        addToast(res.data.message, { appearance: "success" });
        router.push("/ingredients");
      })
      .catch((err) => {
        console.log(err);
        try {
          addToast(err.response.data.message, { appearance: "error" });
        } catch (error) {
          addToast("Something went wrong", { appearance: "error" });
        }
      });
  };

  return (
    <>
      <Seo title="Ingredients"></Seo>
      <Layout translations={""}>
        <Title>Edit {ingredient.name}</Title>
        <FormIng className="container">
          <div className="row">
            <div className="col-md-12">
              <Input
                name="name"
                placeHolder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <Input
                name="quantity"
                placeHolder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="col-md-12">
              <Input
                name="price"
                placeHolder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="col-md-12 text-center">
              <Check
                className="my-2"
                label="Is Ingredient Complete"
                name="isComplete"
                checked={isComplete}
                onChange={() => setIsComplete(!isComplete)}
              />
            </div>
            <div className="col-12 text-center">
              <Button onClick={(e) => handleForm(e)}>Save</Button>
            </div>
          </div>
        </FormIng>
      </Layout>
    </>
  );
};

export default EditIngredient;

const FormIng = styled.form`
  max-width: 50%;
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ingredientRes = await fetch(
    //@ts-ignore
    process.env.NEXT_PUBLIC_API_URL + "ingredients/" + ctx.params.id ||
      "http://localhost:5000"
  );
  const ingredient = await ingredientRes.json();

  return {
    //@ts-ignore
    props: { ingredient, id: ctx.params.id }, // will be passed to the page component as props
  };
};
