import React, {useContext} from "react";
import _ from 'lodash';
import LanguageContext from "../../context/languageContext";

const UsersTable = ({users, selectedFlagValue, onSelectAll, onSelect, onAdmin}) => {
    let {language} = useContext(LanguageContext);
    const sortedUsers = _.orderBy(users, "id", "asc");

    return (
        <React.Fragment>
            <table className="table table-borderless my-table">
                <thead>
                <tr>
                    <th>
                        <input type="checkbox"
                               checked={selectedFlagValue}
                               onChange={e => onSelectAll(e.currentTarget.checked)}/>
                    </th>
                    <th>Id</th>
                    <th>{language.userTable.login}</th>
                    <th>{language.userTable.email}</th>
                    <th>{language.userTable.status}</th>
                    <th>{language.userTable.created}</th>
                    <th>{language.userTable.authorities}</th>
                    <th>{language.userTable.controlAdmin}</th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map(user => (
                    <tr key={user.id}>
                        <td>
                            {!user.login.includes('admin') &&
                            <input type="checkbox"
                                   checked={user.isSelected}
                                   onChange={() => onSelect(user)}/>
                            }
                        </td>
                        <td>{user.id}</td>
                        <td>{user.login}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td>{user.createdTs}</td>
                        <td>{user.authorities.join(', ')}</td>
                        <td>
                            {!user.authorities.includes('ADMIN') ? (
                                <i className="fa fa-plus clickable"
                                   aria-hidden="true"
                                   onClick={() => onAdmin(user)}
                                   title="Add admin"/>
                            ) : (!user.login.includes('admin') &&
                                <i className="fa fa-minus clickable"
                                   aria-hidden="true"
                                   onClick={() => onAdmin(user)}
                                   title="Delete admin"/>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default UsersTable;
