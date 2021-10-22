export function Button(props){
    const onButtonClickType = () => {
        props.onButtonClick(props.buttonType);
    }
    return(
        <button type="button" onClick={onButtonClickType} className="btn btn-light m-lg-2">{props.value}</button>
    )
}
