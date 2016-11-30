(function () {
    angular.module('errorDialog', ['ionic'])
        .component('errorDialog', {
            bindings: {
                errorMessage: '<',
                isVisible: '<'
            },
            controller: ErrorDialogController
        });

    var modalTemplate = `
    <ion-modal-view>
    <ion-header-bar>
      <h1 class="title">{{title}}</h1>
    </ion-header-bar>
    <ion-content>
        <h2>There was a nasty error</h2>
      {{errorMessage}}
    </ion-content>
    <ion-footer-bar>
        <button button button-block ng-click="closeModal()">Close</button>
    </ion-footer-bar>
    </ion-modal-view>`;

    function ErrorDialogController($ionicModal, $rootScope) {
        var vm = this;
        var scope = $rootScope.$new();
        vm.$onChanges = onChanges;
        vm.isVisible = false;

        scope.closeModal = closeModal;
        scope.errorMessage = vm.errorMessage;

        vm.modal = $ionicModal.fromTemplate(modalTemplate, {
            scope: scope,
            animation: 'slide-in-up'
        });

        function openModal() {
            vm.modal.show();
        };
        function closeModal() {
            vm.isVisible = false;
            vm.modal.hide();
        };

        function onChanges(changes) {
            if (changes.isVisible) {
                vm.isVisible = changes.isVisible.currentValue;
            }

            if (vm.isVisible) {
                openModal();
            }
        }

        // Cleanup the modal when we're done with it!
        scope.$on('$destroy', function () {
            vm.modal.remove();
        });
        // Execute action on hide modal
        scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        scope.$on('modal.removed', function () {
            // Execute action
        });
    }
})();
