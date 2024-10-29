import { H4, P } from "@/components/micro/typography";
import { Input } from "./types";

export interface Section<Name, Field> {
  title: string;
  subTitle: string;
  inputs: Input<Name, Field>[];
}

export function Section(props: { title?: string; subTitle?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-8 border-b border-gray-300 p-8 last:border-b-0">
      <div className="w-64">
        <H4 className="text-lg font-bold">{props.title}</H4>
        <P className="font- text-base">{props.subTitle}</P>
      </div>
      {props.children}
    </div>
  );
}
