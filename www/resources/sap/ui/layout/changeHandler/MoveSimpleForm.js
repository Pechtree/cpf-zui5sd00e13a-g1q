/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/util/uid","sap/base/Log","sap/ui/thirdparty/jquery"],function(J,u,L,q){"use strict";var M={};M.CHANGE_TYPE_MOVE_FIELD="moveSimpleFormField";M.CHANGE_TYPE_MOVE_GROUP="moveSimpleFormGroup";M.sTypeTitle="sap.ui.core.Title";M.sTypeMTitle="sap.m.Title";M.sTypeToolBar="sap.m.Toolbar";M.sTypeOverflowToolBar="sap.m.OverflowToolbar";M.sTypeLabel="sap.m.Label";M.sTypeSmartLabel="sap.ui.comp.smartfield.SmartLabel";M.CONTENT_AGGREGATION="content";var f=function(o,s,C){for(var i=0;i<C.length;i++){var t=o.getControlType(C[i]);if(s.indexOf(t)===-1){if(o.getVisible(C[i])){return true;}}else{return false;}}};var a=function(o,C,s,p,S,h){if(f(o,S,C)){var v=p.view;var i=p.appComponent;var t=o.createControl("sap.ui.core.Title",i,v,h);o.setProperty(t,"text","");o.insertAggregation(s,"content",t,0,v);}return o.getAggregation(s,"content");};var m=function(o,s,C,h){var R;var j=-1;if(f(o,s,C)){j++;}for(var i=0;i<C.length;i++){var t=o.getControlType(C[i]);if(s.indexOf(t)>-1){j++;if(j===h){R=C[i];break;}}}return C.indexOf(R);};var I=function(E,i,o){if(i>=E.length||i===-1){return true;}var t=o.getControlType(E[i]);return(M.sTypeTitle===t||M.sTypeToolBar===t||M.sTypeMTitle===t||M.sTypeOverflowToolBar===t);};var b=function(o,h,C,s){var i=0;for(i=h+1;i<C.length;++i){var t=o.getControlType(C[i]);if(s.indexOf(t)>-1){break;}}return i-h;};var g=function(o,E,i){return b(o,i,E,[M.sTypeTitle,M.sTypeMTitle,M.sTypeToolBar,M.sTypeOverflowToolBar,M.sTypeLabel,M.sTypeSmartLabel]);};var c=function(o,C,i,F,U){if(!I(C,i,o)){L.error("Illegal argument. iIndex has to point to a Label.");}else{F=U?F+1:F;var h=0;var j=i;var k;while(j<C.length&&h<F){++h;k=g(o,C,j);j+=k;}return j;}};var A=function(s,S,t,T,h){var R=t;for(var i=0;i<h;i++){R.splice(T+i,0,s[S+i]);}return R;};var G=function(h){var R=h.getTitle();if(!R){R=h.getToolbar();}return R;};var d=function(s,h,S,t,p){var o=G(h.element);var i=J.getSelector(s,p.appComponent);var j={elementSelector:J.getSelector(o,p.appComponent),source:{groupIndex:h.sourceIndex},target:{groupIndex:h.targetIndex}};return{changeType:M.CHANGE_TYPE_MOVE_GROUP,targetSelector:i,movedControl:o,movedElements:[j]};};var e=function(s,h,S,t,p){var o=J.getSelector(s,p.appComponent);var l=h.element.getLabel();var i=J.getSelector(l,p.appComponent);var T=G(t.parent);var j=G(S.parent);var k=J.getSelector(T,p.appComponent);var n=J.getSelector(j,p.appComponent);var v={elementSelector:i,source:{groupSelector:n,fieldIndex:h.sourceIndex},target:{groupSelector:k,fieldIndex:h.targetIndex}};return{changeType:M.CHANGE_TYPE_MOVE_FIELD,targetSelector:o,target:T,source:j,movedControl:l,movedElements:[v]};};var r=function(o,s,M,C,v){o.removeAllAggregation(s,M.CONTENT_AGGREGATION);for(var i=0;i<C.length;++i){o.insertAggregation(s,M.CONTENT_AGGREGATION,C[i],i,v);}};M.applyChange=function(C,s,p){var o=p.modifier;var v=p.view;var h=p.appComponent;var t,i;var j=C.getContent();var k=j.movedElements[0];var l=o.getAggregation(s,M.CONTENT_AGGREGATION);var n=l.map(function(Y){return o.getSelector(Y,h);});var S={content:n};C.setRevertData(S);if(C.getChangeType()===M.CHANGE_TYPE_MOVE_FIELD){var w=o.bySelector(k.elementSelector||k.element,h,v);var x=l.indexOf(w);var y=g(o,l,x);t=o.bySelector(k.target.groupSelector||k.target.groupId,h,v);var T=l.indexOf(t);var z=o.bySelector(k.source.groupSelector||k.source.groupId,h,v);var B=l.indexOf(z);var D=c(o,l,T,k.target.fieldIndex,(B===T)&&(k.source.fieldIndex<k.target.fieldIndex));var E=g(o,l,D);i=l.slice();var F=i.slice(x,x+y);var H,K,N,O;if(x<D){H=i.slice(0,x);N=i.slice(x+y,D+E);O=i.slice(D+E,i.length);i=H.concat(N.concat(F.concat(O)));}else if(x>D){K=i.slice(0,D+E);N=i.slice(D+E,x);O=i.slice(x+y,i.length);i=K.concat(F.concat(N.concat(O)));}if(x!=D){r(o,s,M,i,v);}}else if(C.getChangeType()===M.CHANGE_TYPE_MOVE_GROUP){var P=[M.sTypeTitle,M.sTypeToolBar,M.sTypeMTitle,M.sTypeOverflowToolBar];var Q=o.bySelector(k.elementSelector||k.element,h,v);if(k.target.groupIndex===0||!Q){l=a(o,l,s,p,P,j.newControlId);}var R=Q?l.indexOf(Q):0;var U=m(o,P,l,k.target.groupIndex);t=l[U];var V=b(o,U,l,P);var W=b(o,R,l,P);i=l.slice();i.splice(R,W);U=i.indexOf(t);var X=k.source.groupIndex<k.target.groupIndex?V:0;i=A(l,R,i,U+X,W);r(o,s,M,i,v);}else{L.warning("Unknown change type detected. Cannot apply to SimpleForm");}return true;};M.completeChangeContent=function(C,s,p){var S;var o=p.modifier;var v=p.view;var h=p.appComponent;var i=o.bySelector(s.selector,h,v);var j=s.movedElements;if(j.length>1){L.warning("Moving more than 1 Formelement is not yet supported.");}var k=j[0];k.element=sap.ui.getCore().byId(k.id);var l=q.extend({},s.source);var t=q.extend({},s.target);if(!t.parent){t.parent=sap.ui.getCore().byId(t.id);}if(!l.parent){l.parent=sap.ui.getCore().byId(l.id);}if(i&&k.element&&t.parent){if(s.changeType==="moveSimpleFormGroup"){S=d(i,k,l,t,p);}else if(s.changeType==="moveSimpleFormField"){S=e(i,k,l,t,p);}}else{L.error("Element not found. This may be caused by an unstable id!");}var n=C.getDefinition();n.content.targetSelector=S.targetSelector;n.content.movedElements=S.movedElements;n.content.newControlId=h.createId(u());if(S.source&&S.target){C.addDependentControl(S.source,"sourceParent",p);C.addDependentControl(S.target,"targetParent",p);}C.addDependentControl([S.movedControl],"movedElements",p);};M.revertChange=function(C,s,p){var o=p.modifier;var h=p.appComponent;var v=p.view;var i=C.getRevertData().content;var j=i.map(function(S){return o.bySelector(S,h,v);});r(o,s,M,j,v);C.resetRevertData();return true;};return M;},true);
