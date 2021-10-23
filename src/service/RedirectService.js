import {useHistory} from "react-router-dom";
import {getRedirect} from "../redux/actions";

export function RedirectService() {

    const history = useHistory();

    getRedirect().subscribe((data) => {
        if (data === 'LOGIN'){
            history.push('/login')
        }
    })
}
