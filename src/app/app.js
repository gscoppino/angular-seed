import angular from 'angular';

class AppController {
    static $inject = ['$rootScope'];

    constructor($rootScope) {
        this._$rootScope = $rootScope;

        this._$rootScope.test = 42;
    }
}

class AppService {
    static $inject = ["$q"];

    constructor($q) {
        this._$q = $q;
    }

    resolveValue() {
        return this._$q.resolve(42);
    }
}

class AppComponentController {
    static $inject = ["AppService"];

    constructor(AppService) {
        this._AppService = AppService;

        this._AppService.resolveValue()
            .then(value => {
                this.value = value;
            });
    }
}

const AppComponent = {
    template: `{{$ctrl.value}}`,
    controller: AppComponentController,
    bindings: {}
};

const app = angular
    .module('app', [])
        .controller('AppController', AppController)
        .service('AppService', AppService)
        .component('appComponent', AppComponent)
        .run(function () {
            console.log('Loaded!');
        });

export { AppController, AppService, AppComponent, AppComponentController };
export default app;