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

export const getOneImage = (image) => {
    return {
        type: "IMAGE/GET/ONE",
        payload: image,
    };
};

export const setTitle = (title) => {
    return {
        type: "TITLE",
        payload: title,
    };
};

export const setDescription = (description) => {
    return {
        type: "DESCRIPTION",
        payload: description,
    };
};

export const setUrl = (url) => {
    return {
        type: "URL",
        payload: url,
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
            redirect.next("ADD")
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
            if (response === 'updated') {
                dispatch(editImage(id, img))
            }
            else {
                throw new Error("something go wrong");
            }
            console.log(response)
        }).catch((err) => {
        console.error(err);
    })
}


export const getRedirect = () => {
    return redirect.asObservable();
}
