// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/Config","sap/ushell/EventHub","sap/ushell/utils","sap/ushell/utils/clone","sap/ushell/components/StateHelper","sap/ushell/components/_HeaderManager/PropertyStrategiesFactory",'sap/ui/core/theming/Parameters','sap/base/util/ObjectPath','sap/ui/Device'],function(C,E,u,c,S,g,T,O,D){"use strict";var h={application:{},centralAreaElement:null,headEndItems:[],headItems:[],headerVisible:true,showLogo:false,ShellAppTitleState:undefined,rootIntent:"",title:""};var H;var a;var B={"blank":{},"blank-home":{},"home":{"headItems":['meAreaHeaderButton']},"app":{"headItems":['meAreaHeaderButton','backBtn','homeBtn']},"minimal":{"headItems":['meAreaHeaderButton','homeBtn']},"standalone":{"headItems":['meAreaHeaderButton','backBtn']},"embedded":{"headItems":['meAreaHeaderButton','backBtn','homeBtn']},"embedded-home":{"headItems":['meAreaHeaderButton']},"headerless":{"headItems":['backBtn','homeBtn'],"headerVisible":false},"merged":{"headItems":['backBtn','homeBtn']},"headerless-home":{"headerVisible":false},"merged-home":{},"lean":{"headItems":['meAreaHeaderButton']},"lean-home":{}};var d=[];function b(i,I){var J=i&&i.appState?i.appState:"home";H=w(i);a=I;j(D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD));_();s(J);}function e(){f();}function _(){var i=E.on("setHeaderCentralAreaElement").do(function(P){p({propertyName:"centralAreaElement",value:P.id,aStates:S.getPassStates(P.states),bCurrentState:!!P.currentState,bDoNotPropagate:!!P.bDoNotPropagate});});d.push(i);d.push(E.on("ShellFloatingContainerDockedIsResized").do(j));d.push(E.on("updateHeaderOverflowState").do(j));D.media.attachHandler(j,this,D.media.RANGESETS.SAP_STANDARD);}function f(){if(d){d.forEach(function(i){i.off();});}D.media.detachHandler(j,this,D.media.RANGESETS.SAP_STANDARD);}function j(P){v(P);k();m(P);}function k(){if(C.last("/core/shell/enableFiori3")){return;}var i=jQuery("#mainShell").width()<1024&&jQuery(".sapUshellContainerDocked").length>0,I=C.last("/core/shell/model/currentViewPortState")==="Center",J=D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD).name,K=sap.ui.getCore().byId("homeBtn"),L=sap.ui.getCore().byId("backBtn"),M=J==="Desktop",N=J!=="Phone"||I;if(i){if(K){M=false;}}if(K){K.setVisible(M);}if(L){L.setVisible(N);}}function v(P){var i,I=C.last("/core/shell/model/currentState/stateName"),J=I==='merged'||I==='headerless',K=C.last("/core/shell/model/currentViewPortState")==="LeftCenter",L=true;if(P&&P.name){i=P.name;}else{i=D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD).name;}if(i==="Phone"&&!K||J){L=false;}p({propertyName:"showLogo",value:L,aStates:["home","app","blank","blank-home","minimal","lean"],bCurrentState:false,bDoNotPropagate:true});}function l(i,I){if(i&&i.appState==="embedded"){I.setLogo(sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif'));return;}function J(L){var M=/url[\s]*\('?"?([^'")]*)'?"?\)/.exec(L);return M?M[1]:null;}function K(){var L=J(T.get("sapUiGlobalLogo"))||sap.ui.require.toUrl("sap/ushell")+'/themes/base/img/sap_55x27.png';if(I){I.setLogo(L);}}if(sap.ui.getCore().isThemeApplied()){K();}sap.ui.getCore().attachThemeChanged(K);}function m(P){var i=C.last("/core/shellHeader/headEndItems");var I={"Phone":true,"Tablet":true};if(C.last("/core/shell/enableFiori3")){delete I["Tablet"];if(i.length<2||(i.length===2&&i.indexOf("meAreaHeaderButton")!==-1)){return;}}else if(i.length<2||(i.length===2&&i.indexOf("NotificationsCountButton")!==-1)){return;}function J(){r(["endItemsOverflowBtn"],false,["home","app"]);var L=sap.ui.getCore().byId('headEndItemsOverflow');if(L){L.destroy();}}var K=(P&&P.name)||D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD).name;if(K in I){if(i.indexOf("endItemsOverflowBtn")===-1){n(["endItemsOverflowBtn"],false,["home","app"]);}else{J();window.setTimeout(function(){n(["endItemsOverflowBtn"],false,["home","app"]);});}}else{J();}}function n(i,I,J,K){p({propertyName:"headEndItems",value:i,aStates:J,bCurrentState:!!I,bDoNotPropagate:!!K});}function r(i,I,J){p({propertyName:"headEndItems",value:i,aStates:J,bCurrentState:!!I,action:"remove",bDoNotPropagate:false});}function o(i,I){var J={};Object.keys(i).forEach(function(K){var L=i[K];J[K]=Object.keys(L).reduce(function(M,N){M[N]=L[N];return M;},c(I));});return J;}function p(P){var i=P.propertyName,I=!P.bCurrentState?S.getAllStateToUpdate(P.aStates,P.bDoNotPropagate):[],J=C.last("/core/shellHeader"),K=C.last("/core/shell/model/currentState/stateName"),L=P.value,M;if(i.charAt(0)==="/"){i=i.substring(1);}M=g(i,P.action);if(!M){return;}if(!P.bCurrentState){H=x(H,i,M,I,L);}if(I.indexOf(K)>-1||P.bCurrentState){var N=O.get(i.split("/"),J),Q=M.execute(N,L);if(N!==Q){O.set(i.split("/"),Q,J);z(i,J);}}if(P.bCurrentState){y(i,M,L);}}function q(i){var I;for(I in i){if(i.hasOwnProperty(I)){u.updateProperties(H[I],i[I]);}}}function s(i,I){var J=!I?H[i]:C.last("/core/shellHeader"),K,L;if(!J){throw new Error("the state ("+i+") does not exist");}if(a&&a.customShellState){K=a.customShellState.currentState;}if(I&&a.extendedShellStates[I]){L=a.extendedShellStates[I].customState.currentState;}C.emit("/core/shellHeader",t(J,K,L));}function t(i,I,J){var R={};Object.keys(i).forEach(function(P){var K=g(P),L;if(!K){R[P]=c(i[P]);return;}L=c(i[P]);if(J){L=K.execute(L,J[P]);}if(I){L=K.execute(L,I[P]);}R[P]=L;});return R;}function w(I){if(C.last("/core/shell/enableFiori3")){var J=Object.keys(B);for(var i=0;i<J.length;i++){var K=B[J[i]].headItems||[];var L=K.indexOf("meAreaHeaderButton");if(L>-1){K.splice(L,1);}}}if(I){h.rootIntent="#"+I.rootIntent;}var M=o(B,h);function N(Q,M){var R,U;for(R in M){if(R==="blank"||R==="blank-home"){continue;}if(Q==="ActionModeBtn"&&R==="app"){continue;}if((Q==="openCatalogBtn"||Q==="userSettingsBtn")&&(R==="lean"||R==="lean-home")){continue;}if(Q==="ContactSupportBtn"||Q==="EndUserFeedbackBtn"){if(["home","app","minimal","standalone","embedded","embedded-home","lean"].indexOf(R)===-1){continue;}}U=M[R].headEndItems.indexOf(Q);if(U===-1){M[R].headEndItems.push(Q);}}}function P(Q,M){var R;for(R in M){M[R].title=Q;}}if(I){if(I.moveEditHomePageActionToShellHeader){N("ActionModeBtn",M);}if(I.moveContactSupportActionToShellHeader){N("ContactSupportBtn",M);}if(I.moveGiveFeedbackActionToShellHeader){N("EndUserFeedbackBtn",M);}if(I.moveAppFinderActionToShellHeader){N("openCatalogBtn",M);}if(I.moveUserSettingsActionToShellHeader){N("userSettingsBtn",M);}if(I.title){P(I.title,M);}}return M;}function x(i,P,I,J,K){if(J.length===0){return i;}var N=c(i);J.forEach(function(L){var M=N[L],Q;if(M){Q=I.execute(O.get(P.split("/"),M),K);O.set(P.split("/"),Q,M);}});return N;}function y(P,i,I){var J,N;if(!a){return;}J=a.customShellState.currentState;N=i.execute(O.get(P.split("/"),J),I);O.set(P.split("/"),N,J);}function z(P,i){var R=P.split("/").shift();C.emit("/core/shellHeader/"+R,i[R]);}function A(i){var I;try{I=H[i];}catch(J){I=undefined;}return I;}function F(i,P){var I;try{I=A(i)[P];}catch(J){I=undefined;}return I;}function G(i){H=i;}return{init:b,destroy:e,updateStates:p,recalculateState:s,extendStates:q,initShellBarLogo:l,validateShowLogo:v,handleEndItemsOverflow:m,handleHomeAndBackButtonsVisibility:k,_resetBaseStates:G,_generateBaseHeaderState:o,_createInitialState:w,_getBaseState:A,_getBaseStateMember:F};},false);