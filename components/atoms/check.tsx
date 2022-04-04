import theme from "@/utils/theme";
import React, { FC } from "react";
import styled from "styled-components";

interface ICheck {
  label: string;
  type?: "radio" | "checkbox";
  className?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  disabled?: boolean;
}

const Check: FC<ICheck> = ({
  label,
  className,
  name,
  checked,
  onChange,
  type = "checkbox",
  disabled,
  ...rest
}) => {
  return (
    <>
      <InputCheck
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        {...rest}
      />
      <LabelST htmlFor={name} className={className}>
        <span></span>
        {label}
      </LabelST>
    </>
  );
};

const InputCheck = styled.input`
  display: none; // hide the system checkbox

  // Let's add some effects after the checkbox is checked

  &:checked {
    + label {
      span {
        background-color: ${theme.colors.primary};
        transform: scale(1.1); // enlarge the box

        &:after {
          width: 10px;
          background: ${theme.colors.white};
          transition: width 150ms ease 100ms; // enlarge the tick
        }

        &:before {
          width: 5px;
          background: ${theme.colors.white};
          transition: width 150ms ease 100ms; // enlarge the tick
        }
      }

      &:hover {
        // copy the states for onMouseOver to avoid flickering
        span {
          background-color: ${theme.colors.primary};
          transform: scale(1.1); // enlarge the box

          &:after {
            width: 10px;
            background: ${theme.colors.white};
            transition: width 150ms ease 100ms; // enlarge the tick
          }

          &:before {
            width: 5px;
            background: ${theme.colors.white};
            transition: width 150ms ease 100ms; // enlarge the tick
          }
        }
      }
    }
  }
`;

const LabelST = styled.label`
  display: inline-block; // to make it easier to click
  color: ${theme.colors.primary};
  cursor: pointer;
  position: relative; // important

  // Now we'll create the checkbox object

  span {
    display: inline-block;
    position: relative;
    background-color: transparent;
    width: 20px;
    height: 20px;
    transform-origin: center;
    border: 2px solid ${theme.colors.primary};
    border-radius: 50%;
    vertical-align: -6px;
    margin-right: 10px;
    transition: background-color 150ms 200ms,
      transform 350ms cubic-bezier(0.78, -1.22, 0.17, 1.89); // custom ease effect for bouncy animation

    // Now we'll create the "tick" using pseudo elements - those will be basically two lines that will be rotated to form the "tick"

    &:before {
      content: "";
      width: 0px;
      height: 2px;
      border-radius: 2px; // so that the tick has nice rounded look
      background: ${theme.colors.primary};
      position: absolute;
      transform: rotate(45deg);
      top: 8px; // you'll need to experiment with placement depending on the dimensions you've chosen
      left: 4px; // you'll need to experiment with placement depending on the dimensions you've chosen
      transition: width 50ms ease 50ms;
      transform-origin: 0% 0%;
    }

    &:after {
      content: "";
      width: 0;
      height: 2px;
      border-radius: 2px; // so that the tick has nice rounded look
      background: ${theme.colors.primary};
      position: absolute;
      transform: rotate(305deg);
      top: 11px; // you'll need to experiment with placement depending on the dimensions you've chosen
      left: 5px; // you'll need to experiment with placement depending on the dimensions you've chosen
      transition: width 50ms ease;
      transform-origin: 0% 0%;
    }
  }
  // Time to add some life to it

  &:hover {
    span {
      &:before {
        width: 5px;
        transition: width 100ms ease;
      }

      &:after {
        width: 10px;
        transition: width 150ms ease 100ms;
      }
    }
  }
`;

export default Check;
