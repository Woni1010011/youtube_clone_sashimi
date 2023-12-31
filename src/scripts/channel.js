const urlParams = new URLSearchParams(window.location.search);
const videoChannel = urlParams.get('video_channel');
const channelName = document.getElementById('chname');
const subs = document.getElementById('subs');
const container = document.getElementsByClassName('container')[0];




// videoChannel 값에 따라 다른 내용을 표시
switch (videoChannel) {
  case 'oreumi':
    channelName.innerText = videoChannel;
    subs.innerText = '1.8M subscribers'
    break;
  case '나와 토끼들':
    channelName.innerText = videoChannel;
    subs.innerText = '81.2K subscribers'
    break;
  case '개조':
    channelName.innerText = videoChannel;
    subs.innerText = '618 subscribers'
    break;
  default:
    container.innerHTML = '<h1>페이지를 찾을수 없습니다.</h1>';
    break;
}





const subBtn = document.getElementsByClassName("sub")[0];
let isUnsub = true;

subBtn.addEventListener('click', function() {
  isUnsub = !isUnsub;
  updateButtonStyle();
});

subBtn.addEventListener('mouseenter', function() {
  subBtn.classList.add('hover');
});

subBtn.addEventListener('mouseleave', function() {
  subBtn.classList.remove('hover');
});

function updateButtonStyle() {
  if (isUnsub) {
    subBtn.innerText = "Subscribe";
    subBtn.classList.remove('unsub');
  } else {
    subBtn.innerText = "Unsubscribe";
    subBtn.classList.add('unsub');
  }
}
updateButtonStyle();    


// 더보기 롤 기능

const submore = document.getElementById('SideBar_Show_More');
submore.addEventListener('click', showConsole);

function showConsole() {

    // 내용이 펼쳐지는 부분의 요소 선택
    const content = document.getElementsByClassName('Menu_Sub hide');
    const icon = document.getElementById('icon-down')
    for(let i=0; i < content.length; i++){
        if (content[i].style.display === 'none' || content[i].style.display === '') {
            content[i].style.display = 'flex';
        } else {
            content[i].style.display = 'none';
        }
    }
    const text = document.getElementById("submoretext")
    if (content[content.length-1].style.display === 'flex'){
        text.innerText = "접기"
        icon.style.transform = 'scaleY(-1)'
    }
    else{
        text.innerText = "3건 더보기"
        icon.style.transform = ''
    }
    // content 요소의 display 속성을 변경하여 내용을 펼치거나 숨김
    
} 


const topmore = document.getElementById('Top2_Show_More');
topmore.addEventListener('click', TshowConsole);


function TshowConsole() {

    // 내용이 펼쳐지는 부분의 요소 선택
    const content = document.getElementsByClassName('Menu hide');
    const icon = document.getElementById('topshowmore')
    for(let i=0; i < content.length; i++){
        if (content[i].style.display === 'none' || content[i].style.display === '') {
            content[i].style.display = 'flex';
        } else {
            content[i].style.display = 'none';
        }
    }
    const text = document.getElementById("topshowmoretext")
    if (content[content.length-1].style.display === 'flex'){
        text.innerText = "접기"
        icon.style.transform = 'scaleY(-1)'
    }
    else{
        text.innerText = "더보기"
        icon.style.transform = ''
    }
    // content 요소의 display 속성을 변경하여 내용을 펼치거나 숨김
    
} 




/* 서버에서 정보 불러오는 기능 
함수는 아래 형식으로 불러오기 가능하기 때문에 아래와 같이 html 작성하셔야 합니다.
<div class="video">
    <img src="" alt="" class="video_image">
    <p class="video_title"></p>
    <p class="video_channel"></p>
    <p class="views"></p>
    <p class="upload_date"></p>
</div>

대략적인 방식으로 작성하였기 때문에 html 구조 변경 필요시 childNodes 쪽 수정하셔서 사용하시면 됩니다.
// */
// const videos = document.getElementsByClassName("video");
// let x = 0;

// function createVideoItem(video_id) {
//     // XMLHttpRequest 객체 생성
//     let xhr = new XMLHttpRequest();
    
//     // API 요청 설정
//     let apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${x}`;
//     xhr.open("GET", apiUrl, true);
//         // 응답 처리 설정
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === xhr.DONE && xhr.status === 200) {
//                 // 가져온 응답 처리
//                 let response = JSON.parse(xhr.responseText);
               
                
                
// //                 // 데이터 있는지 확인
//                 if (response && response.video_id !== undefined) {
//                   // console.log(response);
//                   videoList.push(response)
//                   x++;
//                   createVideoItem(video_id);  
                  
//                 }
                
//                 // 각 데이터들을 콘솔에 출력
//                 // console.log(response.video_id);
//                 // console.log(response.image_link);
//                 // console.log(response.upload_date);
//                 // console.log(response.video_channel);
//                 // console.log(response.video_detail);
//                 // console.log(response.video_link);
//                 // console.log(response.video_tag);
//                 // console.log(response.video_title);
//                 // console.log(response.views);

//                 // 뷰 수 단위 조정
//                 let convertViews = 0;
//                 if((response.views / 1000).toFixed(1) > 999) {
//                     convertViews = (response.views / 1000000).toFixed(1) + "M views";
//                 } else if((response.views / 1000).toFixed(1) < 1) {
//                     convertViews = response.views + "views";
//                 } else {
//                     convertViews = (response.views / 1000).toFixed(1) + "K views";
//                 }

//                 // 날짜 -> 00 월/년 전으로 변환
//                 let convertDate = 0;
//                 if(date.getFullYear() > (response.upload_date.split("/")[0]-0)) {
//                    convertDate = (date.getFullYear() - (response.upload_date.split('/')[0]-0)) + " year ago" ;
//                 } else if((date.getMonth() + 1) != (response.upload_date.split('/')[1]-0)) {
//                     convertDate = ((date.getMonth() + 1) - (response.upload_date.split('/')[1]-0)) + " month ago";
//                 } else{
//                     convertDate = (date.getDate() - (response.upload_date.split('/')[2]-0)) + " day ago";
//                 }
                
//                 // html 구조 변경시 아래 내용 수정 필요
//                 video_id[x].childNodes[1].src = response.image_link;
//                 video_id[x].childNodes[3].innerHTML = response.video_title;
//                 video_id[x].childNodes[5].innerHTML = response.video_channel;
//                 video_id[x].childNodes[7].innerHTML = convertViews;
//                 video_id[x].childNodes[9].innerHTML = convertDate;
//                 x++;  

                // 다음 video_id로 재귀 호출
                // createVideoItem(video_id);
//                 }
//             }
//         }
//     // 요청 전송
//     xhr.send();
// }

// //아이템 불러오기
// createVideoItem(videos);




let http_get = function (url){
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if (xhr.status === 200) {
                    // 데이터를 받아왔을 때 처리하는 부분
                    // let data = ;
                    // console.log(xhr.responseText);
                    resolve(JSON.parse(xhr.responseText));
                    // displayVideoInfo(data);
                } else {
                    console.error("Failed");
                }
            }
        }
    xhr.send();
    })
}

let videoinfo = function (arr) {
    return Promise.all(arr.map(async x => {
      return await http_get("http://oreumi.appspot.com/video/getVideoInfo?video_id=" + x.video_id);
    }));
  };


let videoList = [];  

let displayVideo = function(arr){
    let htmlDom = "";
    //document.querySelector("div.container_thumbnail")
    arr.forEach((e, index, array)=>{
      if(e.video_channel === videoChannel){
        if(index == 0)
            htmlDom += `
            <div class="row-container">
                <div class="play-lists">
                    <div class="content">
                        <div class="play_title">
                            <span>Search On'21</span>
                        </div>
                        <div class="play_btn">
                            <div class="play-all-button">
                                <img src="./src/assets/sidebar-icons-group.svg">
                                <p id="play_text">PLAY ALL</div>
                            </div>
                        </div>
                    </div>
            <div class="row">
            `;
        else if(index % 5 == 0){
            htmlDom += `
                </div>
                </div>
                <div class="row-container">
                    <div class="play-lists">
                        <div class="content">
                            <div class="play_title">
                                <span>Search On'21</span>
                            </div>
                            <div class="play_btn">
                                <div class="play-all-button">
                                    <img src="./src/assets/sidebar-icons-group.svg">
                                    <p id="play_text">PLAY ALL</div>
                                </div>
                            </div>
                        </div>
                <div class="row">
                `;
        }
    // image_link: "https://storage.googleapis.com/oreumi.appspot.com/img_6.jpg"
    // upload_date: "2023/06/20"
    // video_channel: "oreumi"
    // video_detail: "새로운 경험의 창조"
    // video_id: 6
    // video_link: "https://storage.googleapis.com/oreumi.appspot.com/video_6.mp4"
    // video_tag: (2) ['가상현실', '증강현실']
    // video_title: "가상현실(VR)과 증강현실(AR)의 혁신"
    // views: 225308

        htmlDom+=`
            <div class="thumbnail_item">
                <div class="images">
                    <img class="image" src="${e.image_link}" >
                    <p class="videotime">23:45</p>
                </div>
                <div class="desc">
                    <div class="title">${e.video_title}</div>
                    <div class="chanel_name">${e.video_channel}</div>
                    <div class="view_time">조회수 ${view_date(e.views)},  ${video_date(e.upload_date)}</div>
                </div>
              </div>`;
            videoList.push(e);
    }});
    // let mostViewedVideo = videoList[0];
    const mostViewedVideo = videoList.reduce( (prev, value) => {
      return prev.views > value.views ? prev : value
    });
    document.getElementById("customVideo").src = mostViewedVideo.video_link;
    document.getElementById("vidtitle").innerText = mostViewedVideo.video_title;
    document.getElementById("title_video").innerText = mostViewedVideo.video_title;
    document.getElementById("info_video").innerText = `${view_date(mostViewedVideo.views)} / ${video_date(mostViewedVideo.upload_date)}`;
    document.getElementById("dsc").innerText = mostViewedVideo.video_detail;
    document.getElementById("modaltext").innerText = mostViewedVideo.video_detail;

    
    document.querySelector("div.container-play-lists").innerHTML = htmlDom;
}


let video_date = function(date){

    let returnValue = "";

    let targetDate = new Date(date.replace('/','-'))
    let nowDate = new Date();
    const diffDate = nowDate.getTime() - targetDate.getTime();
  
    let day = Math.abs(diffDate / (1000 * 60 * 60 * 24));
    // debugger;
    // console.log(day);

    if(day > 365){
        let year = Math.floor(day / 365) 
        returnValue = Math.floor(year) + "년 전";
    }else if(day > 30){
        let moth = Math.floor(day / 30) 
        returnValue = Math.floor(moth) + "개월 전";
    }else if(day > 7){
        let week = Math.floor(day / 7) 
        returnValue = Math.floor(week) + "주 전";
    }else if(day > 1){
        returnValue = Math.floor(day) + "일 전";
    }else{
        let time = Math.abs(diffDate / (1000 * 60 * 60 ));
        returnValue = Math.floor(time) + "시간 전";
    }

    return returnValue;
   
}

let view_date = function(view){
    
    let returnValue = "";
    if(view > 100000){
        returnValue = Math.floor(view  / 10000) + "만회";
    }else if(view > 10000){
        returnValue = (view  / 10000).toFixed(1) + "만회";
    }else if(view > 1000){
        returnValue = (view  / 1000).toFixed(1) + "천회";
    }else{
        returnValue = view + "회";
    }

    return returnValue;
}

http_get("http://oreumi.appspot.com/video/getVideoList").then((result) => {
    return videoinfo(result);
}).then((result) => {
    displayVideo(result);
}).then((result) => {

})

const videoContainer = document.getElementById("video-container");  
const video = document.getElementById("customVideo");
const playPauseButton = document.getElementById("play-pause-button");
const fastForwardButton = document.getElementById("fast-forward-button");
const volumeButton = document.getElementById("volume-button");
const volumeIcon = document.getElementById("volume-icon");
const volumeBarContainer = document.getElementById("volumeBarContainer");
const volumeBar = document.getElementById("volumeBar");
const currentTimeDisplay = document.getElementById("currentTimeDisplay");
const durationDisplay = document.getElementById("durationDisplay");
const progressBarContainer = document.querySelector(".progress");
const currentProgress = document.querySelector(".current-progress");
const fullButton = document.getElementById("full-button");
const timeBar = document.getElementsByClassName("time-bar")[0];
const videoTitle = document.querySelector(".video-title");
const infoButton = document.querySelector(".info-button");
const controls = document.querySelector(".controls")
const modalBg = document.getElementById('modalBg');
const closeModal = document.getElementById('closeModal');


// i 버튼을 클릭하면 모달 창을 표시하는 함수
infoButton.addEventListener("click", function() {
  modalBg.style.display = "flex";
});

    // 모달 창 닫기 버튼 클릭 시 모달 창을 숨기는 함수
closeModal.addEventListener("click", function() {
  modalBg.style.display = "none";
});

let isVideoPlaying = true;
// Play/Pause functionality
playPauseButton.addEventListener("click", function() {
    togglePlayPause();
  });
// Fast Forward functionality
fastForwardButton.addEventListener("click", function() {
  video.currentTime += 10;
});

let isVolumeBarVisible = false;


volumeButton.addEventListener("click", function() {
  isVolumeBarVisible = !isVolumeBarVisible;
  volumeBarContainer.style.display = isVolumeBarVisible ? "block" : "none";  
});

volumeBar.addEventListener("input", function() {
  video.volume = volumeBar.value;
  updateVolumeIcon(volumeBar.value);
});

function updateVolumeIcon(volume) {
  if (volume > 0) {
    volumeIcon.src = "src/assets/ico-sound-high.svg";
  } else {
    volumeIcon.src = "src/assets/ico-sound-mute.svg";
  }
}

video.volume = 0;
// 사용자 오디오 가져오기
navigator.mediaDevices.getUserMedia({ audio: false })
  .then((stream) => {
    // 사용자 오디오를 video의 오디오 트랙에 연결
    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length > 0) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioSource = audioContext.createMediaStreamSource(new MediaStream([audioTracks[0]]));  
      const videoElementSource = audioContext.createMediaElementSource(video);
      
      // 사용자 오디오와 커스텀 비디오의 오디오를 연결
      audioSource.connect(audioContext.destination);
      videoElementSource.connect(audioContext.destination);
      
    }
  })
  .catch((error) => {
    console.error("권한 오류:", error);
  });

// 비디오의 볼륨 상태가 변경되면 아이콘 업데이트
video.addEventListener("volumechange", function() {
  updateVolumeIcon(video.volume);
});

  function togglePlayPause() {
    if (isVideoPlaying) {
      video.pause();
      playPauseButton.innerHTML = '<img src="src/assets/ico-play.svg">';
    } else {
      video.play();
      playPauseButton.innerHTML = '<img src="src/assets/ico-play.svg">';
    }
    isVideoPlaying = !isVideoPlaying;
  }

// Update current time display and progress bar
video.addEventListener("timeupdate", function() {
  currentTimeDisplay.textContent = formatTime(video.currentTime);
  const progressPercentage = (video.currentTime / video.duration) * 100;
  currentProgress.style.width = `${progressPercentage}%`;
});

// Update duration display on video loadedmetadata event
video.addEventListener("loadedmetadata", function() {
  durationDisplay.textContent = formatTime(video.duration);
});

timeBar.addEventListener("click", function(event) {
    const clickX = event.offsetX;
    const timeBarWidth = timeBar.clientWidth;
    const percentage = clickX / timeBarWidth;
    const seekTime = percentage * video.duration;
    video.currentTime = seekTime;
  });


// Format time in seconds to "mm:ss" format
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}


video.addEventListener("play", function() {
    playPauseButton.innerHTML = '<img src="src/assets/ico-pause.svg">';
  });
  
  video.addEventListener("pause", function() {
    playPauseButton.innerHTML = '<img src="src/assets/ico-play.svg">';
  });



  // 전체화면 상태 변경 이벤트 처리
  fullButton.addEventListener("click", function() {
    if (!document.fullscreenElement) {
        if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen({ navigationUI: "show" });
        } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen({ navigationUI: "show" });        
        } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen({ navigationUI: "show" });
        } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen({ navigationUI: "show" });
        }
    } else{
        document.exitFullscreen();
    }
});

timeBar.addEventListener("click", function(event) {
    const clickX = event.offsetX;
    const timeBarWidth = timeBar.clientWidth;
    const percentage = clickX / timeBarWidth;
    const seekTime = percentage * video.duration;
    video.currentTime = seekTime;
  });


let timer
videoContainer.addEventListener("mouseenter", function() {
    // 타이머가 설정되어 있다면 제거하여 숨김 처리를 취소합니다.
    clearTimeout(timer);
  
    // 컨트롤러 요소를 보이도록 설정합니다.
    controls.style.display = "flex";
    videoTitle.style.display = "block";
    infoButton.style.display = "block";
  
    // // 일정 시간(예: 3초)이 지난 후에 컨트롤러 요소를 숨깁니다.
    // timer = setTimeout(function() {
    //   controls.style.display = "none";
    //   videoTitle.style.display = "none";
    //   infoButton.style.display = "none";
    // }, 2000); // 3초 후에 숨김 처리
  });
  
  videoContainer.addEventListener("mouseleave", function() {
    // 마우스가 영상에서 벗어났을 때는 즉시 컨트롤러 요소를 숨깁니다.
    clearTimeout(timer);
    controls.style.display = "none";
    videoTitle.style.display = "none";
    infoButton.style.display = "none";
  });







  



// sidebar subscriber 정보 적용 : 작성중

let subArray = ['oreumi', '나와 토끼들', '개조']


function http_post(name){
  let xhr = new XMLHttpRequest();  // XMLHttpRequest 객체를 생성합니다.
let apiUrl = 'http://oreumi.appspot.com/channel/getChannelInfo';  // 요청을 보낼 URL입니다.

xhr.open("POST", apiUrl, true);  // POST 방식으로 요청을 초기화합니다.

let jsonData = {"video_channel": name}  // 요청에 포함할 데이터를 정의합니다.

// 요청의 응답을 처리하는 콜백을 정의합니다.
xhr.onreadystatechange = function () {
  if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    let response = JSON.parse(xhr.responseText);  // 응답을 JSON 형식으로 파싱합니다.

    // 데이터가 존재하는지 확인합니다.
    if (response && response.channel_name !== undefined) {
      // 각 데이터를 콘솔에 출력합니다.
      // console.log(response.channel_name);
      // console.log(response.banner);
      // console.log(response.profile);
      // console.log(response.subscribers);
    }
  }
};

xhr.setRequestHeader("Content-Type", "application/json");  // 요청의 헤더를 설정합니다.
xhr.send(JSON.stringify(jsonData));  // 요청을 보냅니다.
  
}

for(let i = 0; i < subArray.length; i++){
  console.log(http_post(subArray[i]))
}


let subscrriptions = document.getElementsByClassName("Menu_Sub")
console.log(subscrriptions[0])
