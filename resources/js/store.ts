import { createStore } from 'vuex'
import UserDetails from './models/UserDetails';

// Create a new store instance.
const store = createStore({
  state () {
    return {
      userDetails: {}
    }
  },
  mutations: {
    setUserDetails (state, userDetails: UserDetails) {
        console.log(userDetails);
        state.userDetails = userDetails;
    }
  },
  getters: {
    getUserDetails (state) {
        return state.userDetails;
    }
  }
});

export default store;
