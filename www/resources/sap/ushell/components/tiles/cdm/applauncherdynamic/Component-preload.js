sap.ui.require.preload({"sap/ushell/components/tiles/cdm/applauncherdynamic/Component.js":function(){
// ${copyright}
sap.ui.define(["sap/ui/core/UIComponent"],function(U){"use strict";return U.extend("sap.ushell.components.tiles.cdm.applauncherdynamic.Component",{metadata:{},createContent:function(){var c=this.getComponentData();var p=c.properties||{};var P=p.tilePersonalization||{};var i=p.indicatorDataSource;if(i&&i.path){P.serviceUrl=i.path;P.serviceRefreshInterval=i.refresh;}var s=c.startupParameters;if(s&&s["sap-system"]&&s["sap-system"][0]){P["sap-system"]=s["sap-system"][0];}if(P.serviceUrl&&P.serviceUrl.charAt(0)!=="/"&&p.dataSource&&p.dataSource.uri){var S=p.dataSource.uri;if(P["sap-system"]){if(S.charAt(S.length-1)==="/"){S=S.slice(0,S.length-1);}S+=";o="+P["sap-system"];}if(S.charAt(S.length-1)!=="/"){S+="/";}S+=P.serviceUrl;P.serviceUrl=S;}var t=sap.ui.view({type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile",viewData:{properties:p,configuration:P},async:true});t.loaded().then(function(v){this._oController=t.getController();this.tileRefresh();}.bind(this));return t;},tileSetVisualProperties:function(n){if(this._oController){this._oController.updateVisualPropertiesHandler(n);}},tileRefresh:function(){if(this._oController){this._oController.refreshHandler();}},tileSetVisible:function(i){if(this._oController){this._oController.visibleHandler(i);}},exit:function(){this._oController=null;}});});},"sap/ushell/components/tiles/cdm/applauncherdynamic/DynamicTile.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ushell/components/tiles/utils","sap/ui/core/format/NumberFormat","sap/ushell/Config","sap/ui/thirdparty/datajs","sap/ui/thirdparty/URI"],function(C,u,N,a,O,U){"use strict";return C.extend("sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile",{timer:null,_aDoableObject:{},oDataRequest:null,_getConfiguration:function(){var v=this.getView().getViewData(),c={},o,h;c.configuration=v.configuration;c.properties=v.properties;c.properties.info=c.properties.info||"";c.properties.number_value='...';c.properties.number_value_state='Neutral';c.properties.number_state_arrow='None';c.properties.number_factor='';c.properties.number_unit='';var s=c.configuration["sap-system"];var t=c.properties.targetURL;if(t&&s){o=sap.ushell.Container.getService("URLParsing");if(o.isIntentUrl(t)){h=o.parseShellHash(t);if(!h.params){h["params"]={};}h.params["sap-system"]=s;t="#"+o.constructShellHash(h);}else{t+=((t.indexOf("?")<0)?"?":"&")+"sap-system="+s;}c.properties.targetURL=t;}c.properties.sizeBehavior=a.last("/core/home/sizeBehavior");c.properties.wrappingType=a.last("/core/home/wrappingType");return c;},onInit:function(){var v=this.getView();var m=new sap.ui.model.json.JSONModel();m.setData(this._getConfiguration());v.setModel(m);this._aDoableObject=a.on("/core/home/sizeBehavior").do(function(s){m.setProperty("/properties/sizeBehavior",s);});},refreshHandler:function(){this.loadData(0);},visibleHandler:function(i){if(i){if(!this.oDataRequest){this.refreshHandler(this);}}else{this.stopRequests();}},updateVisualPropertiesHandler:function(n){var p=this.getView().getModel().getProperty("/properties");var c=false;if(typeof n.title!=='undefined'){p.title=n.title;c=true;}if(typeof n.subtitle!=='undefined'){p.subtitle=n.subtitle;c=true;}if(typeof n.icon!=='undefined'){p.icon=n.icon;c=true;}if(typeof n.targetURL!=='undefined'){p.targetURL=n.targetURL;c=true;}if(typeof n.info!=='undefined'){p.info=n.info;c=true;}if(c){this.getView().getModel().setProperty("/properties",p);}},stopRequests:function(){if(this.timer){clearTimeout(this.timer);}if(this.oDataRequest){try{this.oDataRequest.abort();}catch(e){jQuery.sap.log.warning(e.name,e.message);}}},onPress:function(e){var r={},R=sap.ushell.Container.getRenderer("fiori2");if(e.getSource().getScope&&e.getSource().getScope()===sap.m.GenericTileScope.Display){var t=this.getView().getModel().getProperty("/properties/targetURL"),T=this.getView().getModel().getProperty("/properties/title");if(!t){return;}else if(t[0]==='#'){hasher.setHash(t);}else{r.title=T;r.appType="App";r.url=t;r.appId=t;R.logRecentActivity(r);window.open(t,'_blank');}}},initUpdateDynamicData:function(){var v=this.getView(),s=v.getModel().getProperty("/configuration/serviceUrl"),S=v.getModel().getProperty("/configuration/serviceRefreshInterval");if(!S){S=0;}else if(S<10){jQuery.sap.log.warning("Refresh Interval "+S+" seconds for service URL "+s+" is less than 10 seconds, which is not supported. Increased to 10 seconds automatically.",null,"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile.controller");S=10;}if(s){this.loadData(S);}},extractData:function(d){var n,k=["results","icon","title","number","numberUnit","info","infoState","infoStatus","targetParams","subtitle","stateArrow","numberState","numberDigits","numberFactor"];if(typeof d==="object"&&Object.keys(d).length===1){n=Object.keys(d)[0];if(jQuery.inArray(n,k)===-1){return d[n];}}return d;},successHandleFn:function(r){var c=this.getView().getModel().getProperty("/configuration");var d=r;this.oDataRequest=undefined;if(typeof r==="object"){var b=jQuery.sap.getUriParameters(c.serviceUrl).get("$inlinecount");if(b&&b==="allpages"){d={number:r.__count};}else{d=this.extractData(d);}}else if(typeof r==="string"){d={number:r};}this.updatePropertiesHandler(d);},errorHandlerFn:function(m){this.oDataRequest=undefined;var M=m&&m.message?m.message:m,r=u.getResourceBundleModel().getResourceBundle(),s=this.getView().getModel().getProperty("/configuration/serviceUrl");if(m.response){M+=" - "+m.response.statusCode+" "+m.response.statusText;}jQuery.sap.log.error("Failed to update data via service "+s+": "+M,null,"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile");this.updatePropertiesHandler({number:"???",info:r.getText("dynamic_data.error")});},loadData:function(s){var b=this.getView().getModel().getProperty("/configuration/serviceUrl"),S,c,r,o;if(!b){return;}r={"Cache-Control":"no-cache, no-store, must-revalidate","Pragma":"no-cache","Expires":"0","Accept-Language":(sap.ui&&sap.ui.getCore().getConfiguration().getLanguage())||""};if(s>0){jQuery.sap.log.info("Wait "+s+" seconds before calling "+b+" again",null,"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile.controller");this.timer=setTimeout(this.loadData.bind(this,s,false),(s*1000));}if(!this.oDataRequest){if(sap.ushell.Container){S=sap.ui.getCore().getConfiguration().getSAPLogonLanguage();if(S){r["sap-language"]=S;}c=sap.ushell.Container.getLogonSystem()?sap.ushell.Container.getLogonSystem().getClient():"";o=new U(b);if(c&&!o.protocol()){r["sap-client"]=c;}}if((S)&&(b.indexOf("sap-language=")==-1)){b=b+(b.indexOf("?")>=0?"&":"?")+"sap-language="+S;}this.oDataRequest=O.read({requestUri:b,headers:r},this.successHandleFn.bind(this),this.errorHandlerFn.bind(this));}},onExit:function(){this.stopRequests();this._aDoableObject.off();},addParamsToUrl:function(s,t){var p="",b=s.indexOf("?")!==-1,i;if(t&&t.length>0){for(i=0;i<t.length;i=i+1){p+=t[i];if(i<t.length-1){p+="&";}}}if(p.length>0){if(!b){s+="?";}else{s+="&";}s+=p;}return s;},_normalizeNumber:function(n,m,b,i){var c;if(isNaN(n)){c=n;}else{var o=sap.ui.core.format.NumberFormat.getFloatInstance({maxFractionDigits:i});if(!b){var d=Math.abs(n);if(d>=1000000000){b='B';n/=1000000000;}else if(d>=1000000){b='M';n/=1000000;}else if(d>=1000){b='K';n/=1000;}}c=o.format(n);}var e=c;var f=e[m-1];m-=(f==='.'||f===',')?1:0;e=e.substring(0,m);return{displayNumber:e,numberFactor:b};},updatePropertiesHandler:function(d){var e=u.getResourceBundleModel().getResourceBundle().getText("dynamic_data.error");var b=0,i,n,c,s,p=this.getView().getModel().getProperty("/properties"),o={title:d.title||p.title||"",subtitle:d.subtitle||p.subtitle||"",icon:d.icon||p.icon||"",targetURL:d.targetURL||p.targetURL||"",number_value:!isNaN(d.number)?d.number:"...",number_digits:d.numberDigits>=0?d.numberDigits:4,info:p.info==e?d.info||"":d.info||p.info||"",number_unit:d.numberUnit||p.number_unit||"",number_state_arrow:d.stateArrow||p.number_state_arrow||"None",number_value_state:d.numberState||p.number_value_state||"Neutral",number_factor:d.numberFactor||p.number_factor||""};var t=[];if(d.targetParams){t.push(d.targetParams);}if(d.results){for(i=0,n=d.results.length;i<n;i=i+1){c=d.results[i].number||0;if(typeof c==="string"){c=parseInt(c,10);}b=b+c;s=d.results[i].targetParams;if(s){t.push(s);}}o.number_value=b;}if(t.length>0){o.targetURL=this.addParamsToUrl(o.targetURL,t);}if(!isNaN(d.number)){if(typeof d.number==="string"){d.number=d.number.trim();}var S=this._shouldProcessDigits(d.number,d.numberDigits),m=o.icon?4:5;if(d.number&&d.number.length>=m||S){var f=this._normalizeNumber(d.number,m,d.numberFactor,d.numberDigits);o.number_factor=f.numberFactor;o.number_value=f.displayNumber;}else{var g=N.getFloatInstance({maxFractionDigits:m});o.number_value=g.format(d.number);}}if(o.number_value_state){switch(o.number_value_state){case"Positive":o.number_value_state="Good";break;case"Negative":o.number_value_state="Error";break;}}o.sizeBehavior=a.last("/core/home/sizeBehavior");this.getView().getModel().setProperty("/properties",o);},_shouldProcessDigits:function(d,D){var n;d=typeof(d)!=='string'?d.toString():d;if(d.indexOf('.')!==-1){n=d.split(".")[1].length;if(n>D){return true;}}return false;}});},true);},"sap/ushell/components/tiles/cdm/applauncherdynamic/DynamicTile.view.js":function(){sap.ui.define(['sap/m/GenericTile','sap/m/TileContent','sap/m/NumericContent'],function(G,T,N){"use strict";sap.ui.jsview("sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile",{getControllerName:function(){return"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile";},createContent:function(c){this.setHeight('100%');this.setWidth('100%');return new G({size:'Auto',header:'{/properties/title}',subheader:'{/properties/subtitle}',sizeBehavior:'{/properties/sizeBehavior}',wrappingType:'{/properties/wrappingType}',tileContent:[new T({size:'Auto',footer:'{/properties/info}',footerColor:{path:"/data/display_info_state",formatter:function(f){if(!sap.m.ValueColor[f]){f=sap.m.ValueColor.Neutral;}return f;}},unit:'{/properties/number_unit}',content:[new N({truncateValueTo:5,scale:'{/properties/number_factor}',value:'{/properties/number_value}',indicator:'{/properties/number_state_arrow}',valueColor:{path:"/properties/number_value_state",formatter:function(v){if(!sap.m.ValueColor[v]){v=sap.m.ValueColor.Neutral;}return v;}},icon:'{/properties/icon}',width:'100%'})]})],press:[c.onPress,c]});}});});},"sap/ushell/components/tiles/cdm/applauncherdynamic/i18n/i18n.properties":'\n#XTIT: Title of Dynamic App Launcher\ntitle=Dynamic App Launcher\n',"sap/ushell/components/tiles/cdm/applauncherdynamic/manifest.json":'{\n    "_version": "1.1.0",\n    "sap.flp": {\n        "type": "tile",\n        "tileSize": "1x1"\n    },\n    "sap.app": {\n        "id": "sap.ushell.components.tiles.cdm.applauncherdynamic",\n        "_version": "1.0.0",\n        "type": "component",\n        "applicationVersion": {\n            "version": "1.0.0"\n        },\n        "title": "{{title}}",\n        "description": "",\n        "tags": {\n            "keywords": []\n        },\n        "ach": "CA-FE-FLP-EU"\n    },\n    "sap.ui": {\n        "_version": "1.1.0",\n        "icons": {\n            "icon": ""\n        },\n        "deviceTypes": {\n            "desktop": true,\n            "tablet": true,\n            "phone": true\n        },\n        "supportedThemes": [\n            "sap_hcb",\n            "sap_belize",\n            "sap_belize_plus"\n        ]\n    },\n    "sap.ui5": {\n        "_version": "1.1.0",\n        "componentName": "sap.ushell.components.tiles.cdm.applauncherdynamic",\n        "dependencies": {\n            "minUI5Version": "1.42",\n            "libs": {\n                "sap.m": {}\n            }\n        },\n        "models": {\n            "i18n": {\n                "type": "sap.ui.model.resource.ResourceModel",\n                "uri": "i18n/i18n.properties"\n            }\n        },\n        "rootView": {\n            "viewName": "sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile",\n            "type": "JS"\n        },\n        "handleValidation": false\n    }\n}'},"Component-preload");
