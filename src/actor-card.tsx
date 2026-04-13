import { useEffect, useRef, useState, type SetStateAction } from "react";
import type { Dispatch } from "react";
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


const ActorCard = ({_hp, _energy, _strength, _agility, _constitution, _intelligence, _head="leather cap", _body="quilted armor", _feet="leather boots", _shield="wooden buckler", _weapon="club"}:{
    _hp: number, _energy: number, _strength: number, _agility: number, _constitution: number, _intelligence: number, _head?:Head, _body?:Body, _feet?:Feet, _shield?:Shield, _weapon?:Weapon    
}) => {
    const [hp, setHp] = useState(_hp);
    const [en, setEnergy] = useState(_energy);

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
            <div className="HP-EN">
                <AdjustableStat name="HP"
                    state={hp}
                    setState={setHp}
                />

                <AdjustableStat name="EN"
                    state={en}
                    setState={setEnergy}
                />              
            </div>

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

            <div className="gear">
                Gear
                <Item items={headGear} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
                <Item items={armors} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
                <Item items={footWear} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
                <Item items={shields} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
                <Item items={weapons} gear={gear} damage={damage} setDamage={setDamage} defense={defense} setDefense={setDefense}/>
            </div>

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

            <div className="buffs">

            </div>


            <div className="debuffs">
                
            </div>


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
const Buff = () => {

}


export {
    ActorCard
}