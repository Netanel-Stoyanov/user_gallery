import {Button} from "../button/Button";

export function Menu(props) {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark col-12 main-menu">
                <span>
                <Button buttonType='ADD' onButtonClick={props.onButtonClick} value='Add Image'/>
                    <Button buttonType='VIEW' onButtonClick={props.onButtonClick} value='View Images'/>
                    <Button buttonType='LOGIN' onButtonClick={props.onButtonClick} value='Login/Register'/>
                     <Button buttonType='LOGOUT' onButtonClick={props.onButtonClick} value='Logout'/>
                </span>
            </nav>
        </div>)
}
