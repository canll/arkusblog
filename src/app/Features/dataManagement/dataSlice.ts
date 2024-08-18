import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store/store";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imgUrl: string | null;
}

interface DataState {
  data: BlogPost[];
  filteredData: BlogPost[];
  searchText: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const loadFromLocalStorage = (): BlogPost[] => {
  const data = localStorage.getItem("blogPosts");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

const saveToLocalStorage = (data: BlogPost[]) => {
  localStorage.setItem("blogPosts", JSON.stringify(data));
};

const initialState: DataState = {
  data: [],
  filteredData: [],
  searchText: "",
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const localData = loadFromLocalStorage();
  if (localData.length > 0) {
    return localData;
  } else {
    const response = await axios.get("/sampleData.json");
    saveToLocalStorage(response.data);
    return response.data;
  }
});

export const fetchItemById = createAsyncThunk(
  "data/fetchItemById",
  async (id: number, { getState }) => {
    const state = getState() as RootState;
    const item = state.data.data.find((item) => item.id === id);
    return item || null;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createItem: (state, action: PayloadAction<BlogPost>) => {
      state.data.push(action.payload);
      state.filteredData.push(action.payload);
      saveToLocalStorage(state.data);
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: number; newData: BlogPost }>
    ) => {
      const { id, newData } = action.payload;
      const existingItem = state.data.find((item) => item.id === id);
      if (existingItem) {
        Object.assign(existingItem, newData);
        saveToLocalStorage(state.data);
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data = state.data.filter((item) => item.id !== id);
      state.filteredData = state.filteredData.filter((item) => item.id !== id);
      saveToLocalStorage(state.data);
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.filteredData = state.data.filter((item) =>
        item.title.toLowerCase().includes(state.searchText.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.filteredData = action.payload;
        saveToLocalStorage(state.data);
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch data";
      })
      .addCase(fetchItemById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          const item = action.payload;
          const existingItem = state.data.find((i) => i.id === item.id);
          if (!existingItem) {
            state.data.push(item);
            saveToLocalStorage(state.data);
          }
        }
      })
      .addCase(fetchItemById.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch item by id";
      });
  },
});

export const { createItem, updateItem, deleteItem, setSearchText } =
  dataSlice.actions;

export const selectAllData = (state: RootState) => state.data.data;
export const selectSearchText = (state: RootState) => state.data.searchText;
export default dataSlice.reducer;
