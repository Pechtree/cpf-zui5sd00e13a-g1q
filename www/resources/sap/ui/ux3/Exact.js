/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/commons/Button','sap/ui/commons/Menu','sap/ui/commons/SearchField','sap/ui/commons/TextView','sap/ui/core/Control','./ExactArea','./ExactAttribute','./ExactBrowser','./library','./ExactRenderer','sap/ui/commons/library'],function(B,M,S,T,C,E,a,b,l,c,d){"use strict";var e=d.TextViewDesign;var f=C.extend("sap.ui.ux3.Exact",{metadata:{library:"sap.ui.ux3",properties:{resultText:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"attributes",aggregations:{settingsMenu:{type:"sap.ui.commons.Menu",multiple:false,forwarding:{idSuffix:"-browser",aggregation:"optionsMenu"}},attributes:{type:"sap.ui.ux3.ExactAttribute",multiple:true,singularName:"attribute",forwarding:{idSuffix:"-browser",aggregation:"attributes"}},controls:{type:"sap.ui.core.Control",multiple:true,singularName:"control",visibility:"hidden"}},events:{search:{parameters:{query:{type:"string"}}},refineSearch:{parameters:{query:{type:"string"},changedAttribute:{type:"sap.ui.ux3.ExactAttribute"},allSelectedAttributes:{type:"object"}}}}}});f.prototype.init=function(){var t=this;this._searchArea=new E(this.getId()+"-searchArea",{toolbarVisible:false});this._searchArea.addStyleClass("sapUiUx3ExactSearchArea");this.addAggregation("controls",this._searchArea);this._search_input=new S(this.getId()+"-searchTF",{enableListSuggest:false});this._search_input.attachSearch(function(o){_(t,o);});this._search_input.addStyleClass("sapUiUx3ExactSearchText");this._searchArea.addContent(this._search_input);this._browser=new b(this.getId()+"-browser",{title:"Attributes"});this._browser.addStyleClass("sapUiUx3ExactBrowseArea");this.addAggregation("controls",this._browser);this._browser.attachAttributeSelected(function(o){g(t,o);});this._resultArea=new E(this.getId()+"-resultArea");this.addAggregation("controls",this._resultArea);this._resultText=new T(this.getId()+"-resultAreaTitle",{design:e.Bold});this._resultText.addStyleClass("sapUiUx3ExactViewTitle");this.addAggregation("controls",this._resultText);this._bDetailsVisible=false;};f.prototype.getResultText=function(){return this._resultText.getText();};f.prototype.setResultText=function(r){this._resultText.setText(r);return this;};f.prototype.getResultArea=function(){return this._resultArea;};f.prototype.getSearchField=function(){return this._search_input;};var _=function(t,o){t._sSearchQuery=o.getParameter("query");t.fireSearch({query:t._sSearchQuery});t._bDetailsVisible=true;t.invalidate();};var g=function(t,o){t.fireRefineSearch({query:t._sSearchQuery,changedAttribute:o.getParameter("attribute"),allSelectedAttributes:o.getParameter("allAttributes")});};return f;});
