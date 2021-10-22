import {GalleryService} from "./GalleryService";
import {useHistory} from "react-router-dom";

export function RedirectService() {
    const galleryService = new GalleryService();

    const history = useHistory();

    galleryService.getRedirect().subscribe((data) => {
        if (data === 'LOGIN'){
            history.push('/login')
        }
    })
}
