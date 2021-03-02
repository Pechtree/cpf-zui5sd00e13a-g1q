sap.ui.require.preload({"sap/ushell/components/tiles/cdm/applauncher/Component.js":function(){
// ${copyright}
sap.ui.define(["sap/ui/core/UIComponent"],function(U){"use strict";return U.extend("sap.ushell.components.tiles.cdm.applauncher.Component",{metadata:{},createContent:function(){var c=this.getComponentData();var p=c.properties.tilePersonalization||{};var s=c.startupParameters;if(s&&s["sap-system"]){p["sap-system"]=s["sap-system"][0];}var t=sap.ui.view({type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.components.tiles.cdm.applauncher.StaticTile",viewData:{properties:c.properties,configuration:p},async:true});t.loaded().then(function(v){this._oController=t.getController();}.bind(this));return t;},tileSetVisualProperties:function(n){if(this._oController){this._oController.updatePropertiesHandler(n);}},tileRefresh:function(){},tileSetVisible:function(i){},exit:function(){this._oController=null;}});});},"sap/ushell/components/tiles/cdm/applauncher/StaticTile.controller.js":function(){sap.ui.define(['sap/ui/core/mvc/Controller','sap/ushell/components/applicationIntegration/AppLifeCycle','sap/ushell/Config'],function(C,A,a){"use strict";return C.extend("sap.ushell.components.tiles.cdm.applauncher.StaticTile",{_aDoableObject:{},_getConfiguration:function(){var c=this.getView().getViewData();c.properties.sizeBehavior=a.last("/core/home/sizeBehavior");c.properties.wrappingType=a.last("/core/home/wrappingType");return c;},onInit:function(){var v=this.getView();var m=new sap.ui.model.json.JSONModel();m.setData(this._getConfiguration());v.setModel(m);this._aDoableObject=a.on("/core/home/sizeBehavior").do(function(s){m.setProperty("/properties/sizeBehavior",s);});},onExit:function(){this._aDoableObject.off();},onPress:function(e){var c=this.getView().getViewData().properties,r={},R=sap.ushell.Container.getRenderer("fiori2");if(e.getSource().getScope&&e.getSource().getScope()===sap.m.GenericTileScope.Display){var t=this._createTargetUrl();if(!t){return;}if(t[0]==='#'){hasher.setHash(t);}else{r.title=c.title;r.appType="App";r.url=c.targetURL;r.appId=c.targetURL;R.logRecentActivity(r);window.open(t,'_blank');}}},updatePropertiesHandler:function(n){var t=this.getView().getContent()[0],T=t.getTileContent()[0];if(typeof n.title!=='undefined'){t.setHeader(n.title);}if(typeof n.subtitle!=='undefined'){t.setSubheader(n.subtitle);}if(typeof n.icon!=='undefined'){T.getContent().setSrc(n.icon);}if(typeof n.info!=='undefined'){T.setFooter(n.info);}},_createTargetUrl:function(){var t=this.getView().getViewData().properties.targetURL,s=this.getView().getViewData().configuration["sap-system"],u,h;if(t&&s){u=sap.ushell.Container.getService("URLParsing");if(u.isIntentUrl(t)){h=u.parseShellHash(t);if(!h.params){h.params={};}h.params["sap-system"]=s;t="#"+u.constructShellHash(h);}else{t+=((t.indexOf("?")<0)?"?":"&")+"sap-system="+s;}}return t;},_getCurrentProperties:function(){var t=this.getView().getContent()[0],T=t.getTileContent()[0],s=a.last("/core/home/sizeBehavior");return{title:t.getHeader(),subtitle:t.getSubheader(),info:T.getFooter(),icon:T.getContent().getSrc(),sizeBehavior:s};}});},true);},"sap/ushell/components/tiles/cdm/applauncher/StaticTile.view.js":function(){sap.ui.define(["sap/m/GenericTile","sap/m/ImageContent","sap/m/TileContent","sap/ui/core/mvc/JSView"],function(G,I,T){"use strict";sap.ui.jsview("sap.ushell.components.tiles.cdm.applauncher.StaticTile",{getControllerName:function(){return"sap.ushell.components.tiles.cdm.applauncher.StaticTile";},createContent:function(c){var v=this.getViewData().properties;this.setHeight('100%');this.setWidth('100%');return new G({header:v.title,subheader:v.subtitle,size:'Auto',sizeBehavior:'{/properties/sizeBehavior}',wrappingType:'{/properties/wrappingType}',tileContent:new T({size:"Auto",footer:v.info,content:new I({src:v.icon})}),press:[c.onPress,c]});}});});},"sap/ushell/components/tiles/cdm/applauncher/i18n/i18n.properties":'\n#XTIT: Title of Static App Launcher\ntitle=Static App Launcher\n',"sap/ushell/components/tiles/cdm/applauncher/manifest.json":'{\n    "_version": "1.1.0",\n    "sap.flp": {\n        "type": "tile",\n        "tileSize": "1x1"\n    },\n    "sap.app": {\n        "id": "sap.ushell.components.tiles.cdm.applauncher",\n        "_version": "1.0.0",\n        "type": "component",\n        "applicationVersion": {\n            "version": "1.0.0"\n        },\n        "title": "{{title}}",\n        "description": "",\n        "tags": {\n            "keywords": []\n        },\n        "ach": "CA-FE-FLP-EU"\n    },\n    "sap.ui": {\n        "_version": "1.1.0",\n        "icons": {\n            "icon": ""\n        },\n        "deviceTypes": {\n            "desktop": true,\n            "tablet": true,\n            "phone": true\n        },\n        "supportedThemes": [\n            "sap_hcb",\n            "sap_belize",\n            "sap_belize_plus"\n        ]\n    },\n    "sap.ui5": {\n        "_version": "1.1.0",\n        "componentName": "sap.ushell.components.tiles.cdm.applauncher",\n        "dependencies": {\n            "minUI5Version": "1.42",\n            "libs": {\n                "sap.m": {}\n            }\n        },\n        "models": {\n            "i18n": {\n                "type": "sap.ui.model.resource.ResourceModel",\n                "uri": "i18n/i18n.properties"\n            }\n        },\n        "rootView": {\n            "viewName": "sap.ushell.components.tiles.cdm.applauncher.StaticTile",\n            "type": "JS"\n        },\n        "handleValidation": false\n    }\n}'},"Component-preload");
