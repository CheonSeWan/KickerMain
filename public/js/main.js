let currentDate = new Date();
displayCalendar(currentDate);

// 주간 캘린더 표시 함수
function displayCalendar(date) {
    const table = document.getElementById('calendar').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    const prevButton = document.createElement('button')
    const nextButton = document.createElement('button');
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const rowi=document.createElement('table');

    for (let i = 0; i < 1; i++) {
        const row = table.insertRow(i);
    // "이전 주" 버튼 추가
    const prevButtonCell = row.insertCell(0);
    const prevButtonImage = document.createElement('img');
        prevButtonImage.src = '/img/Lefticon.png'; // 이전 버튼 이미지 파일 경로 설정
        prevButtonImage.alt = '이전 주';
        const handlePrevButtonClick = function () {
        currentDate.setDate(currentDate.getDate() - 7);
        displayCalendar(currentDate);
    };
    const nextButtonCell = row.insertCell(1);
    nextButtonCell.style.textAlignLast='right';
    const nextButtonImage = document.createElement('img');
        nextButtonImage.src = '/img/Righticon.png'; // 이전 버튼 이미지 파일 경로 설정
        nextButtonImage.alt = '다음 주';
        const handlenextButtonClick = function () {
        currentDate.setDate(currentDate.getDate() + 7);
        displayCalendar(currentDate);
    };

    prevButton.addEventListener('click', handlePrevButtonClick);
    prevButtonImage.addEventListener('click', handlePrevButtonClick);
    prevButtonCell.appendChild(prevButton);
    prevButtonCell.appendChild(prevButtonImage);
    nextButtonCell.style.textAlign='left'; 
    prevButtonCell.style.width='50px';
    prevButtonCell.style.height='50px';
    prevButtonImage.style.margin='0px';
    prevButtonImage.style.width='30px';
    prevButtonImage.style.height='30px';
    prevButtonCell.style.border='none';

    nextButton.addEventListener('click', handlenextButtonClick);
    nextButtonImage.addEventListener('click', handlenextButtonClick);
    nextButtonCell.appendChild(nextButton);
    nextButtonCell.appendChild(nextButtonImage);
    nextButtonCell.style.textAlign='right'; 
    nextButtonCell.style.width='50px';
    nextButtonCell.style.height='50px';
    nextButtonImage.style.margin='0px';
    nextButtonImage.style.width='30px';
    nextButtonImage.style.height='30px';
    nextButtonCell.style.border='none';


        for (let j = 0; j < 7; j++) {
            const cell = row.insertCell(j+1);
            const day = new Date(date);
            day.setDate(date.getDate() + i * 7+ j);
            cell.textContent = day.getDate();
             // 각 셀에 이벤트 리스너 추가
            cell.addEventListener('click', function () {
                if(!this.classList.contains('selected-cell')){
                    clearSelectedCells();
                    this.classList.add('selected-cell')
                    generateList(j + 1);
                }
             // 해당하는 열 인덱스로 함수 호출
            
        });
        if (i === 0 && j === 0) {
           cell.classList.add('selected-cell');
         generateList(j + 1);
            }
        cell.style.border='none';
            
        }
        

    }
}
function clearSelectedCells() {
        // 'selected-cell' 클래스를 가진 모든 셀에서 클래스 제거
        const selectedCells = document.querySelectorAll('.selected-cell');
        selectedCells.forEach(function (cell) {
            cell.classList.remove('selected-cell');
        });
    }
    
    function generateList(column) {
      var listContainer = document.getElementById("listContainer");
      listContainer.innerHTML = ""; // 이전 리스트를 지우고 새로운 리스트를 생성

      // 6개의 post 객체 생성
      var posts = [
          { time: "09:00", date: calculateDate(column) },
          { time: "10:30", date: calculateDate(column) },
          { time: "12:00", date: calculateDate(column) },
          { time: "13:30", date: calculateDate(column) },
          { time: "15:00", date: calculateDate(column) },
          { time: "16:30", date: calculateDate(column) }
      ];

      // 각 post 객체를 기반으로 리스트 아이템 생성
      posts.forEach(function(post) {
          var listItem = document.createElement("div");
          var contentWrapper = document.createElement("div");
          
          contentWrapper.textContent = post.date + " - " + post.time;

          listItem.appendChild(contentWrapper);

          var horizontalLine = document.createElement("hr");
          listItem.appendChild(horizontalLine);

          var linkButtonWrapper = document.createElement("div");
          linkButtonWrapper.classList.add("link-button-wrapper");

          var linkButton = document.createElement("div");
          linkButton.textContent = "신청인원";

          // 클릭 이벤트 핸들러 추가
          listItem.addEventListener("click", function () {
              window.location.href = "https://example.com"; // 이동하고자 하는 페이지 URL로 설정
          });

          linkButtonWrapper.appendChild(linkButton);
          contentWrapper.appendChild(linkButtonWrapper); // contentWrapper에 linkButtonWrapper를 추가
          listContainer.appendChild(listItem);
      });
  }

  // 현재 날짜와 열 인덱스를 기반으로 날짜 계산
  function calculateDate(column) {
      var realdate = currentDate.getDate() + column - 1;
      if (realdate <= 30) {
          return realdate;
      } else {
          return realdate - 30;
      }
  }
window.onload = function() {
    generateList(1);
   }