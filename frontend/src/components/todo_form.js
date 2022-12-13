import React from 'react';

class TodoForm extends React.Component {

    constructor(props) {
        super(props)
        const params = window.location.href.split('/');
        if (params[4] == 'edit') {
            let todo = props.todos.filter((todo) => todo.id == parseInt(params[5]))[0];
            this.state = {'project': todo.project.id, 'text': todo.text, 'user': todo.user.id, 'status': todo.status, 'id': todo.id, 'action': 'Edit'}
        } else {
            this.state = {'project': this.props.projects[0].id, 'text': '', 'user': this.props.users[0].id, 'status': true, 'action': 'Create'}
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleStatusChange(event) {
        this.setState({'status': event.target.value ? true : false});
    }

    handleSubmit(event) {
        if (this.state.action == 'Create') {
            this.props.create_todo(this.state.project, this.state.text, this.state.user, this.state.status);
        } else if (this.state.action == 'Edit') {
            this.props.edit_todo(this.state.id, this.state.project, this.state.text, this.state.user, this.state.status);
        }
        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={(event)=> this.handleSubmit(event)} class="form">
                <select name="project" onChange={(event)=>this.handleChange(event)} class="form_select">
                    {this.props.projects.map((project) => this.state.project.id == project.id ? <option value={project.id} selected>{project.name}</option> : <option value={project.id}>{project.name}</option>)}
                </select>
                <textarea name="text" placeholder="text" value={this.state.text}
                        onChange={(event)=>this.handleChange(event)} class="form_input" />
                <select name="user" onChange={(event)=>this.handleChange(event)} class="form_select">
                    {this.props.users.map((user) => this.state.user.id == user.id ? <option value={user.id} selected>{user.username}</option> : <option value={user.id}>{user.username}</option>)}
                </select>
                <select name="status" onChange={(event)=>this.handleStatusChange(event)} class="form_select">
                    {this.state.status ? <option value="1" selected>Opened</option> : <option value="1">Opened</option>}
                    {this.state.status ? <option value="0">Closed</option> : <option value="0" selected>Closed</option>}
                </select>
                <input type="submit" value={this.state.action} class="form_submit" />
            </form>
        );
    }
}

export default TodoForm
