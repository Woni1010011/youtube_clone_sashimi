const xhr = new XMLHttpRequest();

xhr.open("Get", "http://oreumi.appspot.com/video/getVideoInfo?video_id=16");


xhr.addEventListener('readystatechange', function(event)) {
    if (xhr.readystate === XMLHttpRequest.DONE){
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


function displayVideoInfo