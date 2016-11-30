(function () {
  angular.module('errorModule', ['ionic'])
    .factory('errorDialogService', ErrorDialogController);

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

    var service = {
      showError: showError
    };

    return service;

    function openModal() {
      vm.modal.show();
    };

    function closeModal() {
      vm.modal.hide()
        .then(function () {
          vm.modal.remove();
        });
    };

    function showError(errorMessage) {
      var scope = $rootScope.$new();
      scope.closeModal = closeModal;
      scope.errorMessage = errorMessage;

      vm.modal = $ionicModal.fromTemplate(modalTemplate, {
        scope: scope,
        animation: 'slide-in-up'
      });

      if (scope.errorMessage) {
        openModal();
      }
    }
  }
})();
