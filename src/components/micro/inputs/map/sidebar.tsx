"use client";

import { X } from "lucide-react";
import Badge from "../../badge/badge";
import { Select } from "../select";
import { provinceNormalizer, useProvincesQuery } from "@/features/static-data/services";
import { sizes } from "@/themes/tailwind/sizes";

export default function MapSidebar() {
  const { data: provinces } = useProvincesQuery();
  return (
    <div className="w-80 h-[calc(100%_-_40px)] rounded-xl bg-white absolute top-5 right-5 z-20">
      <div className="flex items-center justify-between w-full p-4 border-b">
        <span className="text-base font-extrabold">فیلتر های انتخاب مکان</span>
        <Badge className="gap-px px-2 cursor-pointer">
          <span>3</span>
          <X className="w-4" />
        </Badge>
      </div>
      <div className="w-full p-4">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-semibold">فیلترهای مکانی</span>
          <Select.Single options={provinceNormalizer(provinces)} label="انتخاب استان" filter hideMessage />
          <Select.Multi options={[]} label="انتخاب محورها" hideMessage />
          <Select.Single options={[]} label="انتخاب سامانه ها" hideMessage />
        </div>
        <div className="w-full h-px my-8 bg-gray-200" />
        <div className="flex flex-col gap-6">
          <span className="text-sm font-semibold">فیلترهای مکانی</span>
          <Select.Single options={[]} label="لایه بندی دوربین ها" hideMessage />
          <Select.Single options={[]} label="وضعیت دوربین ها" hideMessage />
        </div>
      </div>
    </div>
  );
}
