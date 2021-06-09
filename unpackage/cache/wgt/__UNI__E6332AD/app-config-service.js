
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/mine/login","pages/rent/index","pages/mine/index","pages/value/index","pages/order/index","pages/publish/index","pages/publish/form","pages/carry/index","pages/mine/comment","pages/mine/value","pages/mine/notice","pages/mine/rent","pages/mine/about","pages/mine/suggest"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"backgroundColor":"#fff","borderStyle":"black","selectedColor":"#0493FF","color":"#666","list":[{"pagePath":"pages/rent/index","iconPath":"/static/img/icon_tab2.png","selectedIconPath":"/static/img/icon_tab22.png","text":"拼车"},{"pagePath":"pages/carry/index","iconPath":"/static/img/icon_tab1.png","selectedIconPath":"/static/img/icon_tab11.png","text":"带物"},{"pagePath":"pages/publish/index","iconPath":"/static/img/icon_tab3.png","selectedIconPath":"/static/img/icon_tab33.png","text":"发布"},{"pagePath":"pages/mine/index","iconPath":"/static/img/icon_tab4.png","selectedIconPath":"/static/img/icon_tab44.png","text":"个人中心"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"car-Sharing","compilerVersion":"3.0.4","entryPagePath":"pages/mine/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/mine/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/rent/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"拼车"}},{"path":"/pages/mine/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","navigationStyle":"custom"}},{"path":"/pages/value/index","meta":{},"window":{"navigationBarTitleText":"评价"}},{"path":"/pages/order/index","meta":{},"window":{"navigationBarTitleText":"我的发布-载人载物"}},{"path":"/pages/publish/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"发布"}},{"path":"/pages/publish/form","meta":{},"window":{"navigationBarTitleText":"发布拼车"}},{"path":"/pages/carry/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"带物"}},{"path":"/pages/mine/comment","meta":{},"window":{"navigationBarTitleText":"评价"}},{"path":"/pages/mine/value","meta":{},"window":{"navigationBarTitleText":"点评"}},{"path":"/pages/mine/notice","meta":{},"window":{"navigationBarTitleText":"拼车提醒"}},{"path":"/pages/mine/rent","meta":{},"window":{"navigationBarTitleText":"我的订单"}},{"path":"/pages/mine/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/mine/suggest","meta":{},"window":{"navigationBarTitleText":"投诉建议"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});