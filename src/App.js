import './App.css';
import { useState } from 'react';
import { types } from './type-list';
import  Row  from './Components/RowComponents/Row';

function App() {

    const EFF_COLORS = {"¼":"Red", "½":"OrangeRed", "0":"Black", "1":"Gray", "2":"Green", "4":"CornflowerBlue"};
    const TYPE_LOOKUP = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"]
    const EFF_INDEX = ["¼", "½", "0", "1", "2", "4"];
    const DUAL_LOOKUP = {"½":{"½":"¼", "0":"0", "1":"½", "2":"1"}, "0":{"½":"0", "0":"0", "1":"0", "2":"0"}, "1":{"½":"½", "0":"0", "1":"1", "2":"2"}, "2":{"½":"1", "0":"0", "1":"2", "2":"4"}};
    const TABS = ['defense', 'offense', 'tera'];
    
    const [curTypes, setTypes] = useState([]);
    const [activeTab, setTab] = useState(TABS[0]);
    const [curOffType, setOffType] = useState({});
    const [curTeraOffTypes, setTeraOffTypes] = useState([]);
    const [curTeraDefType, setTeraDefType] = useState({});

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

    function GetOffMatchups(type){
        let output = {"¼":[], "½":[], "0":[], "2":[], "4":[]};
        for (let i=0;i<TYPE_LOOKUP.length;i++){
            if(type.toList[i] !== "1") output[type.toList[i]].push(TYPE_LOOKUP[i]);
        }
        return output;
    }

    function GetTeraOffMatchups(types){
        let output = {"¼":[], "½":[], "0":[], "2":[], "4":[]};
        for (let i=0;i<TYPE_LOOKUP.length;i++){
            for (let j=0;j<types.length;j++){
                if (types[j].toList[i] !== "1" && !output[types[j].toList[i]].includes(TYPE_LOOKUP[i])) output[types[j].toList[i]].push(TYPE_LOOKUP[i])
            }
        }
        return output;
    }

    const handleChartClick = (event, name) => {
        let clickedType = types[TYPE_LOOKUP.indexOf(name)];
        if(activeTab === "defense"){
            if (curTypes.length === 0) setTypes([clickedType]);
            else if (curTypes.length === 1 && curTypes[0].name !== name) setTypes([curTypes[0], clickedType]);
            else if (!curTypes.includes(clickedType)) setTypes([curTypes[1], clickedType]);
        } else if (activeTab === "offense"){
            if(clickedType!==curOffType)setOffType(clickedType);
        } else if (activeTab === "tera"){
            if (curTeraOffTypes.length === 0) setTeraOffTypes([clickedType]);
            else if (curTeraOffTypes.length < 4 && !curTeraOffTypes.includes(clickedType)) setTeraOffTypes([...curTeraOffTypes, clickedType]);
            else if (curTeraOffTypes.length === 4 && !curTeraOffTypes.includes(clickedType)) setTeraOffTypes([...curTeraOffTypes.slice(1), clickedType]);
        }
    }

    const handleDualClick = (event, type) => {
        setTypes(curTypes.filter(cur => cur !== type));
    }

    const handleTabClick = (event, tab) => {
        if(activeTab!==tab) setTab(TABS[TABS.indexOf(tab)]);
    }

    const handleOffClick = (event, opt) => {
        setOffType({});
    }

    const handleTeraOffClick = (event, type) => {
        setTeraOffTypes(curTeraOffTypes.filter(cur => cur !== type));
    }

    const handleTeraDefClick = (event, type) => {
        setTeraDefType({});
    }

    function ChartRow(props){
        return(
            <Row iterable = {props.typing.toList} colClass="col" getBg={(nVal) => {return (EFF_COLORS[props.typing.toList[nVal]])}}
                key={props.key} rowKey={[props.key, 'inner'].join(' ')} getValue={(nVal) => {return (props.typing.toList[nVal])}} colContainer="div">
                    {props.children}
            </Row>
        );
    }
        
    function EffRow(props){
        if (Object.keys(props.matchState).length > 0) {
            return(
                <div className="grid" style={{flexDirection:"column"}}>
                    {Object.keys(props.matchCallback(props.matchState)).map((cur) =>{
                        let curEff = props.matchCallback(props.matchState)[cur];
                        if (curEff.length > 0){
                            return(
                                <Row rowKey={cur} iterable={curEff} colClass="header" colContainer="div"
                                    getBg={(nVal) => {return (types[TYPE_LOOKUP.indexOf(curEff[nVal])].color)}}
                                    getValue={(nVal) => {return (curEff[nVal])}} innerOrder={EFF_INDEX.indexOf(cur)}>
                                        <div className="header" style={{background:EFF_COLORS[cur]}}>{cur}</div>
                                </Row>
                            );
                        } else return <div></div>;
                    })}
                </div>
            )} 
        else return <div></div>;
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

    function DefenseCalculator(){
        return(<div className={Object.keys(curTypes).length===0?"hide":"grid white-border"} style={{flexDirection:"column"}}>
            <div className="grid" style={{textAlign:"center"}}>
                {curTypes.map((type) => {return(<ClickableHeader innerClass="header" style={{background:type.color}} key={[type.name, 'bot'].join(' ')} innerOnClick={[handleDualClick, type]}>
                    <div>{type.name}</div>
                </ClickableHeader>);})}
            </div>
            <hr></hr>
            <div className="grid" style={{flexDirection:"row", alignItems:"center", gap:"0px"}}>
                <div className="descHeader">Damage Recv'd Mult</div>
                <div className="descHeader">Type</div>
            </div>
            <EffRow matchState={curTypes} matchCallback={(type) => {return GetMatchups(type)}}/>
        </div>);
    }

    function OffenseCalculator(){
        return(<div className={Object.keys(curOffType).length===0?"hide":"grid white-border"} style={{flexDirection:"column"}}>
            <ClickableHeader innerClass="header" style={{background:curOffType.color}} innerOnClick={[handleOffClick,{}]}>{curOffType.name}</ClickableHeader>
            <hr></hr>
            <div className="grid" style={{flexDirection:"row", alignItems:"center"}}>
                <div className="descHeader">Damage Out Mult</div>
                <div className="descHeader">Type</div>
            </div>
            <EffRow matchState={curOffType} matchCallback={GetOffMatchups}/>     
        </div>);
    }

    function TeraCalculator(){
        return(<div className={Object.keys(curTeraOffTypes).length===0?"hide":"grid white-border"} style={{flexDirection:"column"}}>
            <div className="grid" style={{textAlign:'center'}}>
                {curTeraOffTypes.map((type) => {return(
                    <ClickableHeader innerClass="header" style={{background:type.color}} key={[type.name, 'teraoff'].join(' ')} innerOnClick={[handleTeraOffClick, type]}>
                        <div>{type.name}</div>
                    </ClickableHeader>
                )})}
            </div>
            <hr></hr>
            <div className="grid" style={{flexDirection:"row", alignItems:"center"}}>
                <div className="descHeader">Damage Out Mult</div>
                <div className="descHeader">Type</div>
            </div>
            <EffRow matchState={curTeraOffTypes} matchCallback={GetTeraOffMatchups}/>           
        </div>);
    }

    function Tab(props){
        return(
            <ClickableHeader innerClass={["tab", props.tabLabel, (props.tabLabel===activeTab ? "active" : "")].join(' ')} innerOnClick={[handleTabClick, props.tabLabel]}>
                {props.children}
            </ClickableHeader>
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
                <div className="header" key="blank row 3" style={{borderStyle:"none", height:"100%"}}><br/></div>
                <div className="grid">
                    <Tab tabLabel="defense">Defenses</Tab>
                    <Tab tabLabel="offense">Offense</Tab>
                    <Tab tabLabel="tera">Tera Battle</Tab>
                </div>
                {{"offense":<OffenseCalculator/>,"defense":<DefenseCalculator/>, "tera":<TeraCalculator/>}[activeTab]}
            </div>    
        </div>               
    );
}

export default App;