import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from './Notification/Tost';
// import {local} from '../ApiUrl'

export default function OtpVerification() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (index, value) => {
    // Clear messages when user starts typing
    setErrorMessage('');
    setSuccessMessage('');
    
    // Allow only single digit
    if (value.length > 1) {
      value = value[0];
    }

    // Check if it's a number
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // If all digits are filled, auto-submit
    const allFilled = newOtp.every(digit => digit !== '');
    if (allFilled) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Move to previous input if current is empty
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else if (otp[index] !== '') {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }

    // Handle left arrow key
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1].focus();
    }

    // Handle right arrow key
    if (e.key === 'ArrowRight' && index < 3) {
      e.preventDefault();
      inputRefs.current[index + 1].focus();
    }

    // Handle delete key
    if (e.key === 'Delete') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.slice(0, 4).split('').filter(char => /^\d+$/.test(char));
    
    if (digits.length > 0) {
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < 4) {
          newOtp[idx] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus on the next empty input or last filled
      const lastFilledIndex = Math.min(digits.length, 3);
      inputRefs.current[lastFilledIndex].focus();
      
      // Auto-submit if all fields are filled
      if (newOtp.every(digit => digit !== '')) {
        handleSubmit(newOtp.join(''));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (otpCode) => {
    const finalOtp = Array.isArray(otpCode)
      ? otpCode.join('')
      : otpCode;

    if (finalOtp.length !== 4) {
      setErrorMessage('Please enter complete OTP');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        `http://localhost:8080/verify_otp/${id}`,
        {
          userotp: finalOtp,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        // Show success message from backend or default message
        const successMsg = response.data?.message || response.data?.msg || 'Successfully Verified OTP';
        setSuccessMessage(successMsg);
        showSuccessToast(successMsg);
        
        // Navigate after showing success message
        setTimeout(() => {
          Navigate('/signin');
        }, 1000);
      }
    } catch (error) {
      // Show error message on screen
      const errorMsg =   
                      error?.response?.data?.msg ||
                      'Verification failed. Please try again.';
      
      setErrorMessage(errorMsg);
      showErrorToast(errorMsg);
      
      // Clear OTP fields on error to allow re-entry
      setOtp(['', '', '', '']);
      
      // Focus on first input
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!canResend) return;

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // Call your resend OTP API endpoint
      const response = await axios.post(
        `http://localhost:8080/resend_otp/${id}`,
        {}
      );
      
      if (response.status === 200 || response.status === 201) {
        const successMsg = response.data?.msg || 'OTP resent successfully!';
        setSuccessMessage(successMsg);
        showSuccessToast(successMsg);
        
        // Reset timer and OTP fields
        setTimeLeft(30);
        setCanResend(false);
        setOtp(['', '', '', '']);
        
        // Focus on first input
        setTimeout(() => {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 100);
      }
    } catch (error) {
      const errorMsg = 
                      error?.response?.data?.msg ||
                      'Failed to resend OTP. Please try again.';
      setErrorMessage(errorMsg);
      showErrorToast(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">OTP Verification</h1>
          <p className="text-gray-600">
            Enter the 4-digit code sent to your registered email/phone
          </p>
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage('')}
              className="ml-auto text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* Success Message Display */}
        {successMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage('')}
              className="ml-auto text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-16 h-16 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
                errorMessage 
                  ? 'border-red-700 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-red-700 focus:ring-red-500'
              }`}
              autoFocus={index === 0}
              disabled={loading}
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={() => handleSubmit(otp)}
          disabled={loading || otp.some(digit => digit === '')}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        {/* Resend Section */}
        <div className="mt-6 text-center">
          {canResend ? (
            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="text-red-600 font-semibold hover:text-red-700 transition duration-300 disabled:opacity-50"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-600">
              Resend code in <span className="font-bold text-green-600">{timeLeft}</span> seconds
            </p>
          )}
        </div>

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700 transition duration-300"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}