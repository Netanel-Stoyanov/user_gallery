import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {LoginService} from "../../service/LoginService";


export function LoginPage(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const history = useHistory();
    const loginService = new LoginService();

    const login = (event) => {
        loginService.login(event, email, password);
    }

    useEffect(() => {
        loginService.getAuthenticated().subscribe((data) => {
            if (data === "LOGIN") {
                history.push('/');
            } else if (data === "TRY AGAIN"){
                history.push('/login')
            }
        })
    });


    return (
        <div className="login-page col-2">
            <form onSubmit={(event => login(event))}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control m-2" id="exampleInputEmail1"
                           aria-describedby="emailHelp" onChange={(event => {
                        setEmail(event.target.value);
                        console.log(email);
                    })} placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control m-2" id="exampleInputPassword1"
                           onChange={(event => {
                               setPassword(event.target.value);
                               console.log(password);
                           })}
                           placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Login</button>
                <span className='m-lg-3'>
            <Link to="/register">Register</Link>
            </span>
            </form>
        </div>
    )
}
