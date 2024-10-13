import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowUpWideNarrow, ArrowDownNarrowWide } from "lucide-react"

interface FilterByRadioGroupProps {
    setOrdenPrecio: (orden: string) => void;  // Añadir la prop para pasar la selección al componente padre
}

const FilterByRadioGroup: React.FC<FilterByRadioGroupProps> = ({ setOrdenPrecio }) => {

    const handleChange = (value: string) => {
        if (value === "asc") {
            setOrdenPrecio("precio_inicial");  // Ascendente
        } else if (value === "desc") {
            setOrdenPrecio("-precio_inicial");  // Descendente
        }
    };

    return (
        <div>
            <RadioGroup onValueChange={handleChange} >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asc" id="asc" />
                    <Label htmlFor="asc">Precio (Ascendente)</Label>
                    <ArrowUpWideNarrow />
                </div>

                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="desc" id="desc" />
                    <Label htmlFor="desc">Precio (Descendente)</Label>
                    <ArrowDownNarrowWide />
                </div>
            </RadioGroup>
        </div>
    )
}

export default FilterByRadioGroup