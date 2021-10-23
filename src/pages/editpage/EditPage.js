import {useHistory} from "react-router-dom";
import {editImageInDb, setDescription, setTitle, setUrl} from "../../redux/actions";
import {connect} from "react-redux";


function EditPage(props) {

    const history = useHistory();

    //this is in the first time render is undefined and i dont know why
    //so i can't set props.setTitle(oneImage.title)
    //look for the next comments down below
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

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" onChange={(event => {
                    props.setTitle(event.target.value)
                })} className="form-control"
                       //in the first time when you click edit value should
                    //be as the image that im got from the array
                    //and if im set the props up in the useEfect
                    //when im trying to set some value in the input
                    //its rerender the component because the on change
                    //on the input setTitle and then its always re put the image value
                    //that im got from the reducer state
                    //please look how the action and the reducer works
                    //i can't understand why the first time the image is undefined
                    //so i can't use useEfect to set the title only in the first time
                    //Also about the rest inputs in the component
                value={props.title}/>

            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" onChange={(event => {props.setDescription(event.target.value)
                })}   className="form-control"
                value={props.description}/>
            </div>
            <div className="form-group">
                <label>URL</label>
                <input type="text" onChange={(event => {
                    props.setUrl(event.target.value)
                })} className="form-control"
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
