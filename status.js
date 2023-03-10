//status用
window.alert('変更を開始します');
setInterval(function (){
    function getCookieValue(key) {
        const cookies = document.cookie.split(';');
        for (let cookie = 0; cookie < cookies.length; cookie++) {
            var cookiesArray = cookies[cookie].split('=');
            if (cookiesArray[0].trim() == key.trim()) {
                return cookiesArray[1];
            }
        }
        return '';
    }
    let token = getCookieValue("scratchcsrftoken");
    let data = new Date();
    let year=data.getFullYear();
    let month=data.getMonth()+1;
    if(String(month).length==1){
        month="0"+month;
    }
    let day = data.getDate();
    if(String(day).length==1){
        day="0"+day;
    }
    let hour=data.getHours();
    if(String(hour).length==1){
        hour="0"+hour;
    }
    let minutes=data.getMinutes();
    if(String(minutes).length==1){
        minutes="0"+minutes;
    }
    let date = `${year} / ${month} / ${day}　${hour} : ${minutes}（JST）`;
    let aboutMe = ``;
    fetch("https://scratch.mit.edu/session/", {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(response => response.json()).then(users => {
        let username = users["user"]["username"];
        fetch(`https://api.scratch.mit.edu/users/${username}/`).then(response => response.json()).then(aboutaboutme => {
            let aboutme = aboutaboutme["profile"]["status"].split("\n");
            let i = 0;
            for (i = 0; i < aboutme.length - 1; i++) {
                if (aboutme[i].includes("Last Login")) {
                    aboutme[i] = `Last Login：${date}`;
                    aboutMe += aboutme[i] + "\n";
                } else {
                    aboutMe += aboutme[i] + "\n";
                }
            }
            if (aboutme[i].includes("Last Login")) {
                    aboutme[i] = `Last Login：${date}`;
                    aboutMe += aboutme[i];
                } else {
                    aboutMe += aboutme[i];
                }
            fetch(`https://scratch.mit.edu/site-api/users/all/${username}/`, {
                method: "PUT",
                body: JSON.stringify({
                    status: aboutMe
                }),
                headers: {
                    'X-CSRFToken': token,
                    "x-requested-with": "XMLHttpRequest"
                }
            });
        });
    })
  console.log('変更中');
},100)
();
