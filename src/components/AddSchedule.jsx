import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create, scheduleSelectors, update } from '../features/scheduleSlice';
import { closeAddDialog } from '../features/scheduleSlice';

const AddSchedule = () => {
  const [bandName, setBandName] = useState('');
  const [practiceDay, setPracticeDay] = useState('Sunday');
  const [id, setId] = useState(0);
  const dispatch = useDispatch();
  const { selectedIdEntity } = useSelector(state => state.schedule);

  const entity = useSelector(state =>
    scheduleSelectors.selectById(state, selectedIdEntity),
  );

  useEffect(() => {
    if (entity) {
      setBandName(entity.bandName);
      setPracticeDay(entity.practiceDay);
      setId(selectedIdEntity);
    }
  }, [dispatch]);

  const closeDialog = () => {
    dispatch(closeAddDialog({}));
  };

  const submit = e => {
    e.preventDefault();
    if (!entity) {
      dispatch(create({ bandName, practiceDay }));
      return;
    }

    if (entity) {
      dispatch(update({ selectedIdEntity, bandName, practiceDay }));
    }
  };
  return (
    <div className="Dialog">
      <form onSubmit={submit}>
        <div className="Dialog-box Margin-auto">
          <div className="Dialog-header">
            <h5 className="Dialog-title">Add Schedule</h5>
          </div>
          <div className="Dialog-content">
            <div className="Margin">
              <label>Band Name</label>
              <input
                type="text"
                className="Input MarginBottom"
                placeholder="Your band name"
                value={bandName}
                onChange={e => setBandName(e.target.value)}
              />
              <label>Practice Day</label>
              <div className="Select">
                <select
                  value={practiceDay}
                  onChange={e => setPracticeDay(e.target.value)}
                >
                  <option>Sunday</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </select>
              </div>
            </div>
          </div>
          <button className="Button Button--primary">Submit</button>
          <button
            onClick={closeDialog}
            className="Button Button--primary Button--outlined"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchedule;
