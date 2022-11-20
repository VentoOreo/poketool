import './App.css';

function App() {

  function Type({name='default', color="green", normal="1x", fire="1x", water="1x", grass="1x", electric="1x", ice="1x", fighting="1x", 
  poison="1x", ground="1x", flying="1x", psychic="1x", bug="1x", rock="1x", ghost="1x", dragon="1x", dark="1x", steel="1x", fairy="1x"} = {}) {
    this.name = name;
    this.color = color;
    this.toList = [normal, fire, water, grass, electric, ice, fighting, poison, ground, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy];
  }

  const normalType = new Type({name:'Normal', color: "DarkKhaki", rock:"0.5x", ghost:"0x", steel:"0.5x"});
  const fireType = new Type({name:'Fire', color:"Orange", fire:"0.5x", water:"0.5x", grass:"2x", ice:"2x", bug:"2x", rock:"0.5x", dragon:"0.5x", steel:"2x"});
  const waterType = new Type({name:'Water', color:"Blue", fire:"2x", water:"0.5x", grass:"0.5x", ground:"2x", rock:"2x", dragon:"0.5x"});
  const grassType = new Type({name:'Grass', color:"LimeGreen", fire:"0.5x", water:"2x", grass:"0.5x", poison:"0.5x", ground:"2x", flying:"0.5x", bug:"0.5x", rock:"2x", dragon:"0.5x", steel:"0.5x"})
  const elecType = new Type({name:'Electric', color:'Gold', water:"2x", grass:"0.5x", electric:"0.5x", ground:"0x", flying:"2x", dragon:"0.5x"});
  const iceType = new Type({name:'Ice', color:'LightBlue', fire:"0.5x", water:"0.5x", grass:"2x", ice:"0.5x", ground:"2x", flying:"2x", dragon:"2x", steel:"0.5x"});
  const fightType = new Type({name:'Fighting', color:'Tomato', normal:"2x", ice:"2x", poison:"0.5x", flying:"0.5x", psychic:"0.5x", bug:"0.5x", rock:"2x", ghost:"0x", dark:"2x", steel:"2x", fairy:"0.5x"});
  const poisType = new Type({name:'Poison', color:'RebeccaPurple', grass:"2x", poison:"0.5x", ground:"0.5x", rock:"0.5x", ghost:"0.5x", steel:"0x", fairy:"2x"});
  const groundType = new Type({name:'Ground', color:'GoldenRod', fire:"2x", grass:"0.5x", electric:"2x", poison:"2x", flying:"0x", bug:"0.5x", rock:"2x", steel:"2x"});
  const flyType = new Type({name:'Flying', color:'Plum', grass:"2x", electric:"0.5x", fighting:"2x", bug:"2x", rock:"0.5x", steel:"0.5x"});
  const psyType = new Type({name:'Psychic', color:'PaleVioletRed', fighting:"2x", poison:"2x", psychic:"0.5x", dark:"0x", steel:"0.5x"});
  const bugType = new Type({name:'Bug', color:'OliveDrab', fire:"0.5x", grass:"2x", fighting:"0.5x", poison:"0.5x", flying:"0.5x", psychic:"2x", ghost:"0.5x", dark:"2x", steel:"0.5x", fairy:"0.5x"});
  const rockType = new Type({name:'Rock', color:'Tan', fire:"2x", ice:"2x", fighting:"0.5x", ground:"0.5x", flying:"2x", bug:"2x", steel:"0.5x"});
  const ghostType = new Type({name:'Ghost', color:'MediumPurple', normal:"0x", psychic:"2x", ghost:"2x", dark:"0.5x"});
  const dragonType = new Type({name:'Dragon', color:'MediumOrchid', dragon:"2x", steel:"0.5x", fairy:"0x"});
  const darkType = new Type({name:'Dark', color:'DarkSlateGray', fighting:"0.5x", psychic:"2x", ghost:"2x", dark:"0.5x", fairy:"0.5x"});
  const steelType = new Type({name:'Steel', color:'DarkGray', fire:"0.5x", water:"0.5x", electric:"0.5x", ice:"2x", rock:"2x", steel:"0.5x", fairy:"2x"});
  const fairyType = new Type({name:'Fairy', color:'LightPink', fire:"0.5x", fighting:"2x", poison:"0.5x", dragon:"2x", dark:"2x", steel:"0.5x"});

  const types = [normalType, fireType, waterType, grassType, elecType, iceType, fightType, poisType, groundType, flyType, psyType, bugType, rockType, ghostType, dragonType, darkType, steelType, fairyType];

  const EFF_COLORS = {"0.25x":"OrangeRed", "0.5x":"Red", "0x":"Black", "1x":"Gray", "2x":"Green", "4x":"CornflowerBlue"};
  const TYPE_LOOKUP = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"]
  const DUAL_LOOKUP = {"0.5x":{"0.5x":"0.25x", "0x":"0x", "1x":"0.5x", "2x":"1x"}, "0x":{"0.5x":"0x", "0x":"0x", "1x":"0x", "2x":"0x"}, "1x":{"0.5x":"0.5x", "0x":"0x", "1x":"1x", "2x":"2x"}, "2x":{"0.5x":"1x", "0x":"0x", "1x":"2x", "2x":"4x"}};

  function GetMatchups(typeA, typeB=false) {
    let output = {"0.25x":[], "0.5x":[], "0x":[], "2x":[], "4x":[]};
    let typeAIndex = TYPE_LOOKUP.indexOf(typeA.name);
    if (typeB){
      let typeBIndex = TYPE_LOOKUP.indexOf(typeB.name);
      for (let i=0; i<TYPE_LOOKUP.length; i++){
       let temp = DUAL_LOOKUP[types[i].toList[typeAIndex]][types[i].toList[typeBIndex]];
       if (temp !== "1x") output[temp].push(TYPE_LOOKUP[i]);
      }
    } else {
      for (let i=0; i<TYPE_LOOKUP.length; i++){
        if (types[i].toList[typeAIndex] !== "1x"){
          output[types[i].toList[typeAIndex]].push(TYPE_LOOKUP[i]);
        }
      }
    }
    return output;
  }

  console.log("Dragon and Steel matchups:");
  console.log(GetMatchups(steelType, dragonType));

  return (
    <div className="App">
      <div className="grid">
        <div className="grid" style={{flexDirection:"column"}}>
          <div className="header" style={{color:"Black", borderStyle:"none", alignSelf:"flex-start", paddingBottom:"20px", paddingLeft:"4px"}}>Defender</div>
          <div className="header" style={{color:"Black", textAlign:"left", borderStyle:"none"}}>Attacker</div>
        </div>
        {types.map((val) => {
          return(<div className="altheader" style={{background:val.color, writingMode:'vertical-lr', textOrientation:'mixed', transform:'scale(-1)'}}>{val.name}</div>)
        })}
      </div>
      {types.map((val, key) => {
        return(<div className="grid" key={key}>
          <div className="header" style={{background:val.color}}>{val.name}</div>
          {val.toList.map((nVal) => {
            return(
              <div className="col" style={{background:EFF_COLORS[nVal]}}>{nVal}</div>
            )
          })}
        </div>)
      })}
    </div>
  );
}

export default App;
