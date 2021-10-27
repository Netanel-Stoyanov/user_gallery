import {authApi} from "../../service/AuthenticatedApiService";
import {GalleryItemModule} from "../../module/GalleryItemModule";
import {Subject} from "rxjs";

const redirect = new Subject();

export const addImage = (image) => {
    return {
        type: "IMAGE/ADD",
        payload: image,
    };
};

export const editImage = (imageId, image) => {
    return {
        type: "IMAGE/EDIT",
        payload: {imageId, image},
    };
};

export const deleteImage = (imageId) => {
    return {
        type: "IMAGE/DELETE",
        payload: imageId,
    };
};

export const getAllImage = (images) => {
    return {
        type: "IMAGE/GET",
        payload: images,
    };
};

export const setTitle = (title, imageId) => {
    return {
        type: "TITLE",
        payload: {title, imageId}
    };
};

export const setDescription = (description, imageId) => {
    return {
        type: "DESCRIPTION",
        payload: {description, imageId}
    };
};

export const setUrl = (url, imageId) => {
    return {
        type: "URL",
        payload: {url, imageId}
    };
};

export const getData = () => (dispatch) => {
    authApi.get("http://localhost:8089/gallery")
        .then((response) => {
            const galleryItems = response.data.map((item) => new GalleryItemModule(item._id,
                item.title, item.url, item.description));
            dispatch(getAllImage(galleryItems));
        }).catch((err) => {
        console.error(err);
        redirect.next("LOGIN")
    })
}

export const addImageToDb = (img) => (dispatch) => {
    authApi.post("http://localhost:8089/gallery", img)
        .then((response) => {
            const newImage = response.data;
            dispatch(addImage(newImage))
        }).catch((err) => {
        console.error(err);
        redirect.next("LOGIN");
    })
}

export const deleteImageFromDb = (id) => (dispatch) => {
    authApi.delete("http://localhost:8089/gallery/" + id)
        .then((response) => {
            dispatch(deleteImage(id));
        }).catch((err) => {
        console.error(err);
    })
}

export const editImageInDb = (id, img) => (dispatch) => {
    authApi.put("http://localhost:8089/gallery/" + id, img)
        .then((response) => {
            dispatch(editImage(id, img))
            console.log(response)
        }).catch((err) => {
        console.error(err);
    })
}


export const getRedirect = () => {
    return redirect.asObservable();
}
