import {useHistory} from "react-router-dom";
import {editImageInDb, setDescription, setTitle, setUrl} from "../../redux/actions";
import {connect} from "react-redux";

function EditPage(props) {

    const history = useHistory();


    const oneImage = props.galleryImage.find(image => image.id === props.match.params.id);

    //can't use useEfect because the first time one image is undefined
    //please read the comments down below
    props.setTitle(oneImage ? oneImage.title : "")
    props.setDescription(oneImage ? oneImage.description : "")
    props.setUrl(oneImage ? oneImage.url : "")

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


    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                {/* can't edit the input value
                 because im using setTitle and its render the component
                 and set the value to the one image properties*/}
                <input type="text" onChange={(event => {props.setTitle(event.target.value)})} className="form-control"
                       value={props.title}/>

            </div>
            <div className="form-group">
                <label>Description</label>
                {/* can't edit the input value
                 because im using setTitle and its render the component
                 and set the value to the one image properties*/}
                <input type="text" onChange={(event => {props.setDescription(event.target.value)})}   className="form-control"
                value={props.description}/>
            </div>
            <div className="form-group">
                <label>URL</label>
                {/* can't edit the input value
                 because im using setTitle and its render the component
                 and set the value to the one image properties*/}
                <input type="text" onChange={(event => {props.setUrl(event.target.value)})} className="form-control"
                       value={props.url} />
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
