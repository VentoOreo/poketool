/**
 * 
 * @param {*} props 
 * @param {*} props.rowKey - Unique key for each item
 * @param {*} props.iterable - Iterable object to pass to the map function
 * @param {*} props.colClass - The CSS class for each cell
 * @param {*} props.getBg - Callback function to generate the background color of each cell
 * @param {*} props.getValue - Callback function to generate the text in each cell
 * @param {*} [props.innerOrder] - Optional order value for the flexbox
 * @param {*} [props.header] - Optional header object to pass as the first object in the row
 * @returns div flexbox object containing a list of child divs
 */

function Row(props){
    return(<div className="grid" key={props.rowKey} style={{order:(props.innerOrder? props.innerOrder : 1)}}>
      {props.children}
      {Object.keys(props.iterable).map((nVal) => {
        return(
          <div className={props.colClass} style={{background:props.getBg(nVal)}} key={[props.rowKey, nVal].join(' ')}>{props.getValue(nVal)}</div>
        )
      })}
    </div>);
}

export default Row;