import  Typography  from "@mui/material/Typography";
import  Box  from "@mui/material/Box";
import  Container  from "@mui/material/Container";
import  TextField  from "@mui/material/TextField";
import  Button  from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constats/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    
    const [error, setError] = useState("");

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const {login} = useAuth(); // in AuthContext


        const onSubmit = async () => {
        const email =  emailRef.current?.value;
        const password =  passwordRef.current?.value;

         if( !email || !password){
            setError("check submitted data")
            return;
         }

        // make the call to Api to create the user
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: "POST",
            headers:{
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email , password})
        });
       
        if(!response.ok){
            setError(" Unable to login user, please try different credientials!");
            return;
        }
      const token = await response.json();
      
      if(!token){
        setError("Incorrect Token!")
        return;
      }
      login(email, token)
      navigate("/");
    };

   return(
      <Container>
       <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: 4}}>
       <Typography variant="h6"> Login to Your Account</Typography>
       <Box sx={{display: "flex",  flexDirection: "column", gap: 2, mt: 2, border: 1, borderColor: "#f5f5f5" , padding: 2}} >
        <TextField inputRef={emailRef} label=" Email" name="email"></TextField> 
        <TextField inputRef={passwordRef} type="password" label=" Password" name="password"></TextField> 
        <Button variant="contained"  onClick={onSubmit}> Login</Button>
        {error && <Typography sx={{color: "red"}}>{error}</Typography>}
       </Box >
       </Box>
      </Container>
   );
};

export default LoginPage;