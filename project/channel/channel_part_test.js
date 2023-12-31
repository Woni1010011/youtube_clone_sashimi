let channelName = document.getElementById("channel_name_text");
let channelSubscriber = document.getElementById("channel_subscriber");
let channelProfile = document.getElementById("channel_profile");
let channelBanner = document.getElementById("channel_banner");


function getChannelInfo(video_channel) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();
  
    // API 요청 설정
    let apiUrl = `http://oreumi.appspot.com/channel/getChannelInfo`;
    xhr.open("POST", apiUrl, true);

    let jsonData = {"video_channel": video_channel}
  
    // 응답 처리 설정
    xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        // 가져온 응답 처리
        let response = JSON.parse(xhr.responseText);

        // 데이터 있는지 확인
        if (response && response.channel_name !== undefined) {
            // 각 데이터들을 콘솔에 출력
            channelName.innerHTML = response.channel_name;
            channelSubscriber.innerHTML = response.subscribers;
            channelProfile.src = response.channel_profile;
            channelBanner.src = response.channel_banner;
        }
    }
};
  
// 요청 전송
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify(jsonData));
}
  

// id = 0부터 아이템 불러오기
getChannelInfo("나와 토끼들");
