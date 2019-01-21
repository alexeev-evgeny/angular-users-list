import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import UserInterface from './../../interfaces';
import getFieldValue from './../../Helpers/getFieldValue';

@Component({
    selector: 'users-filter',
    templateUrl: './usersFilter.html',
    styleUrls: ['./usersFilter.css']
})

export default class UsersFilterComponent {

    @Input() users: Array<UserInterface> = [];

    @Input() filtersFormView: Array<Object> = [];

    @Output() filterChange: EventEmitter<any> = new EventEmitter();

    filters: Array<Object> = [];

    selectedFilters: Array<{ name: string, value: string }> = [];

    updateFilter(isChecked, name, value) {
        if (isChecked) {
            this.selectedFilters.push({ name, value });
            this.filterChange.emit(this.selectedFilters);
            return;
        }

        this.selectedFilters = this.selectedFilters.filter(item => item.value !== value);
        this.filterChange.emit(this.selectedFilters);
    }
}
