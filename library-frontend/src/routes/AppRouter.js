import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UsersPage from '../pages/UsersPage';
import BooksPage from '../pages/books/BooksPage';
import UserDetail from '../components/detail/user/UserDetail';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/books/user/:userId" element={<BooksPage />} />
      <Route path="/books" element={<BooksPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
