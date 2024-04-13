import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "./ui/use-toast";

const cardTypes = [
  { bank: "BCC", cardTypes: ["#картакарта", "#ironcard", "juniorcard"] },
  {
    bank: "Halyk",
    cardTypes: [
      "Halyk Bonus Digital Card",
      "Halyk Bonus",
      "Sinooil Digital Card",
      "Black Card",
      "Diamond Card",
    ],
  },
  {
    bank: "Forte",
    cardTypes: ["Travel", "Blue", "Black", "Solo", "Детская карта Forte"],
  },
];

const formSchema = z.object({
  bank: z.string(),
  cardType: z.string(),
});

export function CreateCardModal() {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const selectedBank = watch("bank");
  const [availableCardTypes, setAvailableCardTypes] = useState<string[]>([]);

  useEffect(() => {
    const bankData = cardTypes.find((bank) => bank.bank === selectedBank);
    setAvailableCardTypes(bankData ? bankData.cardTypes : []);
  }, [selectedBank]);

  const onSubmit = (data) => {
    toast({
      title: "Новая карта успешно добавлена!",
      description: `Вы добавили себе новую ${data.cardType} карту от ${data.bank}.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-3.5 mt-1.5 justify-center items-center cursor-pointer">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/545e39e9e8ebb3028588c35136b5caae49792f6300bb42db5994d2dcc58b4e68?"
            className="shrink-0 w-4 aspect-square"
          />
          <div className="hidden md:block">Мои карты</div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить карту</DialogTitle>
          <DialogDescription>
            Укажите данные о новом типе карт, который желаете добавить
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bank" className="text-right">
              Банки
            </Label>
            <Controller
              name="bank"
              control={control}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Выберите банк" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Банки</SelectLabel>
                      {cardTypes.map((bank) => (
                        <SelectItem key={bank.bank} value={bank.bank}>
                          {bank.bank}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {selectedBank && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardType" className="text-right">
                Тип карты
              </Label>
              <Controller
                name="cardType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={availableCardTypes[0]}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Выберите тип карты" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Типы карт</SelectLabel>
                        {availableCardTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          )}
          <DialogFooter>
            {selectedBank && <Button type="submit">Добавить</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCardModal;
