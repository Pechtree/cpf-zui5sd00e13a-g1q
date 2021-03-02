// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils"],function(u){"use strict";var d=new sap.ui.core.UIComponent();var a={"sap.ushell.services.CrossApplicationNavigation":{oServiceCalls:{"hrefForExternal":{executeServiceCallFn:function(s){return new jQuery.Deferred().resolve(sap.ushell.Container.getService("CrossApplicationNavigation").hrefForExternal(s.oMessageData.body.oArgs)).promise();}},"getSemanticObjectLinks":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").getSemanticObjectLinks(s.oMessageData.body.sSemanticObject,s.oMessageData.body.mParameters,s.oMessageData.body.bIgnoreFormFactors,undefined,undefined,s.oMessageData.body.bCompactIntents);}},"isIntentSupported":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").isIntentSupported(s.oMessageData.body.aIntents);}},"isNavigationSupported":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").isNavigationSupported(s.oMessageData.body.aIntents);}},"backToPreviousApp":{executeServiceCallFn:function(s){sap.ushell.Container.getService("CrossApplicationNavigation").backToPreviousApp();return new jQuery.Deferred().resolve().promise();}},"historyBack":{executeServiceCallFn:function(s){sap.ushell.Container.getService("CrossApplicationNavigation").historyBack(s.oMessageData.body.iSteps);return new jQuery.Deferred().resolve().promise();}},"getAppStateData":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").getAppStateData(s.oMessageData.body.sAppStateKey);}},"toExternal":{executeServiceCallFn:function(s){var A=u.clone(s.oMessageData.body.oArgs);u.storeSapSystemToLocalStorage(A);return new jQuery.Deferred().resolve(sap.ushell.Container.getService("CrossApplicationNavigation").toExternal(A)).promise();}}}},"sap.ushell.ui5service.ShellUIService":{oServiceCalls:{"setTitle":{executeServiceCallFn:function(s){return new jQuery.Deferred().resolve(s.oContainer.getShellUIService().setTitle(s.oMessageData.body.sTitle)).promise();}},"setBackNavigation":{executeServiceCallFn:function(s){return s.executeSetBackNavigationService(s.oMessage,s.oMessageData);}}}},"sap.ushell.services.ShellUIService":{oServiceCalls:{"setTitle":{executeServiceCallFn:function(s){return new jQuery.Deferred().resolve(s.oContainer.getShellUIService().setTitle(s.oMessageData.body.sTitle)).promise();}},"setHierarchy":{executeServiceCallFn:function(s){return new jQuery.Deferred().resolve(s.oContainer.getShellUIService().setHierarchy(s.oMessageData.body.aHierarchyLevels)).promise();}},"setRelatedApps":{executeServiceCallFn:function(s){return new jQuery.Deferred().resolve(s.oContainer.getShellUIService().setRelatedApps(s.oMessageData.body.aRelatedApps)).promise();}},"setDirtyFlag":{executeServiceCallFn:function(s){sap.ushell.Container.setDirtyFlag(s.oMessageData.body.bIsDirty);return new jQuery.Deferred().resolve().promise();}}}},"sap.ushell.services.Container":{oServiceCalls:{"setDirtyFlag":{executeServiceCallFn:function(s){sap.ushell.Container.setDirtyFlag(s.oMessageData.body.bIsDirty);return new jQuery.Deferred().resolve().promise();}},"getFLPUrl":{executeServiceCallFn:function(s){return new jQuery.Deferred().resolve(sap.ushell.Container.getFLPUrl()).promise();}}}},"sap.ushell.services.AppState":{oServiceCalls:{"getAppState":{executeServiceCallFn:function(s){var D=new jQuery.Deferred();sap.ushell.Container.getService("AppState").getAppState(s.oMessageData.body.sKey).done(function(S){delete S._oServiceInstance;D.resolve(S);}).fail(function(S){delete S._oServiceInstance;D.resolve(S);});return D.promise();}},"_saveAppState":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("AppState")._saveAppState(s.oMessageData.body.sKey,s.oMessageData.body.sData,s.oMessageData.body.sAppName,s.oMessageData.body.sComponent,s.oMessageData.body.bTransient);}},"_loadAppState":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("AppState")._loadAppState(s.oMessageData.body.sKey);}}}},"sap.ushell.services.Bookmark":{oServiceCalls:{"addBookmark":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("Bookmark").addBookmark(s.oMessageData.body.oParameters,s.oMessageData.body.oGroup);}},"addCatalogTileToGroup":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("Bookmark").addCatalogTileToGroup(s.oMessageData.body.sCatalogTileId,s.oMessageData.body.sGroupId,s.oMessageData.body.oCatalogData);}},"countBookmarks":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("Bookmark").countBookmarks(s.oMessageData.body.sUrl);}},"deleteBookmarks":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("Bookmark").deleteBookmarks(s.oMessageData.body.sUrl);}},"updateBookmarks":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("Bookmark").updateBookmarks(s.oMessageData.body.sUrl,s.oMessageData.body.oParameters);}}}},"sap.ushell.services.AppConfiguration":{oServiceCalls:{"setApplicationFullWidth":{executeServiceCallFn:function(s){sap.ushell.services.AppConfiguration.setApplicationFullWidth(s.oMessageData.body.bValue);return new jQuery.Deferred().resolve().promise();}}}}};function P(){}P.prototype.getAPIs=function(){this._registerAppRuntimeNewAPI();return a;};P.prototype.addShellCommunicationHandler=function(k,c){var C=a[k],n;if(C){if(c.oServiceCalls){Object.keys(c.oServiceCalls).forEach(function(b){C.oServiceCalls[b]=c.oServiceCalls[b];});}if(c.oRequestCalls){Object.keys(c.oRequestCalls).forEach(function(b){C.oRequestCalls[b]=c.oRequestCalls[b];});}return;}n={oRequestCalls:{},oServiceCalls:{}};if(c.oServiceCalls){Object.keys(c.oServiceCalls).forEach(function(b){n.oServiceCalls[b]=c.oServiceCalls[b];});}if(c.oRequestCalls){Object.keys(c.oRequestCalls).forEach(function(b){n.oRequestCalls[b]=c.oRequestCalls[b];});}a[k]=n;};P.prototype._getPostMesageInterface=function(s,i){var c;if(a[s]){c=a[s];if(c&&c.oRequestCalls&&c.oRequestCalls[i]){return c.oRequestCalls[i];}}return undefined;};P.prototype.registerShellCommunicationHandler=function(c){var t=this,e;Object.keys(c).forEach(function(k){e=c[k];t.addShellCommunicationHandler(k,e);});};P.prototype.isAppTypeSupported=function(c,s,i){if(c&&c.getAdditionalInformation&&c.getAdditionalInformation().startsWith("SAPUI5.Component=")){return false;}var C=this._getPostMesageInterface(s,i);if(!C||!C.distributionType){return false;}if(C.distributionType.indexOf("all")>=0){return true;}if(c.getApplicationType&&C.distributionType.indexOf(c.getApplicationType())>=0){return true;}return false;};P.prototype.isActiveOnly=function(s,i){var c=this._getPostMesageInterface(s,i);if(c){return c.isActiveOnly;}return undefined;};P.prototype.getResponseHandler=function(s,i){var c=this._getPostMesageInterface(s,i);if(c){return c.fnResponseHandler;}return undefined;};P.prototype._createNewInnerAppState=function(s){var S=sap.ushell.Container.getService("AppState"),n,h,c,N;n=S.createEmptyAppState();N=n.getKey();n.setData(s.oMessageData.body.sData);n.save();h=window.hasher.getHash();if(h.indexOf("&/")>0){if(h.indexOf("sap-iapp-state=")>0){c=/(?:sap-iapp-state=)([^&/]+)/.exec(h)[1];h=h.replace(c,N);}else{h=h+"/sap-iapp-state="+N;}}else{h=h+"&/sap-iapp-state="+N;}window.hasher.replaceHash(h);return N;};P.prototype._setInnerAppStateData=function(s){return P.prototype._createNewInnerAppState(s);};P.prototype._registerAppRuntimeNewAPI=function(){if(this.newAPIAdded!==undefined){return;}this.newAPIAdded=true;this.registerShellCommunicationHandler({"sap.ushell.appRuntime":{oRequestCalls:{"hashChange":{isActiveOnly:true,distributionType:["URL"]},"setDirtyFlag":{isActiveOnly:true,distributionType:["URL"]},"themeChange":{isActiveOnly:false,distributionType:["URL"]}},oServiceCalls:{"hashChange":{executeServiceCallFn:function(s){window.hasher.replaceHash(s.oMessageData.body.newHash);return new jQuery.Deferred().resolve().promise();}}}},"sap.ushell.services.ShellNavigation":{oServiceCalls:{"toExternal":{executeServiceCallFn:function(s){sap.ushell.Container.getService("ShellNavigation").toExternal(s.oMessageData.body.oArgs,undefined,s.oMessageData.body.bWriteHistory);return new jQuery.Deferred().resolve().promise();}},"toAppHash":{executeServiceCallFn:function(s){sap.ushell.Container.getService("ShellNavigation").toAppHash(s.oMessageData.body.sAppHash,s.oMessageData.body.bWriteHistory);return new jQuery.Deferred().resolve().promise();}}}},"sap.ushell.services.NavTargetResolution":{oServiceCalls:{"getDistinctSemanticObjects":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("NavTargetResolution").getDistinctSemanticObjects();}},"expandCompactHash":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("NavTargetResolution").expandCompactHash(s.oMessageData.body.sHashFragment);}},"resolveHashFragment":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("NavTargetResolution").expandCompactHash(s.oMessageData.body.sHashFragment);}},"isNavigationSupported":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("NavTargetResolution").isNavigationSupported(s.oMessageData.body.aIntents);}}}},"sap.ushell.services.CrossApplicationNavigation":{oServiceCalls:{"expandCompactHash":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").expandCompactHash(s.oMessageData.body.sHashFragment);}},"getDistinctSemanticObjects":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").getDistinctSemanticObjects();}},"getLinks":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").getLinks(s.oMessageData.body.vArgs);}},"getPrimaryIntent":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").getPrimaryIntent(s.oMessageData.body.sSemanticObject,s.oMessageData.body.mParameters);}},"hrefForAppSpecificHash":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").hrefForAppSpecificHash(s.oMessageData.body.sAppHash);}},"isInitialNavigation":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("CrossApplicationNavigation").hrefForAppSpecificHash();}},"getAppState":{executeServiceCallFn:function(s){var D=new jQuery.Deferred();sap.ushell.Container.getService("CrossApplicationNavigation").getAppState(d,s.oMessageData.body.sAppStateKey).done(function(S){delete S._oServiceInstance;D.resolve(S);});return D.promise();}},"setInnerAppRoute":{executeServiceCallFn:function(s){var U=sap.ushell.Container.getService("URLParsing"),h=U.parseShellHash(window.hasher.getHash()),n;h.appSpecificRoute=s.oMessageData.body.appSpecificRoute;n="#"+U.constructShellHash(h);window.hasher.replaceHash(n);return new jQuery.Deferred().resolve().promise();}},"setInnerAppStateData":{executeServiceCallFn:function(s){var k=P.prototype._setInnerAppStateData(s);return new jQuery.Deferred().resolve(k).promise();}}}},"sap.ushell.services.renderer":{oServiceCalls:{"showHeaderItem":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.showHeaderItem(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"showToolAreaItem":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.showToolAreaItem(s.oMessageData.body.sId,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"showActionButton":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.showActionButton(s.oMessageData.body.sId,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates,s.oMessageData.body.bIsFirst);return new jQuery.Deferred().resolve().promise();}},"showFloatingActionButton":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.showFloatingActionButton(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"showHeaderEndItem":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.showHeaderEndItem(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"setHeaderVisibility":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.setHeaderVisibility(s.oMessageData.body.bVisible,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"showSubHeader":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.showSubHeader(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"hideHeaderItem":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.hideHeaderItem(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"removeToolAreaItem":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.removeToolAreaItem(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"hideActionButton":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.hideActionButton(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"hideLeftPaneContent":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.hideLeftPaneContent(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"hideFloatingActionButton":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.hideFloatingActionButton(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"hideHeaderEndItem":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.hideHeaderEndItem(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"hideSubHeader":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.hideSubHeader(s.oMessageData.body.aIds,s.oMessageData.body.bCurrentState,s.oMessageData.body.aStates);return new jQuery.Deferred().resolve().promise();}},"setLeftPaneVisibility":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.setLeftPaneVisibility(s.oMessageData.body.sLaunchpadState,s.oMessageData.body.bVisible);return new jQuery.Deferred().resolve().promise();}},"showToolArea":{executeServiceCallFn:function(s){sap.ushell.renderers.fiori2.Renderer.showToolArea(s.oMessageData.body.sLaunchpadState,s.oMessageData.body.bVisible);return new jQuery.Deferred().resolve().promise();}}}},"sap.ushell.services.LaunchPage":{oServiceCalls:{"getGroups":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").getGroups();}},"getGroupsForBookmarks":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").getGroupsForBookmarks();}},"getDefaultGroup":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").getDefaultGroup();}},"addGroupAt":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").addGroupAt(s.oMessageData.body.sTitle,s.oMessageData.body.iIndex);}},"addGroup":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").addGroup(s.oMessageData.body.sTitle);}},"removeGroup":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").removeGroup(s.oMessageData.body.sTitle,s.oMessageData.body.iIndex);}},"resetGroup":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").resetGroup(s.oMessageData.body.sTitle,s.oMessageData.body.iIndex);}},"moveGroup":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").moveGroup(s.oMessageData.body.sTitle,s.oMessageData.body.iNewIndex);}},"setGroupTitle":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").setGroupTitle(s.oMessageData.body.oGroup,s.oMessageData.body.sTitle);}},"hideGroups":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").hideGroups(s.oMessageData.body.aHiddenGroupsIDs);}},"addTile":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").addTile(s.oMessageData.body.oGroup,s.oMessageData.body.oCatalogTile);}},"removeTile":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").removeTile(s.oMessageData.body.oGroup,s.oMessageData.body.oTile,s.oMessageData.body.iIndex);}},"moveTile":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").moveTile(s.oMessageData.body.oTile,s.oMessageData.body.iSourceIndex,s.oMessageData.body.iTargetIndex,s.oMessageData.body.oSourceGroup,s.oMessageData.body.oTargetGroup,s.oMessageData.body.sNewTileType);}},"getTileView":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").getTileView(s.oMessageData.body.oTile);}},"refreshTile":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").refreshTile(s.oMessageData.body.oTile);}},"registerTileActionsProvider":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").registerTileActionsProvider(s.oMessageData.body.fnProvider);}},"getCatalogTiles":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").getCatalogTiles(s.oMessageData.body.oCatalog);}},"getCatalogTileViewControl":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").getCatalogTileViewControl(s.oMessageData.body.oCatalogTile);}},"addBookmark":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").addBookmark(s.oMessageData.body.oParameters,s.oMessageData.body.oGroup);}},"countBookmarks":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").countBookmarks(s.oMessageData.body.sUrl);}},"deleteBookmarks":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").deleteBookmarks(s.oMessageData.body.sUrl);}},"updateBookmarks":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").updateBookmarks(s.oMessageData.body.sUrl,s.oMessageData.body.oParameters);}},"setTileVisible":{executeServiceCallFn:function(s){return sap.ushell.Container.getService("LaunchPage").setTileVisible(s.oMessageData.body.oTile,s.oMessageData.body.bNewVisible);}}}}});};return new P();},false);