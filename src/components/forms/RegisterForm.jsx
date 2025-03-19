import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { GoogleIcon, FacebookIcon } from '../CustomIcons';
import authService from '../../services/authService';

const RegisterForm = ({ onSwitchToLogin }) => {
 const [nameError, setNameError] = useState(false);
 const [nameErrorMessage, setNameErrorMessage] = useState('');
 const [emailError, setEmailError] = useState(false);
 const [emailErrorMessage, setEmailErrorMessage] = useState('');
 const [passwordError, setPasswordError] = useState(false);
 const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
 const [confirmPasswordError, setConfirmPasswordError] = useState(false);
 const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [apiError, setApiError] = useState('');
 const [successMessage, setSuccessMessage] = useState('');

 const handleSubmit = async (event) => {
   event.preventDefault();
   
   if (!validateInputs()) {
     return;
   }
   
   setIsSubmitting(true);
   setApiError('');
   setSuccessMessage('');
   
   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   
   try {
     const response = await authService.register(name, email, password);
     setSuccessMessage('Inscription réussie ! Redirection vers la connexion...');
     
     setTimeout(() => {
       onSwitchToLogin();
     }, 2000);
   } catch (error) {
     setApiError(error.message || 'Échec de l\'inscription. Veuillez réessayer.');
   } finally {
     setIsSubmitting(false);
   }
 };

 const validateInputs = () => {
   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const confirmPassword = document.getElementById('confirmPassword').value;

   let isValid = true;

   if (!name) {
     setNameError(true);
     setNameErrorMessage('Le nom est requis');
     isValid = false;
   } else {
     setNameError(false);
     setNameErrorMessage('');
   }

   if (!email || !/\S+@\S+\.\S+/.test(email)) {
     setEmailError(true);
     setEmailErrorMessage('Veuillez entrer une adresse email valide.');
     isValid = false;
   } else {
     setEmailError(false);
     setEmailErrorMessage('');
   }

   if (!password || password.length < 6) {
     setPasswordError(true);
     setPasswordErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
     isValid = false;
   } else {
     setPasswordError(false);
     setPasswordErrorMessage('');
   }

   if (password !== confirmPassword) {
     setConfirmPasswordError(true);
     setConfirmPasswordErrorMessage('Les mots de passe ne correspondent pas.');
     isValid = false;
   } else {
     setConfirmPasswordError(false);
     setConfirmPasswordErrorMessage('');
   }

   return isValid;
 };

 return (
   <Box
     component="form"
     onSubmit={handleSubmit}
     noValidate
     sx={{
       display: 'flex',
       flexDirection: 'column',
       width: '100%',
       gap: 2,
     }}
   >
     {apiError && <Alert severity="error">{apiError}</Alert>}
     {successMessage && <Alert severity="success">{successMessage}</Alert>}
     
     <FormControl>
       <FormLabel htmlFor="name">Nom</FormLabel>
       <TextField
         error={nameError}
         helperText={nameErrorMessage}
         id="name"
         type="text"
         name="name"
         placeholder="Votre nom"
         autoComplete="name"
         autoFocus
         required
         fullWidth
         variant="outlined"
         color={nameError ? 'error' : 'primary'}
       />
     </FormControl>

     <FormControl>
       <FormLabel htmlFor="email">Email</FormLabel>
       <TextField
         error={emailError}
         helperText={emailErrorMessage}
         id="email"
         type="email"
         name="email"
         placeholder="votre@email.com"
         autoComplete="email"
         required
         fullWidth
         variant="outlined"
         color={emailError ? 'error' : 'primary'}
       />
     </FormControl>

     <FormControl>
       <FormLabel htmlFor="password">Mot de passe</FormLabel>
       <TextField
         error={passwordError}
         helperText={passwordErrorMessage}
         name="password"
         placeholder="••••••"
         type="password"
         id="password"
         autoComplete="new-password"
         required
         fullWidth
         variant="outlined"
         color={passwordError ? 'error' : 'primary'}
       />
     </FormControl>

     <FormControl>
       <FormLabel htmlFor="confirmPassword">Confirmer le mot de passe</FormLabel>
       <TextField
         error={confirmPasswordError}
         helperText={confirmPasswordErrorMessage}
         name="confirmPassword"
         placeholder="••••••"
         type="password"
         id="confirmPassword"
         autoComplete="new-password"
         required
         fullWidth
         variant="outlined"
         color={confirmPasswordError ? 'error' : 'primary'}
       />
     </FormControl>

     <Button
       type="submit"
       fullWidth
       variant="contained"
       disabled={isSubmitting}
     >
       {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
     </Button>

     <Divider>ou</Divider>

     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
       <Button
         fullWidth
         variant="outlined"
         onClick={() => alert('Inscription avec Google')}
         startIcon={<GoogleIcon />}
       >
         S'inscrire avec Google
       </Button>

       <Button
         fullWidth
         variant="outlined"
         onClick={() => alert('Inscription avec Facebook')}
         startIcon={<FacebookIcon />}
       >
         S'inscrire avec Facebook
       </Button>

       <Typography sx={{ textAlign: 'center' }}>
         Déjà un compte ?{' '}
         <Link
           component="button"
           type="button"
           onClick={onSwitchToLogin}
           variant="body2"
         >
           Se connecter
         </Link>
       </Typography>
     </Box>
   </Box>
 );
};

export default RegisterForm;