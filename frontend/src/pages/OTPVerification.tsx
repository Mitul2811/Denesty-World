import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Alert,
  AlertTitle,
  Link,
} from '@mui/material';
import { useSnackbar } from 'notistack';

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { userId, email } = location.state || {};

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if no userId is provided
  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('Session expired. Please log in again.', { variant: 'error' });
      navigate('/login');
    }
  }, [userId, navigate, enqueueSnackbar]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(num => num) && index === 5) {
      handleSubmit();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    if (/^\d{6}$/.test(pastedData)) {
      const pastedOtp = pastedData.split('').slice(0, 6);
      setOtp([...pastedOtp, ...Array(6 - pastedOtp.length).fill('')]);

      setTimeout(() => {
        inputRefs.current[Math.min(5, pastedOtp.length - 1)]?.focus();
      }, 0);
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter a 6-digit OTP code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      localStorage.setItem('authToken', 'dummy-auth-token');
      enqueueSnackbar('OTP verified successfully!', { variant: 'success' });

      navigate('/dashboard');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      setOtp(Array(6).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      setResendDisabled(true);
      setCountdown(30);

      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      enqueueSnackbar('New OTP has been sent to your registered email', { variant: 'success' });
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId && !resendDisabled && countdown === 0) {
      handleResendOtp();
    }
  }, [userId, resendDisabled, countdown]);

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
            Verify Your Identity
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            We've sent a 6-digit code to {email || 'your registered email'}
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box mb={4}>
            <Typography variant="body1" align="center" gutterBottom>
              Enter the verification code
            </Typography>

            <Box display="flex" justifyContent="center" gap={2} my={3}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={el => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      padding: '8px',
                      width: '50px',
                      height: '60px',
                    },
                  }}
                  variant="outlined"
                  autoFocus={index === 0}
                  disabled={isLoading}
                />
              ))}
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={isLoading || otp.some(digit => !digit)}
              sx={{ mt: 2, mb: 2, py: 1.5 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Verify OTP'
              )}
            </Button>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="textSecondary">
                Didn't receive the code?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendDisabled}
                  color={resendDisabled ? 'text.disabled' : 'primary'}
                  sx={{ textDecoration: 'none' }}
                >
                  {resendDisabled ? `Resend in ${countdown}s` : 'Resend OTP'}
                </Link>
              </Typography>
            </Box>
          </Box>

          <Box mt={3} pt={2} borderTop={1} borderColor="divider">
            <Typography variant="body2" color="textSecondary" align="center">
              Having trouble? Contact our{' '}
              <Link href="/support" color="primary">
                support team
              </Link>
            </Typography>
          </Box>
        </Paper>

        <Box mt={4} width="100%">
          <Alert severity="info" variant="outlined">
            <AlertTitle>Security Notice</AlertTitle>
            For your security, this code will expire in 3 minutes. Do not share this code with anyone.
          </Alert>
        </Box>
      </Box>
    </Container>
  );
};

export default OTPVerification;
