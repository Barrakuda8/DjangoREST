import React from 'react';

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)} class="login_form">
                <input type="text" name="login" placeholder="Login"
                        value={this.state.login} onChange={(event)=>this.handleChange(event)} class="login_input" />
                <input type="password" name="password" placeholder="Password"
                        value={this.state.password} onChange={(event)=>this.handleChange(event)} class="login_input" />
                <input type="submit" value="Login" class="login_submit" />
            </form>
        );
    }
}
export default LoginForm
