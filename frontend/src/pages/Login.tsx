import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  AlertTitle
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object({
  userId: Yup.string()
    .required('User ID is required')
    .min(8, 'User ID must be at least 8 characters')
    .max(12, 'User ID must be at most 12 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'User ID must be alphanumeric'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userId: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would make an API call to your login service
        // const response = await loginUser(values.userId, values.password);
        
        // For demo purposes, we'll just navigate to OTP verification
        enqueueSnackbar('Login successful! Please verify your OTP.', { variant: 'success' });
        navigate('/verify-otp', { state: { userId: values.userId } });
      } catch (error) {
        enqueueSnackbar('Invalid credentials. Please try again.', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box mb={4} textAlign="center">
          <Typography component="h1" variant="h4" fontWeight={600} color="primary">
            Secure Auth
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Sign in to your account
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="User ID"
              name="userId"
              autoComplete="username"
              autoFocus
              value={formik.values.userId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userId && Boolean(formik.errors.userId)}
              helperText={formik.touched.userId && formik.errors.userId}
              variant="outlined"
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mt: 2, mb: 2 }}>
              <Link href="/forgot-password" variant="body2" color="primary">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading}
              sx={{ mt: 2, mb: 2, py: 1.5 }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="textSecondary">
                Don't have an account?{' '}
                <Link href="/signup" color="primary" fontWeight={500}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>

        <Box mt={4} width="100%">
          <Alert severity="info" variant="outlined">
            <AlertTitle>Secure Login</AlertTitle>
            For security reasons, please do not share your login credentials with anyone.
          </Alert>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
