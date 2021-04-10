(function () {

    let audio = document.querySelector('.audio audio');
    let audio_play = document.querySelector('.audio .handle .play-icon');
    let audio_total = document.querySelector('.audio_total');
    let audio_current = document.querySelector('.audio_current');
    let audio_range = document.querySelector('.audio .handle .range');
    let audio_speaker = document.querySelector('.audio .handle .speaker');
    let audio_loud = document.querySelector('.audio .handle .loud');

    let video = document.querySelector('.video video');
    let video_play = document.querySelector('.video .handle .play-icon');
    let video_total = document.querySelector('.video_total');
    let video_current = document.querySelector('.video_current');
    let video_range = document.querySelector('.video .handle .range');
    let video_speaker = document.querySelector('.video .handle .speaker');
    let video_loud = document.querySelector('.video .handle .loud');
    let video_full = document.querySelector('.video .handle .full');
    let play_video = document.querySelector('.video .play .img');

    function resetVideo(){
        video_play.firstChild.src = './img/play.png';
        video_current.innerHTML = "00:00";
        setTimeout(function(){
            video_range.firstChild.value = 0;
        },100);
        play_video.style.display = 'flex';
    }

    function formatTime(time) {
        temp = Math.floor(time / 60);
        temp = (temp >= 10) ? temp : "0" + temp;
        time = Math.floor(time % 60);
        time = (time >= 10) ? time : "0" + time;
        return temp + ":" + time;
    }

    audio_play.addEventListener('click', function () {
        if (audio.paused) {
            audio_play.firstChild.src = './img/pause.png';
            audio.play();
        } else {
            audio_play.firstChild.src = './img/play.png';
            audio.pause();
        }
    });

    audio.addEventListener('loadedmetadata', function () {
        let duration = audio.duration;
        let seconds = duration.toFixed(2);
        let audio_time = formatTime(seconds);
        audio_total.innerHTML = audio_time;
    });

    audio.addEventListener('timeupdate', function () {
        let time = audio.currentTime;
        let seconds = time.toFixed(2);
        let audio_time = formatTime(seconds);
        audio_current.innerHTML = audio_time;

        let range = audio.currentTime * 100 / audio.duration;
        audio_range.firstChild.value = range;

        if(audio.ended){
            audio_range.firstChild.value = 0;
            audio_play.firstChild.src = './img/play.png';
        }
    });

    audio_range.firstChild.addEventListener('input', function () {
        let value = this.value;
        audio.currentTime = value * audio.duration / 100;
    });

    audio_speaker.addEventListener('click', function () {
        if (audio.volume == 0) {
            audio_speaker.firstChild.src = './img/audio.png';
            audio.volume = 1;
        } else {
            audio_speaker.firstChild.src = './img/mute.png';
            audio.volume = 0;
        }
    });

    audio_loud.firstChild.addEventListener('input', function () {
        let value = this.value;
        audio.volume = value;
    });

    let imgs = document.querySelectorAll('.video .imgs img');

    imgs.forEach(v=>{
        v.addEventListener('click', function(){
            resetVideo();
            if(v.classList.contains('current')){
                return;
            }
            imgs.forEach(v2=>{
                v2.classList.remove('current');
            });
            v.classList.add('current');
            let video_url = v.dataset.video;
            let img_url = v.dataset.img;
            let video = document.querySelector('.video .play video');
            video.src = video_url;
            let img = document.querySelector('.video .play .img');
            if(img_url){
                video.poster = img_url;
                // img.style.backgroundImage = `url(${v.src})`;
            }else{
                // img.style.backgroundImage = 'none';
                video.poster = '';
            }
        });
    });

    play_video.addEventListener('click', function(){
        play_video.style.display = 'none';
        video.play();
        video_play.firstChild.src = './img/pause.png';
    });

    video.addEventListener('click', function(){
        if(video.paused){
            video.play();
            video_play.firstChild.src = './img/pause.png';
        }else{
            video.pause();
            video_play.firstChild.src = './img/play.png';
        }
    });

    video_play.addEventListener('click', function () {
        if (video.paused) {
            video_play.firstChild.src = './img/pause.png';
            play_video.style.display = 'none';
            video.play();
        } else {
            video_play.firstChild.src = './img/play.png';
            video.pause();
        }
    });

    video.addEventListener('loadedmetadata', function () {
        let duration = video.duration;
        let seconds = duration.toFixed(2);
        let video_time = formatTime(seconds);
        video_total.innerHTML = video_time;
    });

    video.addEventListener('timeupdate', function () {
        let time = video.currentTime;
        let seconds = time.toFixed(2);
        let video_time = formatTime(seconds);
        video_current.innerHTML = video_time;

        let range = video.currentTime * 100 / video.duration;
        video_range.firstChild.value = range;

        if(video.ended){
            video_range.firstChild.value = 0;
            video_play.firstChild.src = './img/play.png';
        }
    });

    video_range.firstChild.addEventListener('input', function () {
        let value = this.value;
        video.currentTime = value * video.duration / 100;
    });

    video_speaker.addEventListener('click', function () {
        if (video.volume == 0) {
            video_speaker.firstChild.src = './img/audio.png';
            video.volume = 1;
        } else {
            video_speaker.firstChild.src = './img/mute.png';
            video.volume = 0;
        }
    });

    video_loud.firstChild.addEventListener('input', function () {
        let value = this.value;
        video.volume = value;
    });

    video_full.addEventListener('click',function(){
        video.requestFullscreen();
    });
})();