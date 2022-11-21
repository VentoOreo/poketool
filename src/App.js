import './App.css';
import { useState } from 'react';

function App() {

  function Type({name='default', color="green", normal="1", fire="1", water="1", grass="1", electric="1", ice="1", fighting="1", 
  poison="1", ground="1", flying="1", psychic="1", bug="1", rock="1", ghost="1", dragon="1", dark="1", steel="1", fairy="1"} = {}) {
    this.name = name;
    this.color = color;
    this.toList = [normal, fire, water, grass, electric, ice, fighting, poison, ground, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy];
  }

  const normalType = new Type({name:'Normal', color: "DarkKhaki", rock:"½", ghost:"0", steel:"½"});
  const fireType = new Type({name:'Fire', color:"Orange", fire:"½", water:"½", grass:"2", ice:"2", bug:"2", rock:"½", dragon:"½", steel:"2"});
  const waterType = new Type({name:'Water', color:"Blue", fire:"2", water:"½", grass:"½", ground:"2", rock:"2", dragon:"½"});
  const grassType = new Type({name:'Grass', color:"LimeGreen", fire:"½", water:"2", grass:"½", poison:"½", ground:"2", flying:"½", bug:"½", rock:"2", dragon:"½", steel:"½"})
  const elecType = new Type({name:'Electric', color:'Gold', water:"2", grass:"½", electric:"½", ground:"0", flying:"2", dragon:"½"});
  const iceType = new Type({name:'Ice', color:'LightBlue', fire:"½", water:"½", grass:"2", ice:"½", ground:"2", flying:"2", dragon:"2", steel:"½"});
  const fightType = new Type({name:'Fighting', color:'Tomato', normal:"2", ice:"2", poison:"½", flying:"½", psychic:"½", bug:"½", rock:"2", ghost:"0", dark:"2", steel:"2", fairy:"½"});
  const poisType = new Type({name:'Poison', color:'RebeccaPurple', grass:"2", poison:"½", ground:"½", rock:"½", ghost:"½", steel:"0", fairy:"2"});
  const groundType = new Type({name:'Ground', color:'GoldenRod', fire:"2", grass:"½", electric:"2", poison:"2", flying:"0", bug:"½", rock:"2", steel:"2"});
  const flyType = new Type({name:'Flying', color:'Plum', grass:"2", electric:"½", fighting:"2", bug:"2", rock:"½", steel:"½"});
  const psyType = new Type({name:'Psychic', color:'PaleVioletRed', fighting:"2", poison:"2", psychic:"½", dark:"0", steel:"½"});
  const bugType = new Type({name:'Bug', color:'OliveDrab', fire:"½", grass:"2", fighting:"½", poison:"½", flying:"½", psychic:"2", ghost:"½", dark:"2", steel:"½", fairy:"½"});
  const rockType = new Type({name:'Rock', color:'Tan', fire:"2", ice:"2", fighting:"½", ground:"½", flying:"2", bug:"2", steel:"½"});
  const ghostType = new Type({name:'Ghost', color:'MediumPurple', normal:"0", psychic:"2", ghost:"2", dark:"½"});
  const dragonType = new Type({name:'Dragon', color:'MediumOrchid', dragon:"2", steel:"½", fairy:"0"});
  const darkType = new Type({name:'Dark', color:'DarkSlateGray', fighting:"½", psychic:"2", ghost:"2", dark:"½", fairy:"½"});
  const steelType = new Type({name:'Steel', color:'DarkGray', fire:"½", water:"½", electric:"½", ice:"2", rock:"2", steel:"½", fairy:"2"});
  const fairyType = new Type({name:'Fairy', color:'LightPink', fire:"½", fighting:"2", poison:"½", dragon:"2", dark:"2", steel:"½"});

  const types = [normalType, fireType, waterType, grassType, elecType, iceType, fightType, poisType, groundType, flyType, psyType, bugType, rockType, ghostType, dragonType, darkType, steelType, fairyType];

  const EFF_COLORS = {"¼":"OrangeRed", "½":"Red", "0":"Black", "1":"Gray", "2":"Green", "4":"CornflowerBlue"};
  const TYPE_LOOKUP = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"]
  const DUAL_LOOKUP = {"½":{"½":"¼", "0":"0", "1":"½", "2":"1"}, "0":{"½":"0", "0":"0", "1":"0", "2":"0"}, "1":{"½":"½", "0":"0", "1":"1", "2":"2"}, "2":{"½":"1", "0":"0", "1":"2", "2":"4"}};

  function GetMatchups([typeA, typeB=false]) {
    let output = {"¼":[], "½":[], "0":[], "2":[], "4":[]};
    let typeAIndex = TYPE_LOOKUP.indexOf(typeA.name);
    if (typeB){
      let typeBIndex = TYPE_LOOKUP.indexOf(typeB.name);
      for (let i=0; i<TYPE_LOOKUP.length; i++){
       let temp = DUAL_LOOKUP[types[i].toList[typeAIndex]][types[i].toList[typeBIndex]];
       if (temp !== "1") output[temp].push(TYPE_LOOKUP[i]);
      }
    } else {
      for (let i=0; i<TYPE_LOOKUP.length; i++){
        if (types[i].toList[typeAIndex] !== "1"){
          output[types[i].toList[typeAIndex]].push(TYPE_LOOKUP[i]);
        }
      }
    }
    return output;
  }

  const [curTypes, setTypes] = useState([]);

  const handleChartClick = (event, name) => {
    //console.log(name);
    let clickedType = types[TYPE_LOOKUP.indexOf(name)];
    if (curTypes.length == 0) setTypes([clickedType]);
    else if (curTypes.length == 1 && curTypes[0].name !== name) setTypes([curTypes[0], clickedType]);
    else if (curTypes[0].name !== name && curTypes[1].name !== name) setTypes([curTypes[1], clickedType]);
  }

  const handleDualClick = (event, type) => {
    if (curTypes.length > 1){
      let clickedType = curTypes.indexOf(type);
      setTypes([curTypes[clickedType == 0 ? 1 : 0]]);
    } else setTypes([]);
  }

  return (
    <div className="App">
      <div className="grid">
        <div className="grid" style={{flexDirection:"column"}} key="AttDef">
          <div className="header" style={{borderStyle:"none", alignSelf:"flex-start", paddingBottom:"20px", paddingLeft:"2px"}} key="Defender">Defender</div>
          <div className="header" style={{textAlign:"left", borderStyle:"none"}} key="Attacker">Attacker</div>
        </div>
        {types.map((val) => {
          return(<div className="altheader" style={{background:val.color, writingMode:'vertical-lr', textOrientation:'mixed', transform:'scale(-1)'}} key={[val.name, 'Inverted'].join(' ')} onClick={((e) => handleChartClick(e, val.name))}><div style={{paddingTop:"2px"}}>{val.name}</div></div>)
        })}
      </div>
      {types.map((val) => {
        return(<div className="grid" key={val.name}>
          <div className="header" style={{background:val.color}} key={val.name} onClick={((e) => handleChartClick(e, val.name))}><div style={{paddingRight:"2px"}}>{val.name}</div></div>
          {Object.keys(val.toList).map((nVal) => {
            return(
              <div className="col" style={{background:EFF_COLORS[val.toList[nVal]]}} key={[val.name,nVal].join('')}>{val.toList[nVal]}</div>
            )
          })}
        </div>)
      })}
      <div className="grid">{curTypes.map((type) => {
          return(<div className="header" style={{backgroundColor:type.color}} key={[type.name, 'bot'].join(' ')} onClick={((e)=>handleDualClick(e, type))}>{type.name}</div>);
        }
      )}</div>
      <div className="grid" style={{flexDirection:"column"}} key="MatchChart">
        {curTypes.length > 0 ? Object.keys(GetMatchups(curTypes)).map(matchKey => {
          if (GetMatchups(curTypes)[matchKey].length > 0) 
          return(
          <div className="grid" key={matchKey}>
            <div className="header" style={{background:EFF_COLORS[matchKey]}} key={[matchKey, 'header'].join(' ')}>{matchKey}</div>
            {GetMatchups(curTypes)[matchKey].map(tempType => {
              return <div className="header" style={{background:types[TYPE_LOOKUP.indexOf(tempType)].color}} key={[matchKey, tempType].join(' ')}>{tempType}</div>
            })}
          </div>)
        }) : <div></div>}
      </div>
    </div>
  );
}

export default App;
