const galleryImageReducer = (currentState = [], action) => {
    switch (action.type) {
        case "IMAGE/ADD":
            return [];
        case "IMAGE/EDIT":
            return [];
        case "TODO/DELETE":
            return [];
        case "TODO/GET":
            return [];
        default:
            return currentState;
    }
};
