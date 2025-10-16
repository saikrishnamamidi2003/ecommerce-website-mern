import React from "react";
import {Link} from "react-router-dom";
import Login from "../pages/LoginPage"

function Header(){
    return (
        <header className="header">
            <div className="container" >
                  <h1><Link to ="/" >Shopping website</Link></h1>  
                <nav>
                   <Link to="/cart">Cart</Link> | <Link to="/Login">Login</Link> | <Link to="/register">Register</Link>

                    </nav>    
            </div>
        </header>
    );
}

export default Header;