import { CardCustom } from "@/components/card-custom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { FC } from "react";

const mockData = {
  partnerName: "H&M, Мангилик Ел 252/1",
  category: "Одежда",
  cards: [
    {
      id: 1,
      bankName: "Halyk Bank",
      color: "halyk",
      cardName: "default",
      isVisa: false,
      cashback: 10,
      day: "Выходной День",
      sum: 5000,
      best: true,
    },
    {
      id: 2,
      bankName: "Bank CreditCredit",
      color: "bcc",
      cardName: "default",
      isVisa: true,
      cashback: 10,
      day: "Выходной День",
      sum: 5000,
      best: false,
    },
    {
      id: 3,
      bankName: "Forte Bank",
      color: "forte",
      cardName: "default",
      isVisa: true,
      cashback: 10,
      day: "Выходной День",
      sum: 5000,
      best: false,
    },
  ],
};

const Header: FC = () => {
  return (
    <div className="flex flex-col justify-center text-white bg-white">
      <div className="flex flex-col items-center px-8 pt-8 pb-12 w-full bg-neutral-800 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-stretch w-full font-medium max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-3.5 self-start mt-1.5 text-lg mb-2 md:my-0">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/901d761b9c58bd0762cd5dde3bd43181a63ddbb74d991a4044ba91512ff25e36?"
              className="shrink-0 w-2 aspect-[0.44] fill-white cursor-pointer"
            />
            <div className="flex-auto">На главную</div>
          </div>
          <Input
            id="search-field"
            className="md:mt-0 mb-8 md:mb-9 md:my-0 text-white bg-neutral-800 flex z-10 gap-5 justify-between self-center px-5 max-w-full text-base font-medium rounded-xl border border-solid shadow-sm border-zinc-300 w-[300px] max-md:flex-wrap max-md:pl-5"
            value="H&M, Мангилик Ел 252/1"
            type="search"
            name="search"
            placeholder="Поиск"
          />
        </div>
        <div className="text-4xl font-bold text-center">CardPicker</div>
        <div className="mt-1 text-base text-center text-zinc-400">
          Делай осознанный выбор
        </div>
      </div>
    </div>
  );
};

interface CardData {
  id: number;
  bankName: string;
  color: string;
  cardName: string;
  isVisa: boolean;
  cashback: number;
  day: string;
  sum: number;
  best: boolean;
}

interface CardComponentProps {
  cardData: CardData; // define the type for card data
}

const CardComponent: FC<CardComponentProps> = ({ cardData }) => {
  return (
    <>
      <div
        className={`relative flex flex-col px-2 text-base font-medium text-center text-black max-w-[309px] gap-y-3 justify-center p-2 ${cardData.best ? "border-2 border-solid border-[#FF6B00] rounded-[18px]" : ""}`}
      >
        {cardData.best === true && (
          <p className="absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white bg-[#FF6B00] rounded-tl-[18px] rounded-br-[18px]">
            Лучшее предложение
          </p>
        )}
        <CardCustom
          bankName={cardData.bankName}
          color={cardData.color}
          cardName={cardData.cardName}
          isVisa={cardData.isVisa}
        />
        <div className="justify-center items-center px-16 py-[15px] font-bold text-white rounded-xl bg-zinc-800 w-full">
          Кэшбэк {cardData.cashback}%
        </div>
        <div className="justify-center items-center px-16 py-[14px] rounded-xl border border-solid border-stone-300 w-full">
          {cardData.day}
        </div>
        <div className="justify-center items-center px-16 py-[14px] rounded-xl border border-solid border-stone-300 w-full">
          До {cardData.sum} тенге
        </div>
      </div>
    </>
  );
};

export const PartnerPage: FC = () => {
  return (
    <>
      <Header />
      <div className="flex gap-x-4 justify-center -mt-[24px]">
        <div className="justify-center px-3 md:px-6 py-[10px] md:py-3.5 text-lg md:text-2xl font-semibold text-center text-black bg-white rounded-xl shadow-md">
          {mockData.partnerName}
        </div>
        <div className="justify-center px-3 md:px-6 py-[10px] md:py-3.5.5 text-lg md:text-2xl font-semibold text-center text-black bg-white rounded-xl shadow-md">
          {mockData.category}
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-[60px] md:px-28 hidden md:block"
      >
        <CarouselContent>
          {mockData.cards.map((card, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 flex justify-center">
                <CardComponent cardData={card} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-8">
        {mockData.cards.map((card) => (
          <div
            key={card.cardName}
            className="p-1 flex pb-3 justify-center md:hidden"
          >
            <CardComponent cardData={card} />
          </div>
        ))}
      </div>
    </>
  );
};
