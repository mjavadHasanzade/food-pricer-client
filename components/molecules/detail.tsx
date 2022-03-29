import React, { FC } from "react";
import styled from "styled-components";
import theme from "@/utils/theme";

interface Props {
  title: string;
  qty: number;
  color: string;
  children: React.ReactNode;
}

const Detail: FC<Props> = ({ title, qty, children, color }) => {
  return (
    <DetailST color={color}>
      <span className="icon">{children}</span>
      <div className="details">
        <p className="title">{title}</p>
        <strong>{qty}</strong>
      </div>
    </DetailST>
  );
};

export default Detail;

const DetailST = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span.icon {
    background-color: #${(props) => props.color};
    color: ${theme.colors.white};
    font-size: 1.5rem;
    padding: 0.3rem;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
  }
  .details {
    margin: 0 0.75rem;
    /* padding: 10px 0; */
    p.title {
      margin: 0;
      font-weight: 400;
      color: ${theme.colors.texts};
      font-size: 0.8rem;
      letter-spacing: 0.5px;
    }
  }
`;
