import {GalleryItemModule} from "../module/GalleryItemModule";
import {Subject} from "rxjs";
import {authApi} from "./AuthenticatedApiService";

class GalleryService {

    galleryItems = [];
    oneGalleryItem;
    dataWasChange = new Subject();
    redirect = new Subject();


    getData = () => {
        if (this.galleryItems.length === 0) {
            authApi.get("http://localhost:8089/gallery")
                .then((response) => {
                    this.galleryItems = response.data.map((item) => new GalleryItemModule(item._id,
                        item.title, item.url, item.description));
                    this.dataWasChange.next("GET")
                }).catch((err) => {
                console.error(err);
                this.redirect.next("LOGIN")
            })
        }
        return this.galleryItems;
    }

    getOneImage = (id) => {
        authApi.get("http://localhost:8089/gallery/" + id)
            .then((response) => {
               this.oneGalleryItem = {id: response.data._id, title: response.data.title, description: response.data.description,
               url: response.data.url}
            }).catch((err) => {
            console.error(err);
            this.redirect.next("LOGIN")
        })
        return this.oneGalleryItem;
    }

    getDataWasChanged = () => {
        return this.dataWasChange.asObservable();
    }

    getRedirect = () => {
        return this.redirect.asObservable();
    }

    addImage = (img) => {
        authApi.post("http://localhost:8089/gallery", img)
            .then((response) => {
                console.log(response)
                const newImage = response.data;
                this.galleryItems.push(new GalleryItemModule(newImage._id,
                    newImage.title, newImage.url, newImage.description));
                console.log(newImage)
            }).catch((err) => {
            console.error(err);
            this.redirect.next("LOGIN");
        })
    }

    editImage = (id, img) => {
        authApi.put("http://localhost:8089/gallery/" + id, img)
            .then((response) => {
                let existingGalleryItem = this.galleryItems.find(image => image.id === id);
                existingGalleryItem.title = img.title;
                existingGalleryItem.description = img.description;
                existingGalleryItem.url = img.url;
                console.log(response)
            }).catch((err) => {
            console.error(err);
        })
    }

    deleteImage = (id) => {
        authApi.delete("http://localhost:8089/gallery/" + id)
            .then((response) => {
                let itemIndex = this.galleryItems.findIndex(image => image.id === id);
                this.galleryItems.splice(itemIndex, 1);
                console.log(response)
                this.redirect.next("DELETE");
            }).catch((err) => {
            console.error(err);
        })
    }

    findGalleryItem(imageId) {
        return this.galleryItems.find(image => image.id === imageId);
    }
}

const galleryService = new GalleryService();
export default galleryService;


