import "./App.sass";
import Tile from "../tile/tile";
import { useState, useEffect, useRef } from "react";
import SideMenu from "../sideMenu/sideMenu";

function App() {
    const [adderActive, setAdderActive] = useState(false);
    const [tilesArray, setTilesArray] = useState([]);

    const addNew = (addNewBtn, hiddenMenu) => {
        setAdderActive(true);
        setTimeout(() => {
            addNewBtn.current.style.transform = "translateY(-100vh)";
            hiddenMenu.current.style.transform = "translateY(0)";
        }, 10);
    };

    const hideMenu = (addNewBtn, hiddenMenu) => {
        addNewBtn.current.style.transform = "translateY(0)";
        hiddenMenu.current.style.transform = "translateY(100vh)";
        setAdderActive(false);
    };

    const submitAddTile = (datePickerLast, datePickerNext, title, cost, link, addNewBtn, hiddenMenu) => {
        if (
            datePickerLast.current.value !== "" &&
            datePickerNext.current.value !== "" &&
            title.current.value !== "" &&
            cost.current.value !== ""
        ) {
            setTilesArray((oldTiles) => [
                ...oldTiles,
                <Tile
                    name={title.current.value}
                    prevDate={datePickerLast.current.value}
                    nextDate={datePickerNext.current.value}
                    subCost={cost.current.value}
                    link={link.current.value ? link.current.value : ""}
                />,
            ]);
            
            hideMenu(addNewBtn, hiddenMenu)
        }
    };

    return (
        <>
            <header>
                <h1 className="title">Subs</h1>
                <h2 className="subtitle">Manage your subscribitions</h2>
            </header>

            <div className="container">
                <div className="tiles-container">
                    {tilesArray}

                    <div className="add-new"></div>
                </div>
                <SideMenu
                    addNew={addNew}
                    hideMenu={hideMenu}
                    adderActive={adderActive}
                    submitAddTile={submitAddTile}
                />
            </div>
        </>
    );
}

export default App;
