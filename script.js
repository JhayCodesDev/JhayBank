'use strict'
// This is index.html styling
const firstVisit = document.querySelector(".first-visit");
const firstIntro = document.querySelector(".first-intro");
const LogInForm = document.querySelector(".login");
const signUpForm = document.querySelector(".sign-up");
const mainNav = document.querySelector(".main-nav-links")
const userFname = document.querySelector(".fname");
const mainUser = document.querySelector(".user--name");
const mainPass = document.querySelector(".user--pin");
const existingUser = document.querySelector(".existing-user--name");
const existingPass = document.querySelector(".existing-user--pin")
const passView = document.querySelectorAll(".pass-view");
const btnSignUp = document.querySelector(".btn-sign-up");
const btnLogIn = document.querySelector(".btn-log-in");
const openAccount = document.querySelector(".open--account");
const LogIn = document.querySelector(".log--in");
const mainPageContent = document.querySelector(".main-page-content");
const controlSlide = document.querySelectorAll("[data-slide]");
const allOperationsSlide = document.querySelectorAll(".slide");
const testimonialSlider = document.querySelector(".t-slider");
const controlTestimonialSlides = document.querySelectorAll("[data-t_slides]");
const allTestimonailDot = document.querySelectorAll(".btn-dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");


/// hide all form if there's an open account && login
if(openAccount && LogIn){
  const form1 = signUpForm.querySelectorAll("input");
  const form2 = LogInForm.querySelectorAll("input");


  // initial state of the forms in first visit
  signUpForm.classList.add("hide-content");
  LogInForm.classList.add("hide-content");
  mainPageContent.style.display = "none";

  form1.forEach(i => i.disabled = true);
  form2.forEach(i => i.disabled = true);

  //displaying form and making input required to be false
  function showForm(form, inputs) {
    form.classList.remove("hide-content");
    form.classList.add("drop-bounce");
    inputs.forEach(input => input.disabled = false);
  }

  //hide form and make input required to be true
  function hideForm(form, inputs) {
    form.classList.add("hide-content");
    form.classList.remove("drop-bounce");
    inputs.forEach(input => {
      input.disabled = true;
      input.value = "";
    });
  }

  // Open Account button
  openAccount.addEventListener("click", () => {
    showForm(signUpForm, form1);
    hideForm(LogInForm, form2);

    openAccount.disabled = false;
    LogIn.disabled = true;
  });

  // Login button
  LogIn.addEventListener("click", () => {
    showForm(LogInForm, form2);
    hideForm(signUpForm, form1);

    LogIn.disabled = false;
    openAccount.disabled = true;
  });

  // Sign Up submission 
  btnSignUp.addEventListener("click", e => {
    e.preventDefault();
      const firstname = userFname.value;
      const username = mainUser.value;
      const password = mainPass.value;
      const newUser = {firstname, username, password}

      const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];

      storedUsers.push(newUser);

      localStorage.setItem("Users", JSON.stringify(storedUsers))

    // Check all inputs filled
    let valid = true;
    form1.forEach(input => {
      if (input.value.trim() === "") valid = false;
    });

    if (!valid) {
      alert("Please fill in all fields");
      return;
    }

    // Hide form and hide main content for user to login
    hideForm(signUpForm, form1);
    mainPageContent.style.display = "none";

    openAccount.disabled = false;
    LogIn.disabled = false;
  })

  //Login submission
  btnLogIn.addEventListener("click", e => {
    e.preventDefault();

    // check if inputs are empty
    if (existingUser.value.trim() === "" || existingPass.value.trim() === "") {
      alert("Please enter username and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("Users")) || [];

    const foundUser = users.find(user =>
      user.username === existingUser.value &&
      user.password === existingPass.value
    );

    if (foundUser) {

      LogInForm.classList.add("hide-content");

      LogIn.disabled = false;
      openAccount.disabled = false;

      mainPageContent.style.display = "block";
      firstVisit.style.display = "none";

    } else {
      alert("Incorrect Username or Password");
      existingUser.value = "";
      existingPass.value = ""
    }
  });
}

///// password type change and icon toggle for index.html page
if(passView && openAccount && LogIn){
  passView.forEach(pass => {
  pass.addEventListener("click", function(e){
    e.preventDefault();
    const span = document.querySelectorAll(".password")

    span.forEach(val => {
      const input = val.querySelector("input");
      if(input.type === "password"){
        pass.classList.toggle("bi-eye-lash")
        input.type = "text"
      }
      else if(input.type === "text"){
        pass.classList.toggle("bi-eye")
        input.type = "password"
      }
    })

  })
})
}

//// operations slides
if(allOperationsSlide){
  /////working on Opearations slides
controlSlide.forEach((control) => {
  control.addEventListener("click", function(e){
    e.preventDefault();
    const index = this.dataset.slide;
    allOperationsSlide.forEach((slide) => {
      slide.classList.remove("active")
      slide.classList.add("hide-content")
    })
    allOperationsSlide[index].classList.add("active");
    allOperationsSlide[index].classList.remove("hide-content")

  })
})
}

////// testimonails slides
if(testimonialSlider){
  ////working on Testimonail slides
let index = 0;
///////control testimonial slides
controlTestimonialSlides.forEach((control) => {
  control.addEventListener("click", function() {
    index = this.dataset.t_slides;
    testimonialSlider.style.transform = `translateX(-${index * 100}%)`
    allTestimonailDot.forEach((dot) =>{
      dot.classList.add("bi-circle")
    })
    allTestimonailDot[index].classList.remove("bi-circle")
    allTestimonailDot[index].classList.add("bi-circle-fill")
  })
})

// ///////prev testimonial slides
prevBtn.addEventListener("click", function(e) {
  e.preventDefault();
  index--;
  if(index < 0){
    index = 2;
  }

  testimonialSlider.style.transform = `translateX(-${index * 100}%)` 

})


//////next testimonial slides
nextBtn.addEventListener("click", function(e) {
  e.preventDefault();
  index++;
  if(index > 2){
    index = 0;
  }

  testimonialSlider.style.transform = `translateX(-${index * 100}%)` ;

})
}


//// Intersection observer for index.html

// Passing "argument" into handler
if(mainNav){

  const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault()
    const link = e.target;
    const siblings = link.closest('.main-nav-links').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

  mainNav.addEventListener('mouseover', handleHover.bind(0.5));
  mainNav.addEventListener('mouseout', handleHover.bind(1));



  ///observing the sticky nav

    const header = document.querySelector(".main-header")
    const navHeight = mainNav.getBoundingClientRect().height

    const stickyNav = function(entries){
    const [entry] = entries;


    if(!entry.isIntersecting){
      mainNav.classList.add("active-nav")
    } 
    else {
      mainNav.classList.remove("active-nav")
    }
  }

  const headerObserver = new IntersectionObserver(stickyNav, {
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  })
  headerObserver.observe(header)

  const mainIndex = document.querySelector(".index-main")
  const allSections = mainIndex.querySelectorAll("section")

  const sectionObserverFunction  = function (entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting){
    allSections.forEach(sec => {
      const img = sec.querySelectorAll("img");
      img.forEach(img => {
        img.classList.add("blur")
      })
    })
  } else{
    allSections.forEach(sec => {
      const img = sec.querySelectorAll("img");
      const testimonials = document.querySelector(".testimonials-section")
      img.forEach(img => {
        img.classList.remove("blur")
        img.classList.add("drop-bounce")
      })
    })
    observer.unobserve(entry.target)
  }
  
}


const sectionObserver = new IntersectionObserver(sectionObserverFunction, {
  threshold: 0.15,
  root : null
});

allSections.forEach(section => {
  sectionObserver.observe(section)
})

}




// This is transaction styling
const transactionMainPage = document.querySelector(".t-main")
const greetings = document.querySelector(".first--message")
const tSubNav = document.querySelector('.tSub--nav');
const tlogIn = document.querySelector('.t--login');
const tUserName = document.querySelector('.tuser--name');
const tPass = document.querySelector('.tuser--pin');
const cUser = document.querySelector('.c-user');
const cPass = document.querySelector('.c-pin');
const tSignIn = document.querySelector('.tsign-in');
const balanceSection = document.querySelector(".balance-section");
const btnTransfer = document.querySelector(".btn-transfer");
const btnRequest = document.querySelector(".btn-request")
const requestAmount = document.querySelector(".request-amount")
const withdrawals = document.querySelector('.withdrawal');
const deposits = document.querySelector('.deposit');
const totalBalance = document.querySelector(".total-balance");
const transferAmount = document.querySelector(".t-amount");
const recipient = document.querySelector(".recipient")
const btnClose = document.querySelector(".btn-close");
const timer = document.querySelector(".timer");
const moneyIn = document.querySelector(".money-in");
const moneyOut = document.querySelector(".money-out");
const currentDate = document.querySelector(".current-date");
const movDate = document.querySelectorAll(".mov-date");
const widthdrawDiv = document.querySelectorAll(".withdraw");
const ascend = document.querySelector(".ascend");
const descend = document.querySelector(".descend");
const In = document.querySelector(".in");
const Out = document.querySelector(".out")

/////password type change and icon toggle for transaction page
if(tlogIn){
  const pass = document.querySelector(".pass-view");
  pass.addEventListener("click", function(e){
    e.preventDefault();
    const span = document.querySelector(".password")

    const input = span.querySelector("input");
      if(input.type === "password"){
        pass.classList.toggle("bi-eye-lash")
        input.type = "text"
      }
      else if(input.type === "text"){
        pass.classList.toggle("bi-eye")
        input.type = "password"
      }
    })
}

///// hide transaction main page at first
 if(transactionMainPage){
  transactionMainPage.style.display = "none";
}


// local currency set up
  const localCurrency = {
    NG: "NGN",
    US: "USD",
    GB: "GBP",
    CA: "CAD",
    EU: "EUR",
  };
   
  const locale = navigator.language;
  const country = locale.split("-")[1];
  const currency = localCurrency[country];

   function displayCurrency () {
    return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(balance)
  }

  //Assigned Internal Balance
  let balance = 1000000;


  //Updated Balance
  if(totalBalance && moneyIn) {
    totalBalance.textContent =  displayCurrency();
    moneyIn.textContent = displayCurrency()
  }


// diffrence between dates sections
 function daysPassed  (date1, date2) {
  const diff = Math.abs(date2 - date1);
  return Math.round(diff / (1000 * 60 * 60 * 24))
}


// Submitted Form for Tansaction Page
if(tlogIn){
  tlogIn.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const users = JSON.parse(localStorage.getItem("Users"));
    const foundUser = users.find(user => user.username === tUserName.value && user.password === tPass.value)

    ///////Capitalizing FirstName in an array of objects....
    const getUsers = JSON.parse(localStorage.getItem("Users"))
    const getCorrectObject = getUsers.find((object) => {
      return object.username === tUserName.value && object.password === tPass.value;
    });

  ///////if a user is found then the below will be implemented
  if(foundUser && getCorrectObject){

  //view transaction page
  transactionMainPage.style.display = "block"
  tSubNav.classList.add("hide-content")

  //Greetings section 
  ///////assigning a capitalized first name
  const getFisrtName = getCorrectObject.firstname;
  const otherLetters = getFisrtName.slice(1, getFisrtName.length)
  const firstletter = getFisrtName.at(0).toLocaleUpperCase()
  const capitalized = firstletter + otherLetters;
  const now = new Date();
  const hr = now.getHours();
  const  message =
  hr < 12 ? `Good morning ${capitalized}` : hr < 18 ? `Good Afternoon ${capitalized}` : `Good Evening ${capitalized}`;

  greetings.textContent = message;


  //Sub nav section to be hidden when logged in
  tSubNav.style.display = "none"


  //current Total Balance date
  currentDate.textContent =  now.toLocaleString();


  //Accounts class object operator
    class Accounts {
      constructor(userName, pin) {
        this.userName = userName;
        this.movements = [1000000];
        this.pin = pin;
        this.movDate = [new Date().toISOString()];
        this.allOuts = [0];
      }

      deposit(val) {
        this.movDate.push(new Date().toISOString());
        this.movements.push(val);
      }

      withdraw(val) {
        this.allOuts.push(val);
        this.movDate.push(new Date().toISOString());
        this.movements.push(-val);
      }

      balance() {
        return this.movements.reduce((acc, value) => {
          return acc + value;
        });
      }

      interest(){
        return this.balance() * 0.03;
      }

      request(val){
        if(val <= (this.balance() * 0.03)){
          this.movDate.push(new Date().toISOString());
          this.movements.push(val);
          alert(`Hello ${capitalized}, your loan has been granted and it has been updated to your balance`)
        }else {
          alert(`Hello ${capitalized}, we can't process your loan at the moment`)
        }
      }

      accAllOuts() {
        return this.allOuts.reduce((acc, val) => {
          return  acc + val;
        });
      }

    }


  
  //display movements
  function displayMovements(movements) {
        balanceSection.innerHTML = "";
        movements.forEach((mov, i) => {
          balance = mov
          const assign = mov > 0 ? "in" : "out";
          const type = mov > 0 ? "deposit" : "withdraw";

          // Date display handling section
          const assignedDate = new Date(newAccount.movDate[i])
          function formatMovementsDate(date) {
            const now = new Date();
            const days = daysPassed(date, now);

            if(days === 0) return "Today";
            if(days === 1) return "Yesterday";
            if(days <= 7) return `${days} days ago`
            if(days <= 30) return `${Math.round(days / 7)} weeks ago`

            return date.toLocaleDateString();
            }

          const html = `
          <div class="balance-content {type}">
            <div class="balance-sub">
              <h3 class="${assign}">${displayCurrency()} ${type}</h3>
              <span class="mov-date">${formatMovementsDate(assignedDate)}</span>
            </div>
            <p class="${type}">${displayCurrency()}</p>
          </div>
          `

          if(balanceSection.children.length >= 8){
          balanceSection.removeChild(balanceSection.lastElementChild)
        }
        
         balanceSection.insertAdjacentHTML("afterbegin", html)
        });
  }



  //creating newAccount Interface
    let newAccount;
    const stored = JSON.parse(localStorage.getItem("UserAccount")) || [];

    const storedUser = stored.find(storeduser => (tUserName.value === storeduser.userName && tPass.value === storeduser.pin));

  
    if(storedUser){
      if(stored){
        ////////stored user activities
        newAccount = new Accounts(storedUser.userName, storedUser.pin);
        stored.push(newAccount);
        newAccount.movements = storedUser.movements;
        newAccount.movDate = storedUser.movDate || [new Date().toISOString()];
        newAccount.allOuts = storedUser.allOuts || [0];
        displayMovements(newAccount.movements);

      ascend.addEventListener("click", function() {
        const sorted = newAccount.movements.slice().sort((a, b) => a - b);
        displayMovements(sorted)
      })

      descend.addEventListener("click", function() {
        const sorted = newAccount.movements.slice().sort((a, b) => b - a);
        displayMovements(sorted)
      })
      
      balance = newAccount.balance();
      totalBalance.textContent = displayCurrency()

    ////Updating All Out
      balance = newAccount.accAllOuts();
      moneyOut.textContent = displayCurrency();

      } else {
        alert("Incorrect Username or Password")
      }
    } else {
      ////////New user activities
      newAccount = new Accounts(tUserName.value, tPass.value)
      stored.push(newAccount)
      balance = totalBalance.textContent
      displayCurrency();

       ascend.addEventListener("click", function() {
        const sorted = newAccount.movements.slice().sort((a, b) => a - b);
        displayMovements(sorted)
      })

      descend.addEventListener("click", function() {
        const sorted = newAccount.movements.slice().sort((a, b) => b - a);
        displayMovements(sorted)
      })

      localStorage.setItem("UserAccount", JSON.stringify(stored));

    };
    

  //Transfer Section
    btnTransfer.addEventListener("click", function(){
      if(!balance) return
      balance = Number(transferAmount.value)
      newAccount.withdraw(balance);
      localStorage.setItem("UserAccount", JSON.stringify(stored));
      
    displayMovements(newAccount.movements)

    const updatedBalance = newAccount.balance();

    balance = updatedBalance;
    totalBalance.textContent = displayCurrency();



    //////// Calculating money out
      moneyOut.textContent = Number(moneyOut.textContent.replace(/[^0-9.-]+/g, "")) + Number(transferAmount.value)
      balance = moneyOut.textContent;
      moneyOut.textContent = displayCurrency();

    transferAmount.value = "";

  })

  //Request amount section
  btnRequest.addEventListener("click", function(){
    if(!balance) return
    balance = Number(requestAmount.value)
    newAccount.request(balance);    
    localStorage.setItem("UserAccount", JSON.stringify(stored));

    displayMovements(newAccount.movements)

    const updatedBalance = newAccount.balance();

    balance = updatedBalance;
    totalBalance.textContent = displayCurrency()
     
    requestAmount.value = "";
  });


  //Close section
  btnClose.addEventListener("click", function() {
    const getStoredUser = stored.find(storeduser => (cUser.value === storeduser.userName && cPass.value === storeduser.pin));
    if(getStoredUser){
      transactionMainPage.style.display = "none"
      tSubNav.classList.add("hide-content");
      greetings.textContent = "";
      localStorage.clear();
      alert("It's sad to see you go 😟, we hope to see you again!!!")
    } else {
      alert("Incorrect Username or Password, Kindly input a correct Username or Password to close your Account")
    }
  });



  //timer Section
  let  time = 300;
  
  const timerFunction = setInterval(() => {
  let min = Math.trunc((time / 60)).toString().padStart(2, "0");
  let sec = Math.trunc((time % 60)).toString().padStart(2, "0");
  time--;
  timer.textContent = `${min}:${sec}`
  if(time === 58){
    alert(`Hello ${capitalized}, you'd be logged out in the next 1 min.`)
  }
  if(time === -1){
    clearInterval(timerFunction);
    transactionMainPage.style.display = "none";
    tSubNav.style.display = "block"

    //clear input
    tUserName.value = "";
    tPass.value = "";
  }
  }, 1000)
  }
  /////if no user is found a message displays
   else{
    alert("Wrong Username or Password, kindly check the inputs correctly or create an account in the home page");
  }

  tUserName.value = "";
  tPass.value = ""
})
}
