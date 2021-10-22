import {Subject} from "rxjs";
import axios from "axios";

export class RegisterService {

    authenticated = new Subject();

    register = (event, email, password) => {
        event.preventDefault();
        const body = {
            email,
            password
        }
        axios.post("http://localhost:8089/gallery/user", body)
            .then((response) => {
                console.log(response);
                this.authenticated.next('REGISTER')
            }).catch((err) => {
            console.error(err);
        });
    }

    getAuthenticated() {
        return this.authenticated.asObservable();
    }
}

