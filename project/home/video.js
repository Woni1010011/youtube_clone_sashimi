// js로 링크를 받아오는 것 까지 했습니다.
//디버깅 창에서 console 창에서 보면 영상 받아와진 것을 확인할 수 있습니다.

const xhr = new XMLHttpRequest();

xhr.open("GET", "http://oreumi.appspot.com/video/getVideoInfo?video_id=16");


xhr.addEventListener('readystatechange', function(event) {
    if (xhr.readyState === XMLHttpRequest.DONE){
        if (xhr.status === 200) {

            // 데이터를 받아왔을 때 처리하는 부분
            var data = JSON.parse(xhr.responseText);
            console.log(data)
            displayVideoInfo(data);
        } else {
            console.error("Failed");
        }
    }
});

xhr.send();


function displayVideoInfo(data){

}

