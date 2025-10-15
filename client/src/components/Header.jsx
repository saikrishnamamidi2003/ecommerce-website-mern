import React from "react";
import {Link} from "react-router-dom";

function Header(){
    return (
        <header className="header">
            <div className="container" >
                  <h1><Link to ="/" >Shopping website</Link></h1>  
                <nav>
                   <Link to="/cart">Cart</Link> | <Link to="/login"><Login></Login></Link>
                    </nav>    
            </div>
        </header>
    );
}

export default Header;