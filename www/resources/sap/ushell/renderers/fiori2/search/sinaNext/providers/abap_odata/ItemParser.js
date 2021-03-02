sinaDefine(['../../sina/SinaObject','../../core/util','./typeConverter'],function(S,u,T){"use strict";return S.derive({_init:function(p){this.provider=p;this.sina=p.sina;this.intentsResolver=this.sina._createFioriIntentsResolver();this.suvNavTargetResolver=this.sina._createSuvNavTargetResolver();},parse:function(s,d){if(d.ResultList.SearchResults===null){return Promise.resolve([]);}var i=d.ResultList.SearchResults.results;return this.parseItems(i);},parseItems:function(a){var b=[];for(var i=0;i<a.length;++i){var c=a[i];var d=this.parseItem(c);b.push(d);}return Promise.all(b);},parseItem:function(i){var j;var a={};var t=[];var b=[];var d=[];var s,c,e,f;var g={};var w=[];var h=[];var k;var l=this.sina.getDataSource(i.DataSourceId);var m,n,o,p;var q=[];var r=i.Score/100;for(j=0;j<i.Attributes.results.length;j++){m=i.Attributes.results[j];n=l.getAttributeMetadata(m.Id);o=this.sina._createSearchResultSetItemAttribute({id:m.Id,label:n.label,value:T.odata2Sina(n.type,m.Value),isHighlighted:m.Snippet.indexOf("<b>")>-1&&m.Snippet.indexOf("</b>")>-1,metadata:n,groups:[]});if(u.getUrlParameter('resultValueFormatted')==="true"){o.valueFormatted=undefined;o.valueHighlighted=undefined;}else{o.valueFormatted=m.ValueFormatted||'';o.valueHighlighted=m.Snippet||m.ValueFormatted||'';}a[o.id]=o;u.appendRemovingDuplicates(q,u.extractHighlightedTerms(o.valueHighlighted));if(n.suvUrlAttribute&&n.suvMimeTypeAttribute){e=a[n.suvUrlAttribute]||n.suvUrlAttribute.id;f=a[n.suvMimeTypeAttribute]||n.suvMimeTypeAttribute.id;g[m.Id]={suvThumbnailAttribute:o,suvTargetUrlAttribute:e,suvTargetMimeTypeAttribute:f};}if(n.usage.Navigation){if(n.usage.Navigation.mainNavigation){k=this.sina._createNavigationTarget({label:o.value,targetUrl:o.value,target:"_blank"});}}if(n.usage.Detail){d.push(o);}if(!n.usage.Title&&!n.usage.Detail&&!n.isDescription&&(o.isHighlighted||(o.descriptionAttribute&&o.descriptionAttribute.isHighlighted))){w.push(o);}if(n.usage.Title){t.push(o);}if(n.usage.TitleDescription){b.push(o);}p=l.attributeMetadataMap[o.id]._private.semanticObjectType;if(p&&p.length>0){h.push({name:p,value:o.value,type:o.metadata.type});}}for(c in g){s=g[c];if(typeof s.suvTargetUrlAttribute==="string"){s.suvTargetUrlAttribute=a[s.suvTargetUrlAttribute];}if(typeof s.suvTargetMimeTypeAttribute==="string"){s.suvTargetMimeTypeAttribute=a[s.suvTargetMimeTypeAttribute];}if(!(s.suvTargetUrlAttribute||s.suvTargetMimeTypeAttribute)){delete g[c];}}t.sort(function(z,A){return z.metadata.usage.Title.displayOrder-A.metadata.usage.Title.displayOrder;});d.sort(function(z,A){return z.metadata.usage.Detail.displayOrder-A.metadata.usage.Detail.displayOrder;});var v=this._parseHitAttributes(i,l,q);w=w.concat(v);d=d.concat(w);this.suvNavTargetResolver.resolveSuvNavTargets(l,g,q);var x=this.sina._createSearchResultSetItem({dataSource:l,titleAttributes:t,titleDescriptionAttributes:b,detailAttributes:d,defaultNavigationTarget:k,navigationTargets:[],score:r});x._private.allAttributesMap=a;x._private.semanticObjectTypeAttributes=h;var y=this.sina._createItemPostParser({searchResultSetItem:x});return y.postParseResultSetItem();},_parseHitAttributes:function(a,d,s){var h=[];if(a.HitAttributes!==null){for(var i=0;i<a.HitAttributes.results.length;i++){var b=a.HitAttributes.results[i];var m=d.getAttributeMetadata(b.Id);var v=T.odata2Sina(m.type,u.filterString(b.Snippet,['<b>','</b>']));var c=this.sina._createSearchResultSetItemAttribute({id:b.Id,label:m.label,value:v,valueFormatted:v,valueHighlighted:b.Snippet,isHighlighted:b.Snippet.indexOf("<b>")>-1&&b.Snippet.indexOf("</b>")>-1,metadata:m});u.appendRemovingDuplicates(s,u.extractHighlightedTerms(c.valueHighlighted));h.push(c);}}return h;}});});
