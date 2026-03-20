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


function ShowToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  toast.classList.remove("hide")

  //hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    toast.classList.remove("show");
  }, 3000)

}

function ShowToastOne(message) {
  const toast = document.getElementById("toast-one");
  toast.textContent = message;
  toast.classList.add("show");
  toast.classList.remove("hide")

  //hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    toast.classList.remove("show");
  }, 3000)

}

function ShowProcessing() {
  const toast = document.getElementById("processing")
  toast.classList.add("show");
  toast.classList.remove("hide")

  //hide after 2 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    toast.classList.remove("show");
  }, 2000)

}

function ShowSuccess(message) {
  const toast = document.getElementById("success");
  toast.textContent = message;
  toast.classList.add("show");
  toast.classList.remove("hide")

  //hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    toast.classList.remove("show");
  }, 3000)

}

function ShowError(message) {
  const toast = document.getElementById("error");
  toast.textContent = message;
  toast.classList.add("show");
  toast.classList.remove("hide")

  //hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    toast.classList.remove("show");
  }, 3000)

}

function ShowWarning(message) {
  const toast = document.getElementById("warning");
  toast.textContent = message;
  toast.classList.add("show");
  toast.classList.remove("hide")

  //hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    toast.classList.remove("show");
  }, 3000)

}




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
      ShowError("Please fill in all fields");
      return;
    }

    // Hide form and hide main content for user to login
    hideForm(signUpForm, form1);
    mainPageContent.style.display = "none";
    ShowToast(`Hi ${firstname}, you've succesfully created an account!`)

    openAccount.disabled = false;
    LogIn.disabled = false;
  })

  //Login submission
  btnLogIn.addEventListener("click", e => {
    e.preventDefault();

    // check if inputs are empty
    if (existingUser.value.trim() === "" || existingPass.value.trim() === "") {
      ShowError("Please enter username and pin");
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
      ShowToastOne(`Hi ${existingUser.value}, you've succesfully logged in!`)
      firstVisit.style.display = "none";

    } else {
      ShowError("Incorrect Username or Pin");
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
        input.type = "text"
        pass.classList.remove("bi-eye")
        pass.classList.add("bi-eye-slash")
      }
      else if(input.type === "text"){
        input.type = "password"
        pass.classList.remove("bi-eye-slash")
        pass.classList.add("bi-eye")
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
        input.type = "text"
        pass.classList.remove("bi-eye")
        pass.classList.add("bi-eye-slash")
      }
      else if(input.type === "text"){
        input.type = "password"
        pass.classList.remove("bi-eye-slash")
        pass.classList.add("bi-eye")
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

    const users = JSON.parse(localStorage.getItem("Users")) || [];
    const foundUser = users.find(user => user.username === tUserName.value && user.password === tPass.value);
    const getCorrectObject = users.find(user => user.username === tUserName.value && user.password === tPass.value);

    if(foundUser && getCorrectObject){

      // Show transaction page
      transactionMainPage.style.display = "block";
      tSubNav.classList.add("hide-content");
      ShowToast(`Hi ${tUserName.value}, you've successfully logged in!`);

      // Capitalize first name
      const getFisrtName = getCorrectObject.firstname;
      const firstletter = getFisrtName.at(0).toLocaleUpperCase();
      const otherLetters = getFisrtName.slice(1);
      const capitalized = firstletter + otherLetters;

      // Greetings
      const now = new Date();
      const hr = now.getHours();
      const message = hr < 12 ? `Good morning ${capitalized}` : hr < 18 ? `Good Afternoon ${capitalized}` : `Good Evening ${capitalized}`;
      greetings.textContent = message;

      // Hide sub nav
      tSubNav.style.display = "none";

      // Current date display
      function getCurrentDate() {
        setTimeout(() => {
          balance = new Date().toLocaleString();
          currentDate.textContent = balance
        }, 1000)
      }

      getCurrentDate()

      // Class Object
      class Accounts {
        #pin;
        #movements;
        #movDates;
        #allOuts;

        constructor(username, pin, movements = [1000000], movDates = [new Date().toISOString()], allOuts = [0]) {
          this.username = username;
          this.#pin = pin;
          this.#allOuts = [...allOuts];
          this.#movements = [...movements];
          this.#movDates = [...movDates];
        }

        deposit(val) {
          this.#movements.push(val);
          this.#movDates.push(new Date().toISOString());
        }

        withdraw(val) {
          this.#allOuts.push(val);
          this.#movements.push(-val);
          this.#movDates.push(new Date().toISOString());
        }

        balance() {
          return this.#movements.reduce((acc, val) => acc + val, 0);
        }

        interest() {
          return this.balance() * 0.03;
        }

        request(val) {
          if(val <= this.balance() * 0.03){
            this.#movements.push(val);
            this.#movDates.push(new Date().toISOString());
            ShowProcessing();
            setTimeout(() => {
              const loanAmount = Number(val)
              balance = loanAmount
              ShowSuccess(`Hello ${capitalized}, your loan of ${displayCurrency()} has been approved and added to your balance`);
            }, 3000);
          } else {
            ShowError(`Hello ${capitalized}, we're unable to approve your loan at the time`);
          }
        }

        accAllOuts() {
          return this.#allOuts.reduce((acc, val) => acc + val, 0);
        }

        get pin() { return this.#pin; }
        get movements() { return [...this.#movements]; }
        get movDates() { return [...this.#movDates]; }
        get allOuts() { return [...this.#allOuts]; }

        toStorageObject() {
          return {
            username: this.username,
            pin: this.pin,
            movements: this.movements,
            movDates: this.movDates,
            allOuts: this.allOuts
          }
        }
      }

      // filters old account and stores fresh object
      function saveAccount(account){
        const stored = JSON.parse(localStorage.getItem("UserAccount")) || [];
        const filtered = stored.filter(acc => acc.username !== account.username);
        filtered.push(account.toStorageObject());
        localStorage.setItem("UserAccount", JSON.stringify(filtered));
      }

      // returns a proper class instance
      function loadAccount(username, pin){
        const stored = JSON.parse(localStorage.getItem("UserAccount")) || [];
        const storedUser = stored.find(acc => acc.username === username && acc.pin === pin);
        if(!storedUser) return null;
        return new Accounts(
          storedUser.username,
          storedUser.pin,
          storedUser.movements,
          storedUser.movDates,
          storedUser.allOuts
        );
      }

      // Display Movements
      function displayMovements(account, sort = false, direction = "asc") {
        balanceSection.innerHTML = "";

        // Combine movements + dates
        let mov = account.movements.map((m, i) => ({
          mov: m,
          date: account.movDates[i]
        }));

        // Sorting
        if (sort) {
          mov.sort((a, b) => direction === "asc" ? a.mov - b.mov : b.mov - a.mov);
        }

        // Render
        mov.forEach(item => {
          balance = item.mov;

          const assign = item.mov > 0 ? "in" : "out";
          const type = item.mov > 0 ? "deposit" : "withdraw";

          const assignedDate = new Date(item.date);

          function formatMovementsDate(date) {
            const now = new Date();
            const days = daysPassed(date, now);

            if (days === 0) return "Today";
            if (days === 1) return "Yesterday";
            if (days <= 7) return `${days} days ago`;
            if (days <= 30) return `${Math.round(days / 7)} weeks ago`;

            return date.toLocaleDateString();
          }

          const html = `
            <div class="balance-content ${type}">
              <div class="balance-sub">
                <h3 class="${assign}">${displayCurrency()} ${type}</h3>
                <span class="mov-date">${formatMovementsDate(assignedDate)}</span>
              </div>
              <p class="${type}">${displayCurrency()}</p>
            </div>
          `;

          if(balanceSection.children.length >= 8){
          balanceSection.removeChild(balanceSection.lastElementChild)
        }
        
         balanceSection.insertAdjacentHTML("afterbegin", html)
        });
      }

      // Load or create new account
      let newAccount = loadAccount(tUserName.value, tPass.value);
      if(newAccount){
        balance = newAccount.balance();
        totalBalance.textContent = displayCurrency();

           ////Updating All Out
        balance = Number(newAccount.accAllOuts());
        moneyOut.textContent = displayCurrency()
      }

      if(!newAccount){
        newAccount = new Accounts(tUserName.value, tPass.value);
        saveAccount(newAccount);
      }
      displayMovements(newAccount);

      // Sorting
      ascend.addEventListener("click",()=> displayMovements(newAccount,true,"asc"));
      descend.addEventListener("click",()=> displayMovements(newAccount,true,"desc"));


      // Transfer
      btnTransfer.addEventListener("click",()=>{
        if(!transferAmount.value) return;
        const amount = Number(transferAmount.value);
        const recipientName = recipient.value;
        ShowProcessing()
        //Delay Success
        setTimeout(() => {
          balance = amount
          displayCurrency()
          ShowSuccess(`${displayCurrency()} sent to ${recipientName}`)
        }, 3000);
        newAccount.withdraw(amount);
        saveAccount(newAccount);
        displayMovements(newAccount);

        const updatedBalance = newAccount.balance();

        balance = updatedBalance;
        totalBalance.textContent = displayCurrency();

        //update Current Date
        getCurrentDate()



        //////// Calculating money out
        moneyOut.textContent = Number(moneyOut.textContent.replace(/[^0-9.-]+/g, "")) + Number(transferAmount.value)
        balance = moneyOut.textContent;
        moneyOut.textContent = displayCurrency();

        transferAmount.value = "";
        recipient.value = "";
      });

      // Loan Request
      btnRequest.addEventListener("click",()=>{
        if(!requestAmount.value) return;
        const amount = Number(requestAmount.value);
        newAccount.request(amount);
        saveAccount(newAccount);
        displayMovements(newAccount);

        //update Current date
        getCurrentDate()


        const updatedBalance = newAccount.balance();

        balance = updatedBalance;
        totalBalance.textContent = displayCurrency()
        
        requestAmount.value = "";
      });

      // Close Account
      btnClose.addEventListener("click",()=>{
        const stored = JSON.parse(localStorage.getItem("UserAccount")) || [];
        const index = stored.findIndex(acc=>acc.username===cUser.value && acc.pin===cPass.value);
        if(index>=0){
          stored.splice(index,1);
          localStorage.setItem("UserAccount", JSON.stringify(stored));
          transactionMainPage.style.display="none";
          tSubNav.style.display="block";
          greetings.textContent="";
          ShowError("We're sorry to see you go. We hope to see you again.");
        } else {
          ShowError("Incorrect Username or Pin. Please try again.");
        }
      });

      // Timer
      let time = 300;
      const timerFunction = setInterval(()=>{
        let min = Math.floor(time/60).toString().padStart(2,"0");
        let sec = (time%60).toString().padStart(2,"0");
        timer.textContent = `${min}:${sec}`;
        if(time===60) ShowWarning(`Hello ${capitalized}, you will be logged out in less than 1 minute.`);
        if(time===0){
          clearInterval(timerFunction);
          transactionMainPage.style.display="none";
          tSubNav.style.display="block";
          tUserName.value="";
          tPass.value="";
        }
        time--;
      },1000);

    } else {
      ShowError("Incorrect username or pin. Please try again or sign up on the home page.");
    }

    tUserName.value="";
    tPass.value="";
  });
}