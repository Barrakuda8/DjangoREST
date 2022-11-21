import React from 'react';
import {useParams, Link} from 'react-router-dom';

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

const UserProjectList = ({projects}) => {
    let {id} = useParams();
    console.log(id);
    let filtered_projects = projects.filter((project) => project.users.includes(parseInt(id)));
    console.log(projects)
    console.log(filtered_projects)
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
            {filtered_projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default UserProjectList;