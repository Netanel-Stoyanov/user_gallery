import {GalleryCard} from "../gallerycard/GalleryCard";
import {connect} from "react-redux";

export function GalleryView(props) {
    const createGalleryCards = () => {
        let items = props.galleryImage;
        let newItems = [];
        for (let i = 0; i < items.length; i = i + 3) {
            let firstCol =  (
                <div className="col-4">
                    <div>
                        <GalleryCard
                            key={items[i].id}
                            id={items[i].id}
                            title={items[i].title}
                            description={items[i].description}
                            url={items[i].url}
                            onGalleryCardAction={props.onGalleryCardAction}
                        />
                    </div>
                </div>
            );
            let secondCol = items[i + 1] ? (
                <div className="col-4">
                    <div>
                        <GalleryCard
                            key={items[i + 1].id}
                            id={items[i + 1].id}
                            title={items[i + 1].title}
                            description={items[i + 1].description}
                            url={items[i + 1].url}
                            onGalleryCardAction={props.onGalleryCardAction}
                        />
                    </div>
                </div>
            ) : (
                ""
            );
            let thirdCol = items[i + 2] ? (
                <div className="col-4">
                    <div>
                        <GalleryCard
                            key={items[i + 2].id}
                            id={items[i + 2].id}
                            title={items[i + 2].title}
                            description={items[i + 2].description}
                            url={items[i + 2].url}
                            onGalleryCardAction={props.onGalleryCardAction}
                        />
                    </div>
                </div>
            ) : (
                ""
            );
            newItems.push(
                <div key={i} className="row">
                    {firstCol}
                    {secondCol}
                    {thirdCol}
                </div>
            );
        }

        return newItems;
    };

    return <div className="gallery-view">{createGalleryCards()}</div>;
}

const mapStateToProp = (state) => {
    return {
        galleryImage: state.galleryImage,
        oneImage: state.oneImage
    };
};

const mapDispatchActions = () => {
    return {
    };
};

export const GalleryViewPageConnection = connect(
    mapStateToProp,
    mapDispatchActions()
)(GalleryView);

