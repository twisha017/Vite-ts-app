import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Post } from '../types.ts';
import { Typography, Container } from '@mui/material';
import { departments } from '../Data.ts';
import DepartmentList from './DepartmentList.tsx';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pgSize, setPgSize] = useState<number>(10);
  const navigate = useNavigate();


  useEffect(() => {

    const userDetails = localStorage.getItem('userDetails');
    console.log(userDetails);
    if (!userDetails) {
      alert('Please enter your details before accessing this page.');
      navigate('/');
    }
    const handlePageSizeChange = (newPageSize: number) => {
      setPgSize(newPageSize);
    };
    
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  },[navigate]);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Data grid with Fetch API</Typography>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={posts}
          columns={columns}
          loading={loading}

          getRowId={(row) => row.id}
        />
      </div>
      <Typography variant="h4" gutterBottom>Department list</Typography>
      <DepartmentList departments={departments} />
    </Container>
  );
};

export default App;
