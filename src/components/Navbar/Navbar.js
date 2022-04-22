import React from 'react';
import { MenuItems } from "./MenuItems"
import './Navbar.css'


class Navbar extends React.Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }


    render(){
        return(
            <nav className = "NavbarItems">
                <h2 className = "navbar-logo">Alvin Lee</h2>
                <div className = "menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ?  'open' : 'closed'}></i>
                </div>
                <ul className = "navbar-collapse nav-menu">
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href = {item.url} target = {item.target}>
                                    {item.label}
                                </a>
                            </li>
                        )
                    })} 
                </ul>
            </nav>
        )
    }
}

export default Navbar