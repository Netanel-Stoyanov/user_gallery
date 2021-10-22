import './App.css';
import {Header} from "./ui/header/Header";
import {Menu} from "./ui/menu/Menu";
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import {LoginPage} from "./pages/loginpage/LoginPage";
import {RegisterPage} from "./pages/registerpage/RegisterPage";
import {DefaultPage} from "./pages/deafultpage/DefaultPage";
import {GalleryView} from "./ui/galleryview/GalleryView";
import {useEffect, useState} from "react";
import galleryService from "./service/GalleryService";
import {AddPage} from "./pages/addpage/AddPage";
import {EditPage} from "./pages/editpage/EditPage";
import {LogOutService} from "./service/LogOutService";

function App() {

    const [galleryItems, setGalleryItems] = useState([]);
    const history = useHistory();
    const logout = new LogOutService();


    const onGalleryCardAction = (cardId, buttonType) => {
        if (buttonType === "EDIT") {
            history.push("/card/edit/" + cardId);
            console.log(galleryItems)
        } else if (buttonType === "DELETE"){
            galleryService.deleteImage(cardId);
            history.push('/image/view')
        }
    };


    useEffect(() => {
        galleryService.getDataWasChanged().subscribe((data) => {
            if (data === "GET") {
                setGalleryItems(galleryService.getData());
            } else if (data === "ADD") {
                history.push('/image/view');
            }
        })
        galleryService.getData();
    }, [history])

    const onMenuClick = (buttonType) => {
        if (buttonType === "ADD") {
            if (localStorage.getItem('token')){
                history.push("/image/add");
            } else {
                alert("please login")
                history.push('/login')
            }
        } else if (buttonType === "VIEW") {
            if (localStorage.getItem('token')){
                history.push("/image/view");
            } else {
                alert("please login")
                history.push('/login')
            }
        } else if (buttonType === "LOGIN") {
            history.push('/login')
        } else if (buttonType === "LOGOUT") {
            logout.logOut();
            history.push('/login')
        }
    };

    return (
        <div className='container-fluid vh-100'>
            <div className='row'>
                <Header/>
            </div>
            <div className='row'>
                <Menu onButtonClick={onMenuClick}/>
            </div>
            <BrowserRouter>
                <div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px'}}>
                        <Route path="/login" exact component={LoginPage}/>
                        <Route path="/register" exact component={RegisterPage}/>
                        <Route path="/image/add" exact component={AddPage}/>
                        <Route path="/card/edit/:id" exact component={EditPage}/>
                    </div>
                    <Route path="/" exact component={DefaultPage}/>
                    <Route path="/image/view" exact>
                        <GalleryView onGalleryCardAction={onGalleryCardAction} galleryItems={galleryItems}>
                        </GalleryView>
                    </Route>

                    </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
