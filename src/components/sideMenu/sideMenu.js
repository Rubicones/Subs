import "./sideMenu.sass";
import Tile from "../tile/tile";
import { useState, useEffect, useRef } from "react";

function SideMenu({ adderActive, hideMenu, addNew, submitAddTile, toOpenMenu }) {
    const addNewBtn = useRef(0);
    const cross = useRef(0);
    const hiddenMenu = useRef(0);

    const datePickerLast = useRef(0);
    const datePickerNext = useRef(0);
    const title = useRef(0);
    const cost = useRef(0);
    const link = useRef(0);

    useEffect(() => {
        console.log(toOpenMenu)
        if (toOpenMenu === true)
            addNew(addNewBtn, hiddenMenu)
        else if (parseInt(toOpenMenu) > 0)
            addNew(addNewBtn, hiddenMenu, toOpenMenu, datePickerLast,
                datePickerNext,
                title,
                cost,
                link)
    }, [toOpenMenu])

    return (
        <aside className="side-menu">
            {adderActive ? (
                <div
                    className="cross"
                    ref={cross}
                    onClick={() => {
                        hideMenu(addNewBtn, hiddenMenu);
                    }}
                ></div>
            ) : (
                ""
            )}
            <div className="options-container">
                <div
                    className="menu-btn"
                    onClick={() => {addNew(addNewBtn, hiddenMenu)}}
                    ref={addNewBtn}
                >
                    Add new sub
                </div>
                {adderActive ? (
                    <div className="hiddenPart" ref={hiddenMenu}>
                        <div className="label">
                            Pick date of the last payment *
                        </div>
                        <input
                            type="date"
                            className="datepicker"
                            ref={datePickerLast}
                        />
                        <div className="label">
                            Pick date of the next payment *
                        </div>
                        <input
                            type="date"
                            className="datepicker"
                            ref={datePickerNext}
                        />
                        <div className="label">Title *</div>
                        <input
                            type="text"
                            className="name-setter"
                            ref={title}
                        />
                        <div className="label">Cost in USD *</div>
                        <input
                            type="number"
                            className="name-setter"
                            ref={cost}
                        />
                        <div className="label">Link</div>
                        <input type="text" className="name-setter" ref={link} />
                        <button
                            className="add-submit-btn"
                            onClick={() => {
                                submitAddTile(
                                    datePickerLast,
                                    datePickerNext,
                                    title,
                                    cost,
                                    link,
                                    addNewBtn,
                                    hiddenMenu,
                                    toOpenMenu
                                );
                            }}>
                            Add sub
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </aside>
    );
}

export default SideMenu;
