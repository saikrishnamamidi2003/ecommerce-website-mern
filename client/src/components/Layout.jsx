import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { user, logoutUser } = useContext(AuthContext);
  console.log(user);
  const [showMenu, setShowMenu] = useState(false); // dropdown toggle // fixed here

  const toggleMenu = () => setShowMenu(!showMenu); // fixed here

  return(
    <div>
      <header style={styles.header}>
        <Link to="/">Home</Link>

        <nav style={styles.nav}>
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <div style={styles.userMenu}>
              <div style={{ position: "relative" }}>
                <button onClick={toggleMenu} style={styles.profileBtn}>
                   👤 {user?.name || user?.username} {/* ✅ safer check */}
                </button>
                {showMenu && (
                  <div style={styles.dropdownMenu}>
                    <button onClick={logoutUser} style={styles.logoutBtn}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main>{children}</main>
      <Footer />
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#eee",
  },
  nav: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  userMenu: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  profileBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#333",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px 10px",
    marginTop: "5px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
  },
  logoutBtn: {
    padding: "5px 10px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
};

export default Layout;
