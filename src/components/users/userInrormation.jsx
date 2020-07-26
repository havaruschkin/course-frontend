import React, {useContext} from "react";
import InlineEdit from 'react-edit-inplace';
import LanguageContext from "../../context/languageContext";

const UserInformation = ({user, onInPlace}) => {
    let {language} = useContext(LanguageContext);
    if (user.email === undefined) return null;

    return (
        <div>
            <h2 className="text-center mb-4">{language.userInformation.title}</h2>
            <span>{language.userInformation.login}: </span>{user.login}<br/>
            <span>{language.userInformation.email}: </span>
            <InlineEdit
                text={user.email}
                paramName="email"
                change={(data) => onInPlace(data)}
                style={{
                    backgroundColor: '#D1D1D1',
                    minWidth: 150,
                    display: 'inline-block',
                    margin: 0,
                    padding: 0,
                    fontSize: 15,
                    outline: 0,
                    border: 0
                }}/><br/>
            <span>{language.userInformation.created}: </span>{user.createdTs}<br/>
            <span>{language.userInformation.status}: </span>{user.status}<br/>
        </div>
    );
};

export default UserInformation;