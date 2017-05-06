
<script type="text/javascript">  
function initialize() {  
	var map = new BMap.Map('map');  
	var point = new BMap.Point(119.176348,34.605934);
	map.centerAndZoom(point, 25);               
	map.enableScrollWheelZoom();   
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker);               // 将标注添加到地图中
	// marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
}  
   
function loadScript() {  
  var script = document.createElement("script");  
  script.src = "http://api.map.baidu.com/api?v=2.0&ak=8ad571f52ec70fc5939ba9c9bdb01408&callback=initialize";//此为v2.0版本的引用方式  
  document.body.appendChild(script);  
}  
   
window.onload = loadScript;  
</script>  