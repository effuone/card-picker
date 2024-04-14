import { CardCustom } from "@/components/card-custom";
import CreateCardModal from "@/components/create-card-modal";
import HalykBonus from "@/components/halyk-bonus";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { useScreenDetector } from "@/lib/hooks/useScreenDetector";
import backendApiInstance from "@/services";
import { FC, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

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

type Partner = {
  id: number;
  name: string;
  image: string | null; // nullable since the example has a null image
  address: string | null; // address could potentially be null
  description: string | null; // nullable since the example has a null description
  category: string;
  cashbackPercent: number;
  discountPercent: number;
  requirements: string | null; // nullable since requirements could be optional
  offerEndDate: string | null; // nullable and should be a string if representing a date
  cardType: string;
};

type HeaderProps = {
  isMainPage?: boolean;
};

type CatalogCardProps = {
  id: number;
  image: string;
  cashback: number;
  discount: number;
  shop: string;
  description: string | null;
  category: string;
  address: string | null;
  requirements: string | null;
  offerEndDate: string | null;
  cardType: string;
};

const getCashbackColor = (cashback) => {
  if (cashback >= 5) return "bg-green-600"; // Green for high cashback
  if (cashback >= 3) return "bg-yellow-500"; // Yellow for medium cashback
  return "bg-red-400"; // Red for low cashback
};

const CatalogCard: FC<CatalogCardProps> = ({
  id,
  cashback,
  discount,
  shop,
  description,
  category,
  address,
  requirements,
  cardType,
}) => {
  const cashbackClass = getCashbackColor(cashback);
  const navitage = useNavigate();

  return (
    <div onClick={() => navitage(`/partner/${id}`)} className="flex flex-col rounded-[8px] border-[1px] p-6 w-[300px] shadow-sm max-md:w-full max-md:mb-4 justify-between gap-5">
      <div>
        <div className="font-bold text-base">{shop}</div>
        {address && <div className="text-neutral-400">{address}</div>}
        {description && <div className="text-neutral-400">{description}</div>}
      </div>

      <div>
        <div>
          <strong>Категория:</strong> {category}
        </div>
        {requirements && (
          <div>
            <strong>Условия:</strong> <br /> {requirements}
          </div>
        )}
      </div>

      <div>
        {cashback > 0 && (
          <div
            className={`px-3 py-2 text-white ${cashbackClass} rounded-md !w-fit mb-1`}
          >
            {cashback}% cashback
          </div>
        )}
        {discount > 0 && (
          <div className="px-3 py-2 text-white bg-blue-600 rounded-md !w-fit">
            Discount up to {discount}%
          </div>
        )}
        {cardType === "Halyk Bonus" ? (
          <HalykBonus/>
        ) : (
          <div className="text-0.5rem text-gray-500">{cardType}</div>
        )}
      </div>
    </div>
  );
};

const Header: FC<HeaderProps> = ({ isMainPage = false }) => {
  return (
    <div className="flex flex-col justify-center text-lg font-medium text-white bg-white max-md:text-neutral-800">
      <div className="flex justify-between gap-2 items-center md:items-start px-8 py-9 w-full bg-neutral-800 max-md:bg-white  max-md:flex-wrap max-md:px-[30px] max-md:py-6 max-md:max-w-full">
        {!isMainPage && (
          <div className="flex gap-3.5 mt-1.5 justify-center items-center cursor-pointer">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/901d761b9c58bd0762cd5dde3bd43181a63ddbb74d991a4044ba91512ff25e36?"
              className="shrink-0 w-2 aspect-[0.44] fill-white"
            />
            <div className="hidden md:block">Выйти</div>
          </div>
        )}
        <div className="text-4xl font-bold text-center max-md:text-2xl max-md:text-left">
          CardPicker
        </div>
        <CreateCardModal />
      </div>
    </div>
  );
};

const fetchPartners = async (cardType, categoryId, search, page, pageSize) => {
  try {
    const response = await backendApiInstance.get(`/cards/partners`, {
      params: { cardType, categoryId, search, page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching partners", error);
    return [];
  }
};

const MyCardsPage: FC = () => {
  const { isMobile } = useScreenDetector();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPartners(
        "Halyk Bonus",
        undefined,
        searchTerm,
        1,
        12
      );
      setPartners(data);
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500); // Debounce fetching data while typing

    return () => clearTimeout(timeoutId); // Cleanup on unmount or searchTerm change
  }, [searchTerm]);

  useEffect(() => {
    console.log(partners);
  }, [partners]);

  return (
    <>
      <Header isMainPage={true} />
      <div className="flex flex-col md:flex-row space-between md:pl-[50px]">
        <div className="md:w-[290px] bg-white flex md:justify-center max-md:mx-[60px] md:mt-14">
          <Carousel
            orientation={isMobile ? "horizontal" : "vertical"}
            className="mt-14 h-[70vh] w-[300px] mx-auto max-md:mt-0 max-md:w-full max-md:h-full md:mt-6 md:h-[60vh]"
          >
            <CarouselContent className="-mt-1 gap-5 md:h-[70vh]">
              {cards.map((сard) => (
                <CarouselItem
                  key={сard.cardName}
                  className="pt-0 md:pt-1 md:basis-[calc(33.333%-10px)] h-[180px] md:h-[170px]"
                >
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
        <div className="flex justify-end items-start px-8 mt-14 bg-white max-md:px-5 w-full max-w-full">
          <div className="flex flex-col px-2 pb-14 ml-5 w-full bg-white rounded-xl border border-solid border-[#969696] max-md:px-5 max-md:max-w-full">
            <Input
              id="search-field"
              className="flex z-10 gap-5 justify-between self-center px-5 -mt-2 max-w-full text-base font-medium bg-white rounded-xl border border-solid shadow-sm border-zinc-300 text-neutral-500 w-[470px] max-md:flex-wrap max-md:pl-5"
              placeholder="Поиск..."
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              name="search"
            />
            <div className="mt-14 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                  <div className="flex flex-wrap gap-5 justify-evenly max-md:flex-col max-md:gap-0">
                    {partners.map((partner) => (
                      <CatalogCard
                        key={partner.id}
                        image={
                          partner.image || "https://i.imgur.com/Ok4sxNV.png"
                        } // Default image if none
                        id={partner.id}
                        cashback={partner.cashbackPercent}
                        discount={partner.discountPercent}
                        shop={partner.name}
                        description={partner.description}
                        category={partner.category}
                        address={partner.address}
                        requirements={partner.requirements}
                        offerEndDate={
                          partner.offerEndDate
                            ? new Date(
                                partner.offerEndDate
                              ).toLocaleDateString()
                            : null
                        }
                        cardType={partner.cardType}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCardsPage;
