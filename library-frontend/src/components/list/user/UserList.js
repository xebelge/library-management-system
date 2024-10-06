import React, { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import './UserList.scss';  
import { fetchUsers } from '../../../api/usersApi';
import { handleError } from '../../../helpers/errorHandler';

const UserRow = memo(({ id, name }) => (
  <TableRow key={id}>
    <TableCell>
      <Link to={`/users/${id}`} className="link">{id}</Link>
    </TableCell>
    <TableCell>
      <Link to={`/users/${id}`} className="link">{name}</Link>
    </TableCell>
  </TableRow>
));

const UserList = () => {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {handleError(error)}</p>; 

  return (
    <div className="container">  {/* Use the SCSS class */}
      <Typography variant="h4" className="title">User List</Typography>
      <div className="button-container">
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/books" 
          className="view-all-button"
        >
          View All Books
        </Button>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, name }) => (
              <UserRow key={id} id={id} name={name} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
