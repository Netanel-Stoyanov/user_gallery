import './App.css';
import {Header} from "./ui/header/Header";
import {Menu} from "./ui/menu/Menu";
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import {LoginPage} from "./pages/loginpage/LoginPage";
import {RegisterPage} from "./pages/registerpage/RegisterPage";
import {DefaultPage} from "./pages/deafultpage/DefaultPage";
import {GalleryViewPageConnection} from "./ui/galleryview/GalleryView";
import {AddPageConnection} from "./pages/addpage/AddPage";
import {EditPageConnection} from "./pages/editpage/EditPage";
import {LogOutService} from "./service/LogOutService";
import {connect} from "react-redux";
import {deleteImageFromDb, getData} from "./redux/actions";
import {useEffect} from "react";
import jwt from "jsonwebtoken";


function App(props) {

    const history = useHistory();
    const logout = new LogOutService();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            jwt.verify(localStorage.getItem('token'),
                "USER_SECRETE_KEY", (err, decode) => {
                    if (err) {
                        history.push('/login')
                    } else {
                        if ((decode.exp * 1000) < Date.now()) {
                            localStorage.removeItem('token');
                            history.push('/login')
                        } else {
                            props.getData()
                        }
                    }
                })
        }
    }, [])


    const onGalleryCardAction = (cardId, buttonType) => {
        if (buttonType === "EDIT") {
            history.push("/card/edit/" + cardId);
        } else if (buttonType === "DELETE") {
            props.deleteImageFromDb(cardId);
            history.push('/image/view')
        }
    };


    const onMenuClick = (buttonType) => {
        if (buttonType === "ADD") {
            if (localStorage.getItem('token')) {
                history.push("/image/add");
            } else {
                alert("please login")
                history.push('/login')
            }
        } else if (buttonType === "VIEW") {
            if (localStorage.getItem('token')) {
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
                        <Route path="/image/add" exact component={AddPageConnection}/>
                        <Route path="/card/edit/:id" exact component={EditPageConnection}/>
                    </div>
                    <Route path="/" exact component={DefaultPage}/>
                    <Route path="/image/view" exact>
                        <GalleryViewPageConnection onGalleryCardAction={onGalleryCardAction}/>
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProp = (state) => {
    return {
        galleryImage: state.galleryImage,
        oneImage: state.oneImage
    };
};

const mapDispatchActions = () => {
    return {
        getData,
        deleteImageFromDb
    };
};


export const ConnectedApp = connect(mapStateToProp, mapDispatchActions())(App);


export default App;
