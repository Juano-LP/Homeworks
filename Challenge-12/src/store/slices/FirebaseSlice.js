import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

// 🔹 Leer documentos de Firestore
export const fetchItems = createAsyncThunk("firebase/fetch", async () => {
  const snapshot = await getDocs(collection(db, "items"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

// 🔹 Agregar documento
export const addItem = createAsyncThunk("firebase/add", async (item) => {
  const docRef = await addDoc(collection(db, "items"), item);
  return { id: docRef.id, ...item };
});

// 🔹 Actualizar documento (Challenge 12)
export const updateItem = createAsyncThunk("firebase/update", async ({ id, data }) => {
  const ref = doc(db, "items", id);
  await updateDoc(ref, data);
  return { id, data };
});

// 🔹 Eliminar documento (Challenge 12)
export const deleteItem = createAsyncThunk("firebase/delete", async (id) => {
  const ref = doc(db, "items", id);
  await deleteDoc(ref);
  return id;
});

// Slice principal
const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const i = state.data.findIndex((d) => d.id === action.payload.id);
        if (i >= 0) state.data[i] = { ...state.data[i], ...action.payload.data };
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.data = state.data.filter((d) => d.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default firebaseSlice.reducer;
