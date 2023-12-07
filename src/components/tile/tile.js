/* eslint-disable react-hooks/exhaustive-deps */
import "./tile.sass";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function Tile({name, subCost, prevDate, nextDate, link, id, openMenu, deleteTile}) {
    library.add(faPencil);
    const circle = useRef(0);
    const daysLeftLabel = useRef(0);
    const tile = useRef(0);
    
    const [daysLeft, setDaysleft] = useState(20);
    let radius = null;
    let circumference = null;
    let interval = 0
    const setProgress = (percent) => {
        const offset = circumference - (percent / 100) * circumference;
        circle.current.style.strokeDashoffset = offset;
    };

    useEffect(() => {
        console.log(id)
        radius = circle.current.r.baseVal.value;
        circumference = radius * 2 * Math.PI;
        circle.current.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.current.style.strokeDashoffset = circumference;
        nextDate = new Date(nextDate)
        prevDate = new Date(prevDate)
        interval = nextDate.getTime() - prevDate.getTime()
        const currentDate = new Date()
        interval = Math.floor(interval / (1000 * 60 * 60 * 24))
        setDaysleft(Math.floor((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) + 1)
    }, []);

    useEffect(() => {
        setProgress(100 - ((daysLeft) * 100) / interval + 0.5);
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
            <div className="tile" data-id={id}>
                <div className="tile-inner" ref={tile}>
                    <div className="tile-front">
                        <svg className="svg-cont">
                            <circle
                                ref={circle}
                                className="inner-circle"
                                strokeWidth="8"
                                fill="transparent"
                                r="72"
                                cx="90"
                                cy="90"
                            />
                        </svg>
                        <span className="days-left" ref={daysLeftLabel}>
                            {daysLeft}
                        </span>
                        <span className="name">{name}</span>
                    </div>
                    <div className="tile-back">
                        <div className="trash-btn">
                            <FontAwesomeIcon icon={faTrash} size="2xs" onClick={() => {deleteTile(id)}}/>
                        </div>

                        <div className="edit-btn">
                            <FontAwesomeIcon icon={faPencil} size="2xs" onClick={() => {openMenu(id)}}/>
                        </div>
                        <span className="cost-header">Cost</span>
                        <span className="cost">{subCost}$</span>
                        <span className="date-header">Next payment</span>
                        <span className="date">
                            {new Date(nextDate).toLocaleDateString("ru-RU")}
                        </span>
                        <span className="date-header">Link</span>
                        <span className="date">
                            <a href={link} className="link">{link}</a>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tile;
