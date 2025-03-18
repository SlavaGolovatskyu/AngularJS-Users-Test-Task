/* global browser, expect */

'use strict';

describe('AngularJS Users', function () {
    var page = require('./pages/page.js');

    it('should automatically redirect to / when location hash/fragment is empty', function () {
        page.getHomepage();
        expect(page.getLocation()).toEqual('/');
    });

    describe('users list', function () {
        var usersListPage = require('./pages/usersListPage.js');

        beforeEach(function () {
            usersListPage.getTodosListPage();
        });

    //     it('should delete completed users', function () {
    //         expect(todosListPage.isRowForNamePresent('Date')).toBeTruthy();
    //         expect(todosListPage.isRowForNamePresent('Gym')).toBeTruthy();
    //         expect(todosListPage.isRowForNamePresent('Homework')).toBeTruthy();
    //         expect(todosListPage.isRowForNamePresent('Meeting')).toBeTruthy();

    //         todosListPage.markRowsAsCompleted('Date');
    //         todosListPage.markRowsAsCompleted('Meeting');
    //         todosListPage.clickDeleteButton();

    //         expect(todosListPage.isRowForNamePresent('Date')).toBeFalsy();
    //         expect(todosListPage.isRowForNamePresent('Gym')).toBeTruthy();
    //         expect(todosListPage.isRowForNamePresent('Homework')).toBeTruthy();
    //         expect(todosListPage.isRowForNamePresent('Meeting')).toBeFalsy();
    //     });

    //     it('should filter tasks when user type text into search field', function () {
    //         var textToSearch = 'Homework';

    //         todosListPage.searchText(textToSearch);
    //         expect(todosListPage.isRowForNamePresent('Date')).toBeFalsy();
    //         expect(todosListPage.isRowForNamePresent('Gym')).toBeFalsy();
    //         expect(todosListPage.isRowForNamePresent('Homework')).toBeTruthy();
    //         expect(todosListPage.isRowForNamePresent('Meeting')).toBeFalsy();
    //     });

    //     it('should render add task when user click on \'Add todo\' button', function () {
    //         todosListPage.clickAddButton();
    //         expect(todosListPage.getPanelTitle()).toEqual('Add todo');
    //     });
    // });

    // describe('new todo', function () {
    //     var todosNewPage = require('./pages/todosNewPage.js');

    //     beforeEach(function () {
    //         todosNewPage.getTodosNewPage();
    //     });

    //     it('should render mountain\'a details when user navigates to /todos/new', function () {
    //         expect(todosNewPage.getPanelTitle()).toEqual('Add todo');
    //     });

    //     it('should add new todo when user click on add button', function () {
    //         var todoName = 'Programming!';
    //         var todoType = 'Science';
    //         var todoEstimatedTime = '6 h';
    //         var todoDate = '23/05/2016';

    //         todosNewPage.typeName(todoName);
    //         todosNewPage.selectType(todoType);
    //         todosNewPage.selectEstimatedTime(todoEstimatedTime);
    //         todosNewPage.selectDate(todoDate);

    //         expect(todosNewPage.isAddButtonEnabled()).toBeTruthy();

    //         todosNewPage.clickAddButton();

    //         var todosListPage = require('./pages/todosListPage.js');

    //         expect(todosListPage.isRowForNamePresent(todoName)).toBeTruthy();
    //     });
    // });

    describe('json', function () {
        var jsonPage = require('./pages/jsonPage.js');

        beforeEach(function () {
            jsonPage.getJsonPage();
        });

        it('should render json view when user navigates to /json', function () {
            expect(jsonPage.isTextPresent()).toBeTruthy();
        });

        it('should automatically redirect to /todos/list when user click on app title', function () {
            page.clickAppTitle();
            expect(page.getLocation()).toEqual('/todos/list');
        });
    });

    describe('form', function () {
        var formPage = require('./pages/formPage.js');

        beforeEach(function () {
            formPage.getFormPage();
        });

        it('should render form when user navigates to /form', function () {
            expect(formPage.getPanelTitle()).toEqual('Form');
        });

        it('should save form when user click on save button', function () {
            var name = 'Michal';
            var surname = 'Pietrzak';
            var email = 'm.pietrzak93@yahoo.com';
            var age = '22';
            var note = 'It is an awesome angular template!';

            formPage.typeName(name);
            formPage.typeSurname(surname);
            formPage.typeEmail(email);
            formPage.selectMaleGender();
            formPage.typeAge(age);
            formPage.typeNote(note);

            expect(formPage.isSaveButtonEnabled()).toBeTruthy();

            formPage.clickSaveButton();

            expect(formPage.getSavedContactForm()).toContain(note);
        });
    });
});
