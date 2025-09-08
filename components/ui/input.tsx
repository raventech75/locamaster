import { ComponentProps } from "react";
export default function Input(props: ComponentProps<'input'>){
  return <input {...props} className={`border rounded-xl px-3 py-2 ${props.className||''}`} />;
}
