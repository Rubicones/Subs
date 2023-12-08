/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./tile.module.sass";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function Tile({
    name,
    subCost,
    prevDate,
    nextDate,
    link,
    id,
    openMenu,
    deleteTile,
}) {
    library.add(faPencil);
    const circle = useRef(0);
    const daysLeftLabel = useRef(0);
    const tile = useRef(0);

    const [daysLeft, setDaysleft] = useState(20);
    let radius = null;
    let circumference = null;
    let interval = 0;
    const setProgress = (percent) => {
        const offset = circumference - (percent / 100) * circumference;
        circle.current.style.strokeDashoffset = offset;
    };

    useEffect(() => {
        console.log(id);
        radius = circle.current.r.baseVal.value;
        circumference = radius * 2 * Math.PI;
        circle.current.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.current.style.strokeDashoffset = circumference;
        nextDate = new Date(nextDate);
        prevDate = new Date(prevDate);
        interval = nextDate.getTime() - prevDate.getTime();
        const currentDate = new Date();
        interval = Math.floor(interval / (1000 * 60 * 60 * 24));
        setDaysleft(
            Math.floor(
                (nextDate.getTime() - currentDate.getTime()) /
                    (1000 * 60 * 60 * 24)
            ) + 1
        );
    }, []);

    useEffect(() => {
        setProgress(100 - (daysLeft * 100) / interval + 0.5);
        if (daysLeft < 5) {
            circle.current.style.stroke = "#980000";
            daysLeftLabel.current.style.color = "#980000";
            tile.current.style.backgroundColor = "#98000015";
        } else if (daysLeft < 10) {
            circle.current.style.stroke = "red";
            daysLeftLabel.current.style.color = "red";
            tile.current.style.backgroundColor = "#FB000615";
        } else if (daysLeft < 20) {
            circle.current.style.stroke = "#ffe606";
            daysLeftLabel.current.style.color = "#ffe606";
            tile.current.style.backgroundColor = "#ffe60615";
        } else if (daysLeft < 32) {
            circle.current.style.stroke = "green";
            daysLeftLabel.current.style.color = "green";
            tile.current.style.backgroundColor = "#10700315";
        }
    }, [daysLeft]);

    return (
        <>
            <div className={styles.tileDropShadow}>
                <div className={styles.tile} data-id={id}>
                    <div className={styles["tile-inner"]} ref={tile}>
                        <div className={styles["tile-front"]}>
                            <svg className={styles["svg-cont"]}>
                                <circle
                                    ref={circle}
                                    className={styles["inner-circle"]}
                                    strokeWidth="8"
                                    fill="transparent"
                                    r="72"
                                    cx="90"
                                    cy="90"
                                />
                            </svg>
                            <span
                                className={styles["days-left"]}
                                ref={daysLeftLabel}
                            >
                                {daysLeft}
                            </span>
                            <span className={styles.name}>{name}</span>
                        </div>
                        <div className={styles["tile-back"]}>
                            <div className={styles["trash-btn"]}>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    size="2xs"
                                    onClick={() => {
                                        deleteTile(id);
                                    }}
                                />
                            </div>

                            <div className={styles["edit-btn"]}>
                                <FontAwesomeIcon
                                    icon={faPencil}
                                    size="2xs"
                                    onClick={() => {
                                        openMenu(id);
                                    }}
                                />
                            </div>
                            <span className={styles["cost-header"]}>Cost</span>
                            <span className={styles.cost}>{subCost}$</span>
                            <span className={styles["date-header"]}>
                                Next payment
                            </span>
                            <span className={styles.date}>
                                {new Date(nextDate).toLocaleDateString("ru-RU")}
                            </span>
                            <span className={styles["date-header"]}>Link</span>
                            <span className={styles.date}>
                                <a href={link} className={styles.link}>
                                    {link}
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tile;
