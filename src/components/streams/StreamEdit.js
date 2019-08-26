import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchStream, editStream} from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = (
  {stream, editStream, fetchStream, match: {params}}
  ) => {
    useEffect(() => {
        fetchStream(params.id);
    }, []);

    const onSubmit = formValues => {
        editStream(params.id, formValues)
    };
    if (!stream) return null;
    const {title, description} = stream;
    return (
      <div>
          <StreamForm onSubmit={onSubmit}
                      initialValues={{title, description}}
          />
      </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.stream[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);