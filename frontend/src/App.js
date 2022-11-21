import './App.css';
import React from 'react';
import UserList from './components/user.js';
import ProjectList from './components/project.js';
import TodoList from './components/todo.js';
import UserProjectList from './components/user_projects.js';
import ProjectTodoList from './components/project_todos.js';
import Menu from './components/menu.js';
import Footer from './components/footer.js';
import NotFound404 from './components/not_found_404.js';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        'users': [],
        'projects': [],
        'todos': []
        }
    }

    componentDidMount() {

        let users, projects, todos;

        axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
            users = response.data
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => {
            projects = response.data
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos')
        .then(response => {
            todos = response.data
            this.setState(
            {
            'users': users.results,
            'projects': projects.results,
            'todos': todos.results
            }
        )
        }).catch(error => console.log(error))
    }


    render () {
        return (
            <div class='wrapper'>
                <div>
                    <BrowserRouter>
                        <Menu links={[['Users', '/users'], ['Projects', '/projects'], ['TODOs', '/todos']]} />
                        <div class='main_block container'>
                                <Routes>
                                    <Route exact path={'/'} element={<Navigate to={'/users'} />} />
                                    <Route path={'/users'}>
                                        <Route index element={<UserList users={this.state.users} />} />
                                        <Route path={':id'} element={<UserProjectList projects={this.state.projects} />} />
                                    </Route>
                                    <Route path={'/projects'}>
                                        <Route index element={<ProjectList projects={this.state.projects} />} />
                                        <Route path={':id'} element={<ProjectTodoList todos={this.state.todos} />} />
                                    </Route>
                                    <Route exact path={'/todos'} element={<TodoList todos={this.state.todos} />} />
                                    <Route path={'*'} element={<NotFound404 />} />
                                </Routes>
                        </div>
                    </BrowserRouter>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default App;
