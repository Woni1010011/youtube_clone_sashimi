function fetchVideoInfo(videoId) {
    const url = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${videoId}`;
  
    // Fetch API를 이용하여 데이터를 불러옵니다.
    fetch(url)
      .then(response => {
        // HTTP 요청이 성공적으로 완료된 경우
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // JSON 형태로 데이터 반환
      })
      .then(data => {
        // 데이터를 사용하는 로직을 이곳에 작성합니다.
        console.log('데이터:', data);
      })
      .catch(error => {
        // 네트워크 에러나 파싱 에러 등의 오류 처리
        console.error('데이터를 불러오는 중 오류 발생:', error);
      });
  }
  
  // 함수 호출
  const videoId = 1;
  fetchVideoInfo(videoId);