import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const TodaysDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setCurrentDate(format(now, "eee d MMM HH:mm", { locale: fr }));
    };

    updateDate();

    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{currentDate}</span>;
};

export default TodaysDate;
