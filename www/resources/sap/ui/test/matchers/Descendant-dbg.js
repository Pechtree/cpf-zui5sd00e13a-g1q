/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/base/Log",
	"sap/ui/test/matchers/_Visitor"
], function (Log, _Visitor) {
	"use strict";

	var oLogger = Log.getLogger("sap.ui.test.matchers.Descendant");
	var oVisitor = new _Visitor();

	/**
	 * @class Checks if a control has a given descendant.
	 * @param {object|string} vDescendantControl The descendant control to check. If undefined,
	 * it validates every control to true. Can be a control or a control ID
	 * @param {boolean} [bDirect] specifies if the descendant should be a direct child
	 * @public
	 * @name sap.ui.test.matchers.Descendant
	 * @since 1.66
	 */

	return function (vDescendantControl, bDirect) {
		return function (oControl) {
			if (!vDescendantControl) {
				oLogger.debug("No descendant was defined so no controls will be filtered.");
				return true;
			}

			var oDescendantControl;
			if (typeof vDescendantControl === "string") {
				oDescendantControl = sap.ui.getCore().byId(vDescendantControl);
			} else {
				oDescendantControl = vDescendantControl;
			}

			var bResult = oVisitor.isMatching(oDescendantControl, function (oAncestor) {
				return oControl === oAncestor;
			}, bDirect);


			if (!bResult) {
				oLogger.debug("Control '" + oControl + "' does not have " + (bDirect ? "direct " : "") + "descendant '" + oDescendantControl);
			}

			return bResult;
		};
	};

}, /* bExport= */ true);
