import React from 'react';
import {Link} from 'react-router-dom';

const ProjectItem = ({project}) => {
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
                {project.users.map((user) => user.username)}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
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
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList;