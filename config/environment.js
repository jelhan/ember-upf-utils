/*jshint node:true*/
/*global process*/
'use strict';

module.exports = function(environment, appConfig) {
  appConfig['ember-toastr'] = {
    toastrOptions: {
      positionClass: 'toast-bottom-center upf-toastr--container',
      hideDuration: 200,
      timeOut: 12000,
      newestOnTop: true,
      closeButton: true,
      extendedTimeOut: 6000
    }
  };

  appConfig['ember-cli-google'] = {
    analytics: {
      trackerId: process.env.GA_WEB_PROPERTY_ID || 'no-token',
    }
  };

  return {
    modulePrefix: 'ember-upf-utils'
  };
};
