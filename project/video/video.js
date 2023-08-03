const videoInfoUrl = "http://oreumi.appspot.com/video/getVideoInfo"
const videoListUrl = "http://oreumi.appspot.com/video/getVideoList"
const channelInfoUrl = "http://oreumi.appspot.com/channel/getChannelInfo"


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
let httpMethod = function (url,params={},Method="GET"){
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        let queryString =  new URLSearchParams(params).toString();
        if(Method == "GET"){
            xhr.open(Method, url+"?"+queryString);
        }else{
            xhr.open(Method, url);
        }
        xhr.setRequestHeader('content-type', 'application/json');
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
     
    let video = document.querySelector("video");
    let source = document.querySelector("video > source");
    let videoTitle = document.querySelector("span.video-title")
    video.setAttribute('poster', data.image_link);
    source.setAttribute('poster', data.video_link);
    videoTitle.innerHTML = data.video_title;
    debugger;
    
}

let videoLabelInit = function(data){
    // channel_banner: "https://storage.googleapis.com/oreumi.appspot.com/oreumi_banner.jpg"
    // channel_name: "oreumi"
    // channel_profile: "https://storage.googleapis.com/oreumi.appspot.com/oreumi_profile.jpg"
    // subscribers: 13170471
    let userPhoto = document.querySelector(".userphoto > img");
    userPhoto.setAttribute('src', data.channel_profile);
    // video.setAttribute('poster', data.image_link);
    // source.setAttribute('poster', data.video_link);
    
}

let videoinfo = function (arr) {
    return Promise.all(
        arr.map(async x => {
            return await httpMethod(videoInfoUrl,{video_id:x.video_id})}));
};

console.log(getUrlParam("video_id"));
httpMethod(videoInfoUrl,{video_id:getUrlParam("video_id")})
.then(function(value){
    console.log("videoInfoUrl",value);
    
    videoplayerInit(value);
    return httpMethod(channelInfoUrl,{"video_channel":value.video_channel},"POST");
}).then(function(value){
    videoLabelInit(value);
    console.log("channelInfoUrl",value);
    
})

// console.log(getUrlParam("video_channel"));

// httpMethod(videoListUrl)
// .then(function(value){
//     return videoinfo(value);
// }).then(function(value){
//     return console.log(value);
// })

// httpMethod(channelInfoUrl,{"video_channel":getUrlParam("video_channel")},"POST")
// .then(function(value){
//     //작업할 위치
//         return console.log(value);
// })

// httpMethod(videoListUrl)
