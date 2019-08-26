import React from 'react';
import {Field, reduxForm} from "redux-form";

const StreamForm = props => {
    return (
      <form
        className="ui form"
        onSubmit={props.handleSubmit(props.onSubmit)}
      >
          <Field name="title" component={renderInput} label="Enter Title"/>
          <Field name="description" component={renderInput} label="Enter Description"/>
          <button className="ui button primary"> Submit</button>
      </form>
    )
};

const validate = (formValues) => {
    const error = {};
    if (!formValues.title) {
        error.title = 'Please enter a title'
    }
    if (!formValues.description) {
        error.description = 'Please enter a description'
    }

    return error;
};


const renderInput = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
      <div className="field">

          <label>{label}</label>
          <input {...input} autoComplete="off"/>
          <div> {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</div>
      </div>
    )
};

export default reduxForm({
    validate,
    form: 'streamForm'
})(StreamForm);
