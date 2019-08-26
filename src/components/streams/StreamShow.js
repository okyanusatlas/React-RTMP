import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchStream} from "../../actions";

const StreamShow = (
  {match: {params}, stream, fetchStream}
) => {

    useEffect(() => {
        fetchStream(params.id);
    }, []);

    if (!stream) {
        return <div> Loading...</div>
    }
    const {title, description} = stream;
    return (
      <div>
          <h1>{title}</h1>
          <h5>{description}</h5>
      </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.stream[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchStream})(StreamShow);