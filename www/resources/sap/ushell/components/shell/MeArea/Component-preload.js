sap.ui.require.preload({"sap/ushell/components/shell/MeArea/Component.js":function(){
// ${copyright}
sap.ui.define(['sap/ushell/resources','sap/ui/core/UIComponent','sap/ushell/components/applicationIntegration/AppLifeCycle','sap/ushell/ui/footerbar/ContactSupportButton','sap/ushell/ui/footerbar/EndUserFeedback','sap/ushell/EventHub','sap/ushell/Config'],function(r,U,A,C,E,a,b){"use strict";var _;function c(){if(!_){_=sap.ushell.Container.getRenderer("fiori2");}return _;}function d(){return c().getShellConfig();}function f(){return A.getElementsModel().getModel();}var g;return U.extend("sap.ushell.components.shell.MeArea.Component",{metadata:{version:"${version}",library:"sap.ushell.components.shell.MeArea",dependencies:{libs:["sap.m","sap.ui.layout"]}},createContent:function(){this._bSearchPrefsLoaded=false;this._bIsMeAreaCreated=false;g=b.last("/core/extension/enableHelp");var t=this,m;var e=function(s){this.toggleMeAreaView(m,s);}.bind(this);m=sap.ui.getCore().byId("meAreaHeaderButton");m.applySettings({tooltip:sap.ushell.Container.getUser().getFullName(),icon:'{/userImage/personPlaceHolder}',selected:{path:"/currentViewPortState",formatter:function(v){if(v==='LeftCenter'){return true;}return false;}},press:function(){e(!this.getSelected());},visible:true,enabled:true,showSeparator:false,ariaLabel:"{i18n>MeAreaToggleButtonAria}"}).removeStyleClass("sapUshellPlaceHolders");m.addEventDelegate({onAfterRendering:function(){m.$().attr("aria-pressed",m.getSelected());},onsapskipforward:function(o){sap.ushell.renderers.fiori2.AccessKeysHandler.bForwardNavigation=true;o.preventDefault();jQuery("#sapUshellHeaderAccessibilityHelper").focus();},onsaptabprevious:function(o){var v=sap.ui.getCore().byId('viewPortContainer'),s=v.getCurrentState(),R;switch(s){case"LeftCenter":R=jQuery("#meAreaIconTabBar-content li:first");if(R.length>0){R[0].focus();}else{var h=b.last("/core/shell/enableRecentActivity");if(h&&f().getProperty("/enableTrackingActivity")){jQuery("#meAreaIconTabBar .sapMITBText")[0].focus();}else{o.preventDefault();jQuery('.sapUshellActionItem:last')[0].focus();}}break;case"Center":if(sap.ushell.renderers.fiori2.AccessKeysHandler.getAppKeysHandler()){o.preventDefault();sap.ushell.renderers.fiori2.AccessKeysHandler.bFocusOnShell=false;}break;default:}},onsapskipback:function(o){var v=sap.ui.getCore().byId('viewPortContainer'),s=v.getCurrentState(),n;switch(s){case"LeftCenter":o.preventDefault();n=jQuery("#meAreaIconTabBar .sapMITBSelected");if(n.length===0){n=jQuery(".sapUshellActionItem");}n[0].focus();break;case"Center":o.preventDefault();if(jQuery("#sapUshellFloatingContainerWrapper:visible").length==1&&(o.originalEvent.srcElement.id)!=""){sap.ui.getCore().getEventBus().publish("launchpad","shellFloatingContainerIsAccessible");}else if(sap.ushell.renderers.fiori2.AccessKeysHandler.getAppKeysHandler()){sap.ushell.renderers.fiori2.AccessKeysHandler.bFocusOnShell=false;}break;default:}}});A.getElementsModel().createTriggers([{fnRegister:function(){if(!t.oActionsDoable){t.oActionsDoable=b.on("/core/shell/model/currentState/actions").do(function(h){if(b.last("/core/shell/enableFiori3")){if(h&&h.length>0){c().showHeaderEndItem(["meAreaHeaderButton"],true);}else{c().hideHeaderEndItem(["meAreaHeaderButton"],true);}}else if(h&&h.length>0){c().showHeaderItem(["meAreaHeaderButton"],true);}else{c().hideHeaderItem(["meAreaHeaderButton"],true);}});}},fnUnRegister:function(){if(!t.oActionsDoable){t.oActionsDoable.off();t.oActionsDoable=null;}}}],false,["blank-home","blank"]);if(b.last("/core/shell/enableFiori3")){sap.ushell.Container.getRenderer("fiori2").oShellModel.addHeaderEndItem(["meAreaHeaderButton"],false,["home","app","minimal","standalone","embedded","embedded-home","lean"],true);}this._createMeArea();a.on('showMeArea').do(e);},_createMeArea:function(){if(this._bIsMeAreaCreated===true){return;}this._bIsMeAreaCreated=true;var m=sap.ui.view("meArea",{viewName:"sap.ushell.components.shell.MeArea.MeArea",type:'JS',viewData:c().getComponentData(),async:true});m.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({key:"role",value:"region",writeToDom:true}));m.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({key:"aria-label",value:r.i18n.getText("MeAreaToggleButtonAria"),writeToDom:true}));this._createActionButtons();m.loaded().then(function(v){c().addLeftViewPort(m);});},toggleMeAreaView:function(m,s){if(!m||!m.getDomRef()){return;}if(m.getSelected()===!!s){return;}var e=f().getProperty('/currentState/stateName');var p={'embedded':true,'embedded-home':true,'standalone':true,'blank-home':true,'blank':true};this._createMeArea();if(p[e]===true){this._showActionsInPopOver(m);}else{this._switchToMeAreaView(m,s);}},_createActionButtons:function(){if(!sap.ui.getCore().byId("aboutBtn")){var o=new sap.ushell.ui.footerbar.AboutButton("aboutBtn");if(g){o.addStyleClass('help-id-aboutBtn');}c().addShellDanglingControl(o);}if(!sap.ui.getCore().byId("userSettingsBtn")&&!d().moveUserSettingsActionToShellHeader){var u=new sap.ushell.ui.launchpad.ActionItem("userSettingsBtn",{id:"userSettingsBtn",text:r.i18n.getText("userSettings"),icon:'sap-icon://action-settings'});if(g){u.addStyleClass('help-id-loginDetails');}c().addShellDanglingControl(u);}if(!d().moveContactSupportActionToShellHeader){b.on("/core/extension/SupportTicket").do(function(e){var h=sap.ui.getCore().byId("ContactSupportBtn");if(e&&!h){h=new C("ContactSupportBtn");c().addShellDanglingControl(h);if(g){h.addStyleClass('help-id-contactSupportBtn');}}if(h){h.setVisible(e);}});}f().setProperty('/showEndUserFeedback',false);function s(h,i){try{h.isEnabled().done(function(){f().setProperty('/showEndUserFeedback',true);var j=c().getEndUserFeedbackConfiguration();if(d().moveGiveFeedbackActionToShellHeader){jQuery.sap.measure.start("FLP:Shell.controller._createActionButtons","create give feedback as shell head end item","FLP");var t=sap.ui.getCore().byId("EndUserFeedbackHandlerBtn");t.setModel(f());t.setShowAnonymous(j.showAnonymous);t.setAnonymousByDefault(j.anonymousByDefault);t.setShowLegalAgreement(j.showLegalAgreement);t.setShowCustomUIContent(j.showCustomUIContent);t.setFeedbackDialogTitle(j.feedbackDialogTitle);t.setTextAreaPlaceholder(j.textAreaPlaceholder);t.setAggregation("customUIContent",j.customUIContent,false);i.attachPress(function(){t.firePress();});jQuery.sap.measure.end("FLP:Shell.controller._createActionButtons");}else if(!i){i=new E("EndUserFeedbackBtn",{showAnonymous:j.showAnonymous,anonymousByDefault:j.anonymousByDefault,showLegalAgreement:j.showLegalAgreement,showCustomUIContent:j.showCustomUIContent,feedbackDialogTitle:j.feedbackDialogTitle,textAreaPlaceholder:j.textAreaPlaceholder,customUIContent:j.customUIContent});if(g){i.addStyleClass('help-id-EndUserFeedbackBtn');}c().addShellDanglingControl(i);}i.setVisible(true);}).fail(function(){if(i){i.setVisible(false);}});}catch(e){jQuery.sap.log.error("EndUserFeedback adapter is not found",e.message||e);}}b.on("/core/extension/EndUserFeedback").do(function(e){var h=sap.ui.getCore().byId("EndUserFeedbackBtn");if(e){sap.ushell.Container.getServiceAsync("EndUserFeedback").then(function(i){s(i,h);});}else if(h){f().setProperty('/showEndUserFeedback',false);h.setVisible(false);}});},_showActionsInPopOver:function(o){var e=f().getProperty('/currentState/actions');if(!this.oActionsPopover){this.oActionsLayout=new sap.ui.layout.VerticalLayout();this.oActionsPopover=new sap.m.Popover("sapUshellActionsPopover",{showHeader:false,placement:sap.m.PlacementType.Bottom,content:this.oActionsLayout}).addStyleClass("sapUshellPopupContainer");}this.oActionsLayout.removeAllContent();this._createActionButtons();e.forEach(function(s,i){var h=sap.ui.getCore().byId(s);if(h&&h.setActionType){this.oActionsLayout.addContent(h);h.setActionType('standard');h.addStyleClass('sapUshellStandardActionItem');}}.bind(this));this.oActionsPopover.setModel(f());this.oActionsPopover.openBy(o);},_switchToMeAreaView:function(o,s){c().switchViewPortStateByControl(o,s?"LeftCenter":"Center");c().toggleOverFlowActions();},_getSearchPrefs:function(){function i(){try{return b.last("/core/shellHeader/headEndItems").indexOf("sf")!=-1;}catch(e){jQuery.sap.log.debug("Shell controller._createWaitForRendererCreatedPromise: search button is not visible.");return false;}}if(i()){sap.ui.require(['sap/ushell/renderers/fiori2/search/userpref/SearchPrefs','sap/ushell/renderers/fiori2/search/SearchShellHelperAndModuleLoader'],function(S){this._bSearchPrefsLoaded=true;var s=S.getEntry();s.isSearchPrefsActive().done(function(e){if(e){c().addUserProfilingEntry(s);}}.bind(this));}.bind(this));}},exit:function(){if(this.oActionsDoable){this.oActionsDoable.off();}}});});},"sap/ushell/components/shell/MeArea/MeArea.controller.js":function(){sap.ui.define(["sap/ushell/resources","sap/m/library","sap/ushell/EventHub"],function(r,M,E){"use strict";var B=M.ButtonType;var m=new sap.ui.model.json.JSONModel({actions:[],userPreferences:{entries:[]},apps:{recentActivities:[],frequentActivities:[]}});sap.ui.controller("sap.ushell.components.shell.MeArea.MeArea",{onInit:function(){var c=(this.getView().getViewData()?this.getView().getViewData().config:{})||{};this.aControlsWithPressHandler=[];this.getView().setModel(m,"meAreaModel");this._addActionItemToOverflowSupport();this.oResourceBundle=r.i18n;if(c.enableRecentActivity&&sap.ushell.Container.getRenderer("fiori2").oShellModel.getModel().getProperty("/enableTrackingActivity")){this.oUserRecentsSrvc=sap.ushell.Container.getService('UserRecents');}this.lastVisited=null;},onBeforeRendering:function(){if(this.oUserRecentsSrvc){if(!m.getProperty('/apps/recentActivities')||!m.getProperty('/apps/recentActivities').length){this.refreshRecentActivities();}}if(!m.getProperty('/apps/frequentActivities')||!m.getProperty('/apps/frequentActivities').length){this.refreshFrequentActivities();}},refreshRecentActivities:function(){if(this.oUserRecentsSrvc){this.oUserRecentsSrvc.getRecentActivity().done(function(a){a.forEach(function(i){i.timestamp=sap.ushell.utils.formatDate(i.timestamp);});m.setProperty('/apps/recentActivities',a);});}},refreshFrequentActivities:function(){if(this.oUserRecentsSrvc){this.oUserRecentsSrvc.getFrequentActivity().done(function(a){m.setProperty('/apps/frequentActivities',a);});}},createViewByName:function(e,n,v){var V=v?sap.ui.getCore().byId(v):null;if(!V){var s=e.getSource(),c=s.getBindingContext(),p=c?c.getPath():"",a=n||c.getModel().getProperty(p+"/viewName");v=v||c.getModel().getProperty(p+"/id");V=sap.ui.view(v,{viewName:a,type:'JS',viewData:{}});}return V;},logout:function(){sap.ui.require(['sap/m/MessageBox'],function(a){var l=new sap.ushell.ui.launchpad.LoadingDialog({text:""}),s=true,i=false,L={};sap.ushell.Container.getGlobalDirty().done(function(d){s=false;if(i===true){l.exit();l=new sap.ushell.ui.launchpad.LoadingDialog({text:""});}var _=function(d){var L={},R=r.i18n;if(d===sap.ushell.Container.DirtyState.DIRTY){L.message=R.getText('unsaved_data_warning_popup_message');L.icon=a.Icon.WARNING;L.messageTitle=R.getText("unsaved_data_warning_popup_title");}else{L.message=R.getText('signoutConfirmationMsg');L.icon=a.Icon.QUESTION;L.messageTitle=R.getText("signoutMsgTitle");}return L;};L=_(d);a.show(L.message,L.icon,L.messageTitle,[a.Action.OK,a.Action.CANCEL],function(A){if(A===a.Action.OK){l.openLoadingScreen();l.showAppInfo(r.i18n.getText('beforeLogoutMsg'),null);sap.ushell.Container.logout();}},sap.ui.core.ElementMetadata.uid("confirm"));});if(s===true){l.openLoadingScreen();i=true;}});},_addPressHandlerToActions:function(c){if(this.aControlsWithPressHandler.indexOf(c.getId())===-1){this.aControlsWithPressHandler.push(c.getId());c.attachPress(function(e){sap.ui.getCore().byId("viewPortContainer").switchState("Center");if(c.getId()==="userSettingsBtn"){E.emit("openUserSettings",Date.now());}});}},_getControlsWithPressHandler:function(){return this.aControlsWithPressHandler;},_addActionItemToOverflowSupport:function(){if(sap.m._overflowToolbarHelpers&&sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls._mSupportedControls){var s=sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls._mSupportedControls;var p=sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls.prototype;var c=["sap.ushell.ui.launchpad.ActionItem","sap.ushell.ui.footerbar.AboutButton","sap.ushell.ui.footerbar.ContactSupportButton","sap.ushell.ui.footerbar.EndUserFeedback","sap.ushell.ui.footerbar.LogoutButton","sap.ushell.ui.footerbar.UserPreferencesButton","sap.m.Button"];var C=function(n){return n.substring(0,1).toUpperCase()+n.substring(1);};var S={canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","type"]};var P=function(o){if(!o.mCustomStyleClassMap.sapUshellActionItem){return;}if(o.setActionType){o.setActionType('standard');}var t=o.getType();if(t!==B.Accept&&t!==B.Reject){o.setType(B.Transparent);}if(o.getIcon()){o.addStyleClass("sapMOTAPButtonWithIcon");}else{o.addStyleClass("sapMOTAPButtonNoIcon");}};var f=function(o){if(o.setActionType){o.setActionType('action');}};c.forEach(function(n){s[n]=S;var a=n.split(".").map(C).join("");var b='_preProcess';var d='_postProcess';p[b+a]=P;p[d+a]=f;});}},setLastVisited:function(u){this.lastVisited=u;},updateScrollBar:function(h){if(this.lastVisited&&this.lastVisited!="#"+h){jQuery('.sapUshellViewPortLeft').scrollTop(0);sap.ui.getCore().byId('meAreaIconTabBar').setSelectedKey("sapUshellIconTabBarrecentActivities");var l=sap.ui.getCore().byId('sapUshellActivityListrecentActivities'),L=l.getItems();if(L&&L.length>0){sap.ui.getCore().byId('sapUshellActivityListrecentActivities').setSelectedItem(L[0],true);}this.lastVisited=null;}},onExit:function(){this.getView().aDanglingControls.forEach(function(c){if(c.destroyContent){c.destroyContent();}c.destroy();});}});},false);},"sap/ushell/components/shell/MeArea/MeArea.view.js":function(){sap.ui.define(["sap/ushell/services/AppType","sap/m/Button","sap/m/List","sap/m/Text","sap/m/VBox","sap/m/HBox","sap/m/Image","sap/m/Popover","sap/m/OverflowToolbar","sap/m/ScrollContainer","sap/ushell/renderers/fiori2/AccessKeysHandler","sap/ushell/resources","sap/ushell/ui/launchpad/UserStatusItem","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/m/library","sap/ui/Device","sap/ui/core/Icon","sap/ui/core/IconPool","sap/ui/core/service/ServiceFactoryRegistry"],function(a,B,L,T,V,H,I,P,O,S,A,r,U,b,m,D,c,d,e){"use strict";var f=m.BackgroundDesign,g=m.ButtonType,h=m.ListSeparators,j=m.ListType,k=m.PlacementType,l=m.ToolbarDesign;sap.ui.jsview("sap.ushell.components.shell.MeArea.MeArea",{createContent:function(C){this.addStyleClass('sapUshellMeAreaView');this.aDanglingControls=[];var u=sap.ushell.Container.getUser().getFullName(),p,t=r.i18n,o=(this.getViewData()?this.getViewData().config:{})||{},s=o.appState,n=(s==='embedded'||s==='embedded-home'||s==='standalone'||s==='blank-home'||s==='blank'),q,w=e.get("sap.ushell.ui5service.UserStatus"),x;if(w){var y=w.createInstance();x=function(i){y.then(function(w){w.setStatus(i);p.close();});};}q=[new U({status:U.prototype.STATUS_ENUM.AVAILABLE,id:"userStatusItem1",isOpener:false,press:function(i){x(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.AVAILABLE);}.bind(this)}).addStyleClass('sapUserStatusContainer'),new U({status:U.prototype.STATUS_ENUM.AWAY,id:"userStatusItem2",isOpener:false,press:function(i){x(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.AWAY);}.bind(this)}).addStyleClass('sapUserStatusContainer'),new U({status:U.prototype.STATUS_ENUM.BUSY,id:"userStatusItem3",isOpener:false,press:function(i){x(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.BUSY);}.bind(this)}).addStyleClass('sapUserStatusContainer'),new U({status:U.prototype.STATUS_ENUM.APPEAR_OFFLINE,id:"userStatusItem4",isOpener:false,press:function(i){x(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.APPEAR_OFFLINE);}.bind(this)}).addStyleClass('sapUserStatusContainer')];if(!o.disableSignOut){q.push(new U({status:U.prototype.STATUS_ENUM.SIGNOUT,id:"userStatusLogout",isOpener:false,press:[C.logout,C]}).addStyleClass('sapUserStatusSignOutContainer'));}var z=new L({id:"sapUshellUserStatusItemList",showSeparators:"None",items:q});z.addCustomData(new b({key:"aria-labelledBy",value:"userStatusItem1",writeToDom:true}));p=new P("statuses",{placement:k.Bottom,showArrow:false,showHeader:false,content:z}).addStyleClass('sapUserStatusPopOver');p.addStyleClass("sapContrastPlus");p.setOffsetX(-3);q=[new T({text:u}).addStyleClass('sapUshellMeAreaUserName')];var E=new U({id:"userStatusOpener",visible:{parts:["/userStatusEnabled","/userStatusUserEnabled"],formatter:function(i,v){if(i&&v){return true;}return false;}.bind(this)},status:{path:"/userStatus",formatter:function(i){return U.prototype.STATUS_ENUM[i];}.bind(this)},tooltip:t.getText("userStatus_tooltip"),image:d.getIconURI("account"),press:function(i){var v=sap.ui.getCore().byId(i.mParameters.id);if(p.isOpen()){p.close();}else{p.openBy(v);}}.bind(this),contentList:p}).addStyleClass('sapUserStatusOpener');E.addCustomData(new b({key:"tabindex",value:"0",writeToDom:true}));E.addCustomData(new b({key:"aria-label",value:r.i18n.getText("OnlineStatus")+" "+t.getText("userStatus_tooltip"),writeToDom:true}));E.addCustomData(new b({key:"role",value:"listbox",writeToDom:true}));var F=new L({items:[E],backgroundDesign:f.Transparent});q.push(F);if(!o.disableSignOut){var G;if(!n){G=new B("logoutBtn",{visible:{parts:["/userStatusEnabled","/userStatusUserEnabled"],formatter:function(i,v){if(i&&v){return false;}return true;}.bind(this)},type:g.Transparent,icon:'sap-icon://log',text:r.i18n.getText("signoutBtn_title"),press:[C.logout,C]});q.push(G);}else{G=new sap.ushell.ui.launchpad.ActionItem("logoutBtn",{visible:true,type:g.Transparent,icon:'sap-icon://log',text:r.i18n.getText("signoutBtn_title"),press:[C.logout,C]});}}var J=new V({items:[q]}).addStyleClass("sapUshellUserArea");var K=sap.ushell.Container.getUser(),M=K.getImage(),N;if(!M){N=this.createPlaceHolderIcon();}else{N=this.createNewImage();}N.addStyleClass("sapUshellMeAreaUserImage");var Q=new H({items:[N,J]});K.attachOnSetImage(this._updateUserImage.bind({origScope:this,oUserHBox:Q,userBoxItem:N}));Q.addStyleClass('sapUshellMeAreaUserInfo');Q.addStyleClass('sapContrastPlus');Q.addEventDelegate({onsapskipback:function(i){i.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(i);},onsaptabprevious:function(i){i.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(i);}});var R=new O({id:"overflowActions",design:l.Transparent,content:{path:"/currentState/actions",factory:function(i,v){var _=sap.ui.getCore().byId(v.getObject());if(_){var a1=_.isA("sap.ushell.ui.shell.ShellHeadItem");if(a1){return undefined;}if(_.setActionType){_.setActionType("action");_.addStyleClass('sapContrastPlus');}C._addPressHandlerToActions(_);}return _;}}});R._getOverflowButtonSize=function(){return 82.4;};R.addCustomData(new b({key:"aria-label",value:r.i18n.getText("overflowActions_AriaLabel"),writeToDom:true}));if(R._getOverflowButton){var W=R._getOverflowButton();if(W){var X=W.onAfterRendering;W.onAfterRendering=function(){if(X){X.apply(this,arguments);}this.addStyleClass('sapUshellActionItem').addStyleClass('sapContrastPlus');this.setText(r.i18n.getText('meAreaMoreActions'));};}}R.updateAggregation=function(_){var a1=this.mBindingInfos[_],b1=this.getMetadata().getJSONKeys()[_],c1;jQuery.each(this[b1._sGetter](),jQuery.proxy(function(i,v){this[b1._sRemoveMutator](v);},this));jQuery.each(a1.binding.getContexts(),jQuery.proxy(function(i,v){c1=a1.factory(this.getId()+"-"+i,v);if(c1){this[b1._sMutator](c1.setBindingContext(v,a1.model));}},this));};var Y=new V("sapUshellMeAreaContent",{});this.actionBox=R;Y.addItem(Q);Y.addItem(R);if(o.enableRecentActivity){var Z=sap.ushell.Container.getRenderer("fiori2").oShellModel.getModel().getProperty('/currentState/showRecentActivity');if(Z===true){var $=this.createIconTabBar(C);$.done(function(i){Y.addItem(i);var v=sap.ushell.Container.getRenderer("fiori2").oShellModel.getModel().getProperty("/enableTrackingActivity");i.setVisible(v);});}}this.actionBox.addEventDelegate({onsaptabnext:function(i){var v=i.originalEvent,_=v.srcElement,a1=jQuery('.sapUshellActionItem:last')[0].id,b1,c1;c1=sap.ui.getCore().byId('meAreaIconTabBar').getVisible();b1=a1===_.id;if(b1===true&&!c1){i.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(i);}},onsapskipforward:function(i){var v=sap.ui.getCore().byId('meAreaIconTabBar').getVisible();if(!v){i.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(i);}}});return new S({vertical:true,horizontal:false,height:"100%",content:Y});},createIconTabBar:function(C){var R=new jQuery.Deferred(),t=this,i,o,n;sap.ui.require(['sap/m/IconTabBar','sap/m/CustomListItem','sap/m/IconTabFilter','sap/m/Text','sap/m/HBox'],function(p,q,s,T,H){i=new p('meAreaIconTabBar',{backgroundDesign:f.Transparent,expandable:false,items:[t.createIconTab("recentActivities",true,C,q,s,T,H),t.createIconTab("frequentActivities",false,C,q,s,T,H)]}).addStyleClass('sapUshellMeAreaTabBar');i.addEventDelegate({onsaptabnext:function(E){var u=E.originalEvent,v=u.srcElement,w=v.classList,x;x=jQuery.inArray('sapUshellMeAreaActivityItem',w)>-1;if(x===true){E.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(E);}},onsapskipforward:function(E){E.preventDefault();A.setIsFocusHandledByAnotherHandler(true);A.sendFocusBackToShell(E);}});o=i.onAfterRendering;i.onAfterRendering=function(){if(o){o.apply(t,arguments);}n=sap.ui.getCore().byId('meAreaIconTabBar--header');if(n){n.addStyleClass('sapContrastPlus');n.addStyleClass('sapUshellTabBarHeader');}};R.resolve(i);});return R.promise();},createIconTab:function(i,s,C,n,o,T,H){var p,q,t,u,v,w,x,M,y,z;p=function(E,F){q=F.getProperty("icon");t=F.getProperty("title");u=a.getDisplayName(F.getProperty("appType"));var G=new T({text:t}).addStyleClass('sapUshellMeAreaActivityItemTitle'),J=q?new c({src:q}).addStyleClass('sapUshellMeAreaActivityItemIcon'):null,K=new T({text:u}).addStyleClass('sapUshellMeAreaActivityItemDescription'),N=new T({text:s?F.getProperty("timestamp"):""}).addStyleClass('sapUshellMeAreaActivityItemInfo'),Q=new H({items:J?[J,K]:[K],justifyContent:"SpaceBetween"}),R=new H({items:s?[Q,N]:[Q],justifyContent:"SpaceBetween"}).addStyleClass('sapUshellMeAreaActivityItemContainer');v=new n({content:[G,R],type:j.Active}).addStyleClass('sapUshellMeAreaActivityItem');v.addCustomData(new b({key:"aria-describedby",value:w.getId(),writeToDom:true}));return v;};w=new o({id:"sapUshellIconTabBar"+i,text:r.i18n.getText(i)});x=new L({id:"sapUshellActivityList"+i,showSeparators:h.All,items:{path:"meAreaModel>/apps/"+i,factory:p.bind(this)},noDataText:r.i18n.getText(i+'NoDataText'),itemPress:function(E){M=this.getModel('meAreaModel');z=sap.ui.getCore().byId("viewPortContainer");if(z){z.switchState("Center");}y=E.getParameter('listItem').getBindingContextPath();C.setLastVisited(M.getProperty(y).url);setTimeout(function(){if(M.getProperty(y).url[0]==='#'){hasher.setHash(M.getProperty(y).url);}else{var F=this.getViewData()?this.getViewData().config:{};if(F.enableRecentActivity&&F.enableRecentActivityLogging){var R={title:M.getProperty(y).title,appType:"App",url:M.getProperty(y).url,appId:M.getProperty(y).url};sap.ushell.Container.getRenderer("fiori2").logRecentActivity(R);}window.open(M.getProperty(y).url,'_blank');}},200);}});w.addContent(x);return w;},onViewStateShow:function(){this.getController().refreshRecentActivities();this.getController().refreshFrequentActivities();if(this.actionBox){this.actionBox.updateAggregation("content");}this.getController().updateScrollBar(hasher.getHash());},createNewImage:function(){return new I({src:'{/userImage/personPlaceHolder}'});},createPlaceHolderIcon:function(){return new c({src:'{/userImage/personPlaceHolder}',size:'4rem'});},getControllerName:function(){return"sap.ushell.components.shell.MeArea.MeArea";},_updateUserImage:function(o){var u=(typeof o)==='string'?o:o.mParameters;this.oUserHBox.removeItem(this.userBoxItem);if((typeof u)==='string'){this.userBoxItem=this.origScope.createNewImage();}else{this.userBoxItem=this.origScope.createPlaceHolderIcon();}if(this.oUserHBox){this.oUserHBox.insertItem(this.userBoxItem,0);if(this.userBoxItem){this.userBoxItem.addStyleClass("sapUshellMeAreaUserImage");}}}});},false);},"sap/ushell/components/shell/MeArea/fiori3/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ushell/components/applicationIntegration/AppLifeCycle","sap/ushell/Config","sap/ushell/components/shell/MeArea/fiori3/MeArea.controller"],function(U,A,C,M){"use strict";var _;function a(){if(!_){_=sap.ushell.Container.getRenderer("fiori2");}return _;}return U.extend("sap.ushell.components.shell.MeArea.Component",{metadata:{version:"${version}",library:"sap.ushell.components.shell.MeArea",dependencies:{libs:["sap.m"]}},createContent:function(){this._bIsMeAreaCreated=false;this.oMeAreaController=new M();this.oMeAreaController.onInit();var t=this;A.getElementsModel().createTriggers([{fnRegister:function(){if(!t.oActionsDoable){t.oActionsDoable=C.on("/core/shell/model/currentState/actions").do(function(b){if(b&&b.length>0){a().showHeaderEndItem(["meAreaHeaderButton"],true);}else{a().hideHeaderEndItem(["meAreaHeaderButton"],true);}});}},fnUnRegister:function(){if(!t.oActionsDoable){t.oActionsDoable.off();t.oActionsDoable=null;}}}],false,["blank-home","blank"]);sap.ui.getCore().getEventBus().publish("shell","meAreaCompLoaded",{delay:0});},exit:function(){if(this.oActionsDoable){this.oActionsDoable.off();}this.oEventListener.off();this.oMeAreaController.onExit();}});});},"sap/ushell/components/shell/MeArea/fiori3/MeArea.controller.js":function(){sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller","sap/ui/Device","sap/ui/model/json/JSONModel","sap/m/ButtonType","sap/m/ListType","sap/m/StandardListItem","sap/ushell/components/applicationIntegration/AppLifeCycle","sap/ushell/Config","sap/ushell/resources","sap/ushell/ui/footerbar/AboutButton","sap/ushell/ui/footerbar/ContactSupportButton","sap/ushell/ui/footerbar/EndUserFeedback","sap/ushell/ui/launchpad/ActionItem","sap/ushell/ui/fiori3/QuickAccess","sap/ushell/EventHub"],function(q,C,D,J,B,L,S,A,a,r,b,c,E,d,Q,f){"use strict";var _;function g(){if(!_){_=sap.ushell.Container.getRenderer("fiori2");}return _;}function h(){return g().getShellConfig();}function i(){return A.getElementsModel().getModel();}function j(s){if(!sap.ui.getCore().byId(s)){q.sap.log.debug("Could not render ActionItem because it was not created: "+s);return false;}return true;}return C.extend("sap.ushell.components.shell.MeArea.fiori3.MeArea",{_aDanglingControl:[],_aDoables:[],onInit:function(){var t=this;var o=h();this._createActionButtons(o);var e=a.last("/core/shell/model/currentState/actions").filter(j);this.oModel=new J({actions:e,userName:sap.ushell.Container.getUser().getFullName()});this._aDoables.push(a.on("/core/shell/model/currentState/actions").do(function(k){var F=k.filter(j);t.getModel().setProperty("/actions",F);}));this._aDoables.push(f.on("showMeArea").do(function(s){var p=sap.ui.getCore().byId("sapUshellMeAreaPopover");if(p&&p.isOpen()||!s){t._toggleMeAreaPopover(false);}else{t._toggleMeAreaPopover(true);}}));},onExit:function(){this._destroyDanglingControls();this._aDoables.forEach(function(o){o.off();});this._aDanglingControl=[];this._aDoables=[];var p=sap.ui.getCore().byId("sapUshellMeAreaPopover");if(p){p.destroy();}},getModel:function(){return this.oModel;},_createActionButtons:function(o){var e=a.last("/core/extension/enableHelp");this._createAboutButton(e);if(o.enablePersonalization!==false&&!o.moveAppFinderActionToShellHeader){this._createAppFinderButton(o,e);}if(!o.moveUserSettingsActionToShellHeader){this._createSettingsButton(e);}if(!o.moveContactSupportActionToShellHeader){this._createSupportTicketButton(e);}this._createEndUserFeedbackButton(o,e);if(o.enableRecentActivity&&a.last("/core/shell/model/currentState/showRecentActivity")){this._createRecentActivitiesButton();this._createFrequentActivitiesButton();}if(!o.disableSignOut){this._createLogoutButton();}},_createAppFinderButton:function(o,e){if(sap.ui.getCore().byId("openCatalogBtn")){return;}var p=function(){sap.ushell.Container.getServiceAsync("URLParsing").then(function(u){var H;var s="#Shell-home&/appFinder/catalog";if(u){H=u.parseShellHash(window.hasher.getHash());H.action="appfinder";H.semanticObject="Shell";s="#"+u.constructShellHash(H);}setTimeout(function(){sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function(k){k.toExternal({target:{shellHash:s}});});},D.system.desktop?0:500);});};var O=new d("openCatalogBtn",{text:r.i18n.getText("open_appFinderBtn"),icon:"sap-icon://sys-find",visible:!o.disableAppFinder,press:p,actionType:"action"});if(e){O.addStyleClass("help-id-openCatalogActionItem");}this._addDanglingControl(O);},_createAboutButton:function(e){if(!sap.ui.getCore().byId("aboutBtn")){var o=new b("aboutBtn");if(e){o.addStyleClass("help-id-aboutBtn");}this._addDanglingControl(o);}},_createSettingsButton:function(e){var I="userSettingsBtn";if(!sap.ui.getCore().byId(I)){var u=new d(I,{text:r.i18n.getText("userSettings"),icon:"sap-icon://action-settings",press:function(){f.emit("openUserSettings",Date.now());}});if(e){u.addStyleClass("help-id-loginDetails");}this._addDanglingControl(u);}},_createSupportTicketButton:function(e){var t=this;a.on("/core/extension/SupportTicket").do(function(k){var I="ContactSupportBtn";var o=sap.ui.getCore().byId(I);if(k&&!o){o=new c(I);t._addDanglingControl(o);if(e){o.addStyleClass("help-id-contactSupportBtn");}}if(k){g().showActionButton(I);}else{g().hideActionButton(I);}});},_createEndUserFeedbackButton:function(o,e){var I="EndUserFeedbackBtn";var k=sap.ui.getCore().byId(I);if(!k){var l=g().getEndUserFeedbackConfiguration();k=new E(I,{showAnonymous:l.showAnonymous,anonymousByDefault:l.anonymousByDefault,showLegalAgreement:l.showLegalAgreement,showCustomUIContent:l.showCustomUIContent,feedbackDialogTitle:l.feedbackDialogTitle,textAreaPlaceholder:l.textAreaPlaceholder,customUIContent:l.customUIContent});if(e){k.addStyleClass("help-id-EndUserFeedbackBtn");}k.setModel(i());this._addDanglingControl(k);}this._setupEndUserFeedbackButton(o);},_setupEndUserFeedbackButton:function(o){var I="EndUserFeedbackBtn";a.emit("/core/shell/model/showEndUserFeedback",false);function s(k,l){try{k.isEnabled().done(function(){a.emit("/core/shell/model/showEndUserFeedback",true);var m=g().getEndUserFeedbackConfiguration();if(o.moveGiveFeedbackActionToShellHeader){q.sap.measure.start("FLP:Shell.controller._createActionButtons","create give feedback as shell head end item","FLP");var t=sap.ui.getCore().byId("EndUserFeedbackHandlerBtn");if(t){t.setModel(i());t.setShowAnonymous(m.showAnonymous);t.setAnonymousByDefault(m.anonymousByDefault);t.setShowLegalAgreement(m.showLegalAgreement);t.setShowCustomUIContent(m.showCustomUIContent);t.setFeedbackDialogTitle(m.feedbackDialogTitle);t.setTextAreaPlaceholder(m.textAreaPlaceholder);t.setAggregation("customUIContent",m.customUIContent,false);l.attachPress(function(){t.firePress();});}q.sap.measure.end("FLP:Shell.controller._createActionButtons");}l.setVisible(true);g().showActionButton(I);}).fail(function(){g().hideActionButton(I);});}catch(e){q.sap.log.error("EndUserFeedback adapter is not found",e.message||e);}}a.on("/core/extension/EndUserFeedback").do(function(e){var k=sap.ui.getCore().byId(I);if(e){sap.ushell.Container.getServiceAsync("EndUserFeedback").then(function(l){s(l,k);});}else if(k){a.emit("/core/shell/model/showEndUserFeedback",false);g().hideActionButton(I);}});},_createRecentActivitiesButton:function(){var t=this,I="recentActivitiesBtn";a.on("/core/shell/model/enableTrackingActivity").do(function(e){if(e){var R=sap.ui.getCore().byId(I);if(!R){R=new d(I,{text:r.i18n.getText("recentActivities"),icon:"sap-icon://customer-history",press:function(){Q.openQuickAccessDialog("recentActivityFilter","meAreaHeaderButton");}});t._addDanglingControl(R);}g().showActionButton(I,false);}else{g().hideActionButton(I,false);}});},_createFrequentActivitiesButton:function(){var t=this,I="frequentActivitiesBtn";a.on("/core/shell/model/enableTrackingActivity").do(function(e){if(e){var F=sap.ui.getCore().byId(I);if(!F){F=new d(I,{text:r.i18n.getText("frequentActivities"),icon:"sap-icon://activity-individual",tooltip:r.i18n.getText("frequentActivitiesTooltip"),press:function(){Q.openQuickAccessDialog("frequentlyUsedFilter","meAreaHeaderButton");}});t._addDanglingControl(F);}g().showActionButton(I,false);}else{g().hideActionButton(I,false);}});},_createLogoutButton:function(){var I="logoutBtn";if(sap.ui.getCore().byId(I)){return;}var l=new d(I,{visible:true,type:B.Transparent,icon:"sap-icon://log",text:r.i18n.getText("signoutBtn_title"),press:this.logout});this._addDanglingControl(l);g().showActionButton(I,false);},logout:function(){sap.ui.require(["sap/m/MessageBox","sap/ushell/ui/launchpad/LoadingDialog"],function(M,e){var l=new e({text:""}),s=true,I=false,o={};sap.ushell.Container.getGlobalDirty().done(function(k){s=false;if(I===true){l.exit();l=new e({text:""});}var m=function(k){var o={},R=r.i18n;if(k===sap.ushell.Container.DirtyState.DIRTY){o.message=R.getText("unsaved_data_warning_popup_message");o.icon=M.Icon.WARNING;o.messageTitle=R.getText("unsaved_data_warning_popup_title");}else{o.message=R.getText("signoutConfirmationMsg");o.icon=M.Icon.QUESTION;o.messageTitle=R.getText("signoutMsgTitle");}return o;};o=m(k);M.show(o.message,o.icon,o.messageTitle,[M.Action.OK,M.Action.CANCEL],function(n){if(n===M.Action.OK){l.openLoadingScreen();l.showAppInfo(r.i18n.getText("beforeLogoutMsg"),null);sap.ushell.Container.logout();}},sap.ui.core.ElementMetadata.uid("confirm"));});if(s===true){l.openLoadingScreen();I=true;}});},_addDanglingControl:function(o){this._aDanglingControl.push(o);},_destroyDanglingControls:function(){if(this._aDanglingControl){this._aDanglingControl.forEach(function(o){if(o.destroyContent){o.destroyContent();}o.destroy();});}},_toggleMeAreaPopover:function(s){var p=sap.ui.getCore().byId("sapUshellMeAreaPopover");if(!p){p=sap.ui.xmlfragment("sap.ushell.components.shell.MeArea.fiori3.MeAreaPopover",this);p.setModel(this.getModel());}if(s){p.openBy(sap.ui.getCore().byId("meAreaHeaderButton"));}else{p.close();}},meAreaPopoverItemFactory:function(I,o){var e=sap.ui.getCore().byId(o.getObject()),l;l=new S({id:I+"-"+e.getId(),icon:e.getIcon(),iconInset:true,title:e.getText(),type:L.Active,customData:[{key:"actionItemId",value:e.getId()}],press:function(){if(e){e.firePress();}f.emit("showMeArea",false);}});l.addStyleClass("sapUshellMeAreaActionItem");return l;}});});},"sap/ushell/components/shell/MeArea/fiori3/MeAreaPopover.fragment.xml":'<core:FragmentDefinition\n        xmlns="sap.m" xmlns:core="sap.ui.core">\n    <Popover\n            id="sapUshellMeAreaPopover"\n            placement="Bottom"\n            showArrow="true"\n            showHeader="false"\n            class="sapUshellPopupContainer sapUiSizeCompact">\n        <content>\n            <List\n                class="sapUshellPopoverList"\n                showSeparators="None"\n                includeItemInSelection="true"\n                items="{\n                    path: \'/actions\',\n                    factory: \'.meAreaPopoverItemFactory\'\n                }">\n                <headerToolbar>\n                    <Toolbar style="Clear">\n                        <Title level="H5" text="{/userName}"/>\n                    </Toolbar>\n                </headerToolbar>\n            </List>\n       </content>\n    </Popover>\n</core:FragmentDefinition>'},"Component-preload");
