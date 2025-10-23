import React, {useState, useContext} from "react";
import axios from "axios";
import API_URL from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const{loginUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleReister = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(API_URL + "/api/users/register", {name, email, password});

           // Assuming backend returns { user, token } after registration
           loginUser(response.data.user, response.data.token);
           navigate("/");
        }   
        catch (err){
            console.error(err);
            setError("Registration failed,. Try again");
        }
    };

    return (
        <div style={styles.container} >
            <h2>Register</h2>
            {error && <p style = {styles.error}>{error}</p>}
            <form onSubmit={handleReister}  style={styles.form}>
            <input
            type = "text"
            placeholder = "Name"
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            style = {styles.input}
            required
           />

           <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Register</button>

            </form>

        </div>
    );
    
};


const styles = {
  container: { width: "400px", margin: "50px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", cursor: "pointer" },
  error: { color: "red" },
};

export default RegisterPage;
