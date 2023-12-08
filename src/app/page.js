"use client"

import styles from "./page.module.sass";
import Tile from "./tile/tile";
import { useState, useEffect } from "react";
import SideMenu from "./sideMenu/sideMenu";

function Home() {
    const [adderActive, setAdderActive] = useState(false);
    const [tilesArray, setTilesArray] = useState([]);
    const [toOpenMenu, setToOpenMenu] = useState(false);

    const reRender = () => {
        if (localStorage.getItem("tilesArr")) {
            let tilesArray = JSON.parse(localStorage.getItem("tilesArr"));

            tilesArray.forEach((tile) => {
                setTilesArray((oldTiles) => [
                    ...oldTiles,
                    <Tile
                        name={tile.name}
                        prevDate={tile.prevDate}
                        nextDate={tile.nextDate}
                        subCost={tile.subCost}
                        link={tile.link}
                        id={tile.key}
                        openMenu={(id) => {
                            openMenu(id);
                        }}
                        deleteTile={(id) => {deleteTile(id)}}
                        key={tile.key}
                    />,
                ]);
            });
        }
    };

    const deleteTile = (id) => {
        let tilesArr = [];

        if (!localStorage.getItem("tilesArr"))
            localStorage.setItem("tilesArr", tilesArr);
        else tilesArr = JSON.parse(localStorage.getItem("tilesArr"));
        tilesArr = tilesArr.filter((tile) => tile.id !== id);
        localStorage.setItem("tilesArr", JSON.stringify(tilesArr));
        setTilesArray([]);
        reRender();
    };

    const openMenu = (id = null) => {
        console.log(id);
        if (id) setToOpenMenu(id);
        else setToOpenMenu(true);
    };

    const addNew = (
        addNewBtn,
        hiddenMenu,
        id = null,
        datePickerLast = null,
        datePickerNext = null,
        title = null,
        cost = null,
        link = null
    ) => {
        setAdderActive(true);
        setTimeout(() => {
            addNewBtn.current.style.transform = "translateY(-100vh)";
            hiddenMenu.current.style.transform = "translateY(0)";
            if (id) {
                let tilesArr = JSON.parse(localStorage.getItem("tilesArr"));
                tilesArr.forEach((tile) => {
                    if (tile.key === id) {
                        datePickerLast.current.value = tile.prevDate;
                        datePickerNext.current.value = tile.nextDate;
                        title.current.value = tile.name;
                        cost.current.value = tile.subCost;
                        link.current.value = tile.link;
                    }
                });
            }
        }, 10);
    };

    const hideMenu = (addNewBtn, hiddenMenu) => {
        addNewBtn.current.style.transform = "translateY(0)";
        hiddenMenu.current.style.transform = "translateY(100vh)";
        setAdderActive(false);
        setToOpenMenu(false);
    };

    const submitAddTile = (
        datePickerLast,
        datePickerNext,
        title,
        cost,
        link,
        addNewBtn,
        hiddenMenu,
        id=null
    ) => {

        if (
            datePickerLast.current.value !== "" &&
            datePickerNext.current.value !== "" &&
            title.current.value !== "" &&
            cost.current.value !== ""
        ) {
            let tilesArr = [];

            if (!localStorage.getItem("tilesArr"))
                localStorage.setItem("tilesArr", tilesArr);
            else tilesArr = JSON.parse(localStorage.getItem("tilesArr"));
            let tile = {
                name: title.current.value,
                prevDate: datePickerLast.current.value,
                nextDate: datePickerNext.current.value,
                subCost: cost.current.value,
                link: link.current.value ? link.current.value : "",
                key: id !== true ? id : new Date().getTime(),
                id: id !== true ? id : new Date().getTime(),
            };

            tilesArr = tilesArr.filter((tile) => tile.id !== id);
            tilesArr.push(tile);
            localStorage.setItem("tilesArr", JSON.stringify(tilesArr));
            setTilesArray([]);
            reRender();
            hideMenu(addNewBtn, hiddenMenu);
        }
    };

    useEffect(() => {
        reRender();
    }, []);

    return (
        <>
            <header>
                <h1 className={styles.title}>Subs</h1>
                <h2 className={styles.subtitle}>Manage your subscribitions</h2>
            </header>

            <div className={styles.container}>
                <div className={styles["tiles-container"]}>
                    {tilesArray}

                    <div
                        className={styles["add-new"]}
                        onClick={() => {
                            openMenu();
                        }}
                    ></div>
                </div>
                <SideMenu
                    addNew={addNew}
                    hideMenu={hideMenu}
                    adderActive={adderActive}
                    submitAddTile={submitAddTile}
                    toOpenMenu={toOpenMenu}
                />
            </div>
        </>
    );
}

export default Home;
