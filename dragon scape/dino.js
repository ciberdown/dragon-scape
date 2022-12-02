let itterationCount = 0;
let score = 0;
let gameStarted = false;
let dragonTop = stringToNumber(window.getComputedStyle(document.getElementById('dragon')).top)//180
let getTreeHeight = window.getComputedStyle(document.getElementById('tree')).height//'17px'
function setHeight(id = 'tree',height = '20px'){
    document.getElementById(id).style.height = height;
    document.getElementById(id).style.width = height;
}
function start(){
    gameStarted = true;
    document.getElementById("notif").classList.add('hidden');
    if(document.getElementById('tree').classList.contains('fieldColor')){
        document.location.reload();
    }
    document.getElementById('tree').classList.add('treesMoving');
    document.getElementById('tree').classList.remove('fieldColor');
    document.getElementById('tree').style.right = 0;
    setInterval(()=>{//check to match feild
        let treePos = document.getElementById('tree').getBoundingClientRect();//current position
        let dragonPos = document.getElementById('dragon').getBoundingClientRect();//current position
        if(treePos.left<dragonPos.right && treePos.right>dragonPos.left && dragonPos.bottom > dragonTop){
            document.getElementById('tree').classList.remove('treesMoving');
            document.getElementById('tree').style.left = (dragonPos.right-10)+'px';
            document.getElementById('tree').classList.add('fieldColor');
            document.getElementById('dragon').classList.add('fieldColor');
            setHeight('tree','50px');
            setHeight('dragon','60px');
            gameStarted = false;
            document.getElementById("notif").classList.remove('hidden');
            document.getElementById('notif').innerText = "Game failed!";
        }
    }, timeout=50);
}
function jumpfunc(){
    document.getElementById('dragon').classList.add('dragonJump');
    setTimeout(()=>{document.getElementById('dragon').classList.remove('dragonJump')}, timeout=1000);
}
function stringToNumber(str){
    if(typeof str ==='string')
        return parseInt(str.replace(/[^0-9]/g,''))
    else
        return str
}
document.getElementById("body").addEventListener('keydown',(e)=>{
    if(e.code.slice(3) === 'W'){
        jumpfunc();
    }
    else if(e.code === 'Space'){
        start();
    }
})

function getPosition(){
    let treePos = document.getElementById('tree').getBoundingClientRect();
    let dragonPos = document.getElementById('dragon').getBoundingClientRect();
    console.log(treePos)
}

document.getElementById('tree').addEventListener('animationiteration',()=>{//after each itteration call this function
    if(gameStarted){
        setHeight('tree',Math.floor(Math.random()*7)+23+'px');//change tree size between(23px,30px)
        itterationCount ++;
        if(itterationCount > 100){//speed up
            document.getElementById('tree').style.animationDuration = '1s';
            score = score + (itterationCount*30);
        }else if(itterationCount > 60){
            document.getElementById('tree').style.animationDuration = '1.6s';
            score = score + (itterationCount*20);
        }else if(itterationCount > 20){
            document.getElementById('tree').style.animationDuration = '2.1s';
            score = score + (itterationCount*10);
        }else if(itterationCount > 10){
            document.getElementById('tree').style.animationDuration = '2.5s';
            score = score + (itterationCount*5);
        }else if(itterationCount > 1){
            document.getElementById('tree').style.animationDuration = '3s';
            score = score + (itterationCount*2);
        }else{
            score = score + (itterationCount*2);
        }
        document.getElementById('currentScore').innerHTML = 'score: '+ score;
    }
})
