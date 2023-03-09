import { userModule } from './store/user';
import { categoriesModule } from './store/categories';
import { alertModule } from './store/alert';
import { createStore } from 'vuex'

const store = createStore({
    modules: {
        user: userModule,
        categories: categoriesModule,
        alert: alertModule
    }
});

export default store;
