// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/_CardUserRecents/CardUserRecentsBase","sap/ushell/EventHub","sap/ushell/Config"],function(C,E,a){"use strict";var b=C.extend(function(){C.call(this,"CardUserRecents");});b.prototype=C.prototype;b.prototype.getData=function(){if(!a.last("/core/shell/model/enableTrackingActivity")){return Promise.resolve([]);}return new Promise(function(r,c){this.oUserRecents.getRecentActivity().done(function(R){r(this._getActivitiesAsCardItems(R));}.bind(this)).fail(function(e){c(e);});}.bind(this));};b.prototype.attachDataChanged=function(u){E.on("newUserRecentsItem").do(function(r){var U=r.recentUsageArray;var c=[];for(var i=0;i<U.length;i++){c.push(U[i].oItem);}var p=this._getActivitiesAsCardItems(c);u({data:p});}.bind(this));E.on("userRecentsCleared").do(function(){u({data:[]});});};b.prototype.detachDataChanged=function(){E.on("newUserRecentsItem").off();E.on("userRecentsCleared").off();};b.hasNoAdapter=true;return b;},true);
