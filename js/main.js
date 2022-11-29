let app = new Vue({
    el: '.main',
    data: {
        showMain: true,
        showSocial: false,
        showResults: false,
        showAchievements: false,
        showQuestions: false,
    score: {
        'taldarim': 0,
        'zerg': 0,
        'protoss': 0,
        'terran': 0,
        'primal': 0,
    },
    totalGame: localStorage.getItem('sc2TotalGame') ? JSON.parse(localStorage.
    getItem('sc2TotalGame')) : {  //Количество игр за каждую расу
        'taldarim': 0,
        'zerg': 0,
        'protoss': 0,
        'terran': 0,  // сколько раз мы открыли тот или иной результат
        'primal': 0,
        'hybrid': 0,
        'infested': 0,
    },
    //Количество сыгранных матчей
    totalGames: localStorage.getItem('sc2TotalGames') ? localStorage.getItem('sc2TotalGames') : 0,
    questions: questions, // из const.js
    results: results, 
    resultRace: 'infested',
    number: 0,
},
    methods: { 
        goToMain() { 
            this.showMain = true
            this.showSocial = false
            this.showResults = false
            this.showAchievements = false
            this.showQuestions = false
        },
        goToSocial() {
            this.showMain = false
            this.showSocial = true
            this.showResults = false
            this.showAchievements = false
            this.showQuestions = false
        },
        goToAchievements() { 
            if (this.totalGames > 0) {
                this.showMain = false
                this.showSocial = false
                this.showResults = false
                this.showAchievements = true
                this.showQuestions = false
            } else {
                this.goToQuestions()
            }
        },
        goToQuestions() {
            this.score = {
            'taldarim': 0,
            'zerg': 0,
            'protoss': 0,
            'terran': 0,
            'primal': 0,
            }
                this.showMain = false
                this.showSocial = false
                this.showResults = false
                this.showAchievements = false
                this.showQuestions = true
        },
        goToResults(race) { 
                this.showMain = false
                this.showSocial = false
                this.showResults = true
                this.showAchievements = false
                this.showQuestions = false
                this.resultRace = race
        },
        nextQuestion(answer) {
            if (this.number == 24) {
                this.number = 0
                this.endGame();
            } else {
                this.number++
            }
            eval(answer)
        },
        endGame() { 
            this.totalGames++
            localStorage.setItem('sc2TotalGames',this.totalGames)
            // Зерг
            if (this.score.zerg > this.score.protoss && this.score.zerg > this.score.terran && 
            this.score.primal < 8 && Math.abs(this.score.protoss - this.score.zerg) > 3) {
                this.goToResults('zerg');
                this.totalGame.zerg++;
            }
            // Изначальный Зерг
            else if (this.score.primal > this.score.protoss && this.score.primal > this.score.terran && 
            this.score.primal == 8 ) {
                this.goToResults('primal');
                this.totalGames.primal++;
            }
            // Протосс
            else if (this.score.protoss > this.score.zerg && this.score.protoss > this.score.terran && 
            this.score.taldarim < 5 && 
            Math.abs(this.score.protoss - this.score.zerg) > 3) {
                this.goToResults('protoss');
                this.totalGame.protoss++;
            }
            // Терран
            else if (this.score.terran > this.score.zerg && this.score.terran > this.score.protoss ) {
                this.goToResults('terran');
                this.totalGame.terran++;
            } 
            //Талдарим
            else if (this.score.protoss > this.score.zerg && this.score.protoss > this.score.terran && 
            this.score.taldarim == 5) {
                this.goToResults('taldarim');
                this.totalGame.taldarim++;  
            }
            //Гибрид
            else if (Math.abs(this.score.protoss - this.score.zerg) <= 3) {
                this.goToResults('hybrid');
                this.totalGame.hybrid++;
            }
            // Зараженный терран
            else {
                this.goToResults('infested');
                this.totalGame.infested++;
            }
            localStorage.setItem('sc2TotalGame', JSON.stringify(this.totalGame))
        }
    }, 
        computed: {
            totalScore() {
                let score = 0
                for (let i in this.totalGame) { 
                    score+=this.totalGame[i]*results[i].points
                }
                return score
            },
            openRace() {
                let open = 0
                for (let i in this.totalGame) { 
                if (this.totalGame[i] > 0) open++
                }
                return open
        }, 
            favoriteRace() {
                let max = 'zerg'
                for (let i in this.totalGame) {
                    if (this.totalGame[i] > this.totalGame[max]) 
                    max=i
                }
                return results[max].name
            },
            showResultRace() {
                return {
                    'zerg': this.totalGame.zerg > 0 ? true : false,
                    'primal': this.totalGame.primal > 0 ? true : false,
                    'terran': this.totalGame.terran > 0 ? true : false,
                    'infested': this.totalGame.infested > 0 ? true : false,
                    'protoss': this.totalGame.protoss > 0 ? true : false,
                    'taldarim': this.totalGame.taldarim > 0 ? true : false,
                    'hybrid': this.totalGame.hybrid > 0 ? true : false
                }
            }        
    },
})

                    let audio = new Audio('audio/soundtrack.mp3')    
                    let btn__sound = document.querySelector('.btn__sound')
                    let audioicon = document.querySelector('.btn__sound i')

                    audio.muted = true
                    audio.autoplay = true 
                    audio.volume = 0.2
                    
                    audio.addEventListener('loadmetadata', function() {
                        audio.currentTime = 0 + Math.random() * (audio.duration + 1 - 0)
                    })

                    btn__sound.addEventListener('click', function() {
                        if (audio.muted) { 
                            audio.muted = false
                            audioicon.classList.add('fa-volume-up')
                        } else if (!audio.muted) {
                            audio.muted = true
                            audioicon.classList.add('fa-volume-off')
                            audioicon.classList.remove('fa-volume-up')
                        }
                    })
