import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { FaCheckCircle } from 'react-icons/fa';
import { secureAxios } from '../../config/axios.js';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setMessage('No session found.');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await secureAxios.get(`/stripe/verify-payment?session_id=${sessionId}`);
        setMessage('Payment successful! Your subscription has been upgraded.');
      } catch (err) {
        console.error('Payment verification failed:', err);
        setMessage('Payment verification failed. Please contact support.');
      } finally {
        setLoading(false);
        // Redirect to dashboard after 5 seconds
        setTimeout(() => navigate('/'), 5000);
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-6">
      {loading ? (
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-6"></div>
      ) : (
        <FaCheckCircle className="text-green-500 text-9xl mb-6" />
      )}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Status</h1>
      <p className="text-gray-700 text-center max-w-lg">{message}</p>
      {!loading && (
        <p className="text-gray-500 mt-4">You will be redirected to your dashboard shortly...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
