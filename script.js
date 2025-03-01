let users = [];

// عند تحميل الصفحة، تأكد من أن زر "بدء القرعة" مخفي
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startDraw").classList.add("hidden");
});

// إضافة المستخدم إلى القائمة
function addUser() {
    let username = document.getElementById("username").value.trim();
    if (username && !users.includes(username)) {
        users.push(username);
        updateUserList();
        document.getElementById("username").value = ""; // مسح الحقل بعد الإضافة
    }
}

// تحديث قائمة المستخدمين
function updateUserList() {
    let list = document.getElementById("userList");
    list.innerHTML = "";
    users.forEach(user => {
        let li = document.createElement("li");
        li.textContent = user;
        list.appendChild(li);
    });
}

// التحقق من كلمة مرور المطور وإظهار زر القرعة
function checkAdmin() {
    let pass = document.getElementById("adminPass").value;
    if (pass === "1234") { // غيّر كلمة المرور لما تريد
        document.getElementById("startDraw").classList.remove("hidden");
    } else {
        alert("كلمة المرور غير صحيحة!");
    }
}

// بدء قرعة المجموعات
function startDraw() {
    let groupCount = parseInt(document.getElementById("groupCount").value);
    if (users.length < groupCount) {
        alert("عدد المشاركين أقل من عدد المجموعات!");
        return;
    }

    let shuffledUsers = users.sort(() => Math.random() - 0.5);
    let groups = Array.from({ length: groupCount }, () => []);

    shuffledUsers.forEach((user, index) => {
        groups[index % groupCount].push(user);
    });

    displayGroups(groups);
}

// عرض المجموعات
function displayGroups(groups) {
    let resultDiv = document.getElementById("groups");
    resultDiv.innerHTML = "";
    
    groups.forEach((group, index) => {
        let div = document.createElement("div");
        div.classList.add("group");
        div.innerHTML = `<h3>المجموعة ${index + 1}:</h3><p>${group.join(", ")}</p>`;
        resultDiv.appendChild(div);
    });
}

