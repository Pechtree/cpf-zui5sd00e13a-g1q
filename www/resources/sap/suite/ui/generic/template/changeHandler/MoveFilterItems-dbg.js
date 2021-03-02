/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */

sap.ui.define([
	"jquery.sap.global",
	"sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils",
	"sap/suite/ui/generic/template/changeHandler/util/AnnotationChangeUtilsV2",
	"sap/suite/ui/generic/template/changeHandler/generic/MoveElements"
], function(
	jQuery,
	Utils,
	AnnotationChangeUtils,
	MoveElements
) {
	"use strict";

	/**
	 * Change handler for moving a filter item.
	 *
	 * @alias sap.suite.ui.generic.template.changeHandler.MoveFilterItem
	 * @author SAP SE
	 * @version 1.65.1
	 * @experimental
	 */
	var MoveFilterItems = {};

	MoveFilterItems.applyChange = function (oChange, oControl, mPropertyBag) {
		// nothing so far
		// if needed, there should be call to applyChange of the SmartFilterBar's change handler
	};

	MoveFilterItems.completeChangeContent = function (oChange, oSpecificChangeInfo, mPropertyBag) {
		oSpecificChangeInfo.custom = {};
		oSpecificChangeInfo.custom.fnGetRelevantElement = Utils.getSmartFilterBarControlConfiguration;
		oSpecificChangeInfo.custom.fnGetAnnotationIndex = Utils.getRecordIndexForSelectionField;
		MoveElements.completeChangeContent(oChange, oSpecificChangeInfo, mPropertyBag);
	};

	return MoveFilterItems;
},
/* bExport= */true);
