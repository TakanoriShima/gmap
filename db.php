<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>Up to World</title>
    <style>
      #header {
        font-family: Meriyo UI;
        font-size: 14px;
    	  color: white;
        font-weight: bold;
    	  background-color: darkblue;
    	  padding: 3px;
				/* width: 99%; */
        /* margin-bottom: 6px; */
				width: 1200px;
        border: 1px outset gray;
      }
      #target {
        border: 1px outset gray;
        /* position: absolute; */
        /* width: 98.5%; */
        /* height: 95%; */
        width: 950px;
        height: 800px;
      }
      #sidebar {
        border: 1px solid #666;
        padding: 6px;
        background-color: white;
        font-family: Meriyo UI;
        font-size: 12px;
        /* position: absolute; */
        /* top: 10%; */
        /* left: 75%; */
        /* width: 15%; */
        /* height: 80%; */
        overflow: auto;
        width: 237px;
        height: 786px;
      }
      .icon{
        width: 200px;
      }
    </style>
  </head>

  <body>
    <div id="header">Google Maps - 世界最大・世界最長リスト</div>
    <table>
      <tr>
        <td><div id="target"></div></td>
        <td><div id="sidebar"></div></td>
      </tr>
    </table>

    <!-- MarkerCluster -->
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>

    <!-- Google MAP API KEY -->
    <script src="https://maps.googleapis.com/maps/api/js?language=ja&region=JP&key=AIzaSyALg70uaMcYjkzto9oPmiXyODIXCvpvAzg&callback=initMap" async defer></script>

    <!-- データファイルの読み込み -->
    <!-- <script type="text/javascript" src="./data.js"></script> -->
    <script src="https://code.jquery.com/jquery-2.1.1.js" integrity="sha256-FA/0OOqu3gRvHOuidXnRbcmAWVcJORhz+pv3TX2+U6w=" crossorigin="anonymous"></script>

    <script>

      function initMap() {

        //マップ初期表示の位置設定
        var target = document.getElementById('target');
        var centerp = {lat: 37.67229496806523, lng: 137.88838989062504};

        //マップ表示
        map = new google.maps.Map(target, {
          center: centerp,
          zoom: 2,
        });

      };

      var markerD = [];

      $(function(){
        $.ajax({
          type: "POST",
          url: "data.php",
          dataType: "json",
          success: function(data){
            markerD = data;
            setMarker(markerD);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            alert('Error : ' + errorThrown);
          }
        });
      });

      var map;
      var marker = [];
      var infoWindow = [];

      function setMarker(markerData) {

        // console.log(markerData);
        // console.log(markerData.length);

        //マーカー生成
        var sidebar_html = "";
        var icon;

        for (var i = 0; i < markerData.length; i++) {

          var latNum = parseFloat(markerData[i]['lat']);
          var lngNum = parseFloat(markerData[i]['lng']);

          // マーカー位置セット
          var markerLatLng = new google.maps.LatLng({
            lat: latNum,
            lng: lngNum
          });
          // マーカーアイコンのセット(行った所はアイコンを変える)
          if (markerData[i]['status'] === 'went'){
            icon = new google.maps.MarkerImage('./icon_color/went' + markerData[i]['classNo'] + '.png');
          } else {
            icon = new google.maps.MarkerImage('./icon_color/list' + markerData[i]['classNo'] + '.png');
          }
          // マーカーのセット
          marker[i] = new google.maps.Marker({
            position: markerLatLng,          // マーカーを立てる位置を指定
            map: map,                        // マーカーを立てる地図を指定
            icon: icon                       // アイコン指定
          });
          // 吹き出しの追加
          infoWindow[i] = new google.maps.InfoWindow({
            content: markerData[i]['class'] + '：' + markerData[i]['name'] + '<br><br>' + markerData[i]['text'] + '<br><br>' +'<img src="UpToWorld_pic/' + markerData[i]['img'] + '" class="icon">'
          });
          // サイドバー
          var wantStar;
          if(markerData[i]['status'] === 'went') {
            wantStar = '●';
          } else if(markerData[i]['status'] === 'want') {
            wantStar = '○';
          } else {
            wantStar = '・';
          }
          sidebar_html += wantStar + '<a href="javascript:myclick(' + i + ')">' + markerData[i]['name'] + '<\/a><br />';
          // マーカーにクリックイベントを追加
          markerEvent(i);
        }

        // Marker clusterの追加
        var markerCluster = new MarkerClusterer(
          map,
          marker,
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
        );

        // サイドバー
        document.getElementById("sidebar").innerHTML = sidebar_html;
      }

      var openWindow;

      function markerEvent(i) {
        marker[i].addListener('click', function() {
          myclick(i);
        });
      }

      function myclick(i) {
        if(openWindow){
          openWindow.close();
        }
        infoWindow[i].open(map, marker[i]);
        openWindow = infoWindow[i];
      }

    </script>

  </body>
</html>
