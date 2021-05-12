import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [years, setYears] = useState([]);

  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem("years"));
    setYears(oldData);
  }, []);

  useEffect(() => {
    localStorage.setItem("years", JSON.stringify(years));
  }, [years]);

  function addNewYear() {
    const dateObj = new Date();

    if (years.length > 0) {
      const newYear = {
        num: years[years.length - 1].num + 1,
        date: dateObj.getFullYear(),
        id: Date.now(),
      };
      setYears([...years, newYear]);
    } else {
      const newYear = {
        num: 1,
        date: dateObj.getFullYear(),
        id: Date.now(),
      };
      setYears([...years, newYear]);
    }
  }

  function deleteYear(year) {
    const newData = years.filter((oldYear) => oldYear.id != year.id);
    setYears(newData);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        {years.map((year) => {
          return (
            <div key={year.id} className={styles.entrywrapper}>
              <p>Year {year.num}</p>
              <h1>{year.date}</h1>
              <button onClick={() => deleteYear(year)}>delete</button>
            </div>
          );
        })}
      </div>
      <button onClick={() => addNewYear()} className={styles.add}>
        Add Year
      </button>
    </div>
  );
}
