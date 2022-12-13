import React from 'react';

class ProjectForm extends React.Component {

    constructor(props) {
        super(props)
        const params = window.location.href.split('/');
        if (params[4] == 'edit') {
            let project = props.projects.filter((project) => project.id == parseInt(params[5]))[0];
            this.state = {'name': project.name, 'link': project.link, 'users': project.users, 'id': project.id, 'action': 'Edit'}
        } else {
            this.state = {'name': '', 'link': '', 'users': [], 'action': 'Create'}
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleUsersChange(event) {
        let users = [];
        let options = event.target.selectedOptions;
        for(let i=0; i < options.length; i++) {
            users.push(options[i].value);
        }
        this.setState({'users': users});
    }

    handleSubmit(event) {
        if (this.state.action == 'Create') {
            this.props.create_project(this.state.name, this.state.link, this.state.users);
        } else if (this.state.action == 'Edit') {
            this.props.edit_project(this.state.id, this.state.name, this.state.link, this.state.users);
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)} class="form">
                <input type="text" name="name" placeholder="name" value={this.state.name}
                        onChange={(event)=>this.handleChange(event)} class="form_input" />
                <input type="text" name="link" placeholder="link" value={this.state.link}
                        onChange={(event)=>this.handleChange(event)} class="form_input" />
                <select onChange={(event)=>this.handleUsersChange(event)} multiple class="form_select">
                    {this.props.users.map((user) => this.state.users.includes(user.id) ? <option value={user.id} selected>{user.username}</option> : <option value={user.id}>{user.username}</option>)}
                </select>
                <input type="submit" value={this.state.action} class="form_submit" />
            </form>
        );
    }
}

export default ProjectForm
