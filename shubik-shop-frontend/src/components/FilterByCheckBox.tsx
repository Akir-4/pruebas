"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpWideNarrow, ArrowDownNarrowWide } from "lucide-react"

export function FilterByCheckBox() {
  return (
    <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
      <Checkbox  id="priceAsc" />
      <label
        htmlFor="priceFilter"
        className="text-sm flex gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Precio (Ascendente) <ArrowUpWideNarrow/>
      </label>

      
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="priceFilter" />
      <label
        htmlFor="priceDesc"
        className="text-sm flex gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Precio (Descendiente) <ArrowDownNarrowWide/>
      </label>

      
    </div>
    </div>
  )
}
