import styles from "./sideMenu.module.sass";
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
        <aside className={styles["side-menu"]}>
            {adderActive ? (
                <div
                    className={styles.cross}
                    ref={cross}
                    onClick={() => {
                        hideMenu(addNewBtn, hiddenMenu);
                    }}
                ></div>
            ) : (
                ""
            )}
            <div className={styles["options-container"]}>
                <div
                    className={styles["menu-btn"]}
                    onClick={() => {addNew(addNewBtn, hiddenMenu)}}
                    ref={addNewBtn}
                >
                    Add new sub
                </div>
                {adderActive ? (
                    <div className={styles.hiddenPart} ref={hiddenMenu}>
                        <div className={styles.label}>
                            Pick date of the last payment *
                        </div>
                        <input
                            type="date"
                            className={styles.datepicker}
                            ref={datePickerLast}
                        />
                        <div className={styles.label}>
                            Pick date of the next payment *
                        </div>
                        <input
                            type="date"
                            className={styles.datepicker}
                            ref={datePickerNext}
                        />
                        <div className={styles.label}>Title *</div>
                        <input
                            type="text"
                            className={styles["name-setter"]}
                            ref={title}
                        />
                        <div className={styles.label}>Cost in USD *</div>
                        <input
                            type="number"
                            className={styles["name-setter"]}
                            ref={cost}
                        />
                        <div className={styles.label}>Link</div>
                        <input type="text" className={styles["name-setter"]} ref={link} />
                        <button
                            className={styles["add-submit-btn"]}
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
