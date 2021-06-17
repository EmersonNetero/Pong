function VisualElm(div) {
    let top = 4
    let left = 6
    return {
        get top() {
            return top
        },
        set top(v) {
            top = v
            div.style.top = top * 10 + 'px'
        },
        get left() {
            return left        },
        set left(v) {
            left = v
            div.style.left = left * 10 + 'px'
        }
    }	
}
function Ball(){
    let ball = VisualElm(document.querySelector('.ball'))
    let vspeed = 1
    let hspeed = 1
    let cont_goals1 = 0
    let cont_goals2 = 0
    let freeze = false

    ball.goal = (x) => {
        if (x == 1)cont_goals1 += 1; document.querySelector('.player1').innerHTML = cont_goals1;
        if (x == 2)cont_goals2 += 1; document.querySelector('.player2').innerHTML = cont_goals2
    }
    function goal(player) {
        ball.goal(player)
        freeze = true
        setTimeout(()=> {
            ball.start()
        }, 2000)	
    }
    ball.tick = () => {
        if(!freeze) {
            ball.top += vspeed
            ball.left += hspeed
            if(ball.top >= 39 || ball.top <= 0) vspeed *= -1
            if(ball.left >= 79) {
                goal(1)
            }
            if(ball.left <= 0) {
                goal(2)
                    
            }

        }
        
    }
    ball.start = () => {
        ball.top = 10 + (Math.random()*20)
        ball.left = 39.5
        freeze = false
        vspeed = (Math.random()*2) -1
        hspeed = (Math.random()>0.5 ? 1 : -1)

    }
    ball.collision = (player) => {
        hspeed = (player.number==1 ? 1 : -1) * Math.abs(hspeed) * 1.05
        vspeed = (ball.top +0.5 - player.top - 4)/2
    }
    ball.start()
    return ball	
}

function Player(number, auto=true) {
    let player = VisualElm(document.querySelector('.p'+number))
    let vspeed = 0
    player.number = number
    player.testCollision = (ball) => {
        if(ball.left > player.left-1 && ball.left < player.left + 1) 
        {
            if (ball.top > player.top-1 && ball.top < player.top + 8) {
                ball.collision(player)
            }
        }
    }
    player.tick = (ball) => {
        if(auto){
            if (ball.top > player.top+3.5) {
                vspeed = 1
            }
            if (ball.top < player.top+3.5) {
                vspeed = -1
            }
        }
        player.top += vspeed
        if (player.top < 0) player.top = 0
        if (player.top > 32) player.top = 32
        player.testCollision(ball)
    }
    if(!auto) {

        window.addEventListener('keydown', ev => {
            if(ev.key == 'ArrowUp') {
                vspeed = -1
            }
            if(ev.key == 'ArrowDown') vspeed = 1
        })
        window.addEventListener('keyup', ev => {
            if(ev.key == 'ArrowUp' || ev.key == 'ArrowDown') vspeed = 0
        })
    }
    return player
}


let ball = Ball()        
let player1 = Player('1', auto=false)
let player2 = Player('2')

player1.left = 1
player2.left = 78


setInterval(()=> {
    ball.tick()
    player1.tick(ball)
    player2.tick(ball)	
}, 50) 