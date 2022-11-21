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

  export const types = [normalType, fireType, waterType, grassType, elecType, iceType, fightType, poisType, groundType, flyType, psyType, bugType, rockType, ghostType, dragonType, darkType, steelType, fairyType];