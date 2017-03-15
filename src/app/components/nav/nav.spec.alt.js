///////////////////////////////////////////////////////////////////
// alternate version of nav.spec.js
// this one uses jasmine.createSpy instead of spyOn an angular.noop
///////////////////////////////////////////////////////////////////


// describe('Nav component', function () {
//     var $componentController,
//         mockNavClick,
//         controller;
//
//     beforeEach(function () {
//         module('hexaquiz');
//
//         inject(function ($injector) {
//             $componentController = $injector.get('$componentController');
//             mockNavClick = jasmine.createSpy('onNavClick');
//             controller = $componentController('nav',
//                 null,
//                 {onNavClick: mockNavClick}
//             );
//             controller.$onInit();
//         });
//     });
//
//     describe('Nav controller', function () {
//         it('should have a prev method', function () {
//             expect(controller.prev).toBeDefined();
//         });
//
//         it('should have a next method', function () {
//             expect(controller.next).toBeDefined();
//         });
//
//         it('should call onNavClick with "prev" args', function () {
//             controller.prev();
//
//             expect(mockNavClick).toHaveBeenCalledWith({$event:{dir:'prev'}});
//         });
//
//         it('should call onNavClick with "next" args', function () {
//             controller.next();
//
//             expect(mockNavClick).toHaveBeenCalledWith({$event:{dir:'next'}});
//         });
//     });
// });