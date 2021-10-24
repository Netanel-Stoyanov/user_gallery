import {useHistory} from "react-router-dom";
import {editImageInDb, setDescription, setTitle, setUrl} from "../../redux/actions";
import {connect} from "react-redux";

function EditPage(props) {

    const history = useHistory();


    const oneImage = props.galleryImage.find(image => image.id === props.match.params.id);


    console.log(oneImage)
    const onSubmit = () => {
        let title = props.title;
        let description = props.description;
        let url = props.url;
        const img = {
            title, description, url
        }
        try {
            props.editImageInDb(props.match.params.id, img)
            history.push('/')
        } catch (e) {
            console.error(e)
            history.push('/login')
        }
    }

    const onSubmitValue = (event, valueType) => {
        if (valueType === "title") {
            props.setTitle(event.target.value);
        } else if (valueType === "description"){
            props.setDescription(event.target.value);
        } else if (valueType === "url"){
            props.setUrl(event.target.value);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                {/* can't edit the input value  */}
                <input type="text" onSubmit={(event => {onSubmitValue(event)})} className="form-control"
                       value={oneImage? oneImage.title : ""}/>

            </div>
            <div className="form-group">
                <label>Description</label>
                {/* can't edit the input value  */}
                <input type="text" onSubmit={(event => {onSubmitValue(event)})}   className="form-control"
                value={oneImage? oneImage.description : ""}/>
            </div>
            <div className="form-group">
                <label>URL</label>
                {/* can't edit the input value  */}
                <input type="text" onSubmit={(event => {onSubmitValue(event)})} className="form-control"
                       value={oneImage? oneImage.url : ""} />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Edit Image</button>
        </form>
    )
}

const mapStateToProp = (state) => {
    return {
        galleryImage: state.galleryImage,
        oneImage: state.oneImage,
        title: state.title,
        description: state.description,
        url: state.url
    };
};

const mapDispatchActions = () => {
    return {
        editImageInDb,
        setTitle,
        setDescription,
        setUrl
    };
};

export const EditPageConnection = connect(mapStateToProp, mapDispatchActions())(EditPage);
