import './App.css';
import { useState } from 'react';
import { types } from './type-list';
import  Row  from './Components/RowComponents/Row';

function App() {

    const EFF_COLORS = {"¼":"Red", "½":"OrangeRed", "0":"Black", "1":"Gray", "2":"Green", "4":"CornflowerBlue"};
    const TYPE_LOOKUP = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"]
    const EFF_INDEX = ["¼", "½", "0", "1", "2", "4"];
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
        let clickedType = types[TYPE_LOOKUP.indexOf(name)];
        if (curTypes.length === 0) setTypes([clickedType]);
        else if (curTypes.length === 1 && curTypes[0].name !== name) setTypes([curTypes[0], clickedType]);
        else if (curTypes[0].name !== name && curTypes[1].name !== name) setTypes([curTypes[1], clickedType]);
    }

    const handleDualClick = (event, type) => {
        if (curTypes.length > 1){
            let clickedType = curTypes.indexOf(type);
            setTypes([curTypes[clickedType === 0 ? 1 : 0]]);
        } else setTypes([]);
    }

    function ChartRow(props){
        return(
            <Row iterable = {props.typing.toList} colClass="col" getBg={(nVal) => {return (EFF_COLORS[props.typing.toList[nVal]])}}
                key={props.key} rowKey={[props.key, 'inner'].join(' ')} getValue={(nVal) => {return (props.typing.toList[nVal])}} colContainer="div">
                    {props.children}
            </Row>
        );
    }

    /**
     * 
     * @param {*} props 
     * @param {*} props.innerClass - CSS class to pass to the header
     * @param {[Function,*]} innerOnClick - An array consisting of a callback function and argument to pass to the function 
     * @returns Clickable div boject
     */
    function ClickableHeader(props){
        return(
            <div className={[props.innerClass, 'clickable'].join(' ')} style={props.style} key={[props.key, 'clickable inner'].join(' ')} onClick={(e) => props.innerOnClick[0](e, props.innerOnClick[1])}>{props.children}</div>
        );
    }

    function Chart(){
        return(
            <div className="grid" style={{flexDirection:"column"}}>
                <div className="grid" style={{flexDirection:"row"}} key="AttDef">
                    <div className="grid" style={{flexDirection:"column"}}>
                        <div className="header" style={{borderStyle:"none", alignSelf:"flex-start", paddingBottom:"20px", paddingLeft:"2px"}} key="Defender">Defender</div>
                        <div className="header" style={{textAlign:"left", borderStyle:"none"}} key="Attacker">Attacker</div>
                    </div>
                    {types.map((val) => {
                        return(<ClickableHeader innerClass="altheader" style={{background:val.color}} key={[val.name, 'Inverted'].join(' ')} innerOnClick={[handleChartClick, val.name]}>
                            <div style={{paddingTop:"2px"}}>{val.name}</div>
                        </ClickableHeader>)
                    })}
                </div>
                {types.map((val) => {
                    return (<ChartRow typing = {val}>
                        <ClickableHeader innerClass="header" style={{background:val.color}} key={[val.name, 'side'].join(' ')} innerOnClick={[handleChartClick, val.name]}>
                            <div style={{paddingRight:"2px"}}>{val.name}</div>
                        </ClickableHeader>
                    </ChartRow>)
                })}
            </div>
        );
    }

    return (
        <div className="App"> 
            <Chart/>  
            <div className="grid" style={{flexDirection:"column", textAlign:"center"}} key="MatchChart">
                <div className="header" key="blank row 1" style={{borderStyle:"none", height:"100%"}}><br/></div>
                <div className="grid" key="selector row">
                    {types.map((val) => {return <ClickableHeader innerClass="header" style={{background:val.color}} key={[val.name, 'sel'].join(' ')} innerOnClick={[handleChartClick, val.name]}>
                        <div>{val.name}</div>
                    </ClickableHeader>})}
                </div>
                <div className="header" key="blank row 2" style={{borderStyle:"none", height:"100%"}}><br/></div>
                <div className="grid" style={{textAlign:"center"}}>
                    {curTypes.map((type) => {return(<ClickableHeader innerClass="header" style={{background:type.color}} key={[type.name, 'bot'].join(' ')} innerOnClick={[handleDualClick, type]}>
                        <div>{type.name}</div>
                    </ClickableHeader>);})}
                </div>
                {curTypes.length > 0 ? Object.keys(GetMatchups(curTypes)).map(matchKey => {
                if (GetMatchups(curTypes)[matchKey].length > 0) 
                    return(
                        <Row rowKey={matchKey} iterable={GetMatchups(curTypes)[matchKey]} colClass="header" colContainer = "div"
                        getBg={(nVal)=>{return(types[TYPE_LOOKUP.indexOf(GetMatchups(curTypes)[matchKey][nVal])].color)}}
                        getValue={(nVal)=>{return(GetMatchups(curTypes)[matchKey][nVal])}} innerOrder={EFF_INDEX.indexOf(matchKey)}>
                            <div className="header" style={{background:EFF_COLORS[matchKey]}} key={[matchKey, 'header'].join(' ')}>{matchKey}</div>
                        </Row>
                    )
                }) : <div></div>}
            </div>
        </div>
    );
}

export default App;