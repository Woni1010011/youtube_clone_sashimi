
// const a = document.querySelector('.Top2_Show_More_Icon');
// a.addEventListener('click', showConsole);
// function showConsole() {
//     console.log("콘솔로그 실행");
// }





const a = document.querySelector('.Top2_Show_More_Icon');
a.addEventListener('click', showConsole);

function showConsole() {

    // 내용이 펼쳐지는 부분의 요소 선택
    const content = document.querySelector('.content');

    // content 요소의 display 속성을 변경하여 내용을 펼치거나 숨김
    if (content.style.display === 'none') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
} 
