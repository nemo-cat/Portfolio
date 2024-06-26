$(document).ready(function()
{   
    //header nav클릭시 해당 섹션으로 이동
    $('header nav ul li a').click(function(e)
    {
        let target = $(this).attr('href'); // 클릭한 링크의 href 속성값(타겟 섹션의 ID) 가져오기
        let offset = $(target).offset().top - 100; // 타겟 섹션의 상단 위치(offset) 계산 (-100px 추가)
        $('html, body').animate({scrollTop: offset}, 300); // 해당 섹션으로 스크롤 이동 (400ms 동안)
    });

    /* visual 텍스트 타이핑 효과 */
    let text = ['안녕하세요','Hello','Hola','こんにちは','Bonjour','Namaste']; //타이핑할 텍스트
    let textIndex = 0; // 현재 타이핑된 글자의 인덱스
    let typingIdx = 0; // 현재 타이핑 중인 텍스트 배열의 인덱스
    let arryLength = text.length; // 베열의 길이를 담는 변수
    let del = -1; // 텍스트 삭제를 위한 인덱스
    let tyInt = 0; //타이핑 인터벌을 관리하는 변수
    
    let typingTxt = text[textIndex];  // 타이핑할 텍스트를 가져옴 
    typingTxt = typingTxt.split(""); // 텍스트를 한글자씩 자름 ex(안,녕,하,세,요)
    tyInt = setInterval(typing, 200); // 첫번재 반복동작 

    function typing()
    { 
        // 타이핑할 텍스트의 길이만큼 실행
        if(typingIdx < typingTxt.length)
        { 
            // .typing에 한글자씩 글자를 추가해준다.
            $('.typing').append(typingTxt[typingIdx]);
            typingIdx++;

            // 타이핑이 끝나면
            if(typingIdx == typingTxt.length)
            {
                clearInterval(tyInt); //첫번째 단어가 끝나면 잠시 멈춤
                setTimeout(function()
                    {
                        tyInt = setInterval(typing, 200); // 글자 삭제를 위해 다시 실행
                    },1000);
            }
        }
        else
        { 
            // 한 문장이 끝나면, 뒤에서부터 한 글자씩 삭제해야함
            // del이 지워야할 길이보다 크거나 같을때까지 실행
            if( -typingTxt.length <= del )
            {
                //뒤에서 한글자씩 지운다. slice(시작인덱스, 종료인덱스) 종료값은 포함x
                $('.typing').html(typingTxt.slice(0, del))
                del--;
            }
            else
            {
                // 배열의 길이만큼 돌았으면 textIndex초기화
                if (textIndex >= arryLength-1 )
                {
                    textIndex = 0;
                }
                else
                {   // 다음 문장 실행
                    textIndex++;
                }
                //변수초기화 
                typingIdx=0;
                del= -1;
                typingTxt = text[textIndex];
                //0.5초후 다음문장 타이핑 
                clearInterval(tyInt);
                setTimeout(function()
                {
                    tyInt = setInterval(typing, 200);
                }, 500);
           }
        } 
    }  

    $('.listMore').hide();
    //works누르면 상세 화면 나옴
    let index = 0;//몇번째 work를 눌렀는지 저장하는 변수
    $('.portfolio .list li').on('click',function()
    {
        index = $(this).index(); 
        //해당하는 상세화면이 나오게함
        $('.portfolio .listMore').show();
        $('.portfolio .moreItem > li').eq(index).addClass('active');
        $('body').css('overflow','hidden');

        // searchBox 주소 변경
        let adress = $(this).find('h3').text();
        changeAdress(adress);
    })
    
    //listMore 주소창 주소 변경
    function changeAdress(adress)
    {
        $('.portfolio .searchBox').html(`https://wwww.${adress}.sr`); 
    }

    //닫기 버튼 누르면 상세화면 사라짐
    $('.close').on('click', function()
    {
        $('.listMore').hide();
        $('.moreItem > li').removeClass('active');
        $('body').css('overflow-y','visible');
    })

    //listMore imgBox에서 mouseleave되면 img top(0)으로 감
    $('.listMore .imgBox').mouseleave(function()
    {
        $(this).scrollTop(0);
    })

    //디자인 스와이퍼
    let designSwiper = new Swiper('.design-swiper',
    {
        direction : 'horizontal',
        loop: true,
        autoplay : { delay: 3000 },
        speed: 300,
        breakpoints:
        {
            320:
            {
                spaceBetween: 10,
                slidesPerView: 1,  
            },
            768:
            {
                spaceBetween: 20,
                slidesPerView: 2,  
            },
            1024:
            {
                spaceBetween : 20, 
                slidesPerView : 3, 
            },
        }
    });

    //desgin 포토샵, 일러스트로 작업한것은 modal창으로 보여줌
    $('.design-swiper .modalOpen').on('click',function()
    {
        // 해당 id값 가져오기
        index = $(this).attr('id');
        //해당하는 상세화면이 나오게함
        $('.design .listMore').show();
        $('.design .moreItem > li').removeClass('active');
        $('.'+index).addClass('active');
        $('body').css('overflow','hidden');
    })

    //design listMore img에서 mouseleave되면 scroll top(0)으로 감
    $('.design .listMore img').mouseleave(function()
    {
        $('.design .listMore ul li').scrollTop(0);
    })


    //footer Img 변경
    let footerImg = $('footer .imgBox img').attr('src'); //기존 경로 저장
    
    $('footer .mail').mouseenter(function()
    {
      $('footer .imgBox img').attr('src','images/footer/loopyMail.webp'); 
    })

    $('footer .phone').mouseenter(function()
    {
      $('footer .imgBox img').attr('src','images/footer/loopyPhone.webp'); 
    })
    
    $('footer .contactBox div').mouseleave(function()
    {
      $('footer .imgBox img').attr('src',footerImg); 
    })


    /* =========== GSAP 애니메이션 =========== */
    gsap.registerPlugin(ScrollTrigger);

    //About
    gsap.timeline({
        scrollTrigger: {
            trigger: '.visual',
            start: '90% 80%',
            scrub: 1,
        }
    })
    .from('.about', {
        y: 1000,
        duration: 5,
    })
    .from('.about .inner', {
        opacity: 0,
        duration: 5
    },3)

    //portfolio 글자 애니메이션 (좌우에서 나옴)
    gsap.timeline({
        scrollTrigger: {
            trigger: '.portfolio',
            start: '0%, 100%',
            end: '0% 20%',
            scrub: 1,
        }
    })
    .to('.portfolio h2', {
        color: '#8785A2',
    })
    .fromTo('.portfolio h2 .a',
        {x: '-100%'},
        {x:'0%', ease:'none', duration:5,}
    ,0)
    .fromTo('.portfolio h2 .b',
        {x: '100%'},
        {x:'0%', ease:'none', duration:5,}
    ,0)
 
    //portfolio 글씨 가운데에 고정됨
    gsap.timeline({
            scrollTrigger: {
                trigger: '.portfolio h2',
                start: 'center 100%',
                end: '0% 100%', //시작과 동시에 애니메이션 종료
                scrub: 1,
            }
    })
    .to('.portfolio h2', {
        position: 'fixed',
        ease:'none',
        left:'0',
        top:'0',
        width:'100%',
        duration: 5
    },0)
    .to('.portfolio h2', {
        color: '#FFC7C7',
    })
    //portfolio list에 margin-top을 적용해서 애니메이션을 자연스럽게 함
    .fromTo('.portfolio .list',
        { margin: '0 auto'},
        { margin: '100vh auto 0', position: 'relative', zIndex: '10', duration: 1}
    ,0)

    //portfolio list가 끝날때 고정되어있던 글자가 화면 밖으로 사라짐
    gsap.timeline({
        scrollTrigger: {
            trigger: '.portfolio .list',
            start: '80% bottom',
            end: '100% 50%',
            scrub: 1,
        }
    })
    .to('.portfolio h2', {
        color: '#8785A2',
    })
    .to('.portfolio h2 .a', {
        x:'-100%',
        ease:'none',
        duration:5
    },0)
    .to('.portfolio h2 .b', {
        x:'100%',
        ease:'none',
        duration:5
    },0)

    // Design
    gsap.timeline({
        scrollTrigger: {
            trigger: '.portfolio',
            start: 'bottom bottom',
            end: 'bottom bottom',
            scrub: 1,
        }
    })
    .from('.design h2', {
        yPercent: 200,
        duration: 5,
    })
    .from('.design-swiper', {
        opacity: 0,
        duration: 5
    })
})