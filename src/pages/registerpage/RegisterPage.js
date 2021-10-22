import {useEffect, useState} from "react";
import {RegisterService} from "../../service/RegisterService";
import {useHistory} from "react-router-dom";


export function RegisterPage(props) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const registerService = new RegisterService();
    const history = useHistory();

    const onRegisterSubmit = (event) => {
        registerService.register(event,email,password);
    }

    useEffect(() => {
        registerService.getAuthenticated().subscribe((data) => {
            if (data === "REGISTER"){
                history.push('/login')
            }
        })
    })

    return (
        <div className="register-page col-2">
            <form onSubmit={(event => {onRegisterSubmit(event)})}>
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
                <button type="submit" className="btn btn-primary mt-3">Register</button>
                <span className='m-lg-3'>
            </span>
            </form>
        </div>
    )
}
