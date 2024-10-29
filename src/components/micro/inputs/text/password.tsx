import TextInput, { TextInputProps } from "@/components/micro/inputs/text";
import PasswordToggle from "@/components/micro/inputs/text/password-toggle";
import { useState } from "react";

export default function PasswordInput(props: TextInputProps) {
  const [passShow, setPassShow] = useState(false);
  return (
    <TextInput
      {...props}
      type={passShow ? "text" : "password"}
      suffix={<PasswordToggle active={passShow} onChange={(a) => setPassShow(a)} />}
    />
  );
}
