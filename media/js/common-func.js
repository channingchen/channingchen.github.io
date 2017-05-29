function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

function MyButton(text,way,pos_x,pos_y,homePoint){
  this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
  this.defaultOffset = new BMap.Size(pos_x, pos_y);
  this.way=way;
  this.text=text;
  this.homePoint=homePoint;
}
function MyButtonInit(map){
	var div = document.createElement("div");
	var iconNode = document.createElement("div");
	var textNode = document.createElement("span");
	var buttonText = this.text;
	var text = document.createTextNode(buttonText);
	textNode.appendChild(text);
	div.appendChild(textNode);
	div.appendChild(iconNode);
	textNode.className="my-map-button-text button button-3d button-royal";
	iconNode.className="my-map-button-hide";
	var way = this.way;
	var homePoint = this.homePoint;
	div.onclick = function(e){
		text.nodeValue='正在查询';
		iconNode.className="my-map-button"
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);

				if (way=="bus"){
					alert("bus");
				}else if (way=="taxi"){
					var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
					driving.search(r.point, homePoint);
				}else {
					alert("foot");
				}
			}else {
				alert('定位失败');
			}    
			text.nodeValue=buttonText;  
			iconNode.className="my-map-button-hide";  
		},{enableHighAccuracy: true})
	}
	map.getContainer().appendChild(div);
	return div;
}

function loadMap(lng,lat,zoom=15){
	MyButton.prototype = new BMap.Control();
	MyButton.prototype.initialize = MyButtonInit;

	var map = new BMap.Map('cboxLoadedContent');  
	var homePoint = new BMap.Point(lng,lat);
	map.centerAndZoom(homePoint, zoom);               
	map.enableScrollWheelZoom(); 

	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});  //左上角，添加默认缩放平移控件  
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

	var busButton = new MyButton("公交","bus",10,10,homePoint);
	var taxiButton = new MyButton("开车","taxi",10,60,homePoint);
	var onFootButton = new MyButton("走路","foot",10,110,homePoint);
	map.addControl(busButton);
	map.addControl(taxiButton);
	map.addControl(onFootButton);

	var marker = new BMap.Marker(homePoint);  // 创建标注
	map.addOverlay(marker); 
}