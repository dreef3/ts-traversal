export class ExampleController {
    constructor(private $scope) {
        $scope.prop = 'foo';
        $scope.method = () => {
            console.log('bar');
        }
    }
}