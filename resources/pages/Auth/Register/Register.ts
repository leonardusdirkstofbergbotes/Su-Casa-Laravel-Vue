import axios from 'axios';
import { ref } from 'vue';
export default {
    name: "Register",

    setup() {
        const name = ref<string>();
        const email = ref<string>();
        const password = ref<string>();

        const errors = ref<any[]>([]);

        const validateForm = (): boolean => {
            let formattedErrors = [];

            if (name.value == undefined || name.value == '') formattedErrors['name'] = 'Please enter a name';
            if (email.value == undefined || email.value == '') formattedErrors['email'] = 'Please enter a email address';
            if (password.value == undefined || password.value == '') formattedErrors['password'] = 'Please enter a password';

            console.log(formattedErrors.length, formattedErrors);
            errors.value = formattedErrors;
            return formattedErrors.length == 0;

        };

        const register = () => {
            if (validateForm()) {
                const data = {
                    name: name.value,
                    email: email.value,
                    password: password.value
                };

                axios.post('api/auth/register', data)
                    .then(response => {
                        errors.value = [];
                        console.log(response);
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
            name,
            email,
            password,
            errors,
            register
        }
    }
}
