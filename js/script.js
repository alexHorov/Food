'use strict';
window.addEventListener('DOMContentLoaded', () => {


    // TABS
    const tabs = document.querySelectorAll('.tabheader__items'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    console.log(tabsContent);
    console.log(tabsParent);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            tabsContent.forEach(item => {
                item.style.display = 'none';
                // item.classList.add('hide');
                // item.classList.remove('show', 'fade');

            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');

            });

        }

        function showTabContent(i = 0) {
            tabsContent[i].style.display = 'block';
            // tabsContent[i].classList.add('show', 'fade');
            // tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();
        tabParent.addEventListener('click', (event) => {
            let target = event.target;

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }

                });
            }
        });

    });



    // TIMER 

    const deadline = "2021-12-31";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // тут мы получем  разницу в милисекундах сколько отсалось до конца времени
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);


        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setCloсk(selector, endtime) { // устанавливаем часы на сайте
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime); //сюда возвращает обект из return кторый в функции getTimeRemaining

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setCloсk('.timer', deadline);

    //// Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');


    function showModal() {
        // modal.style.display = 'block';
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // не дает странице прокручиваться
        clearInterval(modalTimerId); //  если пользователь уже открывал модальное окно что бы оно больше не срабатывалию
    }

    function hideModal() {
        // modal.style.display = 'none';
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener("click", showModal);
    });

    modalCloseBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modal) {
            hideModal();
        };
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        };

    });
    const modalTimerId = setTimeout(showModal, 2000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});