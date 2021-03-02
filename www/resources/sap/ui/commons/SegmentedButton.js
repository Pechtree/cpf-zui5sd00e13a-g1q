/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','./SegmentedButtonRenderer'],function(q,C,I,S){"use strict";var a=C.extend("sap.ui.commons.SegmentedButton",{metadata:{interfaces:["sap.ui.commons.ToolbarItem","sap.ui.core.IFormContent"],library:"sap.ui.commons",properties:{enabled:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{buttons:{type:"sap.ui.commons.Button",multiple:true,singularName:"button"}},associations:{selectedButton:{type:"sap.ui.commons.Button",multiple:false}},events:{select:{parameters:{selectedButtonId:{type:"string"}}}}}});a.prototype.init=function(){if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.setCycling(true);this.addDelegate(this._oItemNavigation);}this._oButtonDelegate={oSegmentedButton:this,onAfterRendering:this._buttonOnAfterRendering};};a.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}};a.prototype.onAfterRendering=function(){this._setItemNavigation(true);};a.prototype._buttonSelected=function(e){var o=sap.ui.getCore().byId(this.getSelectedButton()),n=e.getSource();if(n!==o){this.setSelectedButton(n);this.fireSelect({selectedButtonId:n.getId()});}};a.prototype._setItemNavigation=function(A){var b,B,c=[];if(!this.getEnabled()){return;}if(this.getDomRef()){this._oItemNavigation.setRootDomRef(this.getDomRef("radiogroup"));B=this.getButtons();for(var i=0;i<B.length;i++){b=B[i];c.push(b.getDomRef());this._setAriaInfo(b,i+1);if(A){b.removeDelegate(this._oButtonDelegate);b.addDelegate(this._oButtonDelegate);}}this._oItemNavigation.setItemDomRefs(c);}};a.prototype._setAriaInfo=function(b,i){var $=q(b.getDomRef()),l=this.getButtons().length;$.attr("aria-posinset",i);$.attr("aria-setsize",l);$.attr("role","radio");if(b.getId()===this.getSelectedButton()){$.attr("aria-checked","true");$.removeAttr("aria-describedby");}else{$.removeAttr("aria-checked");$.attr("aria-describedby",this.getId()+"-label");}};a.prototype._buttonOnAfterRendering=function(){this.oSegmentedButton._setItemNavigation();};a.prototype._rerenderButtons=function(){var $=this.$();if($.length>0){var r=sap.ui.getCore().createRenderManager();S.renderButtons(r,this);r.flush($[0]);r.destroy();}};a.prototype.addButton=function(b){this.addAggregation("buttons",b,true);b.attachPress(this._buttonSelected,this);this._rerenderButtons();return this;};a.prototype.insertButton=function(b,i){this.insertAggregation("buttons",b,i,true);b.attachPress(this._buttonSelected,this);this._rerenderButtons();return this;};a.prototype.removeButton=function(b){var r=this.removeAggregation("buttons",b,true);if(r){r.detachPress(this._buttonSelected,this);r.removeDelegate(this._oButtonDelegate);this._rerenderButtons();}return r;};a.prototype.removeAllButtons=function(){var r=this.removeAllAggregation("buttons",true);q.each(r,function(i,b){b.detachPress(this._buttonSelected,this);b.removeDelegate(this._oButtonDelegate);});this._rerenderButtons();return r;};a.prototype.setSelectedButton=function(b){var B,o=sap.ui.getCore().byId(this.getSelectedButton());this.setAssociation("selectedButton",b,true);B=sap.ui.getCore().byId(this.getSelectedButton());this._setItemNavigation();var c=this.getButtons();for(var i=0;i<c.length;i++){if(c[i]===B){this._oItemNavigation.setFocusedIndex(i);break;}}if(o){o.removeStyleClass("sapUiSegButtonSelected");o.$().blur();}if(o&&o._icon){o.setIcon(o._icon);o._icon=null;}if(B){if(B.getIconHovered()){B._icon=B.getIcon();B.setIcon(B.getIconHovered());}B.addStyleClass("sapUiSegButtonSelected");}return this;};a.prototype.setEnabled=function(e){q.each(this.getButtons(),function(i,b){b.setEnabled(e);});if(this._oItemNavigation&&!e){this.removeDelegate(this._oItemNavigation);}else{this.addDelegate(this._oItemNavigation);}this.setProperty("enabled",e);return this;};a.prototype.clone=function(s){var b=this.getButtons(),B,i=0;for(;i<b.length;i++){B=b[i];B.detachPress(this._buttonSelected,this);}var c=C.prototype.clone.apply(this,arguments);for(i=0;i<b.length;i++){B=b[i];B.attachPress(this._buttonSelected,this);}return c;};a.prototype.getFocusDomRef=function(){return this.getDomRef("radiogroup")||null;};return a;});
