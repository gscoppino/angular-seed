import angular from 'angular';

class AppController {
    static $inject = ['$rootScope'];

    constructor($rootScope) {
        this._$rootScope = $rootScope;
        this._$rootScope.test = 42;
    }
}

const app = angular
    .module('app', [])
        .controller('AppController', AppController)
        .run(function () {
            console.log('Loaded!');
        });

export default app;