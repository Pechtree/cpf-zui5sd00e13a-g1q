// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/resources","sap/ui/core/UIComponent","sap/ushell/components/homepage/ComponentKeysHandler","sap/ushell/utils","sap/m/Dialog","sap/m/Button","sap/m/Text"],function(r,U,C,u,D,B,T,H){"use strict";return U.extend("sap.ushell.components.shell.Search.Component",{metadata:{version:"1.53.0-SNAPSHOT",library:"sap.ushell.components.shell.search",dependencies:{libs:["sap.m","sap.ui.layout"]}},createContent:function(){var s=sap.ushell.Container.getRenderer("fiori2").getShellController(),S=s.getView(),o=(S.getViewData()?S.getViewData().config:{})||{};var t=this;var b=(o.enableSearch!==false);if(b){var _=function(i){if(!t._searchShellHelperDeferred){t._searchShellHelperDeferred=jQuery.Deferred();sap.ui.require(['sap/ushell/renderers/fiori2/search/SearchShellHelperAndModuleLoader'],function(){var d=sap.ui.require('sap/ushell/renderers/fiori2/search/SearchShellHelper');if(i){d.init();}t._searchShellHelperDeferred.resolve(d);});}return t._searchShellHelperDeferred;};var a={id:"sf",tooltip:"{i18n>searchbox_tooltip}",text:"{i18n>searchBtn}",ariaLabel:"{i18n>searchbox_tooltip}",icon:sap.ui.core.IconPool.getIconURI("search"),visible:true,showSeparator:false,press:function(e){_(false).done(function(d){d.onShellSearchButtonPressed(e);});}};var c=sap.ushell.Container.getRenderer("fiori2").addHeaderEndItem("sap.ushell.ui.shell.ShellHeadItem",a,true,false);c.setModel(r.i18nModel,"i18n");if(o.openSearchAsDefault){_(true).done(function(d){d.setDefaultOpen(true);});}t.oHashChanger=sap.ui.core.routing.HashChanger.getInstance();t.oHashChanger.attachEvent("shellHashChanged",function(d){var h=d.mParameters;setTimeout(function(){sap.ui.require(['sap/ushell/renderers/fiori2/search/HashChangeHandler'],function(e){e.handle(h);});},6000);});c.addEventDelegate({onsapskipforward:function(e){e.preventDefault();jQuery("#sapUshellHeaderAccessibilityHelper").focus();},onsapskipback:function(e){e.preventDefault();jQuery("#sapUshellHeaderAccessibilityHelper").focus();},onAfterRendering:function(){jQuery("#sf").attr("aria-pressed",false);}});}sap.ui.getCore().getEventBus().publish("shell","searchCompLoaded",{delay:0});},exit:function(){sap.ushell.Container.getRenderer("fiori2").hideHeaderEndItem("sf");var s=sap.ui.getCore().byId("sf");if(s){s.destroy();}}});});
