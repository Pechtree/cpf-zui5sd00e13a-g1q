/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Renderer','./ListBaseRenderer','./ColumnListItemRenderer','sap/m/library','sap/base/security/encodeXML'],function(R,L,C,l,e){"use strict";var a=l.ListKeyboardMode;var T=R.extend(L);var r=sap.ui.getCore().getConfiguration().getRTL();T.columnAlign={left:r?"flex-end":"flex-start",center:"center",right:r?"flex-start":"flex-end"};T.renderColumns=function(b,t,c){var i=0,h=0,d=false,f=false,m=t.getMode(),M=L.ModeOrder[m],g="sapMListTbl",j=t.getId("tbl"),k=(c=="Head")?"th":"td",n="t"+c.toLowerCase(),o=t.getColumns(),A=c=="Head"&&t.bActiveHeaders,p=(c=="Head")&&o.every(function(u){return!u.getHeader()||!u.getHeader().getVisible()||!u.getVisible()||u.isPopin()||u.isHidden();}),q=(c=="Head")&&o.filter(function(u){return u.getVisible()&&!u.isPopin()&&!u.isHidden();}).length==1,s=function(u,v,w){b.write("<");b.write(k);if(k==="th"){b.addClass("sapMTableTH");b.writeAttribute("role",w?"presentation":"columnheader");}else if(w){b.writeAttribute("role","presentation");}w&&b.writeAttribute("aria-hidden","true");v&&b.writeAttribute("id",j+v);b.addClass(g+u);b.writeClasses();b.write("></");b.write(k);b.write(">");i++;};b.write("<"+n+">");b.write("<tr");b.writeAttribute("tabindex",-1);b.writeAttribute("id",t.addNavSection(j+c+"er"));if(p){b.addClass("sapMListTblHeaderNone");}else{b.addClass("sapMListTblRow sapMLIBFocusable sapMListTbl"+c+"er");C.addLegacyOutlineClass.call(C,b);}b.writeClasses();b.write(">");s("HighlightCol",c+"Highlight",true);if(M==-1){if(m=="MultiSelect"&&c=="Head"&&!p){b.write("<th");b.addClass("sapMTableTH");b.writeAttribute("aria-hidden","true");b.addClass(g+"SelCol");b.writeAttribute("role","presentation");b.writeClasses();b.write(">");b.renderControl(t._getSelectAllCheckbox());b.write("</th>");i++;}else{s("SelCol","",true);}}o.forEach(function(u,v){u.setIndex(-1);u.setInitialOrder(v);});t.getColumns(true).forEach(function(u,v){if(!u.getVisible()){return;}if(u.isPopin()){d=true;return;}if(u.isHidden()){h++;}var w=u["get"+c+"er"](),x=q?"":u.getWidth(),y=u.getStyleClass(true),z=u.getCssAlign();b.write("<"+k);y&&b.addClass(e(y));if(c=="Head"){b.writeElementData(u);b.addClass("sapMTableTH");b.writeAttribute("role","columnheader");var S=u.getSortIndicator().toLowerCase();S!=="none"&&b.writeAttribute("aria-sort",S);}b.addClass(g+"Cell");b.addClass(g+c+"erCell");b.writeAttribute("data-sap-width",u.getWidth());x&&b.addStyle("width",x);if(z&&c!=="Head"){b.addStyle("text-align",z);}b.writeClasses();b.writeStyles();b.write(">");if(w){if(c==="Head"){b.write("<div");b.addClass("sapMColumnHeader");if(A){b.writeAttribute("tabindex",0);b.writeAttribute("role","button");b.writeAttribute("aria-haspopup","dialog");b.addClass("sapMColumnHeaderActive");}if(z){b.addStyle("justify-content",T.columnAlign[z]);b.addStyle("text-align",z);}b.writeClasses();b.writeStyles();b.write(">");w.addStyleClass("sapMColumnHeaderContent");b.renderControl(w);b.write("</div>");}else{b.renderControl(w);}}if(c=="Head"&&!f){f=!!u.getFooter();}b.write("</"+k+">");u.setIndex(i++);});s("NavCol",c+"Nav",!t._iItemNeedsColumn);if(M==1){s("SelCol","",true);}b.write("</tr></"+n+">");if(c=="Head"){t._hasPopin=d;t._colCount=i-h;t._hasFooter=f;t._headerHidden=p;}};T.renderContainerAttributes=function(b,c){b.writeAttribute("role","application");b.writeAttribute("aria-labelledby",this.getAriaAnnouncement("TABLE_CONTAINER_ROLE_DESCRIPTION"));b.addClass("sapMListTblCnt");L.renderContainerAttributes.apply(this,arguments);};T.renderListStartAttributes=function(b,c){b.write("<table");b.addClass("sapMListTbl");if(c.getFixedLayout()===false){b.addStyle("table-layout","auto");}if(c._iItemNeedsColumn){b.addClass("sapMListTblHasNav");}};T.getAriaRole=function(c){return"";};T.getAriaLabelledBy=function(c){var p=L.getAriaLabelledBy.call(this,c);var s=this.getAriaAnnouncement("TABLE_ROLE_DESCRIPTION");if(p&&s){return p+" "+s;}return s||p;};T.renderListHeadAttributes=function(b,c){this.renderColumns(b,c,"Head");b.write("<tbody");b.addClass("sapMListItems");b.addClass("sapMTableTBody");b.writeAttribute("id",c.addNavSection(c.getId("tblBody")));if(c.getAlternateRowColors()){b.addClass(c._getAlternateRowColorsClass());}b.writeClasses();b.write(">");};T.renderListEndAttributes=function(b,c){b.write("</tbody>");c._hasFooter&&this.renderColumns(b,c,"Foot");b.write("</table>");};T.renderNoData=function(b,c){b.write("<tr");b.writeAttribute("tabindex",c.getKeyboardMode()==a.Navigation?-1:0);b.writeAttribute("id",c.getId("nodata"));b.addClass("sapMLIB sapMListTblRow sapMLIBTypeInactive");C.addFocusableClasses.call(C,b);if(!c._headerHidden||(!c.getHeaderText()&&!c.getHeaderToolbar())){b.addClass("sapMLIBShowSeparator");}b.writeClasses();b.write(">");b.write("<td");b.writeAttribute("id",c.getId("nodata-text"));b.writeAttribute("colspan",c.getColCount());b.addClass("sapMListTblCell sapMListTblCellNoData");b.writeClasses();b.write(">");b.writeEscaped(c.getNoDataText(true));b.write("</td>");b.write("</tr>");};return T;},true);
