import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove
 } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-97407-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const refInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("del-btn")



function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(refInDB, function(snapshot){
    const snapshotExists = snapshot.exists()
    if(snapshotExists){
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }

})

delBtn.addEventListener("dblclick", function(){
    remove(refInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function(){
    push(refInDB, inputEl.value)
    inputEl.value = ""
})



