import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import {Link} from 'react-router-dom';

const StreamList = ({fetchStreamProps, streams, currentUserId, isSignedIn}) => {

    useEffect(() => {
        fetchStreamProps();
    }, []);

    const renderOwner = stream => {
        if (stream.userId === currentUserId) {
            return (
              <div className="right floated content">
                  <Link className="ui button primary" to={`/streams/edit/${stream.id}`}> Edit</Link>
                  <Link
                    className="ui button negative"
                    to={`streams/delete/${stream.id}`}
                  > Delete</Link>
              </div>
            )
        }
    };

    const renderCreate = () => {
      if(isSignedIn) {
        return (
          <div style={{textAlign: 'right'}}>
              <Link to="/streams/new" className="ui button primary"> Create Stream</Link>
          </div>
        )
      }
    };


    const renderList = () => streams.map(stream => {
        return (
          <div className="item" key={stream.id}>
              {renderOwner(stream)}
              <i className="large middle aligned icon camera"/>
              <div className="content">
                  <Link to={`/streams/${stream.id}`} className="header"> {stream.title} </Link>

                  <div className="description"> {stream.description}</div>
              </div>

          </div>
        )
    });

    return (
      <div>
          <h2> Streams</h2>
          <div className="ui celled list"> {renderList()}</div>
          {renderCreate()}
      </div>
    )
};


const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.stream),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, {fetchStreamProps: fetchStreams})(StreamList);