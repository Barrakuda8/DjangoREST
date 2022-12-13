import React from 'react';
import {Link} from 'react-router-dom';

const ProjectItem = ({project, delete_project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users.toString()}
            </td>
            <td>
                <Link to={`/projects/edit/${project.id}`}>Edit</Link>
            </td>
            <td>
                <a href="#" onClick={() => delete_project(project.id)}>Delete</a>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, delete_project}) => {
    return (
        <div class="table_wrapper">
            <table>
                <th>
                    Id
                </th>
                <th>
                    Name
                </th>
                <th>
                    Link
                </th>
                <th>
                    Users
                </th>
                <th>
                    Edit
                </th>
                <th>
                    Delete
                </th>
                {projects.map((project) => <ProjectItem project={project} delete_project={delete_project} />)}
            </table>
            <Link to={'/projects/create'}>Create project</Link>
        </div>
    )
}

export default ProjectList;