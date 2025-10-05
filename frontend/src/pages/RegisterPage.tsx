import  Typography  from "@mui/material/Typography";
import  Box  from "@mui/material/Box";
import  Container  from "@mui/material/Container";
import  TextField  from "@mui/material/TextField";
import  Button  from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constats/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const RegisterPage = () => {
    
    const [error, setError] = useState("");

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {login} = useAuth(); // in AuthContext


    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email =  emailRef.current?.value;
        const password =  passwordRef.current?.value;

         if(!firstName || !lastName || !email || !password){
            setError("check submitted data")
            return;
         }

        // make the call to Api to create the user
        const response = await fetch(`${BASE_URL}/user/register`, {
            method: "POST",
            headers:{
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName,lastName , email , password})
        });
       
        if(!response.ok){
            setError(" Unable to register user, please try different credientials!");
            return;
        }
      const token = await response.json();
      
      if(!token){
        setError("Incorrect Token!")
        return;
      }
      login(email, token)
    };

   return(
      <Container>
       <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: 4}}>
       <Typography variant="h6"> Register New Account</Typography>
       <Box sx={{display: "flex",  flexDirection: "column", gap: 2, mt: 2, border: 1, borderColor: "#f5f5f5" , padding: 2}} >
        <TextField inputRef={firstNameRef} label=" First Name" name="firstName"></TextField>
        <TextField inputRef={lastNameRef} label=" Last Name" name="lastName"></TextField> 
        <TextField inputRef={emailRef} label=" Email" name="email"></TextField> 
        <TextField inputRef={passwordRef} type="password" label=" Password" name="password"></TextField> 
        <Button variant="contained"  onClick={onSubmit}> Register</Button>
        {error && <Typography sx={{color: "red"}}>{error}</Typography>}
       </Box >
       </Box>
      </Container>
   );
};

export default RegisterPage;