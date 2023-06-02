const shadow = document.querySelector(".shadow")
const popapp = document.querySelector(".popapp")
const tasks = document.querySelector(".t")

const addPlan = document.querySelector(".addPlan")
const removePlan = document.querySelector(".removePlan")
const addElement = document.querySelector(".add")
const crest = document.querySelector(".crest")
const login = document.querySelector('.login')
const register = document.querySelector('.register')

const password = document.querySelector('.password')
const username = document.querySelector('.username')
const name = document.querySelector(".name")
const n = document.querySelector('.n')
const colorD = document.querySelector(".colorD")

const hours = document.querySelectorAll(".hourPol")

const hour1 = document.querySelector('.hour1')

const t = document.querySelector('.t')

log = ''
id = [0]
taskDay = []

// if(log == false){
//     window.location.href = '/login.html';
// }

async function uploadingTasks(){
    tas = await eel.uploadingTasks()();
    console.log(tas.length);
    for(let i = 0; i < tas.length; i++){
        let name = tas[i][1]
        let rgb = tas[i][2]
        let col = tas[i][3]
        let row = tas[i][4]
        let idTas = tas[i][0]
        let len = tas[i][5]

        idd = id[id.length - 1] + 1
        id.push(idTas)

        rgb = rgb.split(' ')

        left = (2.6 * (col - 1) - 1) + (135 * (col - 1) - 1)
        top2 = 100 * (row) + 9  
        addNoBase(idd,name, rgb, top2, left, len)
    }

}

uploadingTasks()

function swapShadow(){
    shadow.classList.toggle('shado')
    popapp.classList.toggle('shado')
}

len = 0
col = 0
row = 0
olor = 0
nametask = 0

function addelem(){
    len = n.value
    olor = colorD.value
    nametask = name.value

    if(!nametask){
        nametask = 'task'
    }
    if(!len){
        len = 1
    }else if(len > 24){
        len = 1 
    }

    swapShadow()
    setTimeout(() => {
        adde()
    }, 200);
    
}

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

async function addToBase(id,name, color, col, row, len) {
    await eel.addToBase(id,name, color, col, row, len)();
}

function addNoBase(id,nametask, rgb, top2, left, len){
    rgb = Object.values(rgb)
    t.insertAdjacentHTML("afterbegin",`<div id="t${id}" class="dayTask3 dayTask" style="
        position:absolute; 
        width: ${len * 140}px;
        top: ${top2}px; 
        left: ${left}px;
        display:flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 700;
        color: rgb(${rgb[0]},${rgb[1]},${rgb[2]}, 0.9);
        background-color: rgb(${rgb[0]},${rgb[1]},${rgb[2]}, 0.3);
        ">${nametask}</div>`)

    e = document.querySelector(`#t${id}`)
    taskDay.push(e)
}

function add(row,col,nametask,olor, len) {
    i = id[id.length-1] + 1
    id.push(i)

    left = (2.6 * (col - 1) - 1) + (135 * (col - 1) - 1)
    top2 = 100 * (row) + 9

    rgb = hexToRgb(olor)
    rgb = Object.values(rgb)

    if(row != false){
        addNoBase(i,nametask, rgb, top2, left, len)

        addToBase(i,nametask, rgb, col, row, len)
    }
}

function getRow(event){
    x = event.pageX
    y = event.pageY

    row = 0

    row = (y - 150) / 100

    if(String(row)[2] >= 7 && String(row)[2] <= 9){
        row = false
    }else{
        row = String(row)[0]
    }
    return row
}


function getCol(){
    hours.forEach(h => {
        h.classList.add('active')
    })
    hours.forEach(hour => {
        hour.addEventListener('click', (event)=>{
            if(event.target.classList[2] == 'active'){
                col = event.target.classList[1]

                setTimeout(() => {
                    add(row,col,nametask,olor, len)
                }, 50);

                hours.forEach(h => {
                    h.classList.remove('active')
                })
            }
        }, { once: true })
    });
}


function adde(){
    c = getCol()

    document.addEventListener('click', (event)=>{
        r = getRow(event)
    }, { once: true });
}

async function removeBase(i){
    console.log(i);
    await eel.remove(i)
}


function removeTask() {
    taskDay.forEach(e => {
        e.classList.add('active')
        e.addEventListener('click', (event)=>{
            if(e.classList[2] == 'active'){
                ad = event.target
                ad.remove()
                removeBase(ad.id)
            }

            taskDay.forEach(a => {
                a.classList.remove('active')
            });
            
        }, { once: true })
    });
}

// async function loginF(){
//     log = await eel.login(username.value, password.value)()
//     console.log(log)   
// }

// async function registerF(){
//     a = await eel.register(username.value, password.value)();
//     console.log(a);
// }


// login.addEventListener('click', loginF)
// register.addEventListener('click', registerF)

removePlan.addEventListener('click', removeTask)
addPlan.addEventListener('click',swapShadow)
shadow.addEventListener('click', swapShadow)
crest.addEventListener('click', swapShadow)
addElement.addEventListener('click', addelem)