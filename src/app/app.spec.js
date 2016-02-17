import 'angular';
import { module, inject } from 'angular-mocks';
import app, { AppController, AppService, AppComponentController } from './app';

beforeEach(module('app'));
describe('app ->', function () {
    describe('AppController:', function () {
        it('should set test property on $rootScope.', inject(function ($injector) {
            let $rootScope = $injector.get('$rootScope');

            new AppController($rootScope);

            expect($rootScope.test).toEqual(42);
        }));
    });

    describe('AppService:', function () {
        it('method should resolve something.', inject(function ($injector) {
            let $rootScope = $injector.get('$rootScope');
            let $q = $injector.get('$q');

            let service = new AppService($q);

            service.resolveValue()
                .then(function (value) {
                    expect(value).toEqual(42);
                });

            $rootScope.$digest();
        }));
    });

    describe('AppComponent:', function () {
        it('should compile', inject(function ($injector) {
            let $rootScope = $injector.get('$rootScope');
            let $compile = $injector.get('$compile');

            let scope = $rootScope.$new();
            let element = $compile('<app-component></app-component>')(scope);
            $rootScope.$digest();
            expect(element).toBeDefined();
        }));

        describe('Controller:', function () {
            it('should use AppService to set a property.', inject(function ($injector) {
                let $rootScope = $injector.get('$rootScope');
                let $q = $injector.get('$q');

                //let mockService = new Object();
                let mockService = {
                    resolveValue: angular.noop
                };

                spyOn(mockService, 'resolveValue').and.returnValue($q.resolve(42));

                let componentCtrl = new AppComponentController(mockService);
                expect(mockService.resolveValue).toHaveBeenCalled();
                $rootScope.$digest();
                expect(componentCtrl.value).toEqual(42);
            }));
        });
    });
});