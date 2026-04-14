import { useState, type JSX } from "react";
import Melee from "./assets/melee.png";
import Ranged from "./assets/ranged.png";
import Defensive from "./assets/defensive.png";
import Tech from "./assets/tech.png";
import Blank from "./assets/blank.png";
import { ActorCard } from "./actor-card";

//type Tiles = "melee" | "ranged" | "defensive" | "tech" | "blank";
type Tiles = typeof Melee | typeof Ranged | typeof Defensive | typeof Tech;

const MainContent = () => {
    const [tileCount, setTileCount] = useState(0);
    const [someBool, setSomeBool] = useState(false);

    return(
        <>
            <div className="add-remove-buttons">
                <button className="add-remove"
                    onClick = {() => setTileCount(tileCount + 1)}
                >
                    +
                </button>
                <button className="add-remove"
                    onClick = {() => setTileCount(
                        tileCount > 0 ? 
                            tileCount - 1 
                        : 
                            0
                    )}
                >
                    -
                </button>   

                <button className="randomize"
                    onClick={() => setSomeBool(!someBool)}
                >
                    randomize
                </button>

                <h1>{tileCount}</h1>  

                <ul>
                    {
                        //populateWithBlanks(tileCount)
                        generateRandomizedTiles(tileCount)
                    }
                </ul>     
            </div>

            <div className="actors">
                <div className="player">
                    <ActorCard _hp={10} 
                    _fire={5} 
                    _wind={5} 
                    _earth={5} 
                    _water={5} 
                    _strength={10} 
                    _agility={7} 
                    _constitution={10} 
                    _intelligence={5}
                    
                    />
                </div>
            </div>
        </>
    );
}

const populateWithBlanks = (tileCount: number): JSX.Element[] => {
    const iconList = [];
    for(var i=0; i<tileCount; i++){
        iconList.push(
            <img src={Blank} alt="desc"/>
        )
    }   
    return iconList; 
};

const pickTile = (): Tiles => {
    const tiles: Tiles[] = [Melee, Ranged, Defensive, Tech];
    return tiles[Math.floor(Math.random() * tiles.length)];
};

const generateRandomizedTiles = (tileCount: number): JSX.Element[] => {
    const iconList = [];
    for(var i=0; i<tileCount; i++){
        const imageElement = pickTile();
        iconList.push(
            <img src={imageElement} alt="desc"/>
        )
    }   
    return iconList;     
}






export {
    MainContent
}