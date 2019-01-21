import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import UserInterface from './../../interfaces';
import getFieldValue from './../../Helpers/getFieldValue';

@Component({
    selector: 'users-table',
    templateUrl: './usersTable.html',
    styleUrls: ['./usersTable.css']
})

export default class UsersTableComponent implements OnInit {

    @Input() users: Array<UserInterface> = [];
    @Input() filters: Array<{ name: string, value: string }> = [];
    @Output() sort: EventEmitter<any> = new EventEmitter();

    tableHead = [
        { title: 'Name', name: 'name' },
        { title: 'Age', name: 'age' },
        { title: 'Gender', name: 'gender' },
        { title: 'Department', name: 'department' },
        { title: 'Address', name: 'address.city' },
    ];

    tableSortParam = '';
    tableDirection = '';

    ngOnInit() { }

    sortBy(name) {
        const direction = this.tableDirection === 'asc' ? 'desc' : 'asc';
        this.tableDirection = direction;
        this.tableSortParam = name;
        this.sort.emit({ name, direction });
    }

    isItemVisible(user: UserInterface, filters: Array<{ name: string, value: string }> = []) {
        if (!filters.length) {
            return true;
        }

        const filtersFitToUser = filters.filter(item => {
            const userFieldValue = getFieldValue({ fieldName: item.name, user });
            return userFieldValue === item.value;
        });

        return filtersFitToUser.length === filters.length;
    }
}
