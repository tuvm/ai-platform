import React, { useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionGetUserList,
  fetchUserList,
  fetchUserListError,
  fetchUserListSuccess,
} from './actions';
import UserList from './UserList';
import './User.scss';

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserList());
    actionGetUserList()
      .then((res) => {
        console.log(res);
        dispatch(fetchUserListSuccess(res));
      })
      .catch((err) => {
        dispatch(fetchUserListError());
      });
  }, [dispatch]);

  return (
    <div className="project-page-inner">
      <UserList />
    </div>
  );
}
