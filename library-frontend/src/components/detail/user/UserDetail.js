import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
} from '@mui/material';
import { fetchUserDetails } from '../../../api/usersApi';
import { returnBook } from '../../../api/booksApi';
import { handleError } from '../../../helpers/errorHandler'; 
import { formatDate } from '../../../helpers/dateHelper';
import './UserDetail.scss'; 

const UserDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserDetails(id),
  });

  const mutation = useMutation({
    mutationFn: returnBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['user', id]);
    },
  });

  const handleReturnBook = (bookId) => {
    mutation.mutate({ userId: userQuery.data.id, bookId });
  };

  if (userQuery.isLoading) return <p>Loading...</p>;
  if (userQuery.error) return <p>An error occurred: {handleError(userQuery.error)}</p>; 

  const user = userQuery.data;

  const renderBooksTable = (books, isCurrent) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Book ID</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>{isCurrent ? 'Borrowed Date' : 'Return Date'}</TableCell>
            <TableCell>{isCurrent ? 'Action' : 'Score'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.length > 0 ? (
            books.map((item) => (
              <TableRow key={isCurrent ? item.id : item.book.id}>
                <TableCell>{isCurrent ? item.id : item.book.id}</TableCell>
                <TableCell>{isCurrent ? item.name : item.book.name}</TableCell>
                <TableCell>
                  {isCurrent 
                    ? formatDate(item.createdAt) 
                    : formatDate(item.returnedAt)}
                </TableCell>
                <TableCell>
                  {isCurrent ? (
                    <Button onClick={() => handleReturnBook(item.id)} disabled={mutation.isLoading}>
                      {mutation.isLoading ? 'Returning...' : 'Return Book'}
                    </Button>
                  ) : (
                    item.book.score
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No books borrowed.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div className="container">  
      <h2>User: ID is {user.id}, Name is {user.name}</h2>
      <h3 className="section-title">Current Borrowed Books</h3>
      {renderBooksTable(user.currentBooks, true)}

      <h3 className="section-title">Previous Borrowed Books</h3>
      {renderBooksTable(user.previousBorrowedBooks, false)}

      <div className="view-button-container">
        <Button variant="outlined" component={Link} to={`/books/user/${id}`} className="view-button">
          View Book List
        </Button>
      </div>
      <div className="button-spacing">
        <Button variant="outlined" component={Link} to="/users" className="spacing">
          Return Back
        </Button>
      </div>
    </div>
  );
};

export default UserDetail;
