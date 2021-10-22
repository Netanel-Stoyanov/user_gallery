import axios from "axios";
import {Subject} from "rxjs";

export class LoginService {

    authenticated = new Subject();

    login = (event, email, password) => {
        event.preventDefault();
        const body = {
            email,
            password
        }
        axios.post("http://localhost:8089/gallery/user/login?email=" + email + "&password=" + password, body)
            .then((response) => {
                console.log(response);
                if (response.data === "your email or password incorrect"){
                    alert('please try again your email or password incorrect')
                    this.authenticated.next("TRY AGAIN")
                } else {
                    localStorage.setItem('token', response.data);
                    this.authenticated.next('LOGIN')
                }
            }).catch((err) => {
            console.error(err);
        });
    }

    getAuthenticated() {
        return this.authenticated.asObservable();
    }
}

