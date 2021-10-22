import {Subject} from "rxjs";

export class LogOutService{

    change = new Subject();

    logOut = () => {
        if (localStorage.getItem('token')){
            localStorage.removeItem('token')
            this.change.next('LOGOUT')
        } else {
            alert("you are not logged in");
        }
    }

    getChange = () =>{
        return this.change.asObservable();
    }
}
