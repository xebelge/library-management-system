import React from 'react';
import UserList from '../components/list/user/UserList';
import { useParams } from 'react-router-dom';
import UserDetail from '../components/detail/user/UserDetail';

const UsersPage = () => {
  const { userId } = useParams();

  return (
    <div>
      {!userId ? (
          <UserList />
      ) : (
        <>
          <h1>User Detail</h1>
          <UserDetail />
        </>
      )}
    </div>
  );
};

export default UsersPage;
