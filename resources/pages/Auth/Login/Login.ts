import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "Login",

  setup() {

    const router = useRouter();
    const email = ref<string>();
    const password = ref<string>();

    const errors = ref<any[]>([]);

    const validateForm = (): boolean => {
        let formattedErrors = [];
        let isFormValid = true;

        if (email.value == undefined || email.value == '') {
            formattedErrors['email'] = 'Please enter a email address';
            isFormValid = false;
        }
        if (password.value == undefined || password.value == '') {
            formattedErrors['password'] = 'Please enter a password';
            isFormValid = false;
        }

        errors.value = formattedErrors;
        return isFormValid;
    };

    const login = () => {
        console.log('login');
        if (validateForm()) {
            const data = {
                email: email.value,
                password: password.value
            };

            axios.post('api/auth/login', data)
                .then(() => {
                    errors.value = [];
                    router.push('/browse');
                })
                .catch(error => {
                    if (error.response?.data?.message == "validation error") {
                        let formattedErrors = [];

                        for (const key in error.response.data.errors) {
                            formattedErrors[key] = error.response.data.errors[key][0];
                        }

                       errors.value = formattedErrors;
                    }
            });
        }
    };

    return {
        email,
        password,
        errors,
        login
    }
  }
}
