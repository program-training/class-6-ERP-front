import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AdminProductInterface } from '../components/Products';

const products: AdminProductInterface[] = [];

const initialState: { products: AdminProductInterface[] } = {
  products: products,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AdminProductInterface>) => {
        state.products.push(action.payload)
    }
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;