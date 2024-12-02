import { useEffect, useState } from "react";
import { format } from "date-fns";
import { enUS, fr, de, es } from "date-fns/locale";
import styles from "../../style.module.scss";

const TodaysDate = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [locale, setLocale] = useState(fr);

    useEffect(() => {
        const language = navigator.language.split("-")[0];

        const localeMap = {
            en: enUS,
            fr: fr,
            de: de,
            es: es,
        };

        setLocale(localeMap[language] || enUS);
    }, []);

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            setCurrentDate(format(now, "eee d MMM HH:mm", { locale }));
        };

        updateDate();

        const interval = setInterval(updateDate, 1000);
        return () => clearInterval(interval);
    }, [locale]);

    return <span className={styles["todays-date"]}>{currentDate}</span>;
};

export default TodaysDate;
