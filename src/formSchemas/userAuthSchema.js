import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    name: Yup.string().trim().min(2).max(25).required("Please enter your Name"),
    email: Yup.string().trim().email().required("Please enter your email"),
    password: Yup.string().trim().min(4).required("Please enter your password"),
    confirmPassword: Yup.string().trim()
        .required()
        .oneOf([Yup.ref("password"), null], "Password must match"),
});


export const loginSchema = Yup.object({
    email: Yup.string().trim().email().required("Please enter your email"),
    password: Yup.string().trim().min(4).required("Please enter your password"),
});