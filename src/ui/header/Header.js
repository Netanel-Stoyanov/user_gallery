import "./Header.css";
import {Logo} from "../logo/Logo";

export function Header(props) {
    return (
        <div className='row'>
            <div className='col-3'>
                <Logo/>
            </div>
            <div className='col-9 '>
                <div className='header'>
                    Your Gallery Storage
                </div>
            </div>
        </div>
    )
}
