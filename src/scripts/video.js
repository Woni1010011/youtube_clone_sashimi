

const videoInfoUrl = "https://oreumi.appspot.com/video/getVideoInfo"
const videoListUrl = "https://oreumi.appspot.com/video/getVideoList"
const channelInfoUrl = "https://oreumi.appspot.com/channel/getChannelInfo"


const openApiURL = "http://aiopen.etri.re.kr:8000/WiseWWN/WordRel";
const access_key = "fb97afdd-ac4f-473d-844f-d049aac49dd7";

//URL query 정보 가져오기
let getUrlParam = function(param){
    const urlParams = new URL(location.href).searchParams;
    const paramValue = urlParams.get(param);
    return paramValue    
}

/*
    url : 통신할 URL
    params:  전송할 데이터 
    Method: http 메소드
*/
let httpMethod =  function (url,params={},Method="GET",headers){
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        let queryString =  new URLSearchParams(params).toString();
        if(Method == "GET"){
            xhr.open(Method, url+"?"+queryString);
        }else{
            xhr.open(Method, url);
        }


        if(headers != null){
            Object.keys(headers).forEach((el)=>{
                xhr.setRequestHeader(el, headers[el]);
            })
            
        }else{
            xhr.setRequestHeader('content-type', 'application/json');
        }
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE){
                if (xhr.status === 200) {
                    // 데이터를 받아왔을 때 처리하는 부분
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    console.error("Failed");
                    reject(xhr.status);
                }
            }
        };
        if(Method != "GET"){
            xhr.send(JSON.stringify(params));
        }else{
            xhr.send();
        }
        
    });
};


let videoplayerInit = function(data){
    
    // let viewCount = data.views.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    document.querySelector("p.views-count").innerHTML = viewsFormat(data.views);

    // let uploadInfo = new Date()
    //     .toDateString().replace(/\w+ (\w+) 0?(\d+) (\d+)/,"$1 $2 $3");
    document.querySelector("p.upload-info").innerHTML = convertDate(data.upload_date.replace("/","-"))
    //viewsFormat(uploadInfo);

    let video = document.querySelector("video");
    let source = document.querySelector("video > source");
    let videoTitle = document.querySelector("span.video-title")
    video.setAttribute('poster', data.image_link);
    source.setAttribute('poster', data.video_link);
    videoTitle.innerHTML = data.video_title;
}

let videoLabelInit = function(data){

    //프로필 이미지
    let userPhoto = document.querySelector(".userphoto > img");
    userPhoto.setAttribute('src', data.channel_profile);

    //프로필 이름
    document.querySelector("div.channel-info > span").innerHTML = data.channel_name;
    document.querySelector("div.followers_number > span")
    .innerHTML = subscrbeFomter(data.subscribers);
    
    // viewsFormat
    // 17617437

    // video.setAttribute('poster', data.image_link);
    // source.setAttribute('poster', data.video_link);
    
}


function convertDate(dateString) {
    // 파라미터로 받은 날짜를 Date 객체로 변환
    let targetDate = new Date(dateString);
  
    // 현재 날짜를 구하기 위해 현재 시간 기준으로 Date 객체 생성
    let currentDate = new Date();
  
    // 두 날짜의 시간 차이 계산 (밀리초 기준)
    let timeDifference = currentDate - targetDate;
  
    // 1년의 밀리초 수
    let oneYearInMilliseconds = 31536000000;
  
    if (timeDifference < 86400000) {
      // 하루(24시간) 기준의 밀리초 수
      return "오늘";
    } else if (timeDifference < 172800000) {
      // 이틀(48시간) 기준의 밀리초 수 (어제)
      return "어제";
    } else if (timeDifference < 604800000) {
      // 일주일(7일) 기준의 밀리초 수
      return "1주 전";
    } else if (timeDifference < oneYearInMilliseconds) {
      // 한 달 전 계산
      let currentMonth = currentDate.getMonth();
      let targetMonth = targetDate.getMonth();
  
      if (currentMonth === targetMonth) {
        return "1개월 전";
      } else {
        return `${currentMonth - targetMonth}개월 전`;
      }
    } else {
      return `${Math.floor(timeDifference / oneYearInMilliseconds)}년 전`;
    }
  }

  

let subscrbeFomter = function(view){
    
    let returnValue = "";
    if(view > 1000000){
        returnValue = (view  / 1000000).toFixed(1) + " 만 명";
    }else if(view > 1000){
        returnValue = (view  / 1000).toFixed(1) + " 천 명";
    }else {
        returnValue = view+ " 명";
    }
    return returnValue;
}


let videoinfo = function (arr) {
    return Promise.all(
        arr.map(async x => {
            return await httpMethod(videoInfoUrl,{video_id:x.videoId})}));
};

let dataMerge =  (videoInfo,channelInfo) => {
    return Object.assign(videoInfo,channelInfo)
}


let similarityVideoList = async function(taget, videoTagList){

    let similarityList = [];
    for(let videoId of Object.keys(videoTagList)){
        
        // 목록의 id 와 현재 비디오 id가 같으면 다음 루프 진행
        if(taget.video_id == videoId){
            continue;
        }
        PromiseList = [];
        
        for(let tagetTags of taget.video_tag){
            for(let tag of videoTagList[videoId]){
                if(tagetTags != tag){
                    PromiseList.push(similaritycheck(tagetTags,tag)) 
                }
            }

        }
        let similarityData = await Promise.all(PromiseList);


        let score = similarityData.reduce((arr,cur)=>arr+=cur.return_object["WWN WordRelInfo"].WordRelInfo.Distance,0)
        similarityList.push({"videoId":videoId ,"score":score})

    }
    return similarityList;
}

let videoMerge = function(similarityList,videoinfoList){
    similarityList = similarityList.sort((a,b) => a.score < b.score);


    for(similarity of similarityList){
        for(videoinfo of videoinfoList){
            if( similarity.videoId == videoinfo.video_id){
                similarity.videoinfo = videoinfo;
            }
        }
    }
    return similarityList;
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

let viewsFormat = function(view){
    let returnValue = "";
    if(view > 1000000){
        returnValue = (view  / 1000000) + "만회";
    }else if(view > 10000){
        returnValue = (view  / 10000).toFixed(1) + "만회";
    }else if(view > 1000){
        returnValue = (view  / 1000).toFixed(1) + "천회";
    }else{
        returnValue = view + "회";
    }

    return returnValue;
}


let displaySideVideoList = function(arr){
    let html = "";

    for(data of arr){
        


        // image_link: "https://storage.googleapis.com/oreumi.appspot.com/img_0.jpg"
        // upload_date: "2023/07/21"
        // video_channel: "oreumi"
        // video_detail: "인공지능으로 스마트한 생활을 이끄는 방법"
        // video_id: 0
        // video_link: "https://storage.googleapis.com/oreumi.appspot.com/video_0.mp4"
        // video_tag: (5) ['인공지능', '스마트', '기술', '첨단', '혁신']
        // video_title : "AI 기술의 혁신적인 적용"
        // views: 454819



        html += `<div class="side-video-item">
                        <div class="side-video-item-thumbnail">
                            <img src="${data.videoinfo.image_link}" alt="">
                        </div>
                        <div class="side-video-item-content">
                            <p class="side-video-item-content-title">${data.videoinfo.video_detail}</p>
                            <p class="side-video-item-content-writer">${data.videoinfo.video_channel}</p>
                            <p class="side-video-item-content-date">${viewsFormat(data.videoinfo.views)} views . ${video_date(data.videoinfo.upload_date)}</p>
                        </div>
                    </div>`
    }


    document.querySelector("div.side-list").innerHTML = html;

}

httpMethod(videoInfoUrl,{video_id:getUrlParam("video_id")})
.then(async function(value){
    let channelInfo = await httpMethod(channelInfoUrl,{"video_channel":value.video_channel},"POST")
    return await dataMerge(value,channelInfo);
})
.then(function(value){
    videoplayerInit(value);
    videoLabelInit(value);
    displayHashTag(value.video_tag);
    return value;
}).then(async function(value){
    let tag = await videosTagList();
    let similarityList = similarityVideoList(value,tag);
    return similarityList;
}).then(async function(value){
    let videoinfoData = await videoinfo(value);
    return videoMerge(value,videoinfoData);
}).then(function(value){
    displaySideVideoList(value)
})






// similaritycheck("부부","할머니")
let similaritycheck = function(val1,val2){
    let data = {
        "argument": {
            "first_word": val1,
            "second_word": val2
        }
    }
    let apiData = httpMethod(openApiURL,data,"POST",
    {"Content-Type": "application/json","Authorization": access_key})

    return apiData;
    // return apiData.return_object["WWN WordRelInfo"].WordRelInfo.Distance;
} 

let videoDataList = () => httpMethod(videoListUrl)

let videosTagList = async function(){
    let data =  await videoDataList();

    let tagdata = data.reduce(function(acc,cur){
        acc[cur.video_id] = cur.video_tag 
        return acc;
    },{});

    return tagdata;
}

let displayHashTag = function(arr){
    let html = `<a href="home.html">
                    <div class="item toggle">ALL</div>
                </a>`

    for(let item of arr){
        html += `<a href="">
                    <div class="item ">${item}</div>
                </a>`
    }
    tagScrollDom.innerHTML = html
    
}



//해쉬태그 관려 소스 start

//해쉬태그 
const tagScrollDom = document.querySelector(".item_scroll");
//해쉬태그 좌우 버튼
const hashTagBtn = document.querySelectorAll('button[class*=next_button_frame]')
//해쉬태그 스크롤위치
const hashtagFocusPostion = () => tagScrollDom.scrollLeft
//해쉬태그 전체 가로 사이즈
const hashtagScrollWidth = () => tagScrollDom.scrollWidth
//해쉬태그 출력 가로 사이즈
const hashtagWidth = () => tagScrollDom.offsetWidth


const scrollMove = function() {
    const flag = this.getAttribute("move")
    moveValue = (flag == "next") ? hashtagWidth(): -hashtagWidth();
    tagScrollDom.scrollTo({
        left: hashtagFocusPostion() + moveValue,
        behavior: 'smooth'
    });
}


const scrollEvent = () => {
    
    if(hashtagFocusPostion() == 0){
        hashTagBtn[0].style.display = "none";
    }else{
        hashTagBtn[0].style.display = "block";
    }

    if(hashtagFocusPostion() == hashtagScrollWidth() - hashtagWidth()){
        hashTagBtn[1].style.display = "none";
    }else{
        hashTagBtn[1].style.display = "block";
    }
}

//해쉬태그 Dom  스크롤 이벤트
tagScrollDom.onscroll = scrollEvent

//해쉬태그 좌우 버튼 리슨어
hashTagBtn.forEach((el) => el.onclick = scrollMove);
//해쉬태그 관려 소스 end
