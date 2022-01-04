import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useProjectsParams } from '../../utils/hooks';
import { getModellist } from './actions';
import ModelList from './ModelList';

export default function Models() {
  const dispatch = useDispatch();
  const { params } = useProjectsParams();

  useEffect(() => {
    dispatch(getModellist(params.projectId));
  }, [dispatch, params.projectId]);

  return (
    <div>
      <ModelList />
    </div>
  );
}
