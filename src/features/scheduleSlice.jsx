import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAll = createAsyncThunk('schedule/fetchAll', async () => {
  const response = await axios.get('http://localhost:5000/scheduleList');
  return response.data;
});

export const create = createAsyncThunk(
  'schedule/create',
  async ({ bandName, practiceDay }) => {
    const response = await axios.post('http://localhost:5000/scheduleList', {
      bandName,
      practiceDay,
    });
    return response.data;
  },
);

export const update = createAsyncThunk(
  'schedule/update',
  async ({ selectedIdEntity, bandName, practiceDay }) => {
    const response = await axios.patch(
      `http://localhost:5000/scheduleList/${selectedIdEntity}`,
      {
        bandName,
        practiceDay,
      },
    );
    return response.data;
  },
);

export const remove = createAsyncThunk('schedule/remove', async ({ id }) => {
  await axios.delete(`http://localhost:5000/scheduleList/${id}`);
  return id;
});

const scheduleEntity = createEntityAdapter({
  selectId: schedule => schedule.id,
});

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: scheduleEntity.getInitialState({
    isLoading: false,
    isError: false,
    errorMessage: '',
    isShowAddDialog: false,
  }),
  extraReducers: builder => {
    builder.addCase(fetchAll.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      scheduleEntity.setAll(state, action.payload);
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchAll.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    builder.addCase(create.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      scheduleEntity.addOne(state, action.payload);
      state.isLoading = false;
      state.isError = false;
      state.isShowAddDialog = false;
    });
    builder.addCase(create.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    builder.addCase(update.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      scheduleEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
      scheduleEntity.upsertOne(state, action.payload);
      state.isLoading = false;
      state.isError = false;
      state.isShowAddDialog = false;
    });
    builder.addCase(update.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    builder.addCase(remove.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(remove.fulfilled, (state, action) => {
      scheduleEntity.removeOne(state, action.payload);
      state.isLoading = false;
      state.isError = false;
      state.isShowAddDialog = false;
    });
    builder.addCase(remove.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    showAddDialog: state => {
      state.isShowAddDialog = true;
    },
    closeAddDialog: state => {
      state.isShowAddDialog = false;
      state.selectedIdEntity = 0;
    },
    openEditDialog: (state, action) => {
      state.isShowAddDialog = true;
      state.selectedIdEntity = action.payload;
    },
    loadOneSchedule: state => {
      state.entity = state.entities.find(
        entity => entity.id === state.selectedIdEntity,
      );
    },
  },
});

export const scheduleSelectors = scheduleEntity.getSelectors(
  state => state.schedule,
);
export const {
  showAddDialog,
  closeAddDialog,
  openEditDialog,
  loadOneSchedule,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
