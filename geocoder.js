// Google Map API & Geocoder デモ
var map;
var marker;
var geocoder;
function initMap() {
    var input_address = '千葉県流山市木469番地'
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address':  input_address
   }, function(results, status) { // 結果
        if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
          map = new google.maps.Map(document.getElementById('map'), {
                center: results[0].geometry.location, // 地図の中心を指定
               zoom: 15 // 地図のズームを指定
           });
         marker = new google.maps.Marker({
               position: results[0].geometry.location, // マーカーを立てる位置を指定
                map: map // マーカーを立てる地図を指定
           });
          infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
            content:"<div class='maker'>" + input_address + "</div>" // 吹き出しに表示する内容
            });
            //marker.addListener('click', function() { // マーカーをクリックしたとき
            infoWindow.open(map, marker); // 吹き出しの表示
            //});  
            var address = document.getElementById("address");
            address.value = input_address; 
            var latlng = results[0].geometry.location;
            var glat = latlng.lat();
            var glng = latlng.lng();
            var lat = document.getElementById("lat");
            var lng = document.getElementById("lng");
            lat.value = glat;
            lng.value = glng;
                        
     } else { // 失敗した場合
          alert(status);
      }
   });
}
function draw_by_address(input_address){
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address':  input_address
   }, function(results, status) { // 結果
        if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
          map = new google.maps.Map(document.getElementById('map'), {
                center: results[0].geometry.location, // 地図の中心を指定
               zoom: 15 // 地図のズームを指定
           });
         marker = new google.maps.Marker({
               position: results[0].geometry.location, // マーカーを立てる位置を指定
                map: map // マーカーを立てる地図を指定
           });
          infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
            content:"<div class='maker'>" + input_address + "</div>" // 吹き出しに表示する内容
            });
            //marker.addListener('click', function() { // マーカーをクリックしたとき
            infoWindow.open(map, marker); // 吹き出しの表示
            //});  
            var address = document.getElementById("address");
            address.value = input_address; 
            var latlng = results[0].geometry.location;
            var glat = latlng.lat();
            var glng = latlng.lng();
            var lat = document.getElementById("lat");
            var lng = document.getElementById("lng");
            lat.value = glat;
            lng.value = glng;
     } else { // 失敗した場合
          alert(status);
      }
   });
}
   
function draw_by_latlng(input_lat, input_lng){
    var latLngInput = new google.maps.LatLng(input_lat, input_lng);
    var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
        latLng: latLngInput
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
    
          //Mapクラスのインスタンスを生成します。
          var map = new google.maps.Map(
            document.getElementById("map"),
            {
                center: results[0].geometry.location, // 地図の中心を指定
              zoom: 15 // 地図のズームを指定
          });
          
          //表示範囲クラスのインスタンスを生成します。
          var bounds = new google.maps.LatLngBounds();
          
          //緯度・経度情報を取得します。
          var latlng = results[0].geometry.location;
    
          //住所を取得します。
          var input_address = results[0].formatted_address;
    
          //取得した緯度・経度で表示範囲を拡張します。
          bounds.extend(latlng);
    
          //地図上に緯度・経度、住所の情報を表示します。
          new google.maps.InfoWindow(
            {
              content: "(緯度, 経度) = " + latlng.toString() +
                      "<br />" + input_address
            }
          ).open(
            map,
            new google.maps.Marker(
              {
                position: latlng,
                map: map
              }
            )
          );
            var address = document.getElementById("address");
            address.value = input_address; 
            
            var lat = document.getElementById("lat");
            var lng = document.getElementById("lng");
            lat.value = input_lat;
            lng.value = input_lng;
      }
   });
}
   
   
window.onload = function(){
   var address_search_button = document.getElementById("address_search_button");
   var latlng_search_button = document.getElementById("latlng_search_button");
   var address = document.getElementById("address");
   var lat = document.getElementById("lat");
   var lng = document.getElementById("lng");
   
   address_search_button.addEventListener("click", function(){
       var input_address = address.value;
       draw_by_address(input_address);
   });
   
   latlng_search_button.addEventListener("click", function(){
       var input_lat = lat.value;
       var input_lng = lng.value;
       draw_by_latlng(input_lat, input_lng);
   });
}