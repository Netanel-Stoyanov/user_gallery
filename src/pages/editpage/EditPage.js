import galleryService from "../../service/GalleryService";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

export function EditPage(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const history = useHistory();


    const image = galleryService.getOneImage(props.match.params.id)



    console.log(image)
    const onSubmit = () => {
        const img = {
            title, description, url
        }
        try {
            galleryService.editImage(props.match.params.id, img)
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
                    setTitle(event.target.value)
                })} className="form-control"
                value={image ? image.title: ""}/>

            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" onChange={(event => {setDescription(event.target.value)
                })}   className="form-control"
                value={description}/>
            </div>
            <div className="form-group">
                <label>URL</label>
                <input type="text" onChange={(event => {
                    setUrl(event.target.value)
                })} className="form-control"
                       value={url} />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Edit Image</button>
        </form>
    )
}
