import { CardCustom } from "@/components/card-custom";
import CreateCardModal from "@/components/create-card-modal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { useScreenDetector } from "@/lib/hooks/useScreenDetector";
import { FC } from "react";

const cards = [
  {
    bankName: "Forte Bank",
    color: "forte",
    cardName: "Blue",
    isVisa: false,
  },
  {
    bankName: "Bank CreditCredit",
    color: "bcc",
    cardName: "#картакарта",
    isVisa: true,
  },
  {
    bankName: "Halyk Bank",
    color: "halyk",
    cardName: "Halyk Bonus Digital Card",
    isVisa: true,
  },
  {
    bankName: "Bank CreditCredit",
    color: "bcc",
    cardName: "#ironcard",
    isVisa: true,
  },
];

const CatalogCard: FC<{ image: string; cashback: number; shop: string }> = ({
  image,
  cashback,
  shop,
}) => {
  return (
    <div className="flex gap-5 items-start pt-4 pl-5 rounded-xl shadow-sm max-md:pl-5">
      <div className="flex flex-col flex-1 my-auto">
        <div className="text-2xl text-neutral-800">{shop}</div>
        <div className="justify-center px-2.5 py-1 mt-2 text-xs text-white bg-green-600 rounded-md">
          Кэшбек до {cashback}%
        </div>
      </div>
      <img
        loading="lazy"
        src={image}
        className="shrink-0 self-start max-w-full aspect-[1.25] w-[100px]"
      />
    </div>
  );
};

const Header: FC = () => {
  return (
    <div className="flex flex-col justify-center text-lg font-medium text-white bg-white">
      <div className="flex justify-between gap-5 items-center md:items-start px-8 py-9 w-full bg-neutral-800 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-3.5 mt-1.5 justify-center items-center cursor-pointer">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/901d761b9c58bd0762cd5dde3bd43181a63ddbb74d991a4044ba91512ff25e36?"
            className="shrink-0 w-2 aspect-[0.44] fill-white"
          />
          <div className="hidden md:block">Выйти</div>
        </div>
        <div className="text-4xl font-bold text-center">CardPicker</div>
        <CreateCardModal />
      </div>
    </div>
  );
};

const Catalog: FC = () => {
  return (
    <div className="flex justify-end items-start px-16 mt-14 bg-white max-md:px-5 w-full max-w-5xl">
      <div className="flex flex-col px-9 pb-14 ml-5 w-full bg-white rounded-xl border border-solid border-[#969696] max-md:px-5 max-md:max-w-full">
        <Input
          id="search-field"
          className="flex z-10 gap-5 justify-between self-center px-5 -mt-2 max-w-full text-base font-medium bg-white rounded-xl border border-solid shadow-sm border-zinc-300 text-neutral-500 w-[470px] max-md:flex-wrap max-md:pl-5"
          placeholder="Поиск..."
          type="search"
          name="search"
        />
        <div className="mt-14 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow font-semibold max-md:mt-7 md:gap-y-3">
                <CatalogCard
                  image="https://i.imgur.com/Ok4sxNV.png"
                  cashback={15}
                  shop="Meloman"
                />
                <CatalogCard
                  image="https://i.imgur.com/Ok4sxNV.png"
                  cashback={15}
                  shop="Meloman"
                />
                <CatalogCard
                  image="https://i.imgur.com/Ok4sxNV.png"
                  cashback={15}
                  shop="Meloman"
                />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow font-semibold max-md:mt-7 md:gap-y-3">
                <CatalogCard
                  image="https://i.imgur.com/Ok4sxNV.png"
                  cashback={15}
                  shop="Meloman"
                />
                <CatalogCard
                  image="https://i.imgur.com/Ok4sxNV.png"
                  cashback={15}
                  shop="Meloman"
                />
                <CatalogCard
                  image="https://i.imgur.com/Ok4sxNV.png"
                  cashback={15}
                  shop="Meloman"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyCardsPage: FC = () => {
  const { isMobile } = useScreenDetector();

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row space-between md:pl-[50px]">
        <div className="md:w-[290px] bg-[#F2F2F2] md:h-dvh flex md:justify-center ">
          <Carousel
            orientation={isMobile ? "horizontal" : "vertical"}
            className="md:h-[600px] mt-14 h-[270px] w-[300px] mx-auto"
          >
            <CarouselContent className="-mt-1 md:h-[590px]">
              {cards.map((сard) => (
                <CarouselItem key={сard.cardName} className="pt-1 md:basis-1/3">
                  <CardCustom
                    bankName={сard.bankName}
                    color={сard.color}
                    cardName={сard.cardName}
                    isVisa={сard.isVisa}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-2 md:ml-0" />
            <CarouselNext className="mr-2 md:mr-0" />
          </Carousel>
        </div>
        <Catalog />
      </div>
    </>
  );
};

export default MyCardsPage;
