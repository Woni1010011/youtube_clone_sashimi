// Home 페이지에서 Thumnail 화면 채우는 코드입니다.
// 밑에 있는 코드는 인터넷에서 찾아본거라 참고만 하세요

// 유튜브 API 키를 입력하세요.
const API_KEY = 'YOUR_YOUTUBE_API_KEY';

// 가져올 비디오 목록의 갯수와 검색어를 지정합니다.
const maxResults = 10;
const searchQuery = 'web development'; // 원하는 검색어를 입력하세요.

// 비디오 목록을 가져오는 함수
function fetchVideos() {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=${maxResults}&q=${searchQuery}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayVideos(data.items))
        .catch(error => console.error('Error fetching videos:', error));
}

// 비디오 목록을 화면에 표시하는 함수
function displayVideos(videoItems) {
    const videoList = document.getElementById('videoList');

    videoItems.forEach(video => {
        const videoTitle = video.snippet.title;
        const videoId = video.id.videoId;
        const videoThumbnail = video.snippet.thumbnails.default.url;

        const listItem = document.createElement('li');
        const videoLink = document.createElement('a');
        const thumbnailImg = document.createElement('img');

        videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        thumbnailImg.src = videoThumbnail;
        thumbnailImg.alt = videoTitle;

        videoLink.appendChild(thumbnailImg);
        listItem.appendChild(videoLink);
        videoList.appendChild(listItem);
    });
}

// 페이지가 로드될 때 비디오 목록을 가져옵니다.
document.addEventListener('DOMContentLoaded', fetchVideos);