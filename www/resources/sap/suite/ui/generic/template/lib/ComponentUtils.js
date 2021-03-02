sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/base/Log","sap/suite/ui/generic/template/js/AnnotationHelper"],function(q,B,L,A){"use strict";var C={isPreliminary:function(){return false;}};function g(c,o){var t=o.oTemplateContract.mRoutingTree[o.route];var h;var H;var a;var b;var I=false;var d=[];var e=[];function f(i){var m1;var n1=c.getModel();if(i){if(n1){m1=n1.getProperty(i);}}else{var o1=c.getBindingContext();if(o1){m1=o1.getObject();}}return!!(m1&&m1.__metadata&&m1.__metadata.created);}function j(){return c.getModel("_templPriv");}function k(){return j().getProperty("/generic/viewLevel");}function l(){return o.preprocessorsData;}function m(){return o.oParameterModel;}function n(){var i=c.getModel("i18n").getResourceBundle();return{dataLoadFailedTitle:i.getText("ST_ERROR"),dataLoadFailedText:i.getText("ST_GENERIC_ERROR_LOAD_DATA_TEXT")};}function p(i,m1,n1){if(typeof n1!=="function"){throw new Error("Event handler must be a function");}e.push({template:i,event:m1,handler:n1});}function D(m1,n1,o1){for(var i=e.length;i--;){if(e[i].handler===o1&&e[i].event===n1&&e[i].template===m1){e.splice(i,1);}}}function F(m1,n1,o1){for(var i=0;i<e.length;i++){if(e[i].event===n1&&e[i].template===m1){e[i].handler(o1);}}}function r(i){return i.getMetadata().getName();}function s(){return o.oApplication.isComponentActive(c);}function u(){return o.oNavigationObserver.getProcessFinished(true);}function P(i,m1){var n1=u();n1.then(function(){if(s()){if(m1){M(true);}F(r(o.oController),"PageDataLoaded",{context:i});}});}function v(){h.then(function(i){if(i){P(i);}});}function S(){o.oHeaderLoadingObserver.startProcess();if(!b){var i=new Promise(function(m1){b=m1;});o.oApplication.getBusyHelper().setBusy(i);}}function N(){if(!H){h=new Promise(function(i){H=i;});}}N();function w(i){L.info("Request header data",i.getSource().getPath(),"Class sap.suite.ui.generic.template.lib.ComponentUtils");I=true;N();if(!c.getComponentContainer().getElementBinding().isSuspended()){S();}}function E(){if(b){b();b=null;}o.oHeaderLoadingObserver.stopProcess();}function x(i){var m1=i.getSource().getBoundContext();if(m1){return m1;}if(c.getComponentContainer().getElementBinding().isSuspended()){m1=null;}else{m1=C;}U();return m1;}function y(){var i=n();var m1=c.getAppComponent().getNavigationController();m1.navigateToMessagePage({title:i.dataLoadFailedTitle,text:i.dataLoadFailedText,description:"",viewLevel:k()});}function z(){I=false;if(!a){return;}if(a===C){y();}else if(!c.getComponentContainer().getElementBinding().isSuspended()){(o.methods.updateBindingContext||q.noop)();if(H){H(a);}}else{return;}H=null;a=null;}function G(i){L.info("Received header data",i.getSource().getPath(),"Class sap.suite.ui.generic.template.lib.ComponentUtils");E();if(I){a=x(i);}z();}function J(i){var m1=x(i);if(m1&&m1.isPreliminary()){return;}a=m1;z();o.oHeaderLoadingObserver.stopProcess();}function R(i){var m1={createPreliminaryContext:true};var n1=l();if(n1.rootContextExpand&&n1.rootContextExpand.length){m1.expand=n1.rootContextExpand.join(",");}o.oHeaderLoadingObserver.startProcess();if(o.methods.beforeRebind){o.methods.beforeRebind();}N();a=null;c.getComponentContainer().bindElement({path:i,events:{dataRequested:w,dataReceived:G,change:J},parameters:m1,batchGroupId:"Changes",changeSetId:"Changes"});if(o.methods.afterRebind){o.methods.afterRebind();}}function U(){N();var i=c.getComponentContainer();i.unbindElement();a=null;I=false;E();}function K(){var m1=_();var n1=(m1.length===d.length);for(var i=0;i<m1.length&&n1;i++){n1=m1[i]===d[i];}d=m1;return!n1;}function M(i){o.reuseComponentsReady.then(function(m1){for(var n1 in m1){m1[n1].pathUnchangedCallBack(i);}});}function O(i,m1){var n1=Object.create(null);for(var o1 in i){var p1=i[o1];n1[o1]=m1(p1,o1);}return n1;}function Q(){var i=j();for(var m1 in o.routeConfig.embeddedComponents){var n1=!!o.routeConfig.embeddedComponents[m1].hiddenByDefault;i.setProperty("/generic/embeddedComponents/"+m1+"/hidden",n1);}}function T(i,m1){var n1=K();if(n1&&!m1){Q();}if(!i){if(o.routingSpec&&o.routingSpec.noOData){P(null,n1);}return;}var o1=c.getComponentContainer();if(!o1){return;}if(f(i)){U();var p1=o1.getModel().getContext(i);if(H){H(p1);H=null;}else{h=Promise.resolve(p1);}if(!m1){v();}o1.setBindingContext(p1);Promise.all([o.oViewRenderedPromise,o.viewRegistered]).then(M.bind(null,true));}else{var q1=o1.getElementBinding();if(q1){if(q1.getPath()===i){if(q1.isSuspended()){q1.resume();z();}if(I){S();}o.oApplication.getBusyHelper().getUnbusy().then(M.bind(null,n1&&o.routingSpec.noOData));if(!m1){v();}return;}else if(!m1){U();}}var r1=c.getModel("ui");r1.setProperty("/enabled",false);r1.setProperty("/editable",false);R(i);v();}}function V(){var i=c.getComponentContainer().getElementBinding();if(i){c.getModel().invalidateEntry(i.getBoundContext());if(i.isSuspended()){U();}else{i.refresh(true);}}}function W(i){i=i||c.getIsRefreshRequired();if(i||!q.isEmptyObject(o.mRefreshInfos)){(o.methods.refreshBinding||q.noop)(i,o.mRefreshInfos);c.setIsRefreshRequired(false);o.mRefreshInfos=Object.create(null);}M(i);}function X(){var i=c.getComponentContainer();var m1=i.getBindingContext();var n1=m1&&m1.getPath();var o1=n1&&f(n1);if(o1){i.setBindingContext();return;}var p1=i.getElementBinding();if(p1&&!p1.isSuspended()){if(o.oTemplateContract.oValidationMessageBinding.getLength()){U();}else{p1.suspend();}E();}}function Y(i){o.oApplication.setBackNavigation(i);}function Z(i){var m1=k();return o.oApplication.registerContext(i,m1,c.getEntitySet());}function $(){return o.oApplication.getBreadCrumbInfo(c.getEntitySet());}function _(){return o.oApplication.getCurrentKeys(k());}function a1(i){return o.oApplication.getCommunicationObject(c,i);}function b1(i,m1,n1,o1){o.oApplication.navigateRoute(i,m1,o,n1,o1);}function c1(){var i=c.getEntitySet();var t=o.oTemplateContract.mEntityTree[i];return t.headerTitle;}function d1(){var i=c.getEntitySet();var t=o.oTemplateContract.mEntityTree[i];return t.isDraft;}function e1(){if(d1()){var i=o.oApplication.getHierarchySectionsFromCurrentHash();return"/"+i[0];}}function f1(){return!(o.routingSpec&&o.routingSpec.noOData);}function g1(){return h;}function h1(){return o.oTemplateContract.oPaginatorInfo[k()-1];}function i1(i,m1){var n1=k();if(!m1){n1--;}o.oTemplateContract.oPaginatorInfo[n1]=i;}function j1(i,m1){o.reuseComponentsReady.then(function(n1){var o1=m1.getComponentInstance();for(var p1 in n1){if(o1===n1[p1].component){var q1=j();q1.setProperty("/generic/embeddedComponents/"+p1+"/isInVisibleArea",i);return;}}});}function k1(i){i.oStatePreserverPromise=o.reuseComponentsReady.then(function(m1){var n1={appStateName:encodeURI("sap-iapp-state-"+o.routeConfig.entitySet),getCurrentState:function(){var p1=i.getCurrentState?i.getCurrentState():Object.create(null);var q1=function(r1,s1){if(r1.component.stGetCurrentState){var t1=r1.component.stGetCurrentState();for(var u1 in t1){p1["$embeddedComponent$"+s1.length+"$"+s1+"$"+u1]=t1[u1];}}};O(m1,q1);return p1;},applyState:function(p1,q1){var r1=Object.create(null);var s1=Object.create(null);for(var t1 in p1){if(t1.indexOf("$embeddedComponent$")===0){var u1=t1.substring(19);var v1=u1.indexOf("$");var w1=Number(u1.substring(0,v1));var x1=u1.substring(v1+1,v1+w1+1);var y1=s1[x1];if(!y1){y1=Object.create(null);s1[x1]=y1;}var z1=u1.substring(v1+w1+2);y1[z1]=p1[t1];}else{r1[t1]=p1[t1];}}(i.applyState||q.noop)(r1,q1);var A1=function(B1,C1){if(B1.component.stApplyState){B1.component.stApplyState(s1[C1]||Object.create(null),q1);}};o.oViewRenderedPromise.then(O.bind(null,m1,A1));},oComponent:c};var o1=o.oApplication.getStatePreserver(n1);o.oApplication.registerStateChanger(o1.getAsStateChanger());return o1;});o.oTemplateContract.oStatePreserversAvailablePromise=Promise.all([o.oTemplateContract.oStatePreserversAvailablePromise,i.oStatePreserverPromise]);}function l1(){var i=o.oTemplateContract.oFlexibleColumnLayoutHandler;return i?i.getFclProxy(t):{handleDataReceived:t.level?null:q.noop,isListAndFirstEntryLoadedOnStartup:t.level?null:q.noop};}return{setEditableNDC:function(i){o.oApplication.setEditableNDC(i);},getEditableNDC:function(){return o.oApplication.getEditableNDC();},getBusyHelper:function(){return o.oApplication.getBusyHelper();},isNonDraftCreate:f,attach:function(i,m1,n1){p(r(i),m1,n1);},detach:function(i,m1,n1){D(r(i),m1,n1);},fire:function(i,m1,n1){F(r(i),m1,n1);},isListReportTemplate:function(){return A.isListReportTemplate(o.routeConfig);},getPreprocessorsData:l,getParameterModelForTemplating:m,bindComponent:T,refreshBinding:W,refreshBindingUnconditional:V,suspendBinding:X,setBackNavigation:Y,getTemplatePrivateModel:j,registerContext:Z,getViewLevel:k,getBreadCrumbInfo:$,getCurrentKeys:_,getDraftRootPath:e1,getCommunicationObject:a1,navigateRoute:b1,getTitleFromTreeNode:c1,isDraftEnabled:d1,isODataBased:f1,isComponentActive:s,navigateToDataLoadedFailedPage:y,getHeaderDataAvailablePromise:g1,getPaginatorInfo:h1,setPaginatorInfo:i1,onVisibilityChangeOfReuseComponent:j1,getNavigationFinishedPromise:u,setStatePreserverPromise:k1,unbind:U,getFclProxy:l1};}return B.extend("sap.suite.ui.generic.template.lib.ComponentUtils",{constructor:function(c,o){q.extend(this,g(c,o));}});});
