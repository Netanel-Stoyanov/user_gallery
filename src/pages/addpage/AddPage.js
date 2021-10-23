import {useState} from "react";
import {useHistory} from "react-router-dom";
import {AddImageModule} from "../../module/AddImageModule";
import { connect } from "react-redux";
import {addImageToDb} from "../../redux/actions";

export function AddPage(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const history = useHistory();

    const newImage = new AddImageModule(title, description ,url);


    const onAddSubmit = (event) => {
        event.preventDefault();
        try {
            props.addImageToDb(newImage);
            history.push('/');
        } catch (e) {
            console.log(e)
            history.push('/login')
        }
    }


    return (
        <form onSubmit={(event => {onAddSubmit(event)})}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" onChange={(event => {setTitle(event.target.value)})} className="form-control" aria-describedby="emailHelp"
                       placeholder="Enter title"/>

            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" onChange={(event => {setDescription(event.target.value)})} className="form-control" placeholder="Description"/>
            </div>
            <div className="form-group">
                <label>URL</label>
                <input type="text" onChange={(event => {setUrl(event.target.value)})} className="form-control" placeholder="URL"/>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Add Image</button>
        </form>
    )
}
const mapStateToProp = (state) => {
    return {
        galleryImage: state.galleryImage,
        oneImage: state.oneImage
    };
};

const mapDispatchActions = () => {
    return {
        addImageToDb
    };
};
export const AddPageConnection = connect(
    mapStateToProp,
    mapDispatchActions()
)(AddPage);
