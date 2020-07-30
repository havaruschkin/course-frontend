import React, {useContext} from "react";
import InlineEdit from 'react-edit-inplace';
import LanguageContext from "../../context/languageContext";

const UserInformation = ({user, onInPlace}) => {
    let {language} = useContext(LanguageContext);
    if (user.email === undefined) return null;

    return (
        <div>
            <h2 className="text-center mb-4">{language.userInformation.title}</h2>
            <table className="table table-borderless">
                <tbody>
                <tr>
                    <td>{language.userInformation.login}:</td>
                    <td>{user.login}</td>
                </tr>
                <tr>
                    <td>{language.userInformation.email}:</td>
                    <td>
                        <InlineEdit
                            text={user.email}
                            paramName="email"
                            change={(data) => onInPlace(data)}
                            style={{
                                minWidth: 100,
                                display: 'inline-block',
                                margin: 0,
                                padding: 0,
                                fontSize: 15,
                                outline: 0,
                                border: 0
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>{language.userInformation.created}:</td>
                    <td>{user.createdTs}</td>
                </tr>
                <tr>
                    <td>{language.userInformation.status}:</td>
                    <td>{user.status}</td>
                </tr>
                </tbody>
            </table>
        </div>

    );
};

export default UserInformation;