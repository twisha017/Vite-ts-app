import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FormPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();


  const handleSubmit = () => {
    if (name && phone && email) {
      const userDetails = { name, phone, email };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      navigate('/first');    
    } else {
      setError('Please fill out all fields.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Enter Details</Typography>
      {error && <Typography color="error" gutterBottom>{error}</Typography>}
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default FormPage;
