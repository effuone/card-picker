import { CardCustom } from "@/components/card-custom";
import CreateCardModal from "@/components/create-card-modal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FC } from "react";

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

// <button className="border-solid border-[1px] border=[#8D8D8D] border-gray-400 opacity-50 rounded-[7px]	 w-[264px] h-[23.11px] flex items-center">
//   <img
//     loading="lazy"
//     src="https://i.imgur.com/vcw24cB.png"
//     className="mx-auto w-4"
//   />
// </button>

const MyCardsPage: FC = () => {
  return (
    <>
      <Header />
      <div className="flex space-between md:pl-[50px]">
        <div className="w-[290px] bg-[#F2F2F2] h-dvh flex justify-center relative">
          <Carousel orientation="vertical" className="h-[600px] mt-14">
            <CarouselContent className="-mt-1 h-[590px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-1/3">
                  <CardCustom />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default MyCardsPage;
