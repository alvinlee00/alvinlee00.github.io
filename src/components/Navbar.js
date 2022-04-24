import React from 'react';
import { MenuItems } from "./MenuItems"
import './Navbar.css'
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }


    render(){
        return(
            <nav className = "NavbarItems blue-bar">
                <h2 className = "navbar-logo">Alvin Lee</h2>
                <div className = "menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ?  'open' : 'closed'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active navbar-collapse' : 'nav-menu navbar-collapse'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to = {item.url}>
                                    {item.label}
                                </Link>
                            </li>
                        )
                    })} 
                </ul>
            </nav>
        )
    }
}

export default Navbar