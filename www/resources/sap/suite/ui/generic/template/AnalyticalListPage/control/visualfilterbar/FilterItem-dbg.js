sap.ui.define(["sap/ui/core/Control", "sap/ui/model/Filter"],
	function(Control) {
	"use strict";

	/* all visual filters should extend this class */
	var FilterItem = Control.extend("sap.suite.ui.generic.template.AnalyticalListPage.control.visualfilterbar.FilterItem", {
		metadata: {
			properties: {
				selectFilters: { type: "any", group: "Misc", defaultValue: null },
				filterRestriction : { type: "string", group: "Misc", defaultValue: null },
				entitySet: { type: "string", group: "Misc", defaultValue: null },
				lazyLoadVisualFilter: { type: "boolean", group: "Misc", defaultValue: false },
				dimensionField: { type: "string", group: "Misc", defaultValue: null },
				dimensionFieldIsDateTime: { type: "boolean", group: "Misc", defaultValue: false },
				dimensionFieldIsDateTimeOffset: { type: "boolean", group: "Misc", defaultValue: false },
				dimensionFieldDisplay: { type: "string", group: "Misc", defaultValue: null },
				dimensionFilter: { type: "any", group: "Misc", defaultValue: null },
				dimensionFilterExternal: { type: "sap.ui.model.Filter", group: "Misc", defaultValue: null },
				measureField: { type: "string", group: "Misc", defaultValue: null },
				unitField: { type: "string", group: "Misc", defaultValue: null },
				isCurrency: { type: "boolean", group: "Misc", defaultValue: false },
				isMandatory: { type: "boolean", group: "Misc", defaultValue: false },
				isDropDown: { type: "boolean", group: "Misc", defaultValue: false },
				width: {type: "sap.ui.core.CSSSize", group: "Dimension", defaultValue : null},
				height: {type: "sap.ui.core.CSSSize", group: "Dimension", defaultValue : null},
				title: { type: "string", group: "Misc", defaultValue: "" },
				outParameter: { type: "string", group: "Misc", defaultValue: null },
				inParameters: { type: "object[]", group: "Misc", defaultValue: null},
				parentProperty: { type: "string", group: "Misc", defaultValue: null },
				sortOrder: { type: "object[]", group: "Misc", defaultValue: null},
				scaleFactor : {type: "string", group: "Misc", defaultValue: null},
				numberOfFractionalDigits: {type: "string", group: "Misc", defaultValue: null},
				textArrangement: {type: "string", group: "Misc", defaultValue: sap.ui.comp.smartfilterbar.DisplayBehaviour.descriptionAndId},
				chartQualifier: {type: "string", group: "Misc", defaultValue: null}
			},
			aggregations: {
				control: {type: "sap.ui.core.Control", multiple: false}
			},
			events: {
				filterChange: {},
				titleChange: {}
			}
		},
		renderer: {}
	});

	return FilterItem;

}, /* bExport= */ true);
