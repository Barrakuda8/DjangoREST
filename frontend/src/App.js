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
import NotAuthorized from './components/not_authorized.js';
import LoginForm from './components/login_form.js';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Cookies from 'universal-cookie';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        'users': [],
        'projects': [],
        'todos': [],
        'token': ''
        }
    }

    load_data() {
        const headers = this.get_headers();

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
            const users = response.data.results;
            this.setState({'users': users});
        }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data.results;
            this.setState({'projects': projects});
        }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/todos/', {headers})
        .then(response => {
            const todos = response.data.results;
            this.setState({'todos': todos});
        }).catch(error => console.log(error));
    }

    set_token(token) {
        const cookies = new Cookies();
        cookies.set('token', token);
        this.setState({'token': token}, () => this.load_data());
    }

    is_authenticated() {
        return this.state.token != '';
    }

    logout() {
        this.set_token('');
        this.setState({'users': [], 'projects': [], 'todos': []});
    }

    get_token_from_storage() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        this.setState({'token': token}, () => this.load_data());
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {this.set_token(response.data['token'])})
        .catch(error => alert('Неверный логин или пароль'));
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token;
        }
        return headers;
    }

    check_authorized(el) {
        return this.is_authenticated() ? el : <NotAuthorized />
    }

    componentDidMount() {
        this.get_token_from_storage();
    }


    render () {

        const loginArr = this.is_authenticated() ? [<span onClick={()=>this.logout()}>Logout</span>, '#'] : ['Login', '/login'];

        return (
            <div class='wrapper'>
                <div>
                    <BrowserRouter>
                        <Menu links={[['Users', '/users'], ['Projects', '/projects'], ['TODOs', '/todos'], loginArr]} />
                        <div class='main_block container'>
                                <Routes>
                                    <Route exact path={'/'} element={<Navigate to={'/users'} />} />
                                    <Route path={'/users'}>
                                        <Route index element={this.check_authorized(<UserList users={this.state.users} />)} />
                                        <Route path={':id'} element={this.check_authorized(<UserProjectList projects={this.state.projects} />)} />
                                    </Route>
                                    <Route path={'/projects'}>
                                        <Route index element={this.check_authorized(<ProjectList projects={this.state.projects} />)} />
                                        <Route path={':id'} element={this.check_authorized(<ProjectTodoList todos={this.state.todos} />)} />
                                    </Route>
                                    <Route exact path={'/todos'} element={this.check_authorized(<TodoList todos={this.state.todos} />)} />
                                    <Route exact path={'/login'} element={<LoginForm
                                        get_token={(username, password) => this.get_token(username, password)} />} />
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
