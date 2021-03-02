/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/comp/library","sap/ui/core/Control","sap/suite/ui/microchart/DeltaMicroChart","sap/ui/comp/smartmicrochart/SmartMicroChartBase","sap/base/Log","./SmartMicroChartRenderer"],function(l,C,D,S,L){"use strict";var a=S.extend("sap.ui.comp.smartmicrochart.SmartDeltaMicroChart",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartmicrochart/SmartDeltaMicroChart.designtime",properties:{enableAutoBinding:{type:"boolean",group:"Misc",defaultValue:false}}},renderer:"sap.ui.comp.smartmicrochart.SmartMicroChartRenderer"});a.prototype._CHART_TYPE=["Delta"];a.prototype.init=function(){this._bIsInitialized=false;this._bMetaModelLoadAttached=false;this.setProperty("chartType",this._CHART_TYPE,true);this.setAggregation("_chart",new D(),true);};a.prototype.onBeforeRendering=function(){var c=this.getAggregation("_chart");c.setSize(this.getSize(),true);c.setWidth(this.getWidth(),true);};a.prototype._createAndBindInnerChart=function(){if(this._aDataPointAnnotations.length<2){L.error("Two DataPoint annotation are needed! Cannot create the SmartColumnMicroChart");return;}if(!(this._aDataPointAnnotations[0].Value&&this._aDataPointAnnotations[0].Value.Path&&this._aDataPointAnnotations[1].Value&&this._aDataPointAnnotations[1].Value.Path)){L.error("Value DataPoint annotation missing! Cannot create the SmartColumnMicroChart");return;}this.bindProperties();this._updateAssociations();};a.prototype.bindProperties=function(){var c=this.getAggregation("_chart"),f=this._getLabelNumberFormatter.call(this,this._aDataPointAnnotations[0].Value.Path),F=this._getLabelNumberFormatter.call(this,this._aDataPointAnnotations[1].Value.Path);c.bindProperty("value1",{path:this._aDataPointAnnotations[0].Value.Path,type:"sap.ui.model.odata.type.Decimal",events:{change:this._onBindingDataChange.bind(this)}});c.bindProperty("value2",{path:this._aDataPointAnnotations[1].Value.Path,type:"sap.ui.model.odata.type.Decimal",events:{change:this._onBindingDataChange.bind(this)}});c.bindProperty("displayValue1",{path:this._aDataPointAnnotations[0].Value.Path,formatter:f.format.bind(f)});c.bindProperty("displayValue2",{path:this._aDataPointAnnotations[1].Value.Path,formatter:f.format.bind(F)});if(this._aDataPointAnnotations[0].Title&&this._aDataPointAnnotations[0].Title.Path){c.bindProperty("title1",{path:this._aDataPointAnnotations[0].Title.Path});}if(this._aDataPointAnnotations[1].Title&&this._aDataPointAnnotations[1].Title.Path){c.bindProperty("title2",{path:this._aDataPointAnnotations[1].Title.Path});}if(this._aDataPointAnnotations[0].Criticality&&this._aDataPointAnnotations[0].Criticality.Path){c.bindProperty("color",{path:this._aDataPointAnnotations[0].Criticality.Path,formatter:this._mapCriticalityTypeWithColor.bind(this)});}};a.prototype._onBindingDataChange=function(){var c=this.getAggregation("_chart"),f=this._getLabelNumberFormatter.call(this,this._aDataPointAnnotations[0].Value.Path);c.setDeltaDisplayValue(f.format(c._getDeltaValue()));this._updateAssociations();};return a;});