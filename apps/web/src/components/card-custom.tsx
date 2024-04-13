import * as React from "react";

interface CardCustomProps {
  bankName: string;
  color: string;
  cardName: string;
  isVisa: boolean;
}

export const CardCustom: React.FC<CardCustomProps> = ({
  bankName,
  color,
  cardName,
  isVisa,
}) => {
  const colors = {
    jusan: "bg-gradient-to-r from-orange-500 to-orange-400",
    bcc: "bg-gradient-to-r from-green-300 to-green-400",
    halyk: "bg-gradient-to-r from-emerald-600 to-emerald-600",
    forte: "bg-gradient-to-r from-rose-700 to-red-600",
  };

  return (
    <div
      className={`flex flex-col px-5 pt-6 pb-12 rounded-xl ${colors[color]} w-[318px] h-[180px]`}
    >
      <div className="flex gap-5 text-2xl font-bold text-white">
        <div className="flex-auto">{bankName}</div>
        <img
          loading="lazy"
          src={
            isVisa
              ? "https://i.imgur.com/q3vT2My.png"
              : "https://i.imgur.com/E08Rmgv.png"
          }
          className=" w-[80px] h-[45px] object-contain"
        />
      </div>
      <div className="mt-2.5 text-xl text-white">{cardName}</div>
      <img
        loading="lazy"
        src="https://i.imgur.com/3ofIl7Q.png"
        className="mt-8 stroke-white"
      />
    </div>
  );
};
