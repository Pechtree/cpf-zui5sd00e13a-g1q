/*!
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["../library","sap/ui/core/library","sap/ui/core/Control","sap/ui/core/Item","sap/m/Select","sap/ui/comp/smartfield/SmartField","sap/ui/comp/smartfield/SmartLabel","sap/ui/comp/smartfield/ODataControlFactory","sap/ui/model/BindingMode","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/HBox","sap/ui/core/format/NumberFormat","sap/ui/core/format/DateFormat","sap/m/CheckBox","sap/m/Label","sap/m/Input","sap/base/Log","sap/ui/comp/odata/MetadataAnalyser"],function(l,c,C,I,S,a,d,O,B,F,f,H,N,D,g,L,h,i,M){"use strict";var V=c.ValueState;var j=O.extend("sap.ui.comp.smartmultiedit.HackedControlFactory");j.prototype.createAttributes=function(A,t,n,e){var b=O.prototype.createAttributes.apply(this,arguments);if(A&&b[A]){b[A].mode=B.OneWay;}return b;};j.prototype._createEdmUOMAttributes=function(){var A=O.prototype._createEdmUOMAttributes.apply(this,arguments);if(A.value){A.value.mode=B.OneWay;}return A;};j.prototype._createEdmDateTime=function(){var r=O.prototype._createEdmDateTime.apply(this);r.params.getValue=function(){if(r.control.getDateValue()){return r.params.type.type.parseValue(r.control.getValue(),"string");}else{return null;}};return r;};j.prototype._createEdmDateTimeOffset=function(){var r=O.prototype._createEdmDateTimeOffset.apply(this);r.params.getValue=function(){if(r.control.getDateValue()){return r.params.type.type.parseValue(r.control.getValue(),"string");}else{return null;}};return r;};j.prototype._onCreate=function(o,p){var G;if(p&&typeof p.getValue==="function"){G=p.getValue;p.getValue=null;}if(O.prototype._onCreate){O.prototype._onCreate.call(this,o,p);}if(G){p.getValue=G;}};j.createFromFactory=function(o){if(!o){return null;}return new j(o._oModel,o._oParent,o._oMeta);};var k=10;var m=C.extend("sap.ui.comp.smartmultiedit.Field",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartmultiedit/Field.designtime",properties:{propertyName:{type:"string",defaultValue:null},useApplyToEmptyOnly:{type:"boolean",defaultValue:false},applyToEmptyOnly:{type:"boolean",defaultValue:false},description:{type:"string",defaultValue:null},validateTokenExistence:{type:"boolean",defaultValue:true}},aggregations:{configuration:{type:"sap.ui.comp.smartfield.Configuration",multiple:false}},associations:{},events:{change:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}},renderer:function(r,o){r.write("<div");r.writeControlData(o);r.addClass("sapUiCompSmartMultiEditField");r.writeClasses();r.write(">");r.renderControl(o._oSelect);r.write("<div");r.addClass("sapUiCompSmartMultiEditFieldSFWrapper");r.writeClasses();r.write(">");r.renderControl(o._oSmartField);r.write("</div>");if(o.getDescription()){r.write("<div");r.addClass("sapUiCompSmartMultiEditSmartFieldDescription");r.writeClasses();r.write(">");o._oDescription.setText(o.getDescription());r.renderControl(o._oDescription);r.write("</div>");}if(o.getUseApplyToEmptyOnly()){r.renderControl(o._oApplyToEmptyOnlyCheckBox);}r.write("</div>");}});m.ACTION_ITEM_KEY={KEEP:"keep",BLANK:"blank",NEW:"new",TRUE:"true",FALSE:"false"};m.prototype.init=function(){this._createSelect();this._createSpecialSelectItems();this._createDescription();this._createApplyToEmptyOnlyCheckBox();this._oContainer=null;this._bNullable=true;this._bShowValueHelp=true;this._bClientError=null;this._oAnnotations=null;this._bComboBox=null;this._aDistinctValues=[];this._mRecordKeyTextMap={};};m.prototype.onBeforeRendering=function(){this._updateSpecialSelectItems();};m.prototype.getNullable=function(){return this._bNullable;};m.prototype.getShowValueHelp=function(){return this._bShowValueHelp;};m.prototype.getLabel=function(){if(this.getParent()&&this.getParent().getLabel){return this.getParent().getLabel();}else{return null;}};m.prototype.getSmartField=function(){return this._oSmartField;};m.prototype.getValue=function(){return this._oSmartField?this._oSmartField.getValue():null;};m.prototype.getDataType=function(){if(!this._oSmartField){return null;}try{return this._oSmartField.getDataType();}catch(e){return null;}};m.prototype.isComposite=function(){return!!this._oAnnotations.uom;};m.prototype.isInteger=function(){return this.getDataType()==="Edm.Byte"||this.getDataType()==="Edm.Int16"||this.getDataType()==="Edm.Int32"||this.getDataType()==="Edm.Int64"||this.getDataType()==="Edm.SByte";};m.prototype.isFloat=function(){return this.getDataType()==="Edm.Decimal"||this.getDataType()==="Edm.Double"||this.getDataType()==="Edm.Float"||this.getDataType()==="Edm.Single";};m.prototype.isDate=function(){return this.getDataType()==="Edm.DateTime";};m.prototype.isDateTime=function(){return this.getDataType()==="Edm.DateTimeOffset";};m.prototype.isTime=function(){return this.getDataType()==="Edm.Time";};m.prototype.isBoolean=function(){return this.getDataType()==="Edm.Boolean";};m.prototype.isComboBox=function(){return this._bComboBox;};m.prototype.getRecordTextPath=function(){if(this._oAnnotations&&this._oAnnotations.text){return this._oAnnotations.text.path;}else{return null;}};m.prototype.getUnitOfMeasure=function(){return this._oSmartField?this._oSmartField.getUnitOfMeasure():null;};m.prototype.getUnitOfMeasurePropertyName=function(){return this._oAnnotations&&this._oAnnotations.uom?this._oAnnotations.uom.path:null;};m.prototype.setParent=function(p,A,s){C.prototype.setParent.call(this,p,A,s);if(p&&p.getLabel&&!p.getLabel()){this._oLabel=new d(this.getId()+"-SmartLabel");this._oLabel.onFieldVisibilityChange=function(){};this._oLabel.setLabelFor(this._oSmartField.getId());p.setLabel(this._oLabel);this._oSelect.addAriaLabelledBy(this._oLabel);if(this.getDescription()){this._oSelect.addAriaLabelledBy(this._oDescription);}}return this;};m.prototype.addCustomData=function(o){var b;if(!o){return this;}C.prototype.addCustomData.apply(this,arguments);b=o.clone();this._oSmartField.addCustomData(b);return this;};m.prototype.insertCustomData=function(o,b){var e;if(!o){return this;}C.prototype.insertCustomData.apply(this,arguments);e=o.clone();this._oSmartField.addCustomData(e);return this;};m.prototype.removeCustomData=function(v){var o=C.prototype.removeCustomData.apply(this,arguments);if(o){this._oSmartField.removeCustomData(o);}return o;};m.prototype.removeAllCustomData=function(){var b=C.prototype.removeAllCustomData.apply(this,arguments);if(b.length>0){b.forEach(function(o){this._oSmartField.removeCustomData(o);}.bind(this));}return b;};m.prototype.destroyCustomData=function(){C.prototype.destroyCustomData.apply(this,arguments);this._oSmartField.destroyCustomData();return this;};m.prototype.setPropertyName=function(n){this.setProperty("propertyName",n,true);this._createSmartField();return this;};m.prototype.setConfiguration=function(o){var b;this.setAggregation("configuration",o,true);if(this._oSmartField){b=o?o.clone():null;this._oSmartField.setConfiguration(b);}return this;};m.prototype.getSelectedItem=function(){return this._oSelect.getSelectedItem();};m.prototype.setSelectedItem=function(o,s){this._handleSelectionChange(o,s);return this;};m.prototype.setSelectedIndex=function(b){this.setSelectedItem(this._oSelect.getItems()[b]);return this;};m.prototype.exit=function(){this._getKeep().destroy();this._getBlank().destroy();this._getValueHelp().destroy();this._getBoolTrueItem().destroy();this._getBoolFalseItem().destroy();};m.prototype.isBlankSelected=function(){return this._oSelect.getSelectedItem()===this._getBlank();};m.prototype.isKeepExistingSelected=function(){return this._oSelect.getSelectedItem()===this._getKeep();};m.prototype.isValueHelpSelected=function(){return this._oSelect.getSelectedItem()===this._getValueHelp();};m.prototype.getRawValue=function(){var r={},v,b,u,s=this.getSelectedItem(),p=this.getPropertyName();if(s===this._getBoolTrueItem()){v=true;}else if(s===this._getBoolFalseItem()){v=false;}else if(this.isBlankSelected()){v=null;}else if(s===this._getValueHelp()){if(this.isComposite()){b=this.getValue();if(b==null||(typeof b==="string"&&!b.trim())){v={value:null};}else{v={value:N.getFloatInstance().parse(b)};}u=this.getUnitOfMeasure();if(u==null||(typeof u==="string"&&!u.trim())){v.unit=null;}else{v.unit=u;}}else if(this.isInteger()){v=N.getIntegerInstance().parse(this.getValue());}else if(this.isFloat()){v=N.getFloatInstance().parse(this.getValue());}else{v=this.getValue();}}else if(s){v=this._mContextItemsData[s.getKey()];}if(!this.isKeepExistingSelected()&&typeof v!=="undefined"){if(this.isComposite()){if(v!=null){r[p]=v.value;r[this.getUnitOfMeasurePropertyName()]=v.unit;}else{r[p]=null;r[this.getUnitOfMeasurePropertyName()]=null;}}else{r[p]=v;if(this.isComboBox()&&this.getRecordTextPath()){if(v!=null){r[this.getRecordTextPath()]=this._mRecordKeyTextMap[v];}else{r[this.getRecordTextPath()]=null;}}}}return r;};m.prototype.hasClientError=function(){return this._bClientError;};m.prototype._setNullable=function(b){if(b!==this._bNullable){this._bNullable=b;this._updateSpecialSelectItems();}return this;};m.prototype._setShowValueHelp=function(b){if(b!==this._bShowValueHelp){this._bShowValueHelp=b;this._updateSpecialSelectItems();}return this;};m.prototype._isSpecialValueItem=function(b){return b===this._getKeep()||b===this._getBlank()||b===this._getValueHelp();};m.prototype._handleSelectionChangeEvent=function(e){var o=e.getParameter("selectedItem");this._handleSelectionChange(o);};m.prototype._handleSelectionChange=function(o,s){this._oSelect.setSelectedItem(o);if(this.isKeepExistingSelected()||this.isBlankSelected()){this.getSmartField().removeStyleClass("sapUiCompSmartMultiEditSmartField");this.getSmartField().addStyleClass("sapUiCompSmartMultiEditSmartFieldHidden");}else{this.getSmartField().addStyleClass("sapUiCompSmartMultiEditSmartField");this.getSmartField().removeStyleClass("sapUiCompSmartMultiEditSmartFieldHidden");}if(s){return;}this.fireChange({selectedItem:o});var u=this.isValueHelpSelected();this._oSmartField.setContextEditable(u);this._oApplyToEmptyOnlyCheckBox.setVisible(u);this._bClientError=null;if(this._isSpecialValueItem(o)){this._setSmartFieldDisplayText(null,null);}else{this._oApplyToEmptyOnlyCheckBox.setVisible(true);if(!this.isBoolean()){this._oSmartField.setContextEditable(true);}var v=this._mContextItemsData[o.getKey()];if(this.isComposite()){if(this._isCurrencyValue()){this._setSmartFieldDisplayText(this._formatCurrencyValue(N.getFloatInstance().format(v.value),v.unit,true),v.unit);}else{this._setSmartFieldDisplayText(N.getFloatInstance().format(v.value),v.unit);}}else if(this.isBoolean()){this._setSmartFieldDisplayText(o.getText());}else if(this.isDate()){this._setSmartFieldDisplayText(D.getDateInstance().format(v));}else if(this.isDateTime()){this._setSmartFieldDisplayText(D.getDateTimeInstance().format(v));}else if(this.isInteger()){this._setSmartFieldDisplayText(N.getIntegerInstance().format(v));}else if(this.isFloat()){this._setSmartFieldDisplayText(N.getFloatInstance().format(v));}else{this._setSmartFieldDisplayText(v.toString());}if(!this.isBoolean()){this.setSelectedItem(this._getValueHelp(),true);}this._performValidation();}this.invalidate();};m.prototype._extractValueDisplayText=function(v){var t;if(v==null||v==undefined){return null;}if(this.isComposite()){if(this._isCurrencyValue()){t=this._formatCurrencyValue(N.getFloatInstance().format(v.value),v.unit);}else{t=N.getFloatInstance().format(v.value)+" "+v.unit;}}else if(this.isBoolean()){t=v?this._getBoolTrueItem().getText():this._getBoolFalseItem().getText();}else if(this.isDate()){t=D.getDateInstance().format(v);}else if(this.isDateTime()){t=D.getDateTimeInstance().format(v);}else if(this.isInteger()){t=N.getIntegerInstance().format(v);}else if(this.isFloat()){t=N.getFloatInstance().format(v);}else{t=String(v);}return t;};m.prototype._createSelect=function(){this._oSelect=new S(this.getId()+"-select");this._oSelect.setWidth("100%");this._oSelect.attachChange(this._handleSelectionChangeEvent,this);this.addDependent(this._oSelect);};m.prototype._getResourceBundle=function(){if(this._oRb==null){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");}return this._oRb;};m.prototype._createSpecialSelectItems=function(){var G=new I({key:m.ACTION_ITEM_KEY.KEEP,text:"< "+this._getResourceBundle().getText("MULTI_EDIT_KEEP_TEXT")+" >"});this._getKeep=function(){return G;};var o=new I({key:m.ACTION_ITEM_KEY.BLANK,text:"< "+this._getResourceBundle().getText("MULTI_EDIT_BLANK_TEXT")+" >"});this._getBlank=function(){return o;};var b=new I({key:m.ACTION_ITEM_KEY.NEW,text:"< "+this._getResourceBundle().getText("MULTI_EDIT_NEW_TEXT")+" >"});this._getValueHelp=function(){return b;};var e=new I({key:m.ACTION_ITEM_KEY.TRUE,text:this._getResourceBundle().getText("SMARTFIELD_CB_YES")});this._getBoolTrueItem=function(){return e;};var n=new I({key:m.ACTION_ITEM_KEY.FALSE,text:this._getResourceBundle().getText("SMARTFIELD_CB_NO")});this._getBoolFalseItem=function(){return n;};};m.prototype._createDescription=function(){if(!this._oDescription){this._oDescription=new L();this.addDependent(this._oDescription);}};m.prototype._createApplyToEmptyOnlyCheckBox=function(){this._oApplyToEmptyOnlyCheckBox=new g(this.getId()+"-ApplyToEmptyOnly");this._oApplyToEmptyOnlyCheckBox.setText(this._getResourceBundle().getText("MULTI_EDIT_APPLY_TO_EMPTY_ONLY"));this._oApplyToEmptyOnlyCheckBox.attachSelect(function(e){this.setApplyToEmptyOnly(e.getSource().getSelected());}.bind(this));this.addDependent(this._oApplyToEmptyOnlyCheckBox);};m.prototype._createSmartField=function(){this._oSmartField=new a({id:this.getId()+"-SmartField",value:{path:this.getPropertyName(),mode:"OneWay"}});this._oSmartField.addStyleClass("sapUiCompSmartMultiEditSmartFieldHidden");this._oSmartField._createFactory=function(){var o=a.prototype._createFactory.apply(this,arguments);return j.createFromFactory(o);};this.addDependent(this._oSmartField);this._oSmartField.setValue=this._handleSmartFieldSetValue;this._oSmartField.attachInitialise(this._handleSmartFieldInitialized.bind(this),this);this._oSmartField.attachInnerControlsCreated(this._handleInnerControlsCreation.bind(this),this);if(this.getConfiguration()){this._oSmartField.setConfiguration(this.getConfiguration().clone());}this._oSmartFieldValue=null;};m.prototype._getCurrentValueControl=function(){return this._oSmartField?this._oSmartField._oControl[this._oSmartField._oControl.current]:null;};m.prototype._setSmartFieldDisplayText=function(v,u){var o,U;this._oSmartFieldValue=v;this._oSmartField.setValue(v);var b=this._getCurrentValueControl();if(b){if(this.isComboBox()){b.setSelectedKey(v);}else if(this.isComposite()&&b.getItems){o=b.getItems()[0];if(o.setValue){o.setValue(v);}else if(o.setText){o.setText(v);}else if(o.setSelectedKey){o.setSelectedKey(v);}o=b.getItems()[1];if(o._oControl.display){U=o._oControl.display;if(U.setText){U.setText(u);}}else if(o._oControl.edit){U=o._oControl.edit;if(U.setValue){U.setValue(u);}else if(U.setSelectedKey){U.setSelectedKey(u);}}}else if(b.setText){b.setText(v);}else if(b.setValue){b.setValue(v);}}};m.prototype._getSmartFieldDisplayText=function(){var o=this._oSmartField._oControl.display,t="";if(o){if(this.isComposite()&&o.getItems){if(o.getItems()[0].getText){t+=o.getItems()[0].getText();}if(o.getItems()[1]._oControl.display.getText){t+=o.getItems()[1]._oControl.display.getText();}return t;}else if(this.isComboBox()){return this._mRecordKeyTextMap[o.getSelectedKey()]||"";}else if(o.getText){return o.getText();}else{return null;}}else{return null;}};m.prototype._handleSmartFieldSetValue=function(v){if(v===this.getParent()._oSmartFieldValue){a.prototype.setValue.call(this.getParent()._oSmartField,v);}};m.prototype._handleSmartFieldInitialized=function(){if(this.isTime()){i.error("Field._handleSmartFieldInitialized","Edm.Time data type is not supported, field: '"+this.getPropertyName()+"'","sap.ui.comp.smartmultiedit.Field");return;}var o=this._oSmartField._oFactory._oSelector.checkComboBox();this._bComboBox=o.combobox;this._oAnnotations=this._oSmartField._oFactory._oMetaData.annotations;this._oSmartField.setContextEditable(false);this._updateContextItems();this._oApplyToEmptyOnlyCheckBox.setVisible(false);};m.prototype._handleInnerControlsCreation=function(e){var b;e.mParameters.forEach(function(o){if(o.getParent()&&o.getParent()._oControl){if(o.getParent()._oControl.display===o){if(o.mBindingInfos.text){o.mBindingInfos.text.skipModelUpdate=true;}}else if(o.getParent()._oControl.edit===o){if(o.mBindingInfos.value){o.mBindingInfos.value.skipModelUpdate=true;o.setValue(null);}else if(o.mBindingInfos.selected){o.mBindingInfos.selected.skipModelUpdate=true;o.setSelected(false);}}}if(o===this._oSmartField._oControl.display){return;}if(o.attachChange){o.attachChange(this._performValidation,this);}if(o.getParent()&&o.getParent().getParent()instanceof a&&o.getParent().getParent()._oControl.edit instanceof H&&this._oAnnotations&&this.isComposite()){var n=o.getParent().getParent()._oControl.edit;var p=n.getItems();p[0].attachChange(this._handleCompositeInputChange,this);if(p[1]&&p[1]._oControl&&p[1]._oControl.edit){p[1]._oControl.edit.attachChange(this._handleCompositeInputChange,this);}}}.bind(this));b=this._oSmartField.getMandatory();this._setNullable(!b);};m.prototype._getInnerEdit=function(){return this._oSmartField._oControl.edit;};m.prototype._getFirstInnerEdit=function(){return this._oSmartField._oControl.edit?this._oSmartField._oControl.edit.getItems()[0]:null;};m.prototype._getSecondInnerEdit=function(){return this._oSmartField._oControl.edit?this._oSmartField._oControl.edit.getItems()[1]._oControl.edit:null;};m.prototype._performTokenValidation=function(s,v,o){return new Promise(function(r,b){var e=new M(o.getModel());e.getValueListAnnotationLazy(v).then(function(R){var n=R.primaryValueListAnnotation;if(!n){r();return;}o.getModel().read("/"+n.valueListEntitySetName,{success:function(R){if(R.results&&R.results.length===0&&s._oControl.edit){s._oControl.edit.setValueState(V.Error);o._bClientError=true;}else{s._oControl.edit.setValueState(V.None);o._bClientError=null;}r();},filters:[new F({path:n.keyField,operator:f.EQ,value1:s.getValue()})],error:function(E){b(E);}});});});};m.prototype._performValidation=function(){var e=this._oSmartField._oError;e.bComplex=false;e.bFirst=false;e.bSecond=false;this._bClientError=this._oSmartField.checkClientError();if(this.isKeepExistingSelected()||this.isBlankSelected()){return;}if(this.isComposite()){if(this._bClientError){if(e.bFirst&&this._getFirstInnerEdit()){this._getFirstInnerEdit().setValueState(V.Error);}if(e.bSecond&&this._getSecondInnerEdit()){this._getSecondInnerEdit().setValueState(V.Error);}}else{if(this._getFirstInnerEdit()){this._getFirstInnerEdit().setValueState(V.None);}if(this._getSecondInnerEdit()){this._getSecondInnerEdit().setValueState(V.None);}}}else{if(!this._getInnerEdit()){return;}if(this._bClientError){this._getInnerEdit().setValueState(V.Error);}else{this._getInnerEdit().setValueState(V.None);}}if(this.getValidateTokenExistence()){var p=[];if("valuelist"in this._oAnnotations){p.push(this._performTokenValidation(this.getSmartField(),this._oAnnotations.valuelist,this));}if(this.isComposite()&&"valuelistuom"in this._oAnnotations&&this.getSmartField()._oControl.edit){p.push(this._performTokenValidation(this.getSmartField()._oControl.edit.getItems()[1],this._oAnnotations.valuelistuom,this));}return Promise.all(p);}else{return Promise.resolve();}};m.prototype._handleCompositeInputChange=function(e){var s=this._getFirstInnerEdit().getValue(),b=this._getSecondInnerEdit().getValue(),n;if(this._isCurrencyValue()){n=this._formatCurrencyValue(s,b,true);}else{var v=N.getFloatInstance().parse(s);n=N.getFloatInstance().format(v);}if(!this._oSmartField._oError.bFirst&&!this._oSmartField._oError.bSecond){this._setSmartFieldDisplayText(n,this._getSecondInnerEdit().getValue());}};m.prototype._formatCurrencyValue=function(v,s,b){var e=N.getFloatInstance().parse(v),n=N.getCurrencyInstance().format(e,s);if(b){n=n.replace(s,"").trim();}return n;};m.prototype._updateSpecialSelectItems=function(){this._oSelect.removeAggregation("items",this._getKeep(),true);this._oSelect.removeAggregation("items",this._getBlank(),true);this._oSelect.removeAggregation("items",this._getValueHelp(),true);this._oSelect.insertAggregation("items",this._getKeep(),0,true);if(this.getShowValueHelp()){this._oSelect.insertAggregation("items",this._getValueHelp(),1,true);}if(this.getNullable()){this._oSelect.insertAggregation("items",this._getBlank(),this.getShowValueHelp()?2:1,true);}this.invalidate();};m.prototype._removeContextItems=function(){this._oSelect.removeAllItems();this._updateSpecialSelectItems();};m.prototype._updateContextItems=function(){var v,u,U,t;if(!this._oContainer||!this.getDataType()){return;}this._removeContextItems();if(this.isBoolean()){this._oSelect.addAggregation("items",this._getBoolTrueItem(),true);this._oSelect.addAggregation("items",this._getBoolFalseItem(),true);this._setShowValueHelp(false);}this._aDistinctValues=[];this._mContextItemsData={};this._mValueOccurences={};this._oContainer.getContexts().forEach(function(o){v=this.getModel().getObject(o.getPath())[this.getPropertyName()];if(typeof v==="undefined"||v==null||(typeof v==="string"&&!v.trim())){return;}if(this.isComposite()){u=this.getModel().getObject(o.getPath())[this.getUnitOfMeasurePropertyName()];U={value:v,unit:u};if(this._aDistinctValues.map(JSON.stringify).indexOf(JSON.stringify(U))===-1){this._aDistinctValues.push(U);this._mValueOccurences[U.unit+U.value]={count:1,value:U,context:o};}else{this._mValueOccurences[U.unit+U.value].count++;}}else if(this.isDate()||this.isDateTime()){if(this._aDistinctValues.map(Number).indexOf(+v)===-1){this._aDistinctValues.push(v);this._mValueOccurences[v]={count:1,value:v,context:o};}else{this._mValueOccurences[v].count++;}}else{if(this._aDistinctValues.indexOf(v)===-1){this._aDistinctValues.push(v);this._mValueOccurences[v]={count:1,value:v,context:o};}else{this._mValueOccurences[v].count++;}}}.bind(this));t=Object.keys(this._mValueOccurences).map(function(b){return[b,this._mValueOccurences[b]];}.bind(this));t.sort(function(b,s){if(s[1].count!==b[1].count){return s[1].count-b[1].count;}else{if(this.isComposite()){return s[1].value.value-b[1].value.value;}else if(this.isInteger()||this.isFloat()){return s[1].value-b[1].value;}else if(this.isDate()||this.isDateTime()){return s[1].value.getTime()-b[1].value.getTime();}else if(b[1].value.localeCompare&&s[1].value.localeCompare){return b[1].value.localeCompare(s[1].value);}else{return 0;}}}.bind(this));t=t.slice(0,k);this._aDistinctValues=[];t.forEach(function(o){this._addInnerSelectItem(o[1].value,o[1].context);this._aDistinctValues.push(o[1].value);}.bind(this));this._setSmartFieldDisplayText(null,null);};m.prototype._addInnerSelectItem=function(v,o){var K,t;if(typeof v==="undefined"||v==null||this.isBoolean()){return;}if(this.isComposite()){K=JSON.stringify([v.value,v.unit]);}else if(this.isDate()){K=D.getDateInstance().format(v);}else if(this.isDateTime()){K=D.getDateTimeInstance().format(v);}else{K=String(v);}if(this.isComboBox()){t=o.getObject(this.getRecordTextPath());this._mRecordKeyTextMap[K]=t;}else{t=this._extractValueDisplayText(v);}this._oSelect.addItem(new I({key:K,text:t}),true);this._mContextItemsData[K]=v;};m.prototype._setContainer=function(o){this._oContainer=o;this._updateContextItems();};m.prototype._isCurrencyValue=function(){return(this._oAnnotations&&this._oAnnotations.uom&&this._oAnnotations.uom.property.property["sap:semantics"]=="currency-code");};return m;});
