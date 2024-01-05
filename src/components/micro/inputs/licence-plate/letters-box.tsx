import { classNames } from "@/utils";
import { plateLetters } from "./letters";

export interface LettersBoxProps {
  onChange: (val: string, colorCode?: string) => void;
}

export default function LettersBox({ onChange }: LettersBoxProps) {
  return (
    <div className="h-60 overflow-auto bg-gray-50 border border-gray-300 rounded-md">
      <div className="flex flex-col w-[330px] p-2">
        <div className="grid grid-cols-5 gap-3">
          {plateLetters.persianLetters.concat(plateLetters.englishLetters).map((letter) => (
            <div
              key={letter.letter}
              onClick={() => onChange(letter.letter, letter.colorCode)}
              className={classNames(
                "h-12 w-12 flex items-center justify-center flex-col cursor-pointer",
                "bg-gray-200 rounded-md hover:shadow-lg transition-all",
                letter.colorCode ? colors[letter.colorCode] : ""
              )}
            >
              <span className="text-base font-semibold">{letter.letter}</span>
              {letter.dsc && <span className="text-[9px] font-medium">{letter.dsc}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const colors: { [key: string]: string } = {
  police: "bg-plate-police-bg text-plate-police-text shadow-plate-police-bg",
  taxi: "bg-plate-taxi-bg text-plate-taxi-text shadow-plate-taxi-bg",
  army: "bg-plate-army-bg text-plate-army-text shadow-plate-army-bg",
  navy: "bg-plate-navy-bg text-plate-navy-text shadow-plate-navy-bg",
  protocol: "bg-plate-protocol-bg text-plate-protocol-text shadow-plate-protocol-bg",
  service: "bg-plate-service-bg text-plate-service-text shadow-plate-service-bg",
};
