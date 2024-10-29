import { Eye, EyeOff } from "lucide-react";

export default function PasswordToggle(props: { active?: boolean; onChange?: (active: boolean) => void }) {
  return (
    <div
      className="flex h-full cursor-pointer items-center px-4 py-2 hover:bg-gray-200"
      onClick={() => props.onChange && props.onChange(!props.active)}
    >
      {props.active ? <Eye /> : <EyeOff />}
    </div>
  );
}
