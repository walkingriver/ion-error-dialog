(function () {
    angular.module('errorDialog', ['ionic'])
        .component('errorDialog', {
            bindings: {
                errorMessage: '<',
                onClosed: '&'
            },
            controller: ErrorDialogController
        });

    var modalTemplate = `
<ion-modal-view class="error-header-txt" view-title="System Error">
  <ion-header-bar class="error-padding">
    <h4>System Error</h4>
  </ion-header-bar>
  <ion-content class="has-footer has-header">
    <div class="error-b2 content-border">
      <div class="row">
        <div class="col">{{errorMessage}}</div>
      </div>
    </div>
  </ion-content>
  <div class="bar bar-footer">
    <button class="btn-wdpr-secondary error-buttons" ng-click="closeModal()">OK</button>
  </div>
</ion-modal>
    `;

    function ErrorDialogController($ionicModal, $rootScope) {
        var vm = this;
        var scope = $rootScope.$new();
        vm.$onChanges = onChanges;
        vm.$onInit = onInit;

        function openModal() {
            vm.modal.show();
        };

        function closeModal() {
            vm.modal.hide();
        };

        function onInit() {
            scope.closeModal = closeModal;
            scope.errorMessage = vm.errorMessage;

            vm.modal = $ionicModal.fromTemplate(modalTemplate, {
                scope: scope,
                animation: 'slide-in-up'
            });

            // Cleanup the modal when we're done with it!
            scope.$on('$destroy', function () {
                vm.modal.remove();
            });
            // Execute action on hide modal
            scope.$on('modal.hidden', function () {
                // Execute action
                if (vm.onClosed) {
                    vm.onClosed();
                }
            });
            // Execute action on remove modal
            scope.$on('modal.removed', function () {
                // Execute action
            });
        }

        function onChanges(changes) {
            if (changes.errorMessage) {
                scope.errorMessage = changes.errorMessage.currentValue;
            }

            if (scope.errorMessage) {
                openModal();
            }
        }
    }
})();
