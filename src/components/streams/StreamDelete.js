import React, {useEffect} from 'react';
import Modal from '../Modal';
import history from '../../history'
import {connect} from 'react-redux';
import {fetchStream, deleteStream} from "../../actions";
import {Link} from 'react-router-dom';

const StreamDelete = (
  {stream, deleteStreamProps, fetchStreamProps, match: {params}}
) => {

    useEffect(() => {
        fetchStreamProps(params.id);
    }, []);

    const renderContent = () => {
        if (!stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete the stream with title: ${stream.title}`
    };

    const header = <p> Delete Stream</p>;
    const actions = (
      <>
          <Link className="ui button" to="/"> Cancel</Link>
          <button className="ui button primary" onClick={() => deleteStreamProps(params.id)}> Delete</button>
      </>
    );
    return (
          <Modal
            content={renderContent()}
            header={header}
            actions={actions}
            onDismiss={() => history.push('/')}
          />
    )
};

const mapStateToProps = (state, ownProps) => {
    return {stream: state.stream[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchStreamProps: fetchStream, deleteStreamProps:deleteStream})(StreamDelete);