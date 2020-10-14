// Google Map API & Geocoder デモ
var map;
var marker;
var geocoder;
function initMap() {
    var address = '千葉県流山市木469番地'
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address':  address
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
            content:"<div class='maker'>" + address + "</div>" // 吹き出しに表示する内容
            });
            marker.addListener('click', function() { // マーカーをクリックしたとき
            infoWindow.open(map, marker); // 吹き出しの表示
            });  
     } else { // 失敗した場合
          alert(status);
      }
   });
}
function redraw(address){
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address':  address
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
            content:"<div class='sample'>" + address + "</div>" // 吹き出しに表示する内容
            });
            marker.addListener('click', function() { // マーカーをクリックしたとき
            infoWindow.open(map, marker); // 吹き出しの表示
            });  
     } else { // 失敗した場合
          alert(status);
      }
   });
};
   
window.onload = function(){
   var button = document.getElementById("button");
   var input = document.getElementById("address");
   button.addEventListener("click", function(){
       var address = input.value;
       redraw(address);
   })
}