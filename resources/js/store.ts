import { userModule } from './store/user';
import { categoriesModule } from './store/categories';

import { createStore } from 'vuex'

const store = createStore({
    modules: {
        user: userModule,
        categories: categoriesModule
    }
});

export default store;
