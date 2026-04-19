import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight } from "lucide-react";
import { MonthOption } from "./CompareClient";

interface CompareSelectorProps {
  selectedA?: string;
  selectedB?: string;
  monthOptions: MonthOption[];
  handleSelect: (side: "a" | "b", value: string) => void;
}

const CompareSelector: React.FC<CompareSelectorProps> = ({
  selectedA,
  selectedB,
  monthOptions,
  handleSelect,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          Month A (Base)
        </label>
        <Select
          value={selectedA ?? ""}
          onValueChange={(v) => handleSelect("a", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select month…" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                disabled={opt.value === selectedB}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center pt-5">
        <ArrowLeftRight className="size-5 text-[var(--muted-foreground)]" />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          Month B (Compare)
        </label>
        <Select
          value={selectedB ?? ""}
          onValueChange={(v) => handleSelect("b", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select month…" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                disabled={opt.value === selectedA}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CompareSelector;
