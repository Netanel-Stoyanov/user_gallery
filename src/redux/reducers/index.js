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

export default combineReducers({
    galleryImage: galleryImageReducer,
});

