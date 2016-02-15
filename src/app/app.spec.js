import 'angular';
import 'angular-mocks';
import './app';

beforeEach(module('app'));
describe('app ->', function () {
    describe('AppController:', function () {
        it('should set test property on $rootScope.', inject(function ($injector) {
            let $rootScope = $injector.get('$rootScope');
            let $controller = $injector.get('$controller');

            $controller('AppController');
            expect($rootScope.test).toEqual(42);
        }));
    });
});