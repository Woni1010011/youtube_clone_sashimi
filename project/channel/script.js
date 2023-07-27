
/*
구독,구독 취소 버튼 기능(스위치 기능만)
css는 아래와 동일한 구조로 작성 해야 작동 합니다.

.sub{
    background-color: ; 
    border-style: ; 
    border-radius: ;
}
.sub.unsub{
    background-color: ; 
    border-style: ; 
    border-radius: ;
}
*/
const subBtn = document.getElementsByClassName("sub");

subBtn[0].addEventListener('click', function() {
  subBtn[0].classList.toggle('unsub');

  if (subBtn.classList.contains('unsub')) {
    subBtn.innerText = "Unsubscribe";
  } else {
    subBtn.innerText = "Subscribe";
  }
});


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
*/
const videos = document.getElementsByClassName("video");
let x = 0;
let date = new Date();

function createVideoItem(video_id) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();
  
    // API 요청 설정
    let apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${x}`;
    xhr.open("GET", apiUrl, true);
        // 응답 처리 설정
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                // 가져온 응답 처리
                let response = JSON.parse(xhr.responseText);
        
                // 데이터 있는지 확인
                if (response && response.video_id !== undefined) {
                // 각 데이터들을 콘솔에 출력
                // console.log(response.video_id);
                // console.log(response.image_link);
                // console.log(response.upload_date);
                // console.log(response.video_channel);
                // console.log(response.video_detail);
                // console.log(response.video_link);
                // console.log(response.video_tag);
                // console.log(response.video_title);
                // console.log(response.views);

                // 뷰 수 단위 조정
                let convertViews = 0;
                if((response.views / 1000).toFixed(1) > 999) {
                    convertViews = (response.views / 1000000).toFixed(1) + "M views";
                } else if((response.views / 1000).toFixed(1) < 1) {
                    convertViews = response.views + "views";
                } else {
                    convertViews = (response.views / 1000).toFixed(1) + "K views";
                }

                // 날짜 -> 00 월/년 전으로 변환
                let convertDate = 0;
                if(date.getFullYear() > (response.upload_date.split("/")[0]-0)) {
                   convertDate = (date.getFullYear() - (response.upload_date.split('/')[0]-0)) + " year ago" ;
                } else if((date.getMonth() + 1) != (response.upload_date.split('/')[1]-0)) {
                    convertDate = ((date.getMonth() + 1) - (response.upload_date.split('/')[1]-0)) + " month ago";
                } else{
                    convertDate = (date.getDate() - (response.upload_date.split('/')[2]-0)) + " day ago";
                }
                
                // html 구조 변경시 아래 내용 수정 필요
                video_id[x].childNodes[1].src = response.image_link;
                video_id[x].childNodes[3].innerHTML = response.video_title;
                video_id[x].childNodes[5].innerHTML = response.video_channel;
                video_id[x].childNodes[7].innerHTML = convertViews;
                video_id[x].childNodes[9].innerHTML = convertDate;
                x++;  

                // 다음 video_id로 재귀 호출
                createVideoItem(video_id);
                }
            }
        }
    // 요청 전송
    xhr.send();
}

//아이템 불러오기
createVideoItem(videos);


  