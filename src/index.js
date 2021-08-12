import React from "react";
import ReactDOM from "react-dom";

import { Formik, Form, useField } from 'formik';

import "./styles.css";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </>
  );
};

const MyCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ type: 'checkbox', ...props});
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
          {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
    </div>
  );
}

const SignupForm = () => {

  const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.email) {
      errors.email = 'Required';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if(!values.acceptedTerms) {
      errors.acceptedTerms = 'You must accept the terms and conditions';
    }
    if (!values.jobType) {
      errors.jobType = 'Please select a job';
    } 
    return errors;
  };

  return (
    <Formik 
      initialValues={{
        firstName: '', 
        lastName: '', 
        email: '',
        acceptedTerms: false, // added for checkbox
        jobType: ''  // added for select
      }}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values));
          setSubmitting(false);
        }, 400);
      }}
    >
    <Form>
      <MyTextInput
        label="First Name"
        name="firstName"
        type="text"
        placeholder="Jane"
      />

      <MyTextInput
        label="Last Name"
        name="lastName"
        type="text"
        placeholder="Doe"
      />

      <MyTextInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="jane@formik.com"
      />

      <MySelect label="Job Type" name="jobType">
        <option value="">Select a job type</option>
        <option value="designer">Designer</option>
        <option value="development">Developer</option>
        <option value="product">Product Manager</option>
        <option value="other">Other</option>
      </MySelect>

      <MyCheckBox name="acceptedTerms">
        I accept the terms and conditions
      </MyCheckBox>
      <button type="submit">Submit</button>
    </Form>
    </Formik>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
