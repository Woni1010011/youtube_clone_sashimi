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

let displayVideo = function(arr){
    let htmlDom = "";
    //document.querySelector("div.container_thumbnail")
    arr.forEach((e, index, array)=>{
        if(index == 0)
            htmlDom += `<div class="row">`;
        else if(index % 4 == 0){
            htmlDom += `
                </div>
                <div class="row">`;
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
                <div class="thumbnail_info">
                    <img class="user_avatar" src="oreumi.jpg" >
                    <div class="desc">
                        <div class="title">${e.video_title}</div>
                        <div class="chanel_name">${e.video_channel}</div>
                        <div class="view_time">조회수 ${view_date(e.views)},  ${video_date(e.upload_date)}</div>
                    </div>
                </div>
            </div>`;
        });
    document.querySelector("div.container_thumbnail").innerHTML = htmlDom;
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

// upload_date

// views


http_get("http://oreumi.appspot.com/video/getVideoList").then((result) => {
    return videoinfo(result);
}).then((result) => {
    displayVideo(result);
    
})



// topmenu : 브라우져 길이에 따른 화살표 표시 기능
function hideElementIfEqualBrowserWidth() {
    const topmenu = document.getElementsByClassName('item_scroll');
    const nextbotton = document.getElementsByClassName('next_button_frame');

    function checkWidth() {
    // 브라우저의 너비를 가져옵니다.
    const browserWidth = window.innerWidth;

    // 탑메뉴의 너비를 가져옵니다.
    const elementWidth = topmenu[0].offsetWidth;

    if (browserWidth - 270 > elementWidth) {
        nextbotton[0].style.display = 'none';  // 브라우저 너비 보다 탑메뉴 너비가 같거나 작으면 버튼을 숨깁니다.
    } else {
        nextbotton[0].style.display = 'flex';  // 버튼이 다시 보이도록 설정합니다.
    }
    }

    // 페이지 로드 시 처음 한 번 실행합니다.
    checkWidth();

    // 브라우저 창 크기가 변경될 때마다 실행합니다.
    window.addEventListener('resize', checkWidth);
}

// 페이지 로드 시 실행합니다.
hideElementIfEqualBrowserWidth();




const itemscroll = document.getElementsByClassName('item_scroll')
const nextbtn = document.getElementsByClassName('next_button_frame');
const reversebtn = document.getElementsByClassName('reverse_next_button_frame')

// 탑메뉴 화살표 누를시 다른방향 화살표 보이는기능
nextbtn[0].addEventListener('click', function () {
    reversebtn[0].style.display = 'flex';
    nextbtn[0].style.display = 'none';
  }
);  
reversebtn[0].addEventListener('click', function () {
    nextbtn[0].style.display = 'flex';
    reversebtn[0].style.display = 'none';
  }
);

// 버튼 스크롤 기능

reversebtn[0].addEventListener('click', function () {
// 왼쪽으로 스크롤 이동
  itemscroll[0].scrollTo({
    left: 0,
    behavior: 'smooth'
  });
});

nextbtn[0].addEventListener('click', function () {
  // 오른쪽으로 스크롤 이동
  const scrollWidth = itemscroll[0].scrollWidth;
  itemscroll[0].scrollTo({
    left: scrollWidth,
    behavior: 'smooth'
  });
});
