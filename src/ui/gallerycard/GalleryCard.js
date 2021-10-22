import {Button} from "../button/Button";

export function GalleryCard(props) {

    const onButtonClick = (buttonType) => {
        return props.onGalleryCardAction(props.id, buttonType);
    };

    return (
        <div className="card col-3 mt-3 m-lg-3" style={{width: '18rem'}}>
            <img className="card-img-top" src={props.url} alt="Card cap"/>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
            <Button hideText={true} value="Edit" onButtonClick={onButtonClick} buttonType="EDIT"/>
                <Button hideText={true} value="Delete" onButtonClick={onButtonClick} buttonType="DELETE"/>
        </div>
)
}
