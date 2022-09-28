import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAll,
  showAddDialog,
  openEditDialog,
  scheduleSelectors,
  remove,
} from '../features/scheduleSlice';
import AddSchedule from './AddSchedule';
import AlertBoxError from './AlertBoxError';
import LoadingToast from './LoadingToast';

const ItemList = () => {
  const dispatch = useDispatch();
  const scheduleList = useSelector(scheduleSelectors.selectAll);
  const { isLoading, isError, errorMessage, isShowAddDialog } = useSelector(
    state => state.schedule,
  );

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const openAddDialog = () => {
    dispatch(showAddDialog({}));
  };

  let addDialog;
  if (isShowAddDialog) {
    addDialog = (
      <div className="Margin Flex JustifyContent-center">
        <AddSchedule />
      </div>
    );
  }

  let loadingToast;
  if (isLoading) {
    loadingToast = (
      <div
        className="Margin Flex JustifyContent-center"
        style={{ position: 'relative', zIndex: '9999' }}
      >
        <LoadingToast isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="MarginTop-medium">
      <AlertBoxError isError={isError} errorMessage={errorMessage} />
      <button
        className="Button Button--primary Button--elevated MarginBottom"
        onClick={openAddDialog}
      >
        Add Schedule
      </button>
      <table className="Table Table--compact">
        <thead className="Table-head">
          <tr>
            <th>No</th>
            <th>Band Name</th>
            <th>Practice Day</th>
            <th className="TextAlign-center">Action</th>
          </tr>
        </thead>
        <tbody className="Table-body">
          {scheduleList.length > 0 &&
            scheduleList.map((schedule, index) => (
              <tr key={schedule.id}>
                <td>{index + 1}</td>
                <td>{schedule.bandName}</td>
                <td>{schedule.practiceDay}</td>
                <td className="TextAlign-center">
                  <button
                    className="Button Button--text Button--warning Button--small"
                    onClick={() => dispatch(openEditDialog(schedule.id))}
                  >
                    Edit
                  </button>
                  |
                  <button
                    className="Button Button--text Button--danger Button--small"
                    onClick={() => dispatch(remove({ id: schedule.id }))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loadingToast}
      {addDialog}
    </div>
  );
};

export default ItemList;
