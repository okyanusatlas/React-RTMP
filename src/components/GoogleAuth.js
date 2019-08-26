import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', async () => {
            await window.gapi.client.init({
                clientId: '621504601366-7jisp23mnsg2mbri8rjarn2fq9u39bl1.apps.googleusercontent.com',
                scope: 'email'
            });
            this.auth = window.gapi.auth2.getAuthInstance();
            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange);
        })
    }

    onAuthChange = (isSignedIn) => {
        isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut()
    };
    onSignInClick = () => {
        this.auth.signIn()
    };
    onSignOutClick = () => {
        this.auth.signOut()
    };

    renderAuthButton = () => {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon"/> Sign Out
            </button>
        } else {
            return <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon"/> Sign In
            </button>
        }
    };


    render() {
        return <div>
            {this.renderAuthButton()}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, {
    signIn, signOut
})(GoogleAuth);