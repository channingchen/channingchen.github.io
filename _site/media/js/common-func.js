function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

function loadScript() {  
  var script = document.createElement("script");  
  script.src = "https://api.map.baidu.com/api?v=2.0&ak=8ad571f52ec70fc5939ba9c9bdb01408&callback=initialize";//此为v2.0版本的引用方式  
  document.body.appendChild(script);  
}

function loadMap(lng,lat,zoom=15){
	var map = new BMap.Map('cboxLoadedContent');  
	var homePoint = new BMap.Point(lng,lat);
	map.centerAndZoom(homePoint, zoom);               
	map.enableScrollWheelZoom(); 

	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件  
	map.addControl(top_left_control);        
	map.addControl(top_left_navigation);  

	var geolocationControl = new BMap.GeolocationControl();
	geolocationControl.addEventListener("locationSuccess", function(e){
		var points = new Array();
		points[0] = e.point;
		points[1] = homePoint;
		var view = map.getViewport(points);
		map.centerAndZoom(view.center, view.zoom);
	});
	geolocationControl.addEventListener("locationError",function(e){
		alert('定位失败');
	});
	map.addControl(geolocationControl);

	var stCtrl = new BMap.PanoramaControl(); //构造全景控件
	stCtrl.setOffset(new BMap.Size(20, 20));
	map.addControl(stCtrl);//添加全景控件

	var marker = new BMap.Marker(homePoint);  // 创建标注
	map.addOverlay(marker); 
}