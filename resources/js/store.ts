import { userModule } from './store/user';
import { categoriesModule } from './store/categories';
import { alertModule } from './store/alert';
import { createStore } from 'vuex'
import { mealsModule } from './store/meals';

const store = createStore({
    modules: {
        user: userModule,
        categories: categoriesModule,
        meals: mealsModule,
        alert: alertModule
    }
});

export default store;
