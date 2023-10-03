import { Button } from "primereact/button";
import TextInput from "../components/micro/text/text";

export default function MainPage() {
  return (
    <div className="flex flex-col items-start w-screen h-screen p-4 bg-primary-100">
      <div className="bg-primary-600 text-primary-100 h-10 min-w-[100px] flex items-center justify-center rounded-md cursor-pointer">
        hello
      </div>
      <div >
        <Button label="hello" pt={{root:{className:""}}} />
      </div>
      <div>
        <TextInput/>
      </div>
    </div>
  );
}
