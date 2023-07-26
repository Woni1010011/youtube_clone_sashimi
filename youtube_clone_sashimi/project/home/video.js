const xhr = new XMLHttpRequest();
const method = "GET";
const url = "http://oreumi.appspot.com/video/getVideoInfo?video_id=16";

// 요청을 초기화 합니다.
xhr.open(method, url);

// onreadystatechange 이벤트를 이용해 요청에 대한 응답 결과를 처리합니다.
xhr.onreadystatechange = function (event) {
    const { target } = event;

    if (target.readyState === XMLHttpRequest.DONE) {
        const { status } = target;

        if (status === 0 || (status >= 200 && status < 400)) {
            // 요청이 정상적으로 처리 된 경우
        } else {
            // 에러가 발생한 경우
        }
    }
};

// 서버에 요청을 보냅니다.
xhr.send();

function displayVideoInfo(data) {


}