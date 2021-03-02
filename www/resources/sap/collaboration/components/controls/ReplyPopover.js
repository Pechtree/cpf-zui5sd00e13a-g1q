/*
* ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
*/
sap.ui.define(["jquery.sap.global","../utils/LanguageBundle","sap/ui/Device","sap/ui/core/Control","sap/ui/core/library","sap/ui/core/mvc/View","sap/ui/model/json/JSONModel","sap/m/App","sap/m/Bar","sap/m/Button","sap/m/FeedListItem","sap/m/Label","sap/m/library","sap/m/Link","sap/m/List","sap/m/Page","sap/m/ResponsivePopover"],function(q,L,D,C,c,V,J,A,B,a,F,b,m,d,e,P,R){"use strict";var f=c.mvc.ViewType;var g=m.ListSeparators;var h=m.PlacementType;q.sap.includeStyleSheet(q.sap.getModulePath("sap.collaboration.components.resources.css.SocialProfile",".css"));q.sap.includeStyleSheet(q.sap.getModulePath("sap.collaboration.components.resources.css.ReplyPopover",".css"));var j=C.extend("sap.collaboration.components.controls.ReplyPopover",{metadata:{library:"sap.collaboration",events:{postReplyPress:{parameters:{value:{type:"string"}}},moreRepliesPress:{},afterClose:{},},aggregations:{socialTextArea:{type:"sap.collaboration.components.controls.SocialTextArea",multiple:false},}},});j.prototype.init=function(){this._oLangBundle=new L();this._oJSONModelData=[];this._oJSONModel=new J(this._oJSONModelData);this._oControlToReceiveFocus;this._oSocialProfileView;this._oReplyApp;this._oReplyPage;this._oReplyTextArea;this._oReplyList;this._oReplyButton;this._oReplyHeaderBar;this._oReplyPopover=this._oReplyPopover||this._createReplyPopover();};j.prototype.exit=function(){if(this._oReplyPopover){this._oReplyPopover.destroy();}};j.prototype.addReply=function(r){if(!q.isEmptyObject(r)){if(r.Text){r.Text=this._replaceCarriageReturnWithBRTag(r.Text);}this._oJSONModelData.push(r);this._oJSONModel.setData(this._oJSONModelData,true);}else{this._oReplyTextArea.focus();}};j.prototype.addReplies=function(r){var k=r&&r.data;if(k&&k.length!==0){var l=this._oReplyList.getItems().length;var n=k.length;for(var i=0;i<k.length;i++){if(k[i].Text){k[i].Text=this._replaceCarriageReturnWithBRTag(k[i].Text);k[i].Text="\u200E"+k[i].Text+"\u200E";}}this._oJSONModelData=k.concat(this._oJSONModelData);this._oJSONModel.setData(this._oJSONModelData,true);if(l!==0){this._oControlToReceiveFocus=this._oReplyList.getItems()[n];}if(r.more){this._oShowMoreBar.setVisible(true);}else{this._oShowMoreBar.setVisible(false);}}};j.prototype.openBy=function(o){if(!this._oReplyTextArea){this._oReplyTextArea=this.getSocialTextArea();this._oReplyTextArea.addStyleClass("replyTextAreaToBottom").addStyleClass("replyTextArea");this._oControlToReceiveFocus=this._oReplyTextArea;this._oReplyPage.addContent(this._oShowMoreBar).addContent(this._addList()).addContent(this._oReplyTextArea);this._oReplyPopover.setInitialFocus(this._oReplyTextArea);}this._oReplyPopover.openBy(o);return this;};j.prototype.setBusyIndicatorDelay=function(i){this._oReplyPage.setBusyIndicatorDelay(i);return this;};j.prototype.setBusy=function(i){this._oReplyPage.setBusy(i);return this;};j.prototype.getTextArea=function(){return this._oReplyTextArea;};j.prototype._createReplyPopover=function(){var r=new R({showHeader:false,placement:h.Vertical,contentWidth:"25rem",contentHeight:"455px",content:this._addApp(),afterClose:[function(){this._oReplyApp.backToTop();this._oReplyList.destroyItems();this._oJSONModelData=[];this._oJSONModel.setData(this._oJSONModelData);this._oShowMoreBar.setVisible(false);this._oControlToReceiveFocus=this._oReplyTextArea;this.fireAfterClose();},this]});return r;};j.prototype._addList=function(){var t=this;var r=new F({text:"{Text}",icon:"{Creator/ThumbnailImage}",sender:"{Creator/FullName}",timestamp:"{CreatedAt}",iconActive:false,senderPress:function(E){var o=E.getSource().getBindingContext().getObject();var M=o.Creator.Email;t._oSocialProfileView.getViewData().memberId=M;t._oSocialProfileView.rerender();t._oReplyApp.to(t._oSocialProfilePage);}}).addStyleClass("replyFeedListItem");if(!this._oReplyList){this._oReplyList=new e({width:"100%",items:[],noDataText:this._oLangBundle.getText("ST_REPLY_LIST_AREA"),showNoData:true,showSeparators:g.None,updateFinished:function(E){var l=t._oReplyList.getItems().length;if(l!==0&&t._oControlToReceiveFocus===t._oReplyTextArea){t._oReplyList.getItems()[l-1].focus();}if(t._oReplyList.getItems().length===0){t._oReplyTextArea.addStyleClass("replyTextAreaToBottom");t._oReplyTextArea._oPop.setOffsetX(0);}else{var i=q(t._oReplyList.getDomRef()).height();var k=q(t._oReplyPopover.getDomRef("cont")).height();var n=q(t._oReplyPage.getCustomHeader().getDomRef()).height();var o=parseInt(t._oReplyTextArea.getHeight());var p=q(t._oReplyPage.getFooter().getDomRef()).height();if(i>(k-n-o-p)){t._oReplyTextArea.removeStyleClass("replyTextAreaToBottom");t._oReplyTextArea._oPop.setOffsetX(9);}else{t._oReplyTextArea.addStyleClass("replyTextAreaToBottom");t._oReplyTextArea._oPop.setOffsetX(0);}}t._oControlToReceiveFocus.focus();}});}this._oReplyList.setModel(this._oJSONModel);this._oReplyList.bindItems({path:"/",template:r});return this._oReplyList;},j.prototype._addSocialProfile=function(){var t=this;this._oSocialProfileView=new sap.ui.view({viewData:{langBundle:this._oLangBundle,popoverPrefix:this.getId(),afterUserInfoRetrieved:function(u){if(u){t._sUserProfileURL=u.WebURL;}}},type:f.JS,viewName:"sap.collaboration.components.socialprofile.SocialProfile"});return this._oSocialProfileView;},j.prototype.enableButton=function(i){this._oReplyButton.setEnabled(i);};j.prototype._addApp=function(){var t=this;if(this._oReplyApp){return this._oReplyApp;}this._oReplyButton=new a({text:this._oLangBundle.getText("ST_REPLY_POST"),enabled:false,press:this._postReply.bind(t)});this._oShowMoreLink=new d({text:this._oLangBundle.getText("ST_SHOW_MORE_REPLIES"),press:this._showMoreReplies.bind(t)});this._oShowMoreBar=new B({contentMiddle:[this._oShowMoreLink],visible:false}).addStyleClass("showMoreReplies");this._oReplyPage=new P({showHeader:true,showSubHeader:false,showFooter:true,customHeader:new B({contentMiddle:[new b({text:this._oLangBundle.getText("ST_REPLY_TITLE")})]}),footer:new B({contentRight:[this._createMentionButton(),this._oReplyButton]}),});this._oSocialProfileButton=new a({text:this._oLangBundle.getText("SP_OPEN_JAM_BUTTON"),press:function(){window.open(t._sUserProfileURL,"_blank");}});this._oSocialProfilePage=new P({title:this._oLangBundle.getText("SP_TITLE"),showNavButton:true,showHeader:true,showSubHeader:false,showFooter:true,navButtonPress:function(E){t._oReplyApp.back();},footer:new B({contentRight:[this._oSocialProfileButton]}),content:[this._addSocialProfile()]});this._oReplyApp=new A({backgroundColor:"#ffffff",pages:[this._oReplyPage,this._oSocialProfilePage]});return this._oReplyApp;};j.prototype._createMentionButton=function(){if(D.system.phone){return;}var M=new a({text:"@",tooltip:this._oLangBundle.getText("ST_MENTION_TOOLTIP"),press:[function(){this._oReplyTextArea.atMentionsButtonPressed();},this]});return M;};j.prototype._replaceCarriageReturnWithBRTag=function(t){var s;if(typeof t==="string"){s=t.replace(/[\n\r]/g,'<br>');}return s;};j.prototype._postReply=function(){var v=this._oReplyTextArea.convertTextWithFullNamesToEmailAliases();this.firePostReplyPress({value:v});this._oControlToReceiveFocus=this._oReplyTextArea;};j.prototype._showMoreReplies=function(){this.fireMoreRepliesPress();};return j;});
