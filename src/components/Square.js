function Square(props){
    let classname;
    if(props.isHilight)
        classname='squareHilight';
    else
        classname='square';
    return (
        <button className={classname} onClick={() => {props.onClick();}}>
          {props.value}
        </button>
    );
}

export default Square;