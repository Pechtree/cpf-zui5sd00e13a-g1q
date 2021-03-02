/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/comp/library","sap/ui/core/Control","sap/suite/ui/microchart/library","sap/m/library","sap/ui/comp/smartmicrochart/SmartMicroChartBase","sap/suite/ui/microchart/HarveyBallMicroChart","sap/suite/ui/microchart/HarveyBallMicroChartItem","sap/base/Log","./SmartMicroChartRenderer"],function(l,C,M,a,S,H,b,L){"use strict";var c=S.extend("sap.ui.comp.smartmicrochart.SmartHarveyBallMicroChart",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartmicrochart/SmartHarveyBallMicroChart.designtime",properties:{enableAutoBinding:{type:"boolean",group:"Misc",defaultValue:false}},associations:{freeText:{type:"sap.m.Label",group:"Misc",multiple:false}}},renderer:"sap.ui.comp.smartmicrochart.SmartMicroChartRenderer"});c._CHART_TYPE=["Pie"];c.prototype.init=function(){this._bIsInitialized=false;this._bMetaModelLoadAttached=false;this.setProperty("chartType","Pie",true);this.setAggregation("_chart",new H(),true);};c.prototype.onBeforeRendering=function(){var o=this.getAggregation("_chart");o.setSize(this.getSize(),true);o.setWidth(this.getWidth(),true);o.setHeight(this.getHeight(),true);};c.prototype._createAndBindInnerChart=function(){if(!(this._oDataPointAnnotations.Value&&this._oDataPointAnnotations.Value.Path)){L.error("Value DataPoint annotation missing! Cannot create the SmartHarveyBallMicroChart");return;}var o=this.getAggregation("_chart"),i=new b({fraction:{path:this._oDataPointAnnotations.Value.Path,type:"sap.ui.model.odata.type.Decimal"}});var v=this._getLabelNumberFormatter.call(this,this._oDataPointAnnotations.Value.Path);i.bindProperty("fractionLabel",{path:this._oDataPointAnnotations.Value.Path,formatter:v.format.bind(v)});var m=this._getLabelNumberFormatter.call(this,this._oDataPointAnnotations.MaximumValue.Path);if(this._oDataPointAnnotations.MaximumValue&&this._oDataPointAnnotations.MaximumValue.Path){o.bindProperty("total",{path:this._oDataPointAnnotations.MaximumValue.Path,type:"sap.ui.model.odata.type.Decimal"});o.bindProperty("totalLabel",{path:this._oDataPointAnnotations.MaximumValue.Path,formatter:m.format.bind(m)});}if(this._getAnnotation("unitOfMeasure").Path){o.bindProperty("totalScale",{path:this._getAnnotation("unitOfMeasure").Path});i.bindProperty("fractionScale",{path:this._getAnnotation("unitOfMeasure").Path});}if(this._oDataPointAnnotations.Criticality&&this._oDataPointAnnotations.Criticality.Path){i.bindProperty("color",{path:this._oDataPointAnnotations.Criticality.Path,formatter:this._mapCriticalityTypeWithColor.bind(this)});}o.addItem(i);this._updateAssociations();};c.prototype._getSupportedChartTypes=function(){return c._CHART_TYPE;};return c;});
