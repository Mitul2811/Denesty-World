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
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Alert,
  AlertTitle,
  Grid,
} from '@mui/material';
// Remove this line as we'll use the stable Grid component
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number')
    .required('Mobile number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must contain at least one uppercase, one lowercase, one number and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('Required'),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real app, you would make an API call to your signup service
        // const response = await registerUser(values);
        
        // Generate a random user ID for demo purposes
        const generatedUserId = 'usr_' + Math.random().toString(36).substr(2, 8).toUpperCase();
        setUserId(generatedUserId);
        
        enqueueSnackbar('Account created successfully!', { variant: 'success' });
        
        // In a real app, you would navigate to OTP verification or dashboard
        // navigate('/verify-otp', { state: { userId: generatedUserId, email: values.email } });
      } catch (error) {
        enqueueSnackbar('Error creating account. Please try again.', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginY: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box mb={4} textAlign="center">
          <Typography component="h1" variant="h4" fontWeight={600} color="primary">
            Create an Account
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Join our secure platform today
          </Typography>
        </Box>

        {userId ? (
          <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <Box textAlign="center">
              <Box mb={3}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#E8F5E9" />
                  <path d="M8 12L11 15L16 9" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Box>
              <Typography variant="h6" gutterBottom>Account Created Successfully!</Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Your unique User ID is:
              </Typography>
              <Box 
                bgcolor="#E3F2FD" 
                p={2} 
                borderRadius={1} 
                mb={3}
                sx={{ display: 'inline-block' }}
              >
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {userId}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" paragraph>
                Please save this ID securely. You'll need it to log in to your account.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/login')}
                sx={{ mt: 2 }}
              >
                Continue to Login
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <form onSubmit={formik.handleSubmit}>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
                <Box>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    id="mobile"
                    name="mobile"
                    label="Mobile Number"
                    type="tel"
                    value={formik.values.mobile}
                    onChange={(e) => {
                      // Allow only numbers
                      const re = /^[0-9\b]+$/;
                      if (e.target.value === '' || re.test(e.target.value)) {
                        formik.setFieldValue('mobile', e.target.value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                      maxLength: 10,
                    }}
                  />
                </Box>
              </Box>

              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={formik.touched.password && Boolean(formik.errors.password)}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText error>{formik.errors.password}</FormHelperText>
                )}
                <FormHelperText>
                  Must be at least 8 characters with uppercase, lowercase, number, and special character
                </FormHelperText>
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              >
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <FormHelperText error>{formik.errors.confirmPassword}</FormHelperText>
                )}
              </FormControl>

              <Box mt={2} mb={3}>
                <FormControl
                  error={formik.touched.termsAccepted && Boolean(formik.errors.termsAccepted)}
                >
                  <Box display="flex" alignItems="flex-start">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formik.values.termsAccepted}
                      onChange={formik.handleChange}
                      style={{
                        marginTop: '5px',
                        marginRight: '8px',
                      }}
                    />
                    <label htmlFor="termsAccepted">
                      <Typography variant="body2" color="textSecondary">
                        I agree to the{' '}
                        <Link href="/terms" color="primary">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" color="primary">
                          Privacy Policy
                        </Link>
                      </Typography>
                    </label>
                  </Box>
                  {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                    <FormHelperText error>{formik.errors.termsAccepted}</FormHelperText>
                  )}
                </FormControl>
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="body2" color="textSecondary">
                  Already have an account?{' '}
                  <Link href="/login" color="primary" fontWeight={500}>
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        )}

        <Box mt={4} width="100%">
          <Alert severity="info" variant="outlined">
            <AlertTitle>Your Security Matters</AlertTitle>
            We use industry-standard encryption to protect your data. Your password is hashed and never stored in plain text.
          </Alert>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
