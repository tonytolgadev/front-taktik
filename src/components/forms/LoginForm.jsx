import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const LoginForm = ({ onSwitchToRegister }) => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateInputs()) {
      return;
    }
    
    setIsSubmitting(true);
    setApiError('');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setApiError(error.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setIsSubmitting(false);
    }
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
      {apiError && <Alert severity="error">{apiError}</Alert>}
      
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
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
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
          startIcon={<GoogleIcon />}
        >
          Se connecter avec Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Connexion avec Facebook')}
          startIcon={<FacebookIcon />}
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