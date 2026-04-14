import { useEffect, useRef, useState, type SetStateAction } from "react";
import type { Dispatch, JSX } from "react";
import "./actor-card.css";

const headGear = ["leather cap" , "skull cap"];
const armors = ["quilted armor" , "ring mail"];
const footWear = ["leather boots" , "stell plated boots"];
const shields = ["wooden buckler" , "heather shield"];
const weapons = ["club" , "short sword"];

type Head = typeof headGear[number];
type Body = typeof armors[number];
type Feet = typeof footWear[number];
type Shield = typeof shields[number];
type Weapon = typeof weapons[number];

type Gear = Head | Body | Feet | Shield | Weapon;

type GearWithStats = {
        name: Gear,
        damage: number,
        defense: number    
}

const gear: GearWithStats[] = [
    {
        name: "leather cap",
        damage: 0,
        defense: 1
    },
    {
        name: "skull cap",
        damage: 0,
        defense: 2
    },    
    {
        name: "quilted armor",
        damage: 0,
        defense: 2
    },
    {
        name: "leather boots",
        damage: 0,
        defense: 1
    },
    {
        name: "wooden buckler",
        damage: 0,
        defense: 2
    },
    {
        name: "club",
        damage: 4,
        defense: 0 
    }   
];

const effects = ["foo","bar","baz",];
type BaseEffect = typeof effects[number];

type FullEffect = {
    name:BaseEffect,
    magnitude:number,
    duration:number
};

const trackedEffects:FullEffect[] = [];

const ActorCard = ({turn, _hp, _fire, _wind, _earth, _water, _strength, _agility, _constitution, _intelligence, _head="leather cap", _body="quilted armor", _feet="leather boots", _shield="wooden buckler", _weapon="club"}:{
    turn: number, _hp: number, _fire: number, _wind: number, _earth: number, _water: number, _strength: number, _agility: number, _constitution: number, _intelligence: number, _head?:Head, _body?:Body, _feet?:Feet, _shield?:Shield, _weapon?:Weapon    
}) => {
    //const [turn, setTurn] = useState(_turn);

    const [hp, setHp] = useState(_hp);
    //const [en, setEnergy] = useState(_energy);
    const [fire, setFire] = useState(_fire);
    const [wind, setWind] = useState(_wind);
    const [earth, setEarth] = useState(_earth);
    const [water, setWater] = useState(_water);

    const [str, setStr] = useState(_strength);
    const [agi, setAgi] = useState(_agility);
    const [con, setCon] = useState(_constitution);
    const [int, setInt] = useState(_intelligence);

    const [head, setHead] = useState(_head);
    const [body, setBody] = useState(_body);
    const [feet, setFeet] = useState(_feet);
    const [shield, setShield] = useState(_shield);
    const [weapon, setWeapon] = useState(_weapon);

    const [damage, setDamage] = useState(gear.find(item => item.name === _weapon).damage);
    const [defense, setDefense] = useState(
        gear.find(item => item.name === _head).defense + 
        gear.find(item => item.name === _body).defense + 
        gear.find(item => item.name === _feet).defense + 
        gear.find(item => item.name === _shield).defense
    );


    return(
        <>
            {/* <div className="HP-EN"> */}
                <AdjustableStat name="HP"
                    state={hp}
                    setState={setHp}
                />

                {/* <AdjustableStat name="EN"
                    state={en}
                    setState={setEnergy}
                />               */}
            {/* </div> */}

            <div className="divider"></div>

            <div className="energies">
                <AdjustableStat name="fire"
                    state={fire}
                    setState={setFire}
                />    
                <AdjustableStat name="wind"
                    state={wind}
                    setState={setWind}
                /> 
                <AdjustableStat name="earth"
                    state={earth}
                    setState={setEarth}
                /> 
                <AdjustableStat name="water"
                    state={water}
                    setState={setWater}
                />                                                             
            </div>

            <div className="divider"></div>

            <div className="attributes">
                <AdjustableStat name="Str"
                    state={str}
                    setState={setStr}
                />
                <AdjustableStat name="Agi"
                    state={agi}
                    setState={setAgi}
                />
                <AdjustableStat name="Con"
                    state={con}
                    setState={setCon}
                />
                <AdjustableStat name="Int"
                    state={int}
                    setState={setInt}
                />                                                
            </div>

            <div className="divider"></div>

            <div className="gear">
                Gear
                <Item items={headGear} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
                <Item items={armors} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
                <Item items={footWear} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
                <Item items={shields} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
                <Item items={weapons} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
            </div>

            <div className="divider"></div>

            <div className="derived-stats">
                <AdjustableStat name="Dam"
                    state={damage}
                    setState={setDamage}
                />
                <AdjustableStat name="Def"
                    state={defense}
                    setState={setDefense}
                />                                
            </div>

            <div className="divider"></div>

            <div className="buffs">
                <EffectTracker effects={effects}
                    trackedEffects={trackedEffects}
                    turn={turn}
                />
            </div>


            <div className="divider"></div>

            <div className="debuffs">
                
            </div>


            <div className="divider"></div>

            <div className="skill-pool">
                
            </div>                        
        </>
    );
}

const AdjustableStat = ({name, state, setState}: {name:string, state:number, setState:Dispatch<SetStateAction<number>>}) => {
    return(
        <div className="adjustable-stat">
            <div className="name-and-value">
                <div className="stat-name">
                    {name} : 
                </div>

                <div className="stat-value">
                    {state}
                </div>                
            </div>


            <button className="add-remove"
                onClick = {() => setState(state + 1)}
            >
                +
            </button>

            <button className="add-remove"
                onClick = {() => setState(
                    state > 0 ? 
                        state - 1 
                    : 
                        0
                )}
            >
                -
            </button>                     
        </div>
    )
}

const Item = ({items, gear, damage, setDamage, defense, setDefense}: {items:Gear[], gear:GearWithStats[], damage:number, setDamage:Dispatch<SetStateAction<number>>, defense:number, setDefense:Dispatch<SetStateAction<number>>}) => {
    const [selected, setSelected] = useState<Gear>(items[0]);
    const prevRef = useRef(selected);
    useEffect(() => {
        prevRef.current = selected;
    }, 
        [selected]
    );

    const prevSelection = prevRef.current;
    let isDefensive = false;
    isDefensive = headGear.includes(prevSelection) || armors.includes(prevSelection) || footWear.includes(prevSelection) || shields.includes(prevSelection);
    let replacedItemDefense = 0;
    let replacedItemDamage = 0;

    return(
        <div className="single-item">
            <select value={selected}
                onChange={e => {
                        const selectedItem = e.target.value as Gear;
                        setSelected(e.target.value as Gear);
                        if(isDefensive){
                            replacedItemDefense = gear.find(item => item.name === prevSelection).defense;
                            const newItemDefense = gear.find(item => item.name === selectedItem).defense;
                            setDefense(defense - replacedItemDefense + newItemDefense);
                        }else{
                            replacedItemDamage = gear.find(item => item.name === prevSelection).damage;
                            const newItemDamage = gear.find(item => item.name === selectedItem).damage;
                            setDamage(damage - replacedItemDamage + newItemDamage);
                        }                        
                    }
                }
            >
                {
                    items.map(item =>
                        <option key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    )
                }
            </select>
        </div>        
    );
}

//TODO
const AdjustableEffect = ({name, maxDuration}:{name:string, maxDuration:number}) => {
    const [turnsLeft, setTurnsLeft] = useState(maxDuration);

    return(
        <AdjustableStat name={name}
            state={turnsLeft}
            setState={setTurnsLeft}
        />
    );
}

const EffectTracker = ({effects, trackedEffects, turn}:{effects:BaseEffect[], trackedEffects:FullEffect[], turn:number}) => {
    const [selected, setSelected] = useState(0);
    const [magnitude, setMagnitude] = useState(1);
    const [duration, setDuration] = useState(1);
    ///const [activeEffects, setActiveEffects] = useState<FullEffect[]>(null);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        console.log("turn changed")
        trackedEffects.forEach(element => {
            element.duration -= 1;
            if(element.duration < 0) element.duration = 0;
        });
        console.log("tracked effects with updated durations:  ", trackedEffects);
        setRerender(!rerender);
    },
        [turn, trackedEffects.length]
    )

    return(
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    trackedEffects.push({
                        name:effects[selected],
                        magnitude:magnitude,
                        duration:duration
                    });
                    console.log(trackedEffects);
                    //setActiveEffects(trackedEffects);
                    setRerender(!rerender);
                }}
            >
                <select value={effects[selected]}
                    onChange={(e) => setSelected(effects.indexOf(e.target.value as BaseEffect))}
                >
                    {
                        effects.map(item =>
                            <option key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        )
                    }                
                </select>

                <div>magnitude: </div>
                <input type="number" 
                    min={-3}
                    max={3}
                    step={1}
                    value={magnitude}
                    onChange={(e) => setMagnitude(Number(e.target.value))}
                />
                <div>duration: </div>
                <input type="number" 
                    min={-3}
                    max={3}
                    step={1}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                />    

                <button
                    type="submit"
                >
                    Add the Effect
                </button>
            </form>

            <ul>
                {
                    trackedEffects.map(el => 
                        <AdjustableEffect key={el.name}
                            name={`${el.name} ${el.magnitude >= 0? " +" : ""}${el.magnitude}, duration `}
                            maxDuration={el.duration}
                        />
                    )
                }
            </ul>
        </div>
    );
}

const handleAddEffect = (e) => {
    e.preventDefault();
}

export {
    ActorCard
}