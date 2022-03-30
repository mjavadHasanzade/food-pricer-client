import theme from "@/utils/theme";
import React, { FC, useRef, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import styled from "styled-components";

interface IInput {
  name: string;
  type?: string;
  className?: string;
  style?: any;
  placeHolder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IInput> = ({ name, placeHolder, type = "text", ...rest }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);

    if (!passwordVisible) inputRef.current.type = "text";
    else inputRef.current.type = "password";
  };


  return (
    <InputContainer >
      <Inputer name={name.replace(' ', '-')} type={type} placeholder={placeHolder}
        ref={inputRef} {...rest}
      />
      {type === 'password' &&
        <i className='passEye' onClick={() => handlePasswordVisible()}>
          {passwordVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
        </i>
      }

    </InputContainer>
  )
}

export default Input;

const Inputer = styled.input`
    background-color: ${theme.colors.bgwhiteSmoke};
    border-radius: 10px;
    border: none;
    padding:1rem 1rem;
    display: inline-block;
    margin: 0.5rem 0;
    width: 100%;
    text-align: ${props => props.theme.rtl ? "right" : "left"};
    &::placeholder{
        color: #BDBDBD;
    }
`

const InputContainer = styled.div`
  position: relative;

    .passEye{
        color: #CCCCCC;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        ${props => props.theme.rtl ? "left" : "right"}: 1rem;
        cursor: pointer;
        font-size: 1.2rem;
    }
`