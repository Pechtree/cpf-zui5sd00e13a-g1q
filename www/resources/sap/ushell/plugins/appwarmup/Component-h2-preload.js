sap.ui.require.preload({"sap/ushell/plugins/appwarmup/Component.js":function(){
// ${copyright}
sap.ui.define(["jquery.sap.global","sap/ui/core/Component","sap/ui/core/mvc/Controller","sap/ui/core/service/ServiceFactory","sap/ui/core/service/ServiceFactoryRegistry","./ShellUIService"],function(q,C,a,S,b,c){"use strict";var g=q.sap.getResourcePath("sap/ushell/plugins/ghostapp");var p={"name":"sap.ushell.plugins.ghostapp","manifest":true,"asyncHints":{"libs":[{"name":"sap.m"},{"name":"sap.ui.core"},{"name":"sap.f"},{"name":"sap.suite.ui.generic.template"},{"name":"sap.ui.comp"},{"name":"sap.ui.fl"},{"name":"sap.ui.generic.app"},{"name":"sap.ui.generic.template"},{"name":"sap.ui.table"},{"name":"sap.ui.unified"},{"name":"sap.uxap"},{"name":"sap.ui.layout"}],"cacheTokens":{"dataSources":{"/ghostapp-c9f1f0bd-ff78-4660-9a1f-295814f00fe0/":"20180613155243"}},"requests":[{"name":"sap.ui.fl.changes","reference":"sap.ushell.plugins.ghostapp.Component"}],"waitFor":{}},"id":"sap.ushell.plugins.ghostapp","componentData":{"startupParameters":{},"technicalParameters":{}},"async":true};var s="sap.ushell.plugins.appwarmup.Component";return C.extend(s,{metadata:{version:"${version}",library:"sap.ushell"},doWarmUp:function(){var P=[];P.push(new Promise(function(r,d){sap.ui.require(["sap/ui/model/odata/ODataMetadata"],function(O){var o=O.prototype._loadMetadata;O.prototype._loadMetadata=function(u,e){if(this.sUrl&&this.sUrl.startsWith("/ghostapp-c9f1f0bd-ff78-4660-9a1f-295814f00fe0/$metadata")){this.sUrl=g+"/metadata.xml";O.prototype._loadMetadata=o;}return o.call(this,u,e);};r();},d);}));Promise.all(P).then(function(){b.register("sap.ushell.plugins.appwarmup.ShellUIService",new S(c));return C.create(p);}).then(function(d){var h=document.createElement("div");h.style.visibility="hidden";document.body.appendChild(h);sap.ui.require(["sap/ui/core/ComponentContainer"],function(e){a.registerExtensionProvider();var f=new e();f.setComponent(d);f.placeAt(h);f.addEventDelegate({onAfterRendering:function(){setTimeout(function(){d.destroy();},5000);}});});}).catch(function(){q.sap.log.error("GhostApp component could not be created",null,this);});},init:function(){this.doWarmUp();}});});},"sap/ushell/plugins/appwarmup/manifest.json":'{\n\t"_version": "1.1.0",\n\n\t"sap.app": {\n\t\t"_version": "1.1.0",\n\t\t"id": "sap.ushell.plugins.appwarmup",\n\t\t"type": "component",\n\t\t"applicationVersion": {\n\t\t\t"version": "1.0.0"\n\t\t}\n\t},\n\n\t"sap.ui": {\n\t\t"_version": "1.1.0",\n\n\t\t"technology": "UI5",\n\t\t"supportedThemes": [\n\t\t\t"sap_hcb",\n\t\t\t"sap_bluecrystal"\n\t\t],\n\t\t"deviceTypes": {\n\t\t\t"desktop": true,\n\t\t\t"tablet": false,\n\t\t\t"phone": false\n\t\t}\n\t},\n\n\t"sap.ui5": {\n\t\t"_version": "1.1.0",\n\t\t"contentDensities": {\n\t\t\t"compact": true,\n\t\t\t"cozy": false\n\t\t},\n\t\t"dependencies": {\n\t\t\t"minUI5Version": "1.54.0",\n\t\t\t"libs": {\n\t\t\t\t"sap.ui.core": {\n\t\t\t\t\t"minVersion": "1.54.0"\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\t"sap.flp": {\n\t\t"type": "plugin"\n\t}\n}'},"sap/ushell/plugins/appwarmup/Component-h2-preload");sap.ui.loader.config({depCacheUI5:{"sap/ushell/plugins/appwarmup/Component.js":["jquery.sap.global.js","sap/ui/core/Component.js","sap/ui/core/mvc/Controller.js","sap/ui/core/service/ServiceFactory.js","sap/ui/core/service/ServiceFactoryRegistry.js","sap/ushell/plugins/appwarmup/ShellUIService.js"],"sap/ushell/plugins/appwarmup/ShellUIService.js":["sap/ui/core/service/Service.js"]}});
