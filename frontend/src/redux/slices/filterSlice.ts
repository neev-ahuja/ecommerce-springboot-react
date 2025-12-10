import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    category: string | null;
    minPrice: number;
    maxPrice: number;
    brands: string[];
    sortBy: 'price-asc' | 'price-desc' | null;
    searchQuery: string;
}

const initialState: FilterState = {
    category: null,
    minPrice: 0,
    maxPrice: 2000,
    brands: [],
    sortBy: null,
    searchQuery: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.category = action.payload;
        },
        setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
            state.minPrice = action.payload.min;
            state.maxPrice = action.payload.max;
        },
        toggleBrand: (state, action: PayloadAction<string>) => {
            const brand = action.payload;
            if (state.brands.includes(brand)) {
                state.brands = state.brands.filter((b) => b !== brand);
            } else {
                state.brands.push(brand);
            }
        },
        setSortBy: (state, action: PayloadAction<'price-asc' | 'price-desc' | null>) => {
            state.sortBy = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        resetFilters: (state) => {
            state.category = null;
            state.minPrice = 0;
            state.maxPrice = 2000;
            state.brands = [];
            state.sortBy = null;
            state.searchQuery = '';
        },
    },
});

export const { setCategory, setPriceRange, toggleBrand, setSortBy, setSearchQuery, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
