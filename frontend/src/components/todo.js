import React from 'react';
import {Link} from 'react-router-dom';

const TodoItem = ({todo, delete_todo}) => {
    let status;
    if (todo.status) {
        status = <td class='status_green'>Opened</td>;
    } else {
        status = <td class='status_red'>Closed</td>;
    }
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.project.name}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
            <td>
                {todo.user.username}
            </td>
            {status}
            <td>
                <Link to={`/todos/edit/${todo.id}`}>Edit</Link>
            </td>
            <td>
                <a href="#" onClick={() => delete_todo(todo.id)}>Delete</a>
            </td>
        </tr>
    )
}

const TodoList = ({todos, delete_todo}) => {
    return (
        <div class="table_wrapper">
            <table>
                <th>
                    Id
                </th>
                <th>
                    Project
                </th>
                <th>
                    Text
                </th>
                <th>
                    Created at
                </th>
                <th>
                    Updated at
                </th>
                <th>
                    Creator
                </th>
                <th>
                    Status
                </th>
                <th>
                    Edit
                </th>
                <th>
                    Delete
                </th>
                {todos.map((todo) => <TodoItem todo={todo} delete_todo={delete_todo} />)}
            </table>
            <Link to={'/todos/create'}>Create todo</Link>
        </div>
    )
}

export default TodoList;