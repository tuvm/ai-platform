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
  const data = useSelector((state) => state.system.userList);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.system.userListLoading);

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

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <div className="project-page-inner">
      <UserList data={data} />
    </div>
  );
}
