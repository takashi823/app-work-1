import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../calendar_contx/GlobalContext";

export const Day = (props) => {
  const { day, rowIdx } = props;
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } =
    useContext(GlobalContext);

  // 今日の日付を色付けする
  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-pink-300 text-white rounded-full w-7"
      : "";
  };

  // 登録データを日付が一致する日に表示
  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div className="border border-black-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* 1行目に曜日を表示 */}
        {rowIdx === 0 && <p className="text-sm mt-1 text-purple-400">{day.format("ddd")}</p>}
        <p className={`text-sm p-1 my-1 text-gray-400 text-center" ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >{dayEvents.map((evt, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedEvent(evt)}
          className={`bg-pink-200 p-1 mr-3 text-black-800 text-sm rounded mb-1 truncate`}
        >
          {evt.title}
        </div>
      ))}
      </div>
    </div>
  );
};