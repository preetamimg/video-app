"use client"
import { useEffect, useState } from "react";

export const useCurrentDateAndTime = () => {
  const [time, setTime] = useState(getCurrentTime());
  const [date, setDate] = useState(getCurrentDate());

  function getCurrentDate() {
    const now = new Date();
    return (new Intl.DateTimeFormat('en-us', {dateStyle: 'full'})).format(now);
  }


  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(()=> {
    setDate(getCurrentDate())
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return {time, date}
}