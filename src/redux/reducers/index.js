import {combineReducers} from "redux";

const galleryImageReducer = (currentState = [], action) => {
    switch (action.type) {
        case "IMAGE/ADD":
            return [...currentState, action.payload];
        case "IMAGE/EDIT":
            let editedImage = currentState.find(x => x.id === action.payload.imageId);
            Object.assign(editedImage, action.payload.image);
            return [...currentState];
        case "IMAGE/DELETE":
            let index = currentState.findIndex(x => x.id === action.payload);
            let newGalleryArray = [...currentState];
            newGalleryArray.splice(index,1);
            return newGalleryArray;
        case "IMAGE/GET":
            return action.payload;
        default:
            return currentState;
    }
};

const oneImageReducer = (image = null , action) => {
    switch (action.type){
        case "IMAGE/GET/ONE":
            return action.payload;
        default:
            return image;
    }
}

const titleReducer = (title = null, action) => {
    switch (action.type){
        case "TITLE" :
            return action.type;
        default :
            return title;
    }
}

const descriptionReducer = (description = null, action) => {
    switch (action.type){
        case "DESCRIPTION" :
            return action.type;
        default :
            return description;
    }
}

const urlReducer = (url = null, action) => {
    switch (action.type){
        case "URL" :
            return action.type;
        default :
            return url;
    }
}

export default combineReducers({
    galleryImage: galleryImageReducer,
    oneImage: oneImageReducer,
    title: titleReducer,
    description: descriptionReducer,
    url: urlReducer
});

