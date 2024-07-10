import React, { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const SecondPage: React.FC = () => {

const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    console.log(userDetails);
    if (!userDetails) {
      alert('Please enter your details before accessing this page.');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Welcome to the Second Page!</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
      >
        Go Back
      </Button>
    </div>
  );
};

export default SecondPage;
