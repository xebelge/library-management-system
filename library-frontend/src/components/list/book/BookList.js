import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Typography } from '@mui/material';
import { fetchBooks } from '../../../api/booksApi';
import Button from '@mui/material/Button';
import { handleError } from '../../../helpers/errorHandler';

const Loading = () => <p>Loading...</p>;
const ErrorMessage = ({ error }) => <p>An error occurred: {handleError(error)}</p>;

const BookList = () => {
  const { data: booksData = [], isLoading, error } = useQuery(['books'], fetchBooks);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <Typography variant="h4">Book List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book ID</TableCell>
              <TableCell>Book Name</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booksData.map(({ id, name }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                  <Link to={`/books/${id}`}>
                    <Button variant="outlined">View Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookList;
