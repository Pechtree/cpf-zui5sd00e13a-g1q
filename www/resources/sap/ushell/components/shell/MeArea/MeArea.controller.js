// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/resources","sap/m/library","sap/ushell/EventHub"],function(r,M,E){"use strict";var B=M.ButtonType;var m=new sap.ui.model.json.JSONModel({actions:[],userPreferences:{entries:[]},apps:{recentActivities:[],frequentActivities:[]}});sap.ui.controller("sap.ushell.components.shell.MeArea.MeArea",{onInit:function(){var c=(this.getView().getViewData()?this.getView().getViewData().config:{})||{};this.aControlsWithPressHandler=[];this.getView().setModel(m,"meAreaModel");this._addActionItemToOverflowSupport();this.oResourceBundle=r.i18n;if(c.enableRecentActivity&&sap.ushell.Container.getRenderer("fiori2").oShellModel.getModel().getProperty("/enableTrackingActivity")){this.oUserRecentsSrvc=sap.ushell.Container.getService('UserRecents');}this.lastVisited=null;},onBeforeRendering:function(){if(this.oUserRecentsSrvc){if(!m.getProperty('/apps/recentActivities')||!m.getProperty('/apps/recentActivities').length){this.refreshRecentActivities();}}if(!m.getProperty('/apps/frequentActivities')||!m.getProperty('/apps/frequentActivities').length){this.refreshFrequentActivities();}},refreshRecentActivities:function(){if(this.oUserRecentsSrvc){this.oUserRecentsSrvc.getRecentActivity().done(function(a){a.forEach(function(i){i.timestamp=sap.ushell.utils.formatDate(i.timestamp);});m.setProperty('/apps/recentActivities',a);});}},refreshFrequentActivities:function(){if(this.oUserRecentsSrvc){this.oUserRecentsSrvc.getFrequentActivity().done(function(a){m.setProperty('/apps/frequentActivities',a);});}},createViewByName:function(e,n,v){var V=v?sap.ui.getCore().byId(v):null;if(!V){var s=e.getSource(),c=s.getBindingContext(),p=c?c.getPath():"",a=n||c.getModel().getProperty(p+"/viewName");v=v||c.getModel().getProperty(p+"/id");V=sap.ui.view(v,{viewName:a,type:'JS',viewData:{}});}return V;},logout:function(){sap.ui.require(['sap/m/MessageBox'],function(a){var l=new sap.ushell.ui.launchpad.LoadingDialog({text:""}),s=true,i=false,L={};sap.ushell.Container.getGlobalDirty().done(function(d){s=false;if(i===true){l.exit();l=new sap.ushell.ui.launchpad.LoadingDialog({text:""});}var _=function(d){var L={},R=r.i18n;if(d===sap.ushell.Container.DirtyState.DIRTY){L.message=R.getText('unsaved_data_warning_popup_message');L.icon=a.Icon.WARNING;L.messageTitle=R.getText("unsaved_data_warning_popup_title");}else{L.message=R.getText('signoutConfirmationMsg');L.icon=a.Icon.QUESTION;L.messageTitle=R.getText("signoutMsgTitle");}return L;};L=_(d);a.show(L.message,L.icon,L.messageTitle,[a.Action.OK,a.Action.CANCEL],function(A){if(A===a.Action.OK){l.openLoadingScreen();l.showAppInfo(r.i18n.getText('beforeLogoutMsg'),null);sap.ushell.Container.logout();}},sap.ui.core.ElementMetadata.uid("confirm"));});if(s===true){l.openLoadingScreen();i=true;}});},_addPressHandlerToActions:function(c){if(this.aControlsWithPressHandler.indexOf(c.getId())===-1){this.aControlsWithPressHandler.push(c.getId());c.attachPress(function(e){sap.ui.getCore().byId("viewPortContainer").switchState("Center");if(c.getId()==="userSettingsBtn"){E.emit("openUserSettings",Date.now());}});}},_getControlsWithPressHandler:function(){return this.aControlsWithPressHandler;},_addActionItemToOverflowSupport:function(){if(sap.m._overflowToolbarHelpers&&sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls._mSupportedControls){var s=sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls._mSupportedControls;var p=sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls.prototype;var c=["sap.ushell.ui.launchpad.ActionItem","sap.ushell.ui.footerbar.AboutButton","sap.ushell.ui.footerbar.ContactSupportButton","sap.ushell.ui.footerbar.EndUserFeedback","sap.ushell.ui.footerbar.LogoutButton","sap.ushell.ui.footerbar.UserPreferencesButton","sap.m.Button"];var C=function(n){return n.substring(0,1).toUpperCase()+n.substring(1);};var S={canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","type"]};var P=function(o){if(!o.mCustomStyleClassMap.sapUshellActionItem){return;}if(o.setActionType){o.setActionType('standard');}var t=o.getType();if(t!==B.Accept&&t!==B.Reject){o.setType(B.Transparent);}if(o.getIcon()){o.addStyleClass("sapMOTAPButtonWithIcon");}else{o.addStyleClass("sapMOTAPButtonNoIcon");}};var f=function(o){if(o.setActionType){o.setActionType('action');}};c.forEach(function(n){s[n]=S;var a=n.split(".").map(C).join("");var b='_preProcess';var d='_postProcess';p[b+a]=P;p[d+a]=f;});}},setLastVisited:function(u){this.lastVisited=u;},updateScrollBar:function(h){if(this.lastVisited&&this.lastVisited!="#"+h){jQuery('.sapUshellViewPortLeft').scrollTop(0);sap.ui.getCore().byId('meAreaIconTabBar').setSelectedKey("sapUshellIconTabBarrecentActivities");var l=sap.ui.getCore().byId('sapUshellActivityListrecentActivities'),L=l.getItems();if(L&&L.length>0){sap.ui.getCore().byId('sapUshellActivityListrecentActivities').setSelectedItem(L[0],true);}this.lastVisited=null;}},onExit:function(){this.getView().aDanglingControls.forEach(function(c){if(c.destroyContent){c.destroyContent();}c.destroy();});}});},false);