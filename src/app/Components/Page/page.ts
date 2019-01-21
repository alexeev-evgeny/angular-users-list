import { Component, OnInit, Input } from '@angular/core';
import { includes, orderBy } from 'lodash';

import UserInterface from './../../interfaces';
import FilterInterface from './../../interfaces';
import FilterViewItemInterface from './../../interfaces';
import UsersService from './../../Services/UsersService';
import getFieldValue from './../../Helpers/getFieldValue';
import getUsersQuery from './../../Helpers/getUsersQuery';

@Component({
    selector: 'app-root',
    templateUrl: './page.html',
    styleUrls: ['./page.css']
})

export class AppComponent implements OnInit {

    users: Array<UserInterface> = [];

    rawUsers: Array<UserInterface> = [];

    filters: Array<{ name: string, value: string }> = [];

    filtersFormView: Array<FilterViewItemInterface> = [];

    async ngOnInit() {
        await this.fetchUsers();
        this.filtersFormView = this.getPreparedFilters(this.users, this.filters);
    }

    async fetchUsers() {
        const query = getUsersQuery();
        const usersService = new UsersService();

        try {
            const rawUsers = await usersService.getAll(query);
            this.rawUsers = rawUsers.length ? rawUsers : [];
        } catch (error) {
            console.error('Failed to get users', error);
        }

        this.users = this.getPreparedUsers(this.rawUsers, this.filters);
    }

    onFilterChange(selectedFilters: Array<{ name: string, value: string }>) {
        this.filters = selectedFilters;
        this.users = this.getPreparedUsers(this.rawUsers, this.filters);
        this.filtersFormView = this.getPreparedFilters(this.users, this.filters);
    }

    onSort({ name, direction }) {
        this.users = orderBy(this.users, name, direction);
    }

    getPreparedUsers(rawUsers, filters) {
        return rawUsers.filter(user => this.isUserVisible(user, filters));
    }

    isUserVisible(user: UserInterface, filters: Array<{ name: string, value: string }> = []) {
        if (!filters.length) {
            return true;
        }

        const filtersFitToUser = filters.filter(item => {
            const userFieldValue = getFieldValue({ fieldName: item.name, user });
            return userFieldValue === item.value;
        });

        return filtersFitToUser.length === filters.length;
    }

    getPreparedFilters(users, selectedFilters) {
        const filterFields: Array<string> = ['gender', 'department', 'city'];
        const filters = [];

        filterFields.forEach(filterName => {
            filters.push({
                title: filterName,
                data: this.getFilterData({ filterName, users, selectedFilters })
            });
        });

        return filters;
    }

    getFilterData({ filterName, users, selectedFilters = [] }) {
        const values = [];
        const filterData = [];

        users.forEach(user => {
            const filterValue = getFieldValue({ fieldName: filterName, user });

            if (filterValue && !includes(values, filterValue)) {
                values.push(filterValue);

                filterData.push({
                    value: filterValue,
                    count: this.getFilterCount({ filterName, filterValue, users }),
                    isSelected: this.isFieldSelected(selectedFilters, filterValue)
                });
            }
        });

        return filterData;
    }

    isFieldSelected(selectedFilters, filterValue) {
        return Boolean(selectedFilters.filter(item => item.value === filterValue).length);
    }

    getFilterCount({
        filterName,
        filterValue,
        users
    }: {
            filterName: string,
            filterValue: string,
            users: Array<UserInterface>
        }) {
        let count = 0;
        users.forEach(user => {
            const value = getFieldValue({ fieldName: filterName, user });
            if (value === filterValue) {
                count++;
            }
        });

        return count;
    }
}
