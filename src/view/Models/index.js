import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getModellist } from './actions';
import ModelList from './ModelList';

export default function Models() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModellist());
  }, [dispatch]);

  return (
    <div>
      <ModelList />
    </div>
  );
}
