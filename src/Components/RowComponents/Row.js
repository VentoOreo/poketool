function Row(props){
    return(<div className="grid" key={props.rowKey} style={{order:(props.innerOrder? props.innerOrder : 1)}}>
      {props.header}
      {Object.keys(props.iterable).map((nVal) => {
        return(
          <div className={props.colClass} style={{background:props.getBg(nVal)}} key={[props.rowKey, nVal].join(' ')}>{props.getValue(nVal)}</div>
        )
      })}
    </div>);
}

export default Row;