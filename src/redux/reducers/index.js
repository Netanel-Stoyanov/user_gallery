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
        case "TITLE" :
            let editedTitle = currentState.find(x => x.id === action.payload.imageId);
            editedTitle.title = action.payload.title;
            return [...currentState];
        case "DESCRIPTION" :
            let editedDescription = currentState.find(x => x.id === action.payload.imageId);
            editedDescription.description = action.payload.description;
            return [...currentState];
        case "URL" :
            let editedUrl = currentState.find(x => x.id === action.payload.imageId);
            editedUrl.url = action.payload.url;
            return [...currentState];
            default:
            return currentState;
    }
};



export default combineReducers({
    galleryImage: galleryImageReducer
});

