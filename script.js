const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits(){

    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );

}

function renderHabits(){

    habitList.innerHTML = "";

    habits.forEach((habit,index)=>{

        const card=document.createElement("div");

        card.className="habit";

        let daysHTML="";

        for(let i=1;i<=30;i++){

            daysHTML+=`
                <div
                    class="day ${habit.days.includes(i)?"completed":""}"
                    onclick="toggleDay(${index},${i})">

                    ${i}

                </div>
            `;

        }

        card.innerHTML=`

            <div class="habit-header">

                <h2>${habit.name}</h2>

                <button
                    class="delete-btn"
                    onclick="deleteHabit(${index})">

                    Delete

                </button>

            </div>

            <div class="calendar">

                ${daysHTML}

            </div>

            <div class="streak">

                Current Streak :
                ${calculateStreak(habit.days)} Days

            </div>

        `;

        habitList.appendChild(card);

    });

}

addBtn.addEventListener("click",()=>{

    const name=habitInput.value.trim();

    if(name==="") return;

    habits.push({

        name:name,

        days:[]

    });

    saveHabits();

    renderHabits();

    habitInput.value="";

});

habitInput.addEventListener("keypress",e=>{

    if(e.key==="Enter"){

        addBtn.click();

    }

});

function toggleDay(habitIndex,day){

    const habit=habits[habitIndex];

    if(habit.days.includes(day)){

        habit.days=
        habit.days.filter(d=>d!==day);

    }

    else{

        habit.days.push(day);

        habit.days.sort((a,b)=>a-b);

    }

    saveHabits();

    renderHabits();

}

function deleteHabit(index){

    if(!confirm("Delete this habit?")) return;

    habits.splice(index,1);

    saveHabits();

    renderHabits();

}

function calculateStreak(days){

    if(days.length===0) return 0;

    let streak=1;

    let max=1;

    for(let i=1;i<days.length;i++){

        if(days[i]===days[i-1]+1){

            streak++;

        }

        else{

            streak=1;

        }

        if(streak>max){

            max=streak;

        }

    }

    return max;

}

renderHabits();