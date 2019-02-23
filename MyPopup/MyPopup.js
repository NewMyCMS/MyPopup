/****************************************************MyPopup使用说明******************************************************
版本：0.1.23
麦草CMS（MyCMS），简约而不简单。
MyPopup，做的很少。MyPopup就像alert、confirm、propmt等控件一样仅仅弹出一个对话框，其他的交给回调函数yes和no甚至你绑定的事件处理函数，由你随意支配。MyPopup，做的多。大多数情况下，你不用去管MyPopup弹出的位置、宽度、高度等等，
MyPopup都会智能做出判断、渲染。
MyPopup是一个JavaScript（js）弹出层、弹窗、对话框组件。MyPopup不仅模拟了alert、confirm、propmt等等控件，还扩展出tip（小提示框）、loading（加载中）、iframe（框架）、open（常规弹窗）、blank（空白弹出层）等等常用的弹出层。让我最满意的是tip()方法，它依附于目标弹出一个小提示框。tip()方法会根据目标元素智能渲染小提示框的位置和弹出方向。依据MyPopup的tip()方法可以轻松扩展出下拉菜单组件。小提示框有zhi（带直角尾巴）、zhi1（带边框的直角尾巴）、jian（带尖角尾巴）、noTail（不带尾巴）四种样式，调用方法是MyCMS.popup.tip("麦草CMS问候您",{tipStyle: "zhi"})。
了解更多，请访问http://www.mycms.xyz
****************************************************************************************************************************/

var a = function(){
	'use strict';
	var MyCMS = {
	version: ".1",
	name: "MyCMS",
	author: "麦草CMS"
	};
	window.MyCMS = MyCMS;
	
	var currDir = MyCMS.myPopupDir = (function(){
		var js = document.scripts;
		alert(js.length);
		return js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);
	})();

	var arr = MyCMS.array = {
		each: function(){}
	};
	//var z;
	var getType = MyCMS.getType = function(vari){
		var s = Object.prototype.toString.call(vari).toLowerCase().match(/\[object (.*)\]/);
		return s[1];
	};
	
	//alert(getType(z));
	
	var browser = MyCMS.browser={};
	var os = MyCMS.os = {};
	(function(){
  		var _ua = navigator.userAgent.toLowerCase();
  		var s;
  		(s = _ua.match(/rv:([\d\.]+)\) like gecko/)) ? MyCMS.browser.ie = s[1] :
  		(s = _ua.match(/msie ([\d\.]+)/)) ? MyCMS.browser.ie = s[1] :
  		(s = _ua.match(/edge\/([\d\.]+)/)) ? MyCMS.browser.edge = s[1] :
  		(s = _ua.match(/firefox\/([\d\.]+)/)) ? MyCMS.browser.firefox = s[1] :
  		(s = _ua.match(/(?:opera|opr).([\d\.]+)/)) ? MyCMS.browser.opera = s[1] :
  		(s = _ua.match(/chrome\/([\d\.]+)/)) ? MyCMS.browser.chrome = s[1] :
  		(s = _ua.match(/version\/([\d\.]+).*safari/)) ? MyCMS.browser.safari = s[1] : MyCMS.browser.other = "Other";
  		if(MyCMS.browser.ie){ MyCMS.browser.info = 'IE: ' + MyCMS.browser.ie;}
  		if(MyCMS.browser.edge){ MyCMS.browser.info = 'EDGE: ' + MyCMS.browser.edge;}
  		if(MyCMS.browser.firefox){ MyCMS.browser.info = 'Firefox: ' + MyCMS.browser.firefox;}
  		if(MyCMS.browser.chrome){ MyCMS.browser.info = 'Chrome: ' + MyCMS.browser.chrome;}
  		if(MyCMS.browser.opera){ MyCMS.browser.info = 'Opera: ' + MyCMS.browser.opera;}
  		if(MyCMS.browser.safari){ MyCMS.browser.info = 'Safari: ' + MyCMS.browser.safari;}
		if(MyCMS.browser.other){ MyCMS.browser.info = MyCMS.browser.other;}
	})();
	//alert(browser.info);
	
	(function(){
  		var _ua = navigator.userAgent.toLowerCase();
  		var s;
  		(s = _ua.match(/windows nt ([\d\.]+)/)) ? MyCMS.os.win = s[1] :
  		(s = _ua.match(/mac os x ([\d_]+)/)) ? MyCMS.os.mac = s[1] :
  		(s = _ua.match(/iphone os ([\d_]+)/)) ? MyCMS.os.ios = s[1] :
  		(s = _ua.match(/ipad;.+cpu os ([\d_]+)/)) ? MyCMS.os.ipad = s[1] :
  		(s = _ua.match(/android ([\d\.]+)/)) ? MyCMS.os.android = s[1] :
  		(s = _ua.match(/linux.+[^android]/)) ? MyCMS.os.linux = "" : MyCMS.os.other = "Other";
  		if(MyCMS.os.win){ MyCMS.os.info = 'Win : ' + MyCMS.os.win;}
  		if(MyCMS.os.mac){ MyCMS.os.info = 'Mac os: ' + MyCMS.os.mac;}
  		if(MyCMS.os.ios){
			MyCMS.os.info = 'IOS: ' + MyCMS.os.ios;
			MyCMS.os.isMobile = true;
		}
  		if(MyCMS.os.ipad){
			MyCMS.os.info = 'IOS: ' + MyCMS.os.ipad + " for Ipad";
			MyCMS.os.isMobile = true;
		}
  		if(MyCMS.os.android){
			MyCMS.os.info = 'Android: ' + MyCMS.os.android;
			MyCMS.os.isMobile = true;
		}
  		if(MyCMS.os.linux){ MyCMS.os.info = 'Linux: ' + MyCMS.os.linux;}
		if(MyCMS.os.other){ MyCMS.os.info = MyCMS.os.other;}
	})();
	//alert(os.info)
	
	var utils = MyCMS.utils ={
		name: "MyCMSUtils",
		version: ".1",
		author: "麦草CMS",
		getViewport: function(){
			if (document.compatMode == "BackCompat"){
				return {
					width: document.body.clientWidth,
					height: document.body.clientHeight
				};
			} else {
				return {
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight
				};
			}
		},
		getPageArea: function(){
			if (document.compatMode == "BackCompat"){
				return {
					width: Math.max(document.body.scrollWidth,document.body.clientWidth),
					height: Math.max(document.body.scrollHeight,document.body.clientHeight)
				};
			} else {
				return {
					width: Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),
					height: Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
				};
			}
		},
		getScroll: function(){
			return {
				left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
				top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
			};
		},
		/*getRel: function(elem){
			var absPos = this.getAbs(elem),
				scroll = this.getScroll();
			return {
				x: absPos.x - scroll.left,
				y: absPos.y - scroll.top
			};
		},
		//递归法取得的元素绝对位置有误差，offsetTop获得的是相对位置的四舍五入值，
		getAbs: function(elem){
			var x = 0, y = 0;
			while (elem !== null){
				alert(elem.nodeName)
				x += (elem.offsetLeft);// + elem.clientLeft);
				y += (elem.offsetTop);// + elem.clientTop);
				elem = elem.offsetParent;
			}
			return {
				x: x,
				y: y
			};
		},*/
		getRel: function(elem){
			var domRect = elem.getBoundingClientRect();
			//alert(document.body.offsetTop)
			return {
				x: domRect.left,
				y: domRect.top
			};
		},
		getAbs: function(elem){
			var relPos = this.getRel(elem),
				scroll = this.getScroll();
			return {
				x: relPos.x + scroll.left,
				y: relPos.y + scroll.top
			};
		},
		setCookie: function(name, value, options){
			var theCookie, now, expires;
			if(name && value){
				theCookie = name + "=" + encodeURIComponent(value);
			}else{
				return;
			}
			if(options && getType(options) == "object"){
				if(options.expires){
					now = new Date();
					expires =  now.getTime() + (options.expires * 1000);
					now.setTime(expires);
					theCookie += "; expires=" + now.toGMTString();
				}
				if(options.path){ theCookie += "; path=" + options.path;}
				if(options.domain){ theCookie += "; domain=" + options.domain;}
			}
			document.cookie = theCookie;
		},
		getCookie: function(name){
			var cookies = document.cookie,
				arr = cookies.split(";"),
				arr1;
			for(var i = 0; i < arr.length; i++){
				arr1 = arr[i].split("=");
				if(arr1[0] === name){ return decodeURIComponent( arr1[1] );}
			}
			return null;
			
		}
	};
	
	var error = MyCMS.error = {
		name: "MyCMSError",
		version: ".1",
		make: function(module, description){
			
		}
	};

	//事件
	var evt1 = MyCMS.event = {
		name : "MyCMSEvent",
		version: ".1",
		author: "麦草CMS",
		addEvent : function(elem, evtType, handler, bool){
			var bool = ("undefined" === typeof bool) ? false: bool;
			if(elem.addEventListener){
				elem.addEventListener(evtType, handler, bool);
				//alert(handler+elem.outerHTML)
			}else if(elem.attachEvent){
				elem.attachEvent("on" + evtType, handler);
			}
		},
		cancelBubble: function(evt){
			if(evt.cancelBubble){
				evt.cancelBubble = true;
			}else if(evt.stopPropagation){
				evt.stopPropagation();
			}
		},
		removeEvent: function(elem, evtType, handler, bool){
			var bool = ("undefined" === bool) ? false: bool;
			if(elem.removeEventListener){
				elem.removeEventListener(evtType, handler, bool);
			}else if(elem.detachEvent){
				elem.detachEvent("on" + evtType, handler);
			}
		},
		getEvent: function(evt){
			var evt = (evt && evt.target) ? evt : ((window.event) ? window.event : null);
			return evt;
		},
		getElement : function(evt){
			return (evt.srcElement) ? evt.srcElement : ((evt.target) ? evt.target : null);
		},
		preventDef: function(evt){
			if(evt.preventDefault){
				evt.preventDefault();
			}else if(evt.returnValue){
				evt.returnValue = false;
			}
		},
		fireEvent: function(elem, evtType, evt){
			if(elem.dispatchEvent(evt)){
				elem.dispatchEvent(evt);
			}else{
				elem.fireEvent(evtType, evt);
			}
		},
		createEvent: function(eventType){
			var evt;
			if(document.createEvent){
				evt = document.createEvent(eventType);
				evt.initEvent("click", true, false);
			}else if(document.createEventObject){
				evt = document.createEventObject();
			}
			return evt;
		}
	};

	//弹窗
	var popup = MyCMS.popup = {
		name: "MyCMSPopup",
		version: ".1",
		author: "麦草CMS",
		defaultTitle: "麦草CMS这样说：",
		index: 0,
		parentIndex: null,
		isShade: false,
		parentIndexs: [],
		pointer: 0,
		indexs: [],
		links: [],
		indexCache: [],
		shadeIndexs: [],
		shadeIndexCache: [],	
		isNew: false,
		timers: [],
		outerClickIndexs: [],
		outerClickIndexs1: [],
		tipTargets: [],
		X: false,
		Y: false,
		bool: false,
		init: function(theme){
			var theme = theme || "default";
			var link = document.createElement("link");
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = currDir + "theme/" + theme + "/MyPopup.css";
			var link1 = document.createElement("link");
			link1.rel = "stylesheet";
			link1.type = "text/css";
			link1.href = currDir + "font/iconfont.css";
			document.getElementsByTagName("head")[0].appendChild(link);
			document.getElementsByTagName("head")[0].appendChild(link1);
		},
		set: function(name, value){
			this[name] = value;
		},
		make: function(type, content, options, target, defaultValue){
			var self = this;
			var options = options || {};
			options = {
				shade: "undefined" == typeof options.shade ? false : options.shade,
				title: "undefined" == typeof options.title ? self.defaultTitle : options.title,
				width: options.width,
				height: options.height,
				closeBtn: "undefined" == typeof options.closeBtn ? true : options.closeBtn,
				resizeBtn: options.resizeBtn,
				time: parseFloat("undefined" == typeof options.time ? 0 : options.time),
				yes: type == "jm-alert" ? null : options.yes,
				no: type == "jm-alert" ? null : options.no,
				position: options.position,
				top: options.top,
				right: options.right,
				bottom: options.bottom,
				left: options.left,
				theme: options.theme,
				buttons: options.buttons || ["确定", "取消"],
				outerClick: "undefined" == typeof options.outerClick ? true : options.outerClick,
				animation: options.animation || "",
				direction: os.isMobile ? "vertical" : (options.direction || "vertical"),//*/"horizontal"),
				tipStyle: options.tipStyle || "zhi",
				tipPosition: options.tipPosition || /*"follow",//*/"target",
				tipType: options.tipType == "larger" ? options.tipType : "normal",
				color: options.color,
				bgColor: options.bgColor,
				titleBgColor: options.titleBgColor,
				buttonColor: options.buttonColor,
				buttonBgColor: options.buttonBgColor,
				contentBgColor: options.contentBgColor,
				titleColor: options.titleColor,
				border: options.border,
				isOut: options.isOut || false,
				func: options.func,
				isInsertToDoc: (type && options.isInsertToDoc) || false 
			};
			var index, popupId, parent, div, div1, div2, mobileCSS, d1, d2, d3, xmp, xmp1, label, textarea, iframe, span, span1, btn1, btn2, height, link = null, isNon = true, linkHref, theme = options.theme || "", evt, elem = null;
			if(type == "tip"){
				evt = MyCMS.event.getEvent(target);
				if(!evt && options.isInsertToDoc){
					options.shade = false;
				}
				elem = evt ? MyCMS.event.getElement(evt) : target;
				//alert(elem)
				for(var i = 0, arr = self.tipTargets;i < arr.length; i++){
					if(arr[i] === elem){
						if(evt){
							MyCMS.event.cancelBubble(evt);
						}
						return;
					}
				}
			}
			self.index++;
			popupId = "_popup_" + self.index;
			function divMake(){
				d1 = document.createElement("div");
				d1.className = "jm-popupTitle";
				xmp1 = document.createElement("xmp");
				span = document.createElement("span");
				span.className = "jm-resize";
				span.innerHTML = "&#xe664;";
				span1 = document.createElement("span");
				span1.className = "jm-close";
				span1.innerHTML = '<a href="#">&#xe664;</a>';
				d1.appendChild(xmp1);
				d1.appendChild(span);
				d1.appendChild(span1);
				div.appendChild(d1);
				div.appendChild(d2);
	  			d3 = document.createElement("div");
				d3.className = "jm-popupButtons clearfix";
	  			btn1 = document.createElement("button");
				btn1.setAttribute("type", "button");
				d3.appendChild(btn1);
	  			btn2 = document.createElement("button");
				btn2.setAttribute("type", "button");
				d3.appendChild(btn2);
				div.appendChild(d3);
				if(!options.closeBtn){ span1.style.display = "none";}
				if(options.resizeBtn){ span.style.display = "inline-block";}
				if(options.buttons && "undefined" == typeof options.buttons[0]){
					options.buttons[0] = options.buttons;
					options.buttons[1] = "";
				}
				if(options.buttons[0]){
					btn1.innerHTML = options.buttons[0];
				}else{
					btn1.style.display = "none";
				}
				if(options.buttons[1]){
					btn2.innerHTML = options.buttons[1];
				}else{
				btn2.style.display = "none";
				}
				var s = document.createTextNode(options.title);
				xmp1.appendChild(s);
				MyCMS.event.addEvent(span1, "click", function(evt){ MyCMS.event.preventDef(evt);MyCMS.event.cancelBubble(evt); self.close(div2);});
				MyCMS.event.addEvent(btn2, "click", function(){ self.cancel(div2, options.no, popupId, textarea);});
				MyCMS.event.addEvent(btn1, "click", function(){ self.submit(div2, options.yes, popupId, textarea);});
				//MyCMS.event.addEvent(span, "click", self.resize);
			}
			function restructureTail(direction){
				switch(options.tipStyle){
					case "zhi":
						switch(direction){
							case "bottom":
								d1.children[0].style.top = "auto";
								d1.children[0].style.bottom = "10px";
								break;
							case "right":
								d1.children[0].style.left = "auto";
								d1.children[0].style.right = "10px";
								break;
						}
						break;
					case "jian":
						switch(direction){
							case "bottom":
								d1.children[0].style.top = "auto";
								d1.children[0].style.bottom = "10px";
								break;
							case "right":
								d1.children[0].style.left = "auto";
								d1.children[0].style.right = "10px";
								break;
						}
						break;
					case "zhi1":
						switch(direction){
							case "bottom":
								d1.children[0].style.top = "auto";
								d1.children[0].style.bottom = "10px";
								d1.children[1].style.top = "auto";
								d1.children[1].style.bottom = "10px";
								break;
							case "right":
								d1.children[0].style.left = "auto";
								d1.children[0].style.right = "10px";
								d1.children[1].style.left = "auto";
								d1.children[1].style.right = "10px";
								break;
						}
						break;
					/*case "dun":
						switch(direction){
							case "bottom":
								d1.children[0].style.top = "auto";
								d1.children[0].style.bottom = "10px";
								d1.children[1].style.top = "auto";
								d1.children[1].style.bottom = "10px";
								break;
							case "right":
								d1.children[0].style.left = "auto";
								d1.children[0].style.right = "10px";
								d1.children[1].style.left = "auto";
								d1.children[1].style.right = "10px";
								break;
						}
						break;*/
				}
			}
			function restructureTail1(){
				switch(options.tipStyle){
					case "zhi":
						options.left = 0;
						d1.children[0].style.left = absPos.x + 10 + "px";
						break;
					case "jian":
						options.left = 0;
						d1.children[0].style.left = absPos.x + 10 + "px";
						break;
					case "zhi1":
						options.left = 0;
						d1.children[0].style.left = absPos.x + 10 + "px";
						d1.children[1].style.left = absPos.x + 10 + "px";
						break;
				}
			}
			function tipFunc(){
				if(evt){
					if(relPos.y < 30){
						if(absPos.y < 30){
							scrollTo(absPos.x - relPos.x, 0);
							if(options.tipPosition == "follow"){
								absPos.y = 30;
								relPos.y = 30;
							}
						}else{
							diff = 30 - relPos.y;
							scrollTo(absPos.x - relPos.x, absPos.y - diff);
							if(options.tipPosition == "follow"){
								relPos.y = 30;
							}
						}
					}else if(relPos.y + elem.offsetHeight > client.height - 30){
						if(scroll.height - absPos.y < 30){
							scrollTo(absPos.x - relPos.x, scroll.height - client.height);
							if(options.tipPosition == "follow"){
								absPos.y = scroll.height - 30;
								relPos.y = client.height - 30;
							}
						}else{
							diff = 30 - (client.height - relPos.y);
							scrollTo(absPos.x - relPos.x, absPos.y - relPos.y + elem.offsetHeight + diff);
							if(options.tipPosition == "follow"){
								relPos.y = relPos.y + diff;
							}
						}
					}
					if(relPos.x < 30){
						if(absPos.x < 30){
							scrollTo(0, absPos.y - relPos.y);
							if(options.tipPosition == "follow"){
								absPos.x = 30;
								relPos.x = 30;
							}
						}else{
							diff = 30 - relPos.x;
							scrollTo(absPos.x - diff, absPos.y - relPos.y);
							if(options.tipPosition == "follow"){
								relPos.x = 30;
							}
						}
					}else if(relPos.x + elem.offsetWidth > client.width - 30){
						if(scroll.width - absPos.x < 30){
							scrollTo(scroll.width - client.width, absPos.y - relPos.y);
							if(options.tipPosition == "follow"){
								absPos.x = scroll.width - 30;
								relPos.x = client.width- 30;
							}
						}else{
							diff = 30 - (client.width - relPos.x);
							scrollTo(absPos.y - relPos.y + elem.offsetWidth + diff, absPos.y - relPos.y);
							if(options.tipPosition == "follow"){
								relPos.x = relPos.x + diff;
							}
						}
					}
				}
				tipLeft = ((relPos.x + (elem.offsetWidth/2)) < client.width/2) ? true : false;
				tipTop = ((relPos.y + (elem.offsetHeight/2)) < client.height/2) ? true : false;
				//alert(tipLeft);
				//alert(tipTop);
			}
			if(theme){
				linkHref = currDir + "theme/" + theme + "/MyPopup.css";
				for(lk in self.links){
					if(lk.href == linkHref){
						isNon = false;
						break;
					}
				}
				if(isNon){
					link = document.createElement("link");
					link.rel = "stylesheet";
					link.type = "text/css";
					link.href = linkHref;
					document.getElementsByTagName("head")[0].appendChild(link);
				}
			}
	  		div = document.createElement("div");
			div.className = "jm-popup " + options.animation;
			if(options.shade){
				var pageArea = utils.getPageArea();
				parent = document.createElement("div");
				parent.className = "jm-popupWrapper";
				parent.style.height = pageArea.height + "px";
				parent = document.body.appendChild(parent);
				div1 = document.createElement("div");
				div1.className = "jm-shade";
				div1.style.height = pageArea.height + "px";
				parent.appendChild(div1);
				div2 = parent;
				if(!self.isShade) { self.pointer = popupId;}
				if(self.parentIndex && self.isShade){
					for(var i = 0, popups = self.indexs; i < popups.length; i++){
						if(popups[i] == self.parentIndex){ break;}
					}
					self.isNew = true;
					self.indexs.splice(i, 0, popupId);
					self.indexCache.splice(i, 0, 1);
					self.parentIndexs.splice(i, 0, self.parentIndex);
					self.links.splice(i, 0, link);
					self.tipTargets.splice(i, 0, elem);
					self.shadeIndexs.unshift(popupId);
					self.pointer = popupId;
				}else{
					if(self.index - 1 && self.isShade){
						div2.style.visibility = "hidden";
					}
					self.indexs.push(popupId);
					self.indexCache.push(1);
					self.parentIndexs.push(0);
					self.links.push(link);
					self.tipTargets.push(elem);
					self.shadeIndexs.push(popupId);
				}
			}else{
				parent = document.body;
				div2 = div;
				if(self.parentIndex && self.isShade){
					for(var i = 0, popups = self.indexs; i < popups.length; i++){
						if(popups[i] == self.parentIndex){ break;}
					}
					self.isNew = true;
					self.indexs.splice(i, 0, popupId);
					self.indexCache.splice(i, 0, 0);
					self.parentIndexs.splice(i, 0, self.parentIndex);
					self.links.splice(i, 0, link);
					self.tipTargets.splice(i, 0, elem);
				}else{
					if(self.index - 1 && self.isShade){
						div2.style.visibility = "hidden";
					}
					self.indexs.push(popupId);
					self.indexCache.push(0);
					self.parentIndexs.push(0);
					self.links.push(link);
					self.tipTargets.push(elem);
				}
			}
			if(options.isInsertToDoc){
			}else{
				parent.appendChild(div);
			}
			div2.id = popupId;
			mobileCSS = os.isMobile ? " mobile " : " ";
			div2.className += mobileCSS + ((theme == "default") ? "" : theme);
			switch(type){
				case "jm-normal":
					if(os.isMobile){
						options.width = "100%";
						div.style.maxWidth = "480px";
						if(options.left){
							options.left = 0;
						}
						if(options.right){
							options.right = 0;
						}
					}
	  				d2 = document.createElement("div");
					d2.className = "jm-popupContent";
					label = document.createElement("label");
					if(content && content.nodeType){
						if(content.parentNode){
							var c = content.cloneNode(true);
							label.appendChild(c);
							content.parentNode.removeChild(content);
						}else{
							label.appendChild(content);
						}
					}else{
						label.innerHTML = content || "";
					}
					d2.appendChild(label);
					divMake();
					if("undefined" != typeof options.width){ div.style.width = options.width;}
					if("undefined" != typeof options.height){
						div.style.height = options.height;
						d2.style.height = (div.offsetHeight - d1.offsetHeight -  d3.offsetHeight) + "px";
					}else{
						height = (d2.offsetHeight +  d1.offsetHeight +  d3.offsetHeight) + "px";
						div.style.height = height;
					}
					if(options.border){
						div.style.border = options.border;
					}
					if(options.bgColor){
						div.style.backgroundColor = options.bgColor;
					}
					if(options.color){
						d2.style.color = options.color;
					}
					if(options.titleBgColor){
						d1.style.backgroundColor = options.titleBgColor;
					}
					if(options.titleColor){
						d1.style.color = options.titleColor;
					}
					if(options.contentBgColor){
						d2.style.backgroundColor = options.contentBgColor;
					}
					if(options.buttonBgColor){
						btn1.style.backgroundColor = options.buttonBgColor;
						btn2.style.backgroundColor = options.buttonBgColor;
					}
					if(options.buttonColor){
						btn1.style.color = options.buttonColor;
						btn2.style.color = options.buttonColor;
					}
					break;
				case "jm-alert":
					if(os.isMobile){
						options.width = "100%";
						div.style.maxWidth = "480px";
						if(options.left){
							options.left = 0;
						}
						if(options.right){
							options.right = 0;
						}
					}
					options.outerClick = false;
	  				d2 = document.createElement("div");
					d2.className = "jm-popupContent";
					xmp = document.createElement("xmp");
					xmp.innerHTML = content || "";
					d2.appendChild(xmp);
					divMake();
					btn2.style.display = "none";
					if("undefined" != typeof options.width){ div.style.width = options.width;}
					if("undefined" != typeof options.height){
						div.style.height = options.height;
						d2.style.height = (div.offsetHeight - d1.offsetHeight -  d3.offsetHeight) + "px";
					}else{
						height = (d2.offsetHeight +  d1.offsetHeight +  d3.offsetHeight) + "px";
						div.style.height = height;
					}
					if(options.border){
						div.style.border = options.border;
					}
					if(options.bgColor){
						div.style.backgroundColor = options.bgColor;
					}
					if(options.color){
						d2.style.color = options.color;
					}
					if(options.titleBgColor){
						d1.style.backgroundColor = options.titleBgColor;
					}
					if(options.titleColor){
						d1.style.color = options.titleColor;
					}
					if(options.contentBgColor){
						d2.style.backgroundColor = options.contentBgColor;
					}
					if(options.buttonBgColor){
						btn1.style.backgroundColor = options.buttonBgColor;
						btn2.style.backgroundColor = options.buttonBgColor;
					}
					if(options.buttonColor){
						btn1.style.color = options.buttonColor;
						btn2.style.color = options.buttonColor;
					}
					break;
				case "jm-confirm":
					if(os.isMobile){
						options.width = "100%";
						div.style.maxWidth = "480px";
						if(options.left){
							options.left = 0;
						}
						if(options.right){
							options.right = 0;
						}
					}
					options.outerClick = false;
	  				d2 = document.createElement("div");
					d2.className = "jm-popupContent";
					xmp = document.createElement("xmp");
					xmp.innerHTML = content || "";
					d2.appendChild(xmp);
					divMake();
					if("undefined" != typeof options.width){ div.style.width = options.width;}
					if("undefined" != typeof options.height){
						div.style.height = options.height;
						d2.style.height = (div.offsetHeight - d1.offsetHeight -  d3.offsetHeight) + "px";
					}else{
						height = (d2.offsetHeight +  d1.offsetHeight +  d3.offsetHeight) + "px";
						div.style.height = height;
					}
					if(options.border){
						div.style.border = options.border;
					}
					if(options.bgColor){
						div.style.backgroundColor = options.bgColor;
					}
					if(options.color){
						d2.style.color = options.color;
					}
					if(options.titleBgColor){
						d1.style.backgroundColor = options.titleBgColor;
					}
					if(options.titleColor){
						d1.style.color = options.titleColor;
					}
					if(options.contentBgColor){
						d2.style.backgroundColor = options.contentBgColor;
					}
					if(options.buttonBgColor){
						btn1.style.backgroundColor = options.buttonBgColor;
						btn2.style.backgroundColor = options.buttonBgColor;
					}
					if(options.buttonColor){
						btn1.style.color = options.buttonColor;
						btn2.style.color = options.buttonColor;
					}
					break;
				case "jm-prompt":
					if(os.isMobile){
						options.width = "100%";
						div.style.maxWidth = "480px";
						if(options.left){
							options.left = 0;
						}
						if(options.right){
							options.right = 0;
						}
					}
					options.outerClick = false;
	  				d2 = document.createElement("div");
					d2.className = "jm-popupContent";
					xmp = document.createElement("xmp");
					xmp.innerHTML = content || "";
					textarea = document.createElement("textarea");
					if(defaultValue){
						textarea.value = defaultValue;
					}
					d2.appendChild(xmp);
					d2.appendChild(textarea);
					divMake();
					if("undefined" != typeof options.width){ div.style.width = options.width;}
					if("undefined" != typeof options.height){
						div.style.height = options.height;
						d2.style.height = (div.offsetHeight - d1.offsetHeight -  d3.offsetHeight) + "px";
					}else{
						height = (d2.offsetHeight +  d1.offsetHeight +  d3.offsetHeight) + "px";
						div.style.height = height;
					}
					if(options.border){
						div.style.border = options.border;
					}
					if(options.bgColor){
						div.style.backgroundColor = options.bgColor;
					}
					if(options.color){
						d2.style.color = options.color;
					}
					if(options.titleBgColor){
						d1.style.backgroundColor = options.titleBgColor;
					}
					if(options.titleColor){
						d1.style.color = options.titleColor;
					}
					if(options.contentBgColor){
						d2.style.backgroundColor = options.contentBgColor;
					}
					if(options.buttonBgColor){
						btn1.style.backgroundColor = options.buttonBgColor;
						btn2.style.backgroundColor = options.buttonBgColor;
					}
					if(options.buttonColor){
						btn1.style.color = options.buttonColor;
						btn2.style.color = options.buttonColor;
					}
					break;
				case "iframe":
					if(os.isMobile){
						options.width = "100%";
						div.style.maxWidth = "480px";
						if(options.left){
							options.left = 0;
						}
						if(options.right){
							options.right = 0;
						}
					}
	  				d2 = document.createElement("div");
					d2.className = "jm-popupContent";
					label = document.createElement("xmp");
					iframe = document.createElement("iframe");
					iframe.src = content;
					label.appendChild(iframe);
					d2.appendChild(label);
					divMake();
					if("undefined" != typeof options.width){
						div.style.width = options.width;
						iframe.style.width = (div.offsetWidth - 10) + "px";
					}else{
						options.width = (label.offsetWidth + 10) + "px";
					}
					if("undefined" != typeof options.height){
						div.style.height = options.height;
						iframe.style.height = (div.offsetHeight - d1.offsetHeight -  d3.offsetHeight - 10) + "px";
					}
					if(options.border){
						div.style.border = options.border;
					}
					if(options.bgColor){
						div.style.backgroundColor = options.bgColor;
					}
					if(options.titleBgColor){
						d1.style.backgroundColor = options.titleBgColor;
					}
					if(options.titleColor){
						d1.style.color = options.titleColor;
					}
					if(options.contentBgColor){
						d2.style.backgroundColor = options.contentBgColor;
					}
					if(options.buttonBgColor){
						btn1.style.backgroundColor = options.buttonBgColor;
						btn2.style.backgroundColor = options.buttonBgColor;
					}
					if(options.buttonColor){
						btn1.style.color = options.buttonColor;
						btn2.style.color = options.buttonColor;
					}
					break;
				case "dynamic":
					d1 = document.createElement("div");
					d1.className = "jm-dynamic";
					d1.innerHTML = content || "";
					div.appendChild(d1);
					if("undefined" == typeof options.width){
						div.style.width = d1.offsetWidth + "px";
					}else{
						div.style.width = options.width;
					}
					if("undefined" == typeof options.height){
						div.style.height = d1.offsetHeight + "px";
					}else{
						div.style.height = options.height;
					}
					break;
				case "loading":
					options.outerClick = false;
					div.className = "jm-popup2 " + options.animation;
					d1 = document.createElement("div");
					d1.className = "jm-loading";
					d1.innerHTML = content || "&#xe62b;";
					div.appendChild(d1);
					div.style.width = d1.offsetWidth + "px";
					div.style.height = d1.offsetHeight + "px";
					break;
				case "tip":
					var absPos = MyCMS.utils.getAbs(elem),
						relPos = MyCMS.utils.getRel(elem),
						client = MyCMS.utils.getViewport(),
						scroll = MyCMS.utils.getPageArea(),
						diff, tipLeft, tipTop;
					if(!options.isInsertToDoc){
						options.position = "absolute";
					}else{
						options.position = "relative";
						options.outerClick = false;
					}
					options.right = "auto";
					options.bottom = "auto";
			        if(evt){
						self.bool = true;
					}
					div.className = "jm-popup1" + options.animation;
					d1 = document.createElement("div");
					d1.className = "tip ";
					div.appendChild(d1);
					span = document.createElement("span");
					span.className = "tail-bottom";
					span1 = document.createElement("span");
					span1.className = "tail-top";
					d1.appendChild(span);
					d1.appendChild(span1);
					if(content && content.nodeType){
						if(content.parentNode){
							d2 = content.cloneNode(true);
							d2 = d1.appendChild(d1);
							content.parentNode.removeChild(content);
						}else{
							d2 = d1.appendChild(content);
						}
					}else{
						d1.innerHTML += content || "";
					}
					if(os.isMobile && client.width <= 480 && options.tipType == "larger"){
						options.width = "100%";
						d1.style.maxWidth = "478px";
						div.style.maxWidth = "480px";
						if(options.left){
							options.left = 0;
						}
						if(options.right){
							options.right = 0;
						}
					}
					if("undefined" != typeof options.width){
						div.style.width = options.width;
						d1.style.width = options.width;
					}
					if("undefined" != typeof options.height){
						div.style.height = options.height;
						d1.style.height = options.height;
					}
					if(options.isInsertToDoc){
						elem.parentNode.insertBefore(div, elem.nextSibling);
					}
					switch(options.tipStyle){
						case "zhi":
							if(options.bgColor){
								d1.style.backgroundColor = options.bgColor;
								d1.children[0].style.backgroundColor = options.bgColor;
							}
							if(options.color){
								d1.style.color = options.color;
							}
							break;
						case "zhi1":
							if(options.border){
								d1.style.border = options.border;
								if(d1.style.borderColor) d1.children[0].style.backgroundColor = d1.style.borderColor;
							}
							if(options.bgColor){
								d1.style.backgroundColor = options.bgColor;
								d1.children[1].style.backgroundColor = options.bgColor;
							}
							if(options.color){
								d1.style.color = options.color;
							}
							break;
						case "jian":
							if(options.bgColor){
								d1.style.backgroundColor = options.bgColor;
								d1.children[0].style.backgroundColor = options.bgColor;
							}
							if(options.color){
								d1.style.color = options.color;
							}
							break;
						case "noTail":
							if(options.border){
								d1.style.border = options.border;
							}
							if(options.bgColor){
								d1.style.backgroundColor = options.bgColor;
							}
							if(options.color){
								d1.style.color = options.color;
							}
							break;
					}
					if(evt && options.tipPosition == "follow"){
						switch(options.direction){
							case "horizontal":
								tipFunc();
								if(tipLeft && tipTop){
									d1.className += "tip-" + options.tipStyle + "-right";
									options.top = (absPos.y + evt.offsetY - 34) + "px";
									options.left = absPos.x + evt.offsetX + "px";
								}else if(!tipLeft && tipTop){
									d1.className += "tip-" + options.tipStyle + "-left";
									options.top = (absPos.y + evt.offsetY - 34) + "px";
									options.left = (absPos.x + evt.offsetX - div.offsetWidth) + "px";
								}else if(tipLeft && !tipTop){
									d1.className += "tip-" + options.tipStyle + "-right";
									options.top = (absPos.y + evt.offsetY - div.offsetHeight + 34) + "px";
									options.left = absPos.x + evt.offsetX + "px";
									restructureTail("bottom");
								}else if(!tipLeft && !tipTop){
									d1.className += "tip-" + options.tipStyle + "-left";
									options.top = (absPos.y + evt.offsetY - div.offsetHeight + 34) + "px";
									options.left = (absPos.x + evt.offsetX - div.offsetWidth) + "px";
									restructureTail("bottom");
								}
								break;
							case "vertical":
								tipFunc();
								if(os.isMobile && client.width <= 480 && options.tipType == "larger"){
									if(tipLeft && tipTop){
										d1.className += "tip-" + options.tipStyle + "-bottom";
										options.top = absPos.y + evt.offsetY + "px";
									}else if(!tipLeft && tipTop){
										d1.className += "tip-" + options.tipStyle + "-bottom";
										options.top = absPos.y + evt.offsetY + "px";
									}else if(tipLeft && !tipTop){
										d1.className += "tip-" + options.tipStyle + "-top";
										options.top = (absPos.y + evt.offsetY - div.offsetHeight) + "px";
									}else if(!tipLeft && !tipTop){
										d1.className += "tip-" + options.tipStyle + "-top";
										options.top = (absPos.y + evt.offsetY - div.offsetHeight) + "px";
									}
									restructureTail1();
								}else{
									if(tipLeft && tipTop){
										d1.className += "tip-" + options.tipStyle + "-bottom";
										options.left = (absPos.x + evt.offsetX - 34) + "px";
										options.top = absPos.y + evt.offsetY + "px";
									}else if(!tipLeft && tipTop){
										d1.className += "tip-" + options.tipStyle + "-bottom";
										options.left = (absPos.x + evt.offsetX - div.offsetWidth + 34) + "px";
										options.top = absPos.y + evt.offsetY + "px";
										restructureTail("right");
									}else if(tipLeft && !tipTop){
										d1.className += "tip-" + options.tipStyle + "-top";
										options.left = (absPos.x + evt.offsetX - 34) + "px";
										options.top = (absPos.y + evt.offsetY - div.offsetHeight) + "px";
									}else if(!tipLeft && !tipTop){
										d1.className += "tip-" + options.tipStyle + "-top";
										options.left = (absPos.x + evt.offsetX - div.offsetWidth + 34) + "px";
										options.top = (absPos.y + evt.offsetY - div.offsetHeight) + "px";
										restructureTail("right");
									}
								}
								break;
						}
					}else{
						switch(options.direction){
							case "horizontal":
								tipFunc();
								if(tipLeft && tipTop){
									d1.className += "tip-" + options.tipStyle + "-right";
									options.top = (absPos.y) + "px";
									options.left = absPos.x + elem.offsetWidth + "px";
								}else if(!tipLeft && tipTop){
									d1.className += "tip-" + options.tipStyle + "-left";
									options.top = (absPos.y) + "px";
									options.left = (absPos.x - div.offsetWidth) + "px";
								}else if(tipLeft && !tipTop){
									d1.className += "tip-" + options.tipStyle + "-right";
									options.top = (absPos.y - div.offsetHeight + elem.offsetHeight) + "px";
									options.left = absPos.x + elem.offsetWidth + "px";
									restructureTail("bottom");
								}else if(!tipLeft && !tipTop){
									d1.className += "tip-" + options.tipStyle + "-left";
									options.top = (absPos.y - div.offsetHeight + elem.offsetHeight) + "px";
									options.left = (absPos.x - div.offsetWidth) + "px";
									restructureTail("bottom");
								}
								break;
							case "vertical":
								if(options.isInsertToDoc){
									options.top = "auto";
									options.left = "auto";
									options.right = "auto";
									options.bottom = "auto";
								}else{
								tipFunc();
								if(os.isMobile && client.width <= 480 && options.tipType == "larger"){
									if(tipLeft && tipTop){
										d1.className += "tip-" + options.tipStyle + "-bottom";
										options.top = absPos.y + elem.offsetHeight + "px";
									}else if(!tipLeft && tipTop){
										d1.className += "tip-" + options.tipStyle + "-bottom";
										options.top = absPos.y + elem.offsetHeight + "px";
									}else if(tipLeft && !tipTop){
										d1.className += "tip-" + options.tipStyle + "-top";
										options.top = (absPos.y - div.offsetHeight) + "px";
									}else if(!tipLeft && !tipTop){
										d1.className += "tip-" + options.tipStyle + "-top";
										options.top = (absPos.y - div.offsetHeight) + "px";
									}
									restructureTail1();
								}else{
									if(tipLeft && tipTop){
										d1.className += "tip-" + options.tipStyle + "-bottom";
										options.left = absPos.x + "px";
										options.top = absPos.y + elem.offsetHeight + "px";
									}else if(!tipLeft && tipTop){
										d1.className += "tip-" + options.tipStyle + "-bottom";
										options.left = (absPos.x - div.offsetWidth + elem.offsetWidth) + "px";
										options.top = absPos.y + elem.offsetHeight + "px";
										restructureTail("right");
									}else if(tipLeft && !tipTop){
										d1.className += "tip-" + options.tipStyle + "-top";
										options.left = absPos.x + "px";
										options.top = (absPos.y - div.offsetHeight) + "px";
									}else if(!tipLeft && !tipTop){
										d1.className += "tip-" + options.tipStyle + "-top";
										options.left = (absPos.x - div.offsetWidth  + elem.offsetWidth) + "px";
										options.top = (absPos.y - div.offsetHeight) + "px";
										restructureTail("right");
									}
								}
								}
								break;
						}
					}
					break;
				case "blank":
					if(os.isMobile){
						options.width = "100%";
						div.style.maxWidth = "480px";
						if(options.left){
							options.left = 0;
						}
						if(options.right){
							options.right = 0;
						}
					}
					if(content && content.nodeType){
						if(content.parentNode){
							if(options.isOut){
								var c = content.cloneNode(true);
								div.appendChild(c);
								content.parentNode.removeChild(content);
							}else{
								div = content;
								div2 = content;
							}
						}else{
							label.appendChild(content);
						}
					}else{
						content = content || "";
						div.innerHTML += content;
					}
					if("undefined" == typeof options.width){
						div.style.width = 300 + "px";
					}else{
						div.style.width = options.width;
					}
					if("undefined" == typeof options.height){
						div.style.height = 200 + "px";
					}else{
						div.style.height = options.height;
					}
					span = document.createElement("div");
					span.className = "jm-close1";
					span.innerHTML = '<a href="">&#xe664;</a>';
					div.appendChild(span);
					MyCMS.event.addEvent(span, "click", function(evt){ MyCMS.event.preventDef(evt); self.close(div2);});
					if(options.border){
						div.style.border = options.border;
					}
					if(options.bgColor){
						div.style.backgroundColor = options.bgColor;
					}
					if(options.color){
						div.style.color = options.color;
					}
					break;
			}
			if(options.outerClick){
				self.outerClickIndexs.push(popupId);
				if(self.parentIndex){
					self.outerClickIndexs1.push(popupId);
				}
			}
			if("undefined" != typeof options.position){
				div.style.position = options.position;
			}
			if("undefined" != typeof options.top){
				div.style.top = options.top;
				div.style.bottom = "auto";
				self.Y = true;
			}
			if("undefined" != typeof options.right){
				div.style.right = options.right;
				div.style.left = "auto";
				self.X = true;
			}
			if("undefined" != typeof options.bottom){
				div.style.bottom = options.bottom;
				if(!self.Y){
					div.style.top = "auto";
				}
			}
			if("undefined" != typeof options.left){
				div.style.left = options.left;
				if(!self.X){
					div.style.right = "auto";
				}
			}
			self.X = false;
			self.Y = false;
			MyCMS.event.addEvent(div, "click", function(evt){
				MyCMS.event.cancelBubble(evt);
			});
			if(self.index == 1){
				MyCMS.event.addEvent(document.body, "click", self.outerClickPopupsClose);
			}
			self.setTimer(div2, options.shade, options.time, i);
			if(options.func){
				self.parentIndex = self.index;
				options.func(div2);
				self.parentIndex = null;
			}
			return div2;
		},
		close: function(div){
			var self = this, timer, index = 0, div1, flag = null, flag1 = 0, bool = false, sLeng = self.shadeIndexs.length;
			for(var i = 0, leng = self.indexs.length; i < leng; i++){
				if(div.id == self.indexs[i]){ break;}
			}
			if(sLeng && self.indexCache[i]){
				if(self.isNew){
					if(self.indexCache[i]){
						if(self.indexCache[i-1]){
							index = 1;
						}
					}
					self.shadeIndexs.splice(index, 1);
					if(sLeng){
						for(var j = 0; j < sLeng; j++){
							if(self.shadeIndexs[j] == self.pointer){ bool = true; break;}
						}
						if(!bool){
							for(var j = 0, leng = self.indexs.length; j < leng; j++){
								if(self.indexs[j] == self.shadeIndexs[0]){
									div1 = document.getElementById(self.indexs[j]);
									div1.style.visibility = "visible";
									timer = self.timers[j] ? setTimeout( function(){ self.close(div1);}, self.timers[j] * 1000) : -1;
									self.timers.splice(j, 1, timer);
									break;
								}
							}
						}
					}
				}else{
					for(var z = 0; z < sLeng; z++){
						if(self.shadeIndexs[z] == div.id){ flag = z; continue}
						if(self.parentIndex && self.parentIndex == self.shadeIndexs[z]){ flag1 = z; continue;}
					}
					if(flag <= flag1){
						for(var j = 0, leng = self.indexs.length; j < leng; j++){
							if(self.shadeIndexs[1] == self.indexs[j] || !self.shadeIndexs[1]){
								for(var k = i+1, leng1 = self.indexs.length; k < leng1; k++){
									div1 = document.getElementById(self.indexs[k]);
									div1.style.visibility = "visible";
									timer = self.timers[k] ? setTimeout( function(){ self.close(div1);}, self.timers[k] * 1000) : -1;
									self.timers.splice(k, 1, timer);
									if(self.indexs[k] == self.indexs[j]){ break;}
								}
								break;
							}
						}
					}
					self.shadeIndexs.splice(flag, 1);
				}
				self.pointer = self.shadeIndexs[0];
			}
			if(sLeng == 0){
				self.isShade = false;
			}
			clearTimeout(self.timers[i]);
			document.body.removeChild(div);
			if(self.links[i]){
				self.links[i].parentNode.removeChild(self.links[i]);
			}
			self.indexs.splice(i, 1);
			self.indexCache.splice(i, 1);
			self.parentIndexs.splice(i, 1);
			self.links.splice(i, 1);
			self.timers.splice(i, 1);
			self.tipTargets.splice(i, 1);
			for(var i = 0, arr = self.outerClickIndexs, leng = arr.length; i < leng; i++){
				if(arr[i] == div.id){
					self.outerClickIndexs.splice(i, 1);
					break;
				}
			}
			for(var i = 0, arr = self.outerClickIndexs1, leng = arr.length; i < leng; i++){
				if(arr[i] == div.id){
					self.outerClickIndexs1.splice(i, 1);
					break;
				}
			}
			self.isNew = false;
			if(self.indexs.length  == 0){
				self.index = 0;
				self.pointer = 0;
			}
		},
		outerClickPopupsClose: function(){
			var index,
				arr,
				flag = null;
			if(popup.shadeIndexs.length){
				while(popup.outerClickIndexs1.length){
					index = popup.outerClickIndexs1.pop();
					popup.close(document.getElementById(index));
				}
				for(var i = 0, arr1 = popup.outerClickIndexs, leng = arr1.length; i < leng; i++){
					if(arr1[i] == popup.pointer){

						popup.close(document.getElementById(arr1[i]));
						break;
					}
				}
			}else{
				while(popup.outerClickIndexs.length){
					index = popup.outerClickIndexs.shift();
					arr = index.split("_");
					if(popup.bool && arr[2] == popup.index){
						flag = index;
						continue;
					}
					popup.close(document.getElementById(index));
				}
			}
			if(flag){
				popup.outerClickIndexs.push(flag);
			}
			if(popup.index == 0){
				MyCMS.event.removeEvent(document.body, "click", popup.outerClickPopupsClose);
			}
			popup.bool = false;
		},
		submit: function(div, yes, index, input){
			var self = this, data = input ? input.value : true;
			self.parentIndex = index;
			if(yes){ yes(data);}
			self.close(div);
			self.parentIndex = null;
		},
		cancel: function(div, no, index, input){
			var self = this, data = input ? input.value : false;
			self.parentIndex = index;
			if(no){ no(data);}
			self.close(div);
			self.parentIndex = null;
		},
		setTimer: function(div, shade, time, index){
			var self = this, timer;
			if(shade){
				if(self.parentIndex && self.isShade){
						timer = time  ? setTimeout(function(){ self.close(div);}, time * 1000) : -1;
					self.timers.splice(index, 0, timer);
				}else{
					if(self.index - 1 && self.isShade){
						timer = time;
					}else{
						timer = time  ? setTimeout(function(){ self.close(div);}, time * 1000) : -1;
					}
					self.timers.push(timer);
				}
				self.isShade = true;
			}else{
				if(self.parentIndex && self.isShade){
						timer = time  ? setTimeout(function(){ self.close(div);}, time * 1000) : -1;
					self.timers.splice(index, 0, timer);
				}else{
					if(self.index - 1 && self.isShade){
						timer = time;
					}else{
						timer = time  ? setTimeout(function(){ self.close(div);}, time * 1000) : -1;

					}
					self.timers.push(timer);

				}
			}
		},
		alert: function(content, options){
			var options = options || {};
			options.shade = true;
			return this.make("jm-alert", content, options);
		},
		prompt: function(content, defaultValue, options){
			var options = options || {};
			options.shade = true;
			return this.make("jm-prompt", content, options, "", defaultValue || "");
		},
		confirm: function(content, options){
			var options = options || {};
			options.shade = true;
			return this.make("jm-confirm", content, options);
		},
		open: function(content, options){
			return this.make("jm-normal", content, options);
		},
		iframe: function(content, options){
			return this.make("iframe", content, options);
		},
		loading: function(content, options){
			return this.make("loading", content, options);
		},
		tip: function(content, target, options){
			return this.make("tip", content, options, target);
		},
		blank: function(content, options){
			return this.make("blank", content, options);
		}
	};
	popup.init();
}();