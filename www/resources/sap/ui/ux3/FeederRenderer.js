/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/theming/Parameters","sap/base/security/encodeXML"],function(l,P,e){"use strict";var F=l.FeederType;var a={};a.render=function(r,f){r.write('<div');r.writeControlData(f);r.addClass('sapUiFeeder');switch(f.getType()){case F.Medium:r.addClass('sapUiFeederMedium');break;case F.Comment:r.addClass('sapUiFeederComment');break;default:r.addClass('sapUiFeederLarge');break;}r.writeClasses();r.write('>');r.write('<img id='+f.getId()+'-thumb');var t=f.getThumbnailSrc();if(!t){t=P._getThemeImage("_sap_ui_ux3_Feeder_PersonPlaceholder");}r.writeAttributeEscaped('src',t);r.writeClasses();r.write('>');r.write('<div id='+f.getId()+'-input contenteditable="true" class="sapUiFeederInput" >');if(f.getText()==''){r.write(this.getEmptyTextInfo(f));}else{r.writeEscaped(f.getText(),true);}r.write('</div>');f.initSendButton();r.renderControl(f.oSendButton);r.write('</div>');};a.getEmptyTextInfo=function(f){return"<span class='sapUiFeederEmptyText'>"+e(f.getPlaceholderText()||f.rb.getText("FEED_EMPTY_FEEDER"))+"</span>";};return a;},true);
