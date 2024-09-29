import { createStore, combineReducers } from 'redux';

const initialCategoryState = {
    categories: [],
    selectedCategory: null,
};

const initialProductState = {
    products: [],
    total: 0,
};

const categoryReducer = (state = initialCategoryState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'SELECT_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        default:
            return state;
    }
};

const productReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: [...state.products, ...action.payload], total: action.total };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    categories: categoryReducer,
    products: productReducer,
});

const store = createStore(rootReducer);

export default store;
