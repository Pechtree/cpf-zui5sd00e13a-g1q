/*!
	 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
	 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/fl/changeHandler/BaseRename"],function(U,B){"use strict";var r={propertyName:"title",changePropertyName:"newText",translationTextType:"XGRP"};var R=B.createRenameChangeHandler(r);R._getControlForRename=function(c,m){var s=m.getAggregation(c,"subSections");if(s&&s.length===1&&m.getProperty(s[0],"title")&&m.getProperty(m.getParent(c),"subSectionLayout")==="TitleOnTop"){return s[0];}return c;};R._getSetterMethodName=function(v,p,m){return U.isBinding(v)?"setPropertyBinding":"setProperty";};R.applyChange=function(c,C,p){var m=p.modifier;var P=r.propertyName;var o=c.getDefinition();var t=o.texts[r.changePropertyName];var v=t.value;var a=R._getControlForRename(C,m);if(typeof v==="string"&&v.trim()===""){throw new Error("Change cannot be applied as ObjectPageSubSection's title cannot be empty: ["+o.layer+"]"+o.namespace+"/"+o.fileName+"."+o.fileType);}if(o.texts&&t&&typeof(v)==="string"){c.setRevertData(m.getProperty(a,P));var M=R._getSetterMethodName(v);m[M](a,P,v);return true;}else{U.log.error("Change does not contain sufficient information to be applied: ["+o.layer+"]"+o.namespace+"/"+o.fileName+"."+o.fileType);}};R.revertChange=function(c,C,p){var o=c.getRevertData();if(typeof(o)==="string"){var m=p.modifier;var a=R._getControlForRename(C,m);var P=r.propertyName;var M=R._getSetterMethodName(o);m[M](a,P,o);c.resetRevertData();return true;}else{U.log.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange.");}};return R;},true);
