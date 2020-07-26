import React, {Component} from "react";
import {deleteUsers, getUsers, lockUsers, unlockUsers, updateUser} from "../../services/userApiService";
import UsersTable from "./usersTable";
import ActionBar from "../common/actionBar";

class Users extends Component {
    state = {
        users: [],
        selectedFlagValue: false
    };

    async componentDidMount() {
        await this.init()
    }

    async init() {
        const {data: users} = await getUsers();
        users.forEach(user => user.isSelected = false);
        this.setState({users, selectedFlagValue: false});
    }

    handleSelectAll = (state) => {
        const users = [...this.state.users];
        users.forEach(user => user.isSelected = state);
        this.setState({users, selectedFlagValue: state});
    };

    handleSelect = user => {
        const users = [...this.state.users];
        const index = users.indexOf(user);
        users[index] = {...users[index]};
        users[index].isSelected = !users[index].isSelected;
        this.setState({users});
    };

    handleLock = async () => {
        const ids = this.state.users
            .filter(user => user.isSelected)
            .map(user => user.id);
        await lockUsers(ids);
        await this.init()
    };

    handleUnlock = async () => {
        const ids = this.state.users
            .filter(user => user.isSelected)
            .map(user => user.id);
        await unlockUsers(ids);
        await this.init()
    };

    handleDelete = async () => {
        const ids = this.state.users
            .filter(user => user.isSelected)
            .map(user => user.id);
        await deleteUsers(ids);
        await this.init()
    };

    handleAddAdmin = async user => {
        !user.authorities.includes('ADMIN') ?
            user.authorities = [...user.authorities, "ADMIN"] :
            user.authorities = [...user.authorities.splice(1, 1)];
        await updateUser(user);
        await this.init()
    };

    render() {
        const {users, selectedFlagValue} = this.state;
        if (users.length === 0) return null;

        return (
            <div className="row">
                <div className="col">
                    <ActionBar
                        users={users}
                        onLock={this.handleLock}
                        onUnlock={this.handleUnlock}
                        onDelete={this.handleDelete}
                    />
                    <div className="table-responsive">
                        <UsersTable
                            users={users}
                            selectedFlagValue={selectedFlagValue}
                            onSelect={this.handleSelect}
                            onSelectAll={this.handleSelectAll}
                            onAdmin={this.handleAddAdmin}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;
