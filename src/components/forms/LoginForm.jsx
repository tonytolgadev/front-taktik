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
import { GoogleIcon, FacebookIcon } from '../CustomIcons';

const LoginForm = ({ onSwitchToRegister }) => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let isValid = true;

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
          autoFocus
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
          autoComplete="current-password"
          required
          fullWidth
          variant="outlined"
          color={passwordError ? 'error' : 'primary'}
        />
      </FormControl>

      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Se souvenir de moi"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={validateInputs}
      >
        Se connecter
      </Button>

      <Link
        component="button"
        type="button"
        variant="body2"
        sx={{ alignSelf: 'center' }}
        onClick={() => {/* Gérer mot de passe oublié */}}
      >
        Mot de passe oublié ?
      </Link>

      <Divider>ou</Divider>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Connexion avec Google')}
          startIcon={<GoogleIcon />} // Vous devrez ajouter cette icône
        >
          Se connecter avec Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Connexion avec Facebook')}
          startIcon={<FacebookIcon />} // Vous devrez ajouter cette icône
        >
          Se connecter avec Facebook
        </Button>

        <Typography sx={{ textAlign: 'center' }}>
          Pas encore de compte ?{' '}
          <Link
            component="button"
            type="button"
            onClick={onSwitchToRegister}
            variant="body2"
          >
            S'inscrire
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;