import React from 'react';
import {useParams} from 'react-router-dom';

const TodoItem = ({todo}) => {
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
        </tr>
    )
}

const ProjectTodoList = ({todos}) => {
    let {id} = useParams();
    console.log(id);
    let filtered_todos = todos.filter((todo) => todo.project.id == id);
    console.log(todos)
    console.log(filtered_todos)
    return (
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
            {filtered_todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default ProjectTodoList;