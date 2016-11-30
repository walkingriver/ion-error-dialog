# ion-error-dialog
## What is it?
An attempt to make a reusable error dialog based on the $ionicModal service. The approach involves the tradeoffs between implementing the error dialog as an angular component versus an angular factory. 

## Prerequisites
 - Node 4.4
 - Ionic Framework 1.3

## Quick Start
```
git clone git@github.com:walkingriver/ion-error-dialog.git
cd ion-error-dialog
npm install
bower install
ionic serve
``` 

When the web page launches, you will see two buttons. 

1. The first button displays the error dialog through a component by setting a viewmodel property. 
1. The second button launches the service-version of the error dialog by calling its showError method.

