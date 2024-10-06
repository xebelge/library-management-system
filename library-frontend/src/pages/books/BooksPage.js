import React, { memo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import './BooksPage.scss';  
import { fetchBooks, borrowBook, returnBook } from '../../api/booksApi';
import { handleError } from '../../helpers/errorHandler';

const BookRow = memo(({ book, userId, handleAction }) => (
  <TableRow key={book.id}>
    <TableCell>{book.id}</TableCell>
    <TableCell>{book.name}</TableCell>
    <TableCell>{book.borrowedBy ? new Date(book.createdAt).toLocaleString() : 'Not Borrowed'}</TableCell>
    <TableCell>{book.borrowedBy ? book.borrowedBy.name : 'Not Borrowed'}</TableCell>
    <TableCell>{book.score}</TableCell>
    {userId && (
      <TableCell>
        <Button
          variant={book.borrowedBy ? "outlined" : "contained"}
          color={book.borrowedBy ? "secondary" : "primary"}
          onClick={() => handleAction(book)}
          disabled={book.borrowedBy ? returnBook.isLoading : borrowBook.isLoading}
        >
          {book.borrowedBy ? (returnBook.isLoading ? 'Returning...' : 'Return Book') : (borrowBook.isLoading ? 'Borrowing...' : 'Borrow Book')}
        </Button>
      </TableCell>
    )}
  </TableRow>
));

const BooksPage = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: booksData = [], isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const borrowMutation = useMutation({
    mutationFn: borrowBook,
    onSuccess: () => queryClient.invalidateQueries(['books']),
  });

  const returnMutation = useMutation({
    mutationFn: returnBook,
    onSuccess: () => queryClient.invalidateQueries(['books']),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {handleError(error)}</p>; 

  const handleAction = (book) => {
    const action = book.borrowedBy ? returnMutation.mutate : borrowMutation.mutate;
    action({ userId, bookId: book.id });
  };

  return (
    <div className="container">
      <Typography variant="h4" component="h2" className="title" align="center">
        Books List
      </Typography>
      <div className="table-container">
        {booksData.length === 0 ? (
          <p>No books in the list.</p>
        ) : (
          <TableContainer component={Paper} className="custom-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book ID</TableCell>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Borrowed Date</TableCell>
                  <TableCell>Borrowed By</TableCell>
                  <TableCell>Score</TableCell>
                  {userId && <TableCell>Action</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {booksData.map((book) => (
                  <BookRow key={book.id} book={book} userId={userId} handleAction={handleAction} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div className="view-button-container">
        <Button 
          variant="outlined" 
          onClick={() => navigate(userId ? `/users/${userId}` : '/users')}
        >
          Return Back
        </Button>
      </div>
    </div>
  );
};

export default BooksPage;
