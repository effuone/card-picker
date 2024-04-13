import * as React from "react";

export const CardCustom: React.FC = () => {
  const colors = { jusan: "bg-gradient-to-r from-orange-500 to-orange-400" };

  return (
    <div
      className={
        "flex flex-col px-5 pt-6 pb-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 w-[318px] h-[149px]" +
        colors.jusan
      }
    >
      <div className="flex gap-5 text-2xl font-bold text-white">
        <div className="flex-auto">Jusan Bank</div>
        <img
          loading="lazy"
          src="https://i.imgur.com/q3vT2My.png"
          className="shrink-0 w-[67px]"
        />
      </div>
      <div className="mt-2.5 text-xl text-white">Gold</div>
      <img
        loading="lazy"
        src="https://i.imgur.com/3ofIl7Q.png"
        className="mt-8 stroke-white"
      />
    </div>
  );
};
