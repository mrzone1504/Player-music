const $ =document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY ="mode"
const player=$('.player');
const volumeSet=$('#volumeAdjust')
const volumeIcon=$('.volume .btn-volume')
const activeSong=$('.song.active');
const cd =$('.cd');
const cdProgressFull = $('.cd .circle .mask.full');
const cdProgressFill = $$('.cd .circle .mask .fill');
const heading = $('header marquee');
const cdThumb =$('.cd-thumb');
const repeatBtn = $('.btn-repeat');
const prevBtn = $('.btn-prev');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const btnMenu=$('.menuBtn');
const randomBtn = $('.btn-random');
const progress= $('#progress');
const progressRange= $('.progressRange')
const audio = $('#audio');
const playlist = $('.playlist');
const endTime=$('.endTime');
const rangeValue=$('.rangeValue');
const startTime =$('.startTime');
const favouriteSongList=$('.favouriteList');
var r = $(':root');
var favouriteArray=[]
const app={
    currentSong: {},
    currentIndex: 0,
    isPlaying :false,
    isMute: false,
    isNext :false,
    isRandom: false,
    isTimeUpdate: true,
    isRepeat :false,
    songTime:0,
    songVolume:0,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY ))||{},
    songs: [
        {
            name: "Stay",
            singer: "The Kid LAROI, Justin Bieber",
            path: "http://api.mp3.zing.vn/api/streaming/audio/ZUWIB0AW/500",
            image: "https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png"
          },
          {
            name: "Build A Bitch",
            singer: "Bella Poarch",
            path: "./musicStore/Music mp3/BuildABitch-BellaPoarch-7030913.mp3",
            image: "https://cdn.promodj.com/afs/8d11798266856ded1af6c00d402f6e2912:resize:2000x2000:same:904835"
          },
          {
            name: "Inferno",
            singer: "Sub Urban, Bella Poarch",
            path:"./musicStore/Music mp3/Inferno-SubUrbanBellaPoarch-7067204.mp3",
            image: "./musicStore/Music img/inferno.jpg"
          },
          {
            name: "Bad Habits",
            singer: "Ed Sheeran",
            path: "./musicStore/Music mp3/BadHabits-EdSheeran-7037077.mp3",
            image:"https://images.mediabiz.de/s/der-amtliche-hit-des-sommers-20021-in-deutschland-ed-sheerans-bad-habits/newspics/328/463328_1/b2780x1450.jpg"
          },
          {
            name: "Unstoppable",
            singer: "Sia",
            path: "http://api.mp3.zing.vn/api/streaming/audio/ZW7O99BA/500",
            image:"https://i1.sndcdn.com/artworks-yqiiKWS6GVNHnqIi-Zup5hg-t500x500.jpg"
          },
          {
            name: "Dusk Till Dawn",
            singer: "Zayn, Sia",
            path:"http://api.mp3.zing.vn/api/streaming/audio/ZW8I78UO/500",
            image:"https://i.pinimg.com/originals/15/ca/79/15ca797e31e129f1c3f6faab22b00e05.jpg"
          },
          {
            name: "Symphony",
            singer: "Clean Bandit, Zara Larsson",
            path: "http://api.mp3.zing.vn/api/streaming/audio/ZW7FIZWE/500",
            image: "https://i1.sndcdn.com/artworks-hQgO5NdqHxcQeMVP-bIJ3oQ-t500x500.jpg"
          },
          {
            name: "Señorita ",
            singer: "Shawn Mendes, Camila Cabello",
            path: "http://api.mp3.zing.vn/api/streaming/audio/ZWAFDUW0/500",
            image: "https://wetaya.com/wp-content/uploads/2020/03/Shawn-Mendes-Camila-Cabello-Senorita-Q-o-d-%C3%AB-s-Remix.jpg"
          },
          {
            name: "Lost",
            singer: "Maroon 5",
            path: "http://api.mp3.zing.vn/api/streaming/audio/ZU0CA0ZO/500",
            image: "https://musicjinx.com/wp-content/uploads/2021/06/20210616_205334_0000.png"
          },
          {
            name: "Wolves",
            singer: "Selena Gomez, Marshmello",
            path: "http://api.mp3.zing.vn/api/streaming/audio/ZW8WW8FZ/500",
            image: "https://avatar-ex-swe.nixcdn.com/song/2017/10/25/f/3/a/5/1508949700484_640.jpg"
          },
          {
            name: "Rồi tới luôn",
            singer: "Nal",
            path: "https://api.mp3.zing.vn/api/streaming/audio/ZUOZWCUC/500",
            image: "https://i.scdn.co/image/ab67616d0000b2739317ef1fb4bfaf1538ef816e"
          },
          {
            name: "Yêu là cưới",
            singer: "Phát Hồ, X2X",
            path: "https://api.mp3.zing.vn/api/streaming/audio/ZU6IEI66/500",
            image: "https://lyricvn.com/wp-content/uploads/2021/09/49da6a1d6cf13a42e77bc3a945d9dd6b.jpg"
          },
          {
            name: "Em hát ai nghhe",
            singer: "Organe",
            path: "https://api.mp3.zing.vn/api/streaming/audio/ZUU8FEI8/500",
            image: "https://leecoffee.net/wp-content/uploads/2021/08/Em-Hat-Ai-Nghe-Orange.png"
          },
          {
            name: "Hạ còn vương nắng",
            singer: "Datkaa, Kido",
            path: "https://api.mp3.zing.vn/api/streaming/audio/ZOAFBWB0/500",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/d/8/0/1/d801670cd8ecdb89750bdbe8de198021.jpg"
          },
          {
            name: "Chỉ là không cùng nhau",
            singer: "Tăng Phúc, Trương Thảo Nhi",
            path: "https://api.mp3.zing.vn/api/streaming/audio/ZOACFBBU/500",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/1/f/1/a/1f1ab8428a983f8a7700bfaa5591713b.jpg"
          },
          {
            name: "Kẹo bông gòn",
            singer: "H2K, TRUNKY",
            path: "https://api.mp3.zing.vn/api/streaming/audio/ZWEW9WI8/500",
            image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/d/e/9/1/de91f9c8b08e1fb4b35e2b64e1c2ed15.jpg"
          },
          {
            name: "Cafe không đường",
            singer: "G5R Squad",
            path: "https://api.mp3.zing.vn/api/streaming/audio/ZO9ZI68B/500",
            image: "https://photo-zmp3.zadn.vn/cover/2/8/6/f/286f0b4fae2ab3b2a7942968e22bd58f.jpg"
          },
          {
            name: "OK",
            singer: "Binz",
            path: "https://api.mp3.zing.vn/api/streaming/audio/ZWB0U608/500",
            image: "https://i1.sndcdn.com/artworks-fzQd1RhKx01AszrO-KAlQXg-t500x500.jpg"
          }

    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
    },
    renderSong: function(){
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                    <div class="thumb thumb-img" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                            <h3 class="title">${song.name}</h3>
                             <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="favourite fas fa-heart"></i>
                    </div>
                 </div>
                `;
          });
          playlist.innerHTML = htmls.join("");

    },
    handleEvents: function(){
        const _this=this; 
        const cdWidth = cd.offsetWidth;
        const cdHeight =cd.offsetHeight;
        //CD Rotation
        const cdThumbAnimate =cdThumb.animate([
            {transform:'rotate(360deg)'}
        ],
        {
            iterations:Infinity,
            duration:10000
        })
        cdThumbAnimate.pause();
        //Heading animation
        heading.start();
        
        //Scroll view
        document.onscroll = function(){
            var rs=getComputedStyle(r);
            console.log(rs.getPropertyValue('--cd-dim'));
            const scrollTop = window.scrollY||document.documentElement.scrollTop
            const newWidth = cdWidth -scrollTop;
            const scaleRatio=newWidth/cdWidth;
            r.style.setProperty('--cd-dim',newWidth+'px');
            r.style.setProperty('--thumb-dim',Math.floor(newWidth*94/100)+'px');
            r.style.setProperty('--c-width',Math.floor(newWidth*3/100)+'px');
            cd.style.opacity = scaleRatio;
        };     
     //Listen Button Control event  
        playBtn.onclick = function(){
            if(_this.isPlaying) {
                audio.pause();
                }
            else {
                audio.play();
                }
            };

        //Next song on
        nextBtn.onclick =function(){
            autoNextSong();
            _this.scrollToActiveSong();
            
        }
        //Previous song on
        prevBtn.onclick =function(){
            if(_this.isRandom){
                _this.randomMode();
            }
            else {
                _this.prevSong();
            }
            audio.play();
            _this.scrollToActiveSong();
        };
        
        //Random on
        randomBtn.onclick =function(){
            _this.isRandom=!_this.isRandom;
            _this.setConfig('isRandom',_this.isRandom);
            randomBtn.classList.toggle('active',_this.isRandom);
        };
        //Repeat on
        repeatBtn.onclick =function(){
            _this.isRepeat=!_this.isRepeat;
            _this.setConfig('isRepeat',_this.isRepeat);
            repeatBtn.classList.toggle('active',_this.isRepeat);
        }
        //Mute volume
        volumeIcon.onclick =function(){
            audio.volume=0;
            _this.songVolume=audio.volume;
            volumeDisplay();
            volumeIcon.innerHTML='<i class="fas fa-volume-mute"></i>'
        }
        //Auto play next song
        const autoNextSong=()=>{
                if(_this.isRandom)
                     {
                        _this.randomMode();
                    }
                else this.nextSong();
                audio.play();}
        //Handle audio element
        //Load duration instantly 
        audio.onloadeddata = function(){
                _this.songTime=audio.duration.toFixed();
               /*  _this.songVolume=audio.volume*100;  */
                var second=_this.songTime%60;
                endTime.innerHTML =`0${Math.floor(_this.songTime/60)}:${second>9?second:'0'+second}`;
        }
        audio.onplay =function(){
            _this.isPlaying = true;        
            player.classList.add('playing');
            cdThumbAnimate.play();
        };
        audio.onpause =function(){
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };
        audio.ontimeupdate =function(){
                if(audio.duration)
                {
                    const currentProgress =Math.floor(audio.currentTime/audio.duration*100);
                    progress.value = currentProgress;
                    const currentMinute = Math.floor(audio.currentTime/60);
                    const currentSecond =Math.floor(audio.currentTime%60)
                    rangeValue.innerHTML =`0${currentMinute}:${currentSecond>9?currentSecond:'0'+currentSecond}`;
                    startTime.innerHTML =`0${currentMinute}:${currentSecond>9?currentSecond:'0'+currentSecond}`;
                     rangeValue.style.left =currentProgress+'%';
                    var color = 'linear-gradient(90deg, rgb(9, 241, 21)' + progress.value + '% , rgb(214, 214, 214)' + progress.value+ '%)';
                    progress.style.background =color;

                    ///cd Thumb complete percent
                    const percent =currentProgress/100*180;
                    console.log(percent)
                    cdProgressFull.style.transform = `rotate(${percent}deg)`;
                    cdProgressFill.forEach(fillElement=>{
                        fillElement.style.transform = `rotate(${percent}deg)`;
                    });
                    
                    
                }
            };
        audio.onended = function(){
            if(_this.isRepeat) 
            {
                audio.play();
            }
            else
            autoNextSong();
        };
        progress.oninput =function(e){
                var x=0;
                x=e.target.value;
                const seekTime = x/100*audio.duration;
                audio.currentTime = seekTime;
                
        };
        progress.onkeydown= function(e){
            if(e.keyCode===39)
            {
                progress.value ++;
            }
        };
        //Song active at playist
        playlist.onclick= function(e){
            const songNode=e.target.closest('.song:not(.active)');
            const option=e.target.closest('.option');
            const favouriteIndex=Number(e.target.closest('.song').getAttribute('data-index'));          
            
            if(songNode||option)
            {
                
                if(songNode&&!option){
                    const index=songNode.getAttribute('data-index');
                    _this.currentIndex=Number(index);
                    _this.loadAndSave();
                    audio.play();
                }
                if(option){
                    const addFavourite=favouriteArray.includes(favouriteIndex)     
                    if(!addFavourite) favouriteArray.unshift(favouriteIndex)          
                    else {
                        deleteIndex=favouriteArray.indexOf(favouriteIndex)
                        favouriteArray.splice(deleteIndex,1)   
                    }
                    _this.setConfig('favouriteList',favouriteArray)
                    _this.favouriteSave();
                    
                }
            }
        };
        function volumeDisplay(){
            volumeSet.value=_this.songVolume;
            var volumeColor='linear-gradient(90deg, rgb(75, 36, 173)' +_this.songVolume+'%, rgb(214, 214, 214) '+_this.songVolume+'%)';
            volumeSet.style.background=volumeColor;
        };
        //Volume adjustment
        volumeSet.oninput= function(e){
            _this.songVolume=e.target.value;
            audio.volume=_this.songVolume/100;
            volumeDisplay();
            _this.setConfig("volume",_this.songVolume+100); //refresh về 100%
            //reload trang mà âm thanh không reset lại ban đầu (giữ nguyên giá trị lần trước)
            //_this.setConfig("volume",_this.songVolume);
            _this.volumeIconHandle();   
        };

        ///key and mouse handle
        nextBtn.onmousedown = function(){
            nextBtn.classList.add('active');
        };
        nextBtn.onmouseup = function(){
            nextBtn.classList.remove('active');
        };
        prevBtn.onmousedown = function(){
            prevBtn.classList.add('active');
        };
        prevBtn.onmouseup = function(){
            prevBtn.classList.remove('active');
        };
        volumeIcon.onmousedown =function(){
            volumeIcon.classList.add('active');
        }
        volumeIcon.onmouseup =function(){
            volumeIcon.classList.remove('active');
        }

            
        //progress.addEventListener('input',function(){

        //})
        

    },
    loadCurrentSong: function(){
        this.currentSong=this.songs[this.currentIndex];
        heading.textContent =this.currentSong.name +' - '+this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src =this.currentSong.path;
        
    },
    loadAndSave: function(){
        this.setConfig("currentIndex",this.currentIndex);
        this.loadCurrentSong();
        this.renderSong();
        this.favouriteSave();
    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex>=this.songs.length) 
        {
            this.currentIndex=0;
        }
        this.loadAndSave();

    },
    prevSong: function(){
        this.currentIndex -=1;
        if(this.currentIndex<0) 
        {
            this.currentIndex=this.songs.length-1;
        }
        this.loadAndSave();
    },
    randomMode: function(){
        let newIndex;
        do {
            newIndex=Math.floor(Math.random()*this.songs.length)
        }
        while(newIndex===this.currentIndex)
       this.currentIndex=newIndex;
       this.loadAndSave();
    },
    scrollToActiveSong: function(){
        var view='';
        if(this.currentIndex<2) view='end';
        else view='nearest';
        setTimeout(() => {
            $('.song.active').scrollIntoView({
              behavior: "smooth",
              block: view
            });
          }, 300);
        
    },
    volumeIconHandle: function(){
        const volume=this.songVolume;  
        if(volume>50) volumeIcon.innerHTML='<i class="fas fa-volume-up"></i>'
        else {
            if(volume>=5&&volume<=50) volumeIcon.innerHTML='<i class="fas fa-volume-down"></i>'
            else volumeIcon.innerHTML='<i class="fas fa-volume-mute"></i>'
        }     
        
    },
    volumeLoad: function(){
        ///Volume 
        this.songVolume=this.config.volume;
        volumeSet.value=this.songVolume;
        var volumeColor='linear-gradient(90deg, rgb(75, 36, 173)' +this.songVolume+'%, rgb(214, 214, 214) '+this.songVolume+'%)';
        volumeSet.style.background=volumeColor;   
        //Icon
        this.volumeIconHandle();
       
    },
    reloadHandle: function(){ 
        //First load
        if(this.config.currentIndex===undefined)
        {
            this.currentIndex=0;
            this.config.volume=100;
            
            
        }
        else {
            this.currentIndex = this.config.currentIndex;
            this.isRandom=this.config.isRandom;
            this.isRepeat=this.config.isRepeat;
            
            
        }
        if(favouriteArray===undefined) {
            this.config.favouriteList =[];
            favouriteArray =this.config.favouriteList;
        }

        else 
        {
            favouriteArray= this.config.favouriteList;
        }   
            
        randomBtn.classList.toggle('active',this.isRandom);
        repeatBtn.classList.toggle('active',this.isRepeat);
    },
    favouriteSave:function(){ 
        if(favouriteArray!=undefined)
        {
            favouriteArray=this.config.favouriteList;
            const tempIndexArray=[];
            this.songs.map((song,index)=>{
                tempIndexArray.push(index)
            });

                    let difference = tempIndexArray.filter(x => !favouriteArray.includes(x));
                    favouriteArray.map(favIndex=>{
                
                                const favouriteSong=$(`[data-index=\'${favIndex}\'] .favourite`)
                                favouriteSong.classList.add('active');    

                    });
                    difference.map(favIndex=>{
                
                        const favouriteSong=$(`[data-index=\'${favIndex}\'] .favourite`)
                        favouriteSong.classList.remove('active');  
                
        });}
    }
    ,
    favouriteHandle:function(){
        const _this1=this;
        const favHtmls=favouriteArray.map(index=>{
        
                return `<div class='fav' index=${index}>
                <img src='Assets/lovesong.png'>  
                ${this.songs[index].name} - ${this.songs[index].singer}
                </div>`
            
        })
        favouriteSongList.innerHTML=favHtmls.join('');
        const favChoosen=$$('.fav');
        favChoosen.forEach(favSong=>{
            const favSongIndex=Number(favSong.getAttribute('index'))
            favSong.onclick=function(){
                _this1.currentIndex=favSongIndex;
                _this1.loadAndSave();
                audio.play();
            }
        })
    },
    /* menuHandle: function() {

        const __this=this;
        btnMenu.onclick=function(){
            __this.favouriteHandle();
            btnMenu.classList.toggle('close');
            if(favouriteArray.length!==0)
                {
                    favouriteSongList.classList.toggle('active');}
        };
        window.onclick=function(event){
            if(!event.target.matches('.menuBtn')&&!event.target.matches('.line')){
                btnMenu.classList.remove('close');
                favouriteSongList.classList.remove('active'); 
            }
        }

    }, */
    start: function(){
        this.reloadHandle();
        this.volumeLoad();
        this.reloadHandle();
        this.loadAndSave();
        this.handleEvents();
        /* this.menuHandle(); */
             
    }
}
app.start();