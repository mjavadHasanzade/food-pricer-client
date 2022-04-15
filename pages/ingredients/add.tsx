import Button from "@/atoms/button";
import Check from "@/atoms/check";
import Input from "@/atoms/input";
import Title from "@/atoms/title";
import Seo from "@/molecules/seo";
import Layout from "@/organisms/layout";
import { getAxiosInstanse } from "api/api";
import { useAppContext } from "context/app-context";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

const AddNew: NextPage = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();
  const { addToast } = useToasts();
  const { setLoaderActiver } = useAppContext();

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const ingredient = {
      name: name,
      quantity: quantity,
      price: price,
      isComplete: isComplete,
    };

    setLoaderActiver(true);
    await getAxiosInstanse()
      .post("ingredients", ingredient)
      .then((res) => {
        router.push("/ingredients");
        addToast(res.data.message, { appearance: "success" });
      })
      .catch((err) => {
        try {
          addToast(err.response.data.message, { appearance: "error" });
        } catch (error) {
          addToast("Something went wrong", { appearance: "error" });
        }
      })
      .finally(() => {
        setLoaderActiver(false);
      });
  };

  return (
    <>
      <Seo title="Ingredients"></Seo>
      <Layout translations={""}>
        <Title>Add New Ingredient</Title>
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
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <Input
                name="price"
                placeHolder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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

export default AddNew;

const FormIng = styled.form`
  max-width: 50%;
`;
