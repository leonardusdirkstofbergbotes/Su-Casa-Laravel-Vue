import { categoriesModule } from './store/categories';
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    modules: {
        categories: categoriesModule
    }
});

export default store;
