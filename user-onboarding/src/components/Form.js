import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    console.log(touched);
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div className="form">
            <h1 className="form-title">User Onboarding Form</h1>
            <hr></hr>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (<p className="required">{errors.name}</p>)}

                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && <p className="required">{errors.email}</p>}

                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && <p className="required">{errors.password}</p>}

                <label className="checkbox-container">
                    Terms of Service
                    <Field
                    type="checkbox"
                    name="terms"
                    checked={values.terms}
                    />
                    <span className="checkmark" />
                </label>
                <button>Submit!</button>
            </Form>
            {users.map(user => (
                <ul key = {user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const UserFormikForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),
    handleSubmit(values, { setStatus }) {
        axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
            setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
    
})(UserForm); 

export default UserFormikForm;