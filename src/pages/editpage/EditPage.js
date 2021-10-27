import {useHistory} from "react-router-dom";
import {editImageInDb, setDescription, setTitle, setUrl} from "../../redux/actions";
import {connect} from "react-redux";

function EditPage(props) {

    const history = useHistory();
    const oneImage = props.galleryImage.find(image => image.id === props.match.params.id);


    console.log(oneImage)
    const onSubmit = () => {
        let title = oneImage.title;
        let description = oneImage.description;
        let url = oneImage.url;
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
                <input type="text" onChange={(event => {
                    event.preventDefault();
                    props.setTitle(event.target.value, props.match.params.id)
                })} className="form-control"
                       value={oneImage ? oneImage.title : ""}/>

            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" onChange={(event => {
                    event.preventDefault();
                    props.setDescription(event.target.value, props.match.params.id)
                })} className="form-control"
                       value={oneImage ? oneImage.description : ""}/>
            </div>
            <div className="form-group">
                <label>URL</label>
                <input type="text" onChange={(event => {
                    event.preventDefault();
                    props.setUrl(event.target.value, props.match.params.id)
                })} className="form-control"
                       value={oneImage ? oneImage.url : ""}/>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Edit Image</button>
        </form>
    )
}

const mapStateToProp = (state) => {
    return {
        galleryImage: state.galleryImage
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
