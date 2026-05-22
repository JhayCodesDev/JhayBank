'use strict'
// Elements specific to the landing page (index.html)
const firstVisit = document.querySelector(".first-visit");
const firstIntro = document.querySelector(".first-intro");
const LogInForm = document.querySelector(".login");
const signUpForm = document.querySelector(".sign-up");
const mainNav = document.querySelector(".main-nav-links")
const userFname = document.querySelector(".fname");
const userLname = document.querySelector(".lname");
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



// toast Notification handlers
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

// function to generate creating account number
function getAccountNumber () {
  return Math.floor(Math.random() * 10000000000, +  9000000000).toString()
}


// hide all form if there's an open account && login
if(openAccount && LogIn){
  const form1 = signUpForm.querySelectorAll("input");
  const form2 = LogInForm.querySelectorAll("input");


// initial state of the forms "required" in first visit
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
      const lastname = userLname.value;
      const username = mainUser.value;
      const password = mainPass.value;
      const accountNumber = getAccountNumber();
      const profileImage = [];
      const newUser = {firstname, lastname, username, password, accountNumber, profileImage}

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
    ShowToast(`Hi ${firstname}, you've succesfully created an account! your account number is ${accountNumber}, kindly check transaction page for more details`)


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

      mainPageContent.classList.remove("hide-content")
      ShowToastOne(`Hi ${existingUser.value}, you've succesfully logged in!`)
      firstVisit.style.display = "none";

    } else {
      ShowError("Incorrect Username or Pin");
      existingUser.value = "";
      existingPass.value = ""
    }
  });
}

// password type change and icon toggle for index.html page
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

// operations slides
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

// testimonails slides
if(testimonialSlider){
let index = 0;
// control testimonial slides
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


// Intersection observer for index.html

// passing "argument" into handler
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



// Elements specific to the transaction page
const transactionPage = document.querySelector(".t-page")
const greetings = document.querySelector(".first--message")
const tForm = document.querySelector('.t-form');
const tlogIn = document.querySelector('.t--login');
const tUserName = document.querySelector('.tuser--name');
const tPass = document.querySelector('.tuser--pin');
const cUser = document.querySelector('.c-user');
const cPass = document.querySelector('.c-pin');
const tSignIn = document.querySelector('.tsign-in');
const balanceSection = document.querySelectorAll(".balance-section");
const btnTransfer = document.querySelector(".btn-transfer");
const btnRequest = document.querySelector(".btn-request")
const requestAmount = document.querySelector(".request-amount")
const withdrawals = document.querySelector('.withdrawal');
const deposits = document.querySelector('.deposit');
const totalBalance = document.querySelectorAll(".total-balance");
const transferAmount = document.querySelector(".t-amount");
const recipient = document.querySelector(".recipient")
const btnClose = document.querySelector(".btn-close");
const timer = document.querySelector(".timer");
const moneyIn = document.querySelector(".money-in");
const moneyOut = document.querySelector(".money-out");
const currentDate = document.querySelector(".current-date");
const currentBalContainer = document.querySelector(".current-balance");
const infoContainer = document.querySelector(".info");
const movDate = document.querySelectorAll(".mov-date");
const widthdrawDiv = document.querySelectorAll(".withdraw");
const ascend = document.querySelector(".ascend");
const descend = document.querySelector(".descend");
const In = document.querySelector(".in");
const Out = document.querySelector(".out");
const accountNumber = document.querySelector(".account-number");
const accountButton = document.querySelectorAll(".dashboard-btn");
const paymentButton = document.querySelectorAll(".bills-btn");
const transferButton = document.querySelectorAll(".transfer-btn");
const profileButton = document.querySelectorAll(".profile-btn");
const dashboard = document.querySelector(".dashboard");
const transferFunds = document.querySelector(".transfer-funds");
const payBills = document.querySelector(".pay-bills");
const billsContainer = document.querySelector(".bills-container");
const transferContainer = document.querySelector(".transfer-container");
const profileContainer = document.querySelector(".profile-container");
const airtimeBtn = document.querySelector(".airtime-purchase");
const phoneNumber = document.querySelector(".p-number")
const subscriptionBtn = document.querySelector(".subscription-purchase");
const subId = document.querySelector(".sub-id")
const electricityBtn = document.querySelector(".electricity-purchase");
const electricityId = document.querySelector(".e-id")
const airtimeAmount = document.querySelector(".airtime-amount");
const electAmount = document.querySelector(".electricity-amount");
const subAmount = document.querySelector(".subscription-amount");
const network = document.querySelector(".networks");
const tvSubscription = document.querySelector(".tv-subscription");
const distribution = document.querySelector(".distribution");
const meter = document.querySelector(".meter");
const btnCopy = document.querySelectorAll(".btn-copy");
const currentName = document.querySelector(".current-name");
const changeFirstName = document.querySelector(".change-firstname");
const changeLastName = document.querySelector(".change-lastname");
const changeUserName = document.querySelector(".change-username");
const btnChange = document.querySelector(".btn-change");
const displayChangeForm = document.querySelector(".form-container");
const submitDetails = document.querySelector(".submit-details");
const profileH1 = document.querySelector(".profile-h1");
const profileSpan = document.querySelector(".profile-span");
const profileAcc = document.querySelector(".profile-acc");
const uploadImage = document.querySelector(".uploadImage");
const fileInput = document.querySelector("#fileInput");
const preview = document.querySelector("#preview");
const btnLogOut = document.querySelector(".btn-logOut");



// password type change and icon toggle for transaction page
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

// initially hide transaction main page
if(transactionPage){
    transactionPage.style.display = "none";
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

// Assigned Internal Balance
let balance = 1000000;


// Updated Balance
if(totalBalance && moneyIn) {
    totalBalance.forEach(total => {
      total.textContent =  displayCurrency();
      moneyIn.textContent = displayCurrency()
    })
}


// diffrence between dates sections
function daysPassed  (date1, date2) {
    const diff = Math.abs(date2 - date1);
    return Math.round(diff / (1000 * 60 * 60 * 24))
}

// Elements specific to Transaction Nav
const navToggler = document.querySelector(".nav-toggle")
const navLinks = document.querySelector(".nav-links")

if(navToggler){
  navToggler.addEventListener("click", function(e){
      e.preventDefault();
      navLinks.classList.contains("hide-content") ? navLinks.classList.remove("hide-content") : navLinks.classList.add("hide-content")
  })
}


// Submitted Form for Tansaction Page
if(tlogIn){
  tlogIn.addEventListener('submit', function (e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("Users")) || [];
    const foundUser = users.find(user => user.username === tUserName.value && user.password === tPass.value);

    if(foundUser){
      //stored ussername and password for updating the user profile image
      const usernameValue = tUserName.value;
      const passwordValue = tPass.value;

      //displaySavedImage function
      function displaySavedImage () {
        const getStoredUsers = JSON.parse(localStorage.getItem("Users"));
        const foundStoredUser = getStoredUsers.find(user => user.username === usernameValue && user.password === passwordValue);
        if(foundStoredUser.profileImage.length === 0){
          preview.src = "./jhay-bank-logo.jpg"
        } else {
          preview.src = foundStoredUser.profileImage;
        }
      }

      displaySavedImage();

      // button for uploading image to the website 
      if(uploadImage){
        uploadImage.addEventListener("click", function(e) {
          fileInput.click();
          fileInput.addEventListener("change", function(e) {
            const file = this.files[0]
            if(file){
              const reader = new FileReader();
              reader.onload = function(e){
                const imageData = e.target.result;
                preview.src = imageData;
                const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
                const loggedInUser = storedUsers.find(user =>
                  user.username === usernameValue && user.password === passwordValue
                );
                loggedInUser.profileImage = imageData;
                if(loggedInUser){
                  storedUsers.push(loggedInUser);
                  localStorage.setItem("Users", JSON.stringify(storedUsers));
                }
              }
              reader.readAsDataURL(file);
            }
          })
        });
      }


      // Show transaction page and hide form
      tForm.style.display = "none";
      transactionPage.style.display = "block";
      
      // displaySavedImage();
      ShowToast(`Hi ${tUserName.value}, you've successfully logged in!`);

      //update account number text content
      accountNumber.textContent = foundUser.accountNumber;
      profileAcc.textContent = foundUser.accountNumber;

      // Capitalize firstname and lastname
      const getFisrtName = foundUser.firstname;
      const getLastName = foundUser.lastname;
      const firstletterInFname = getFisrtName.at(0).toLocaleUpperCase();
      const firstletterInLname = getLastName.at(0).toLocaleUpperCase();
      const otherLettersInFname = getFisrtName.slice(1);
      const otherLettersInLname = getLastName.slice(1);
      const capitalizedFname = firstletterInFname + otherLettersInFname;
      const capitalizedLname = firstletterInLname + otherLettersInLname;

      // Greetings
      const now = new Date();
      const hr = now.getHours();
      const message = hr < 12 ? `Good morning ${capitalizedFname}` : hr < 18 ? `Good Afternoon ${capitalizedFname}` : `Good Evening ${capitalizedFname}`;
      greetings.textContent = message;

      // copy account number to clipboard
      btnCopy.forEach(btn => {
        btn.addEventListener("click", function(e) {
          e.preventDefault();
          const text = accountNumber.textContent;
          navigator.clipboard.writeText(text).then(() => ShowSuccess('copied successfully')).catch(() => ShowError('failed to copy'))
        })
      })

      //Togglers for displaying different transaction features and hiding others
      accountButton.forEach(acc => {
        acc.addEventListener("click", function(e){
          e.preventDefault();
          dashboard.style.display = "block";
          transferContainer.classList.remove("transfer-flex");
          transferContainer.classList.add("hide-content");
          billsContainer.classList.add("hide-content");
          billsContainer.classList.remove("bill-flex");
          profileContainer.classList.add("hide-content");
        })
      });

      paymentButton.forEach(pay => {
        pay.addEventListener("click", function(e){
          e.preventDefault();
          billsContainer.classList.add("bill-flex");
          billsContainer.classList.remove("hide-content");
          dashboard.style.display = "none";
          transferContainer.classList.remove("transfer-flex");
          transferContainer.classList.add("hide-content");
          profileContainer.classList.add("hide-content");
        });
      });

      transferButton.forEach(transfer => {
        transfer.addEventListener("click", function(e){
          e.preventDefault();
          transferContainer.classList.add("transfer-flex");
          transferContainer.classList.remove("hide-content");
          dashboard.style.display = "none";
          billsContainer.classList.remove("bill-flex");
          billsContainer.classList.add("hide-content")
          profileContainer.classList.add("hide-content");
        });
      })

      profileButton.forEach(profile => {
        profile.addEventListener("click", function(e){
          e.preventDefault();
          profileContainer.classList.remove("hide-content");
          dashboard.style.display = "none";
          billsContainer.classList.remove("bill-flex");
          billsContainer.classList.add("hide-content")
          transferContainer.classList.remove("transfer-flex");
          transferContainer.classList.add("hide-content");
        });
      })

      transferFunds.addEventListener("click", function(e){
        e.preventDefault();
        transferContainer.classList.add("transfer-flex");
        transferContainer.classList.remove("hide-content");
        dashboard.style.display = "none";
        billsContainer.classList.remove("bill-flex");
        billsContainer.classList.add("hide-content")
        profileContainer.classList.add("hide-content");
      })

      payBills.addEventListener("click", function(e){
        e.preventDefault();
        billsContainer.classList.add("bill-flex");
        billsContainer.classList.remove("hide-content")
        dashboard.style.display = "none";
        transferContainer.classList.remove("transfer-flex");
        transferContainer.classList.add("hide-content");
        profileContainer.classList.add("hide-content");
      });

      // Hide sub nav
      tForm.style.display = "none";

      // Timer
      let time = 300;
      const timerFunction = setInterval(()=>{
      let min = Math.floor(time/60).toString().padStart(2,"0");
      let sec = (time%60).toString().padStart(2,"0");
      timer.textContent = `${min}:${sec}`;
      if(time===60) ShowWarning(`Hello ${capitalizedFname}, you will be logged out in less than 1 minute.`);
      if(time===0){
        clearInterval(timerFunction);
        transactionPage.style.display="none";
        tForm.style.display="block";
        tUserName.value="";
        tPass.value="";
      }
      time--;
      },1000);

      // Current date display
      function getCurrentDate() {
        setTimeout(() => {
          balance = new Date().toLocaleString();
          currentDate.textContent = balance
        }, 1000)
      }

      // updates the firstname to be capitalized
      profileH1.textContent = capitalizedFname;
      profileSpan.textContent = capitalizedLname;


    // Buttons for purchasing airtime, subscription and electricity
      airtimeBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (airtimeAmount.value && phoneNumber.value){
          const amount = Number(airtimeAmount.value);
          const airtimeTransaction = {
            type: "Airtime",
            provider: network.value,
            amount: amount,
            date: new Date().toISOString()
          };

          newAccount.addAirtime(airtimeTransaction);

          newAccount.withdraw(amount);
          saveAccount(newAccount);

          balance = newAccount.balance();
          totalBalance.forEach(total => {
            return total.textContent = displayCurrency()
          });

          ShowProcessing();

          setTimeout(() => {
            balance = amount;
            ShowSuccess(`Hello ${capitalizedFname}, your ${airtimeTransaction.provider} ${airtimeTransaction.type} Purchase of ${displayCurrency()} has been credited to ${phoneNumber.value} successfully`);
            phoneNumber.value = "";
          }, 3000);

          moneyOut.textContent = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency
          }).format(newAccount.accAllOuts());

          displayMovements(newAccount);

          airtimeAmount.value = "";
        } else{
          ShowError(`Kindly input a phone number and amount`)
        }
      });

      subscriptionBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (subAmount.value && subId.value){
          const amount = Number(subAmount.value);
          const subscriptionTransaction = {
            type: "Subscription",
            provider: tvSubscription.value,
            amount: amount,
            date: new Date().toISOString()
          };

          newAccount.addSubscription(subscriptionTransaction);

          newAccount.withdraw(amount);
          saveAccount(newAccount);

          balance = newAccount.balance();
            totalBalance.forEach(total => {
            return total.textContent = displayCurrency();
          });

          ShowProcessing();

          setTimeout(() => {
            balance = amount;
            ShowSuccess(`Hello ${capitalizedFname}, your ${subscriptionTransaction.provider} ${subscriptionTransaction.type} of ${displayCurrency()} for #${subId.value} has been completed successfully`);
            subId.value = "";
          }, 3000);

          moneyOut.textContent = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency
          }).format(newAccount.accAllOuts());

          displayMovements(newAccount);

          subAmount.value = "";

        } else {
          ShowError(`Kindly input a subscription id and amount`)
        }
      });

      electricityBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (electAmount.value && electricityId.value){
        const amount = Number(electAmount.value);
        const electricityTransaction = {
          type: "Electricity",
          provider: distribution.value,
          meterType: meter.value,
          amount: amount,
          date: new Date().toISOString()
        };

        newAccount.addElectricity(electricityTransaction);

        newAccount.withdraw(amount);
        saveAccount(newAccount);

        balance = newAccount.balance();
        totalBalance.forEach(total => {
          return total.textContent = displayCurrency();
        });

        ShowProcessing();

        setTimeout(() => {
          balance = amount;
          ShowSuccess(`Hello ${capitalizedFname}, your ${electricityTransaction.provider} ${electricityTransaction.type} Purchase of ${displayCurrency()} for #${electricityId.value} has been completed successfully`);
          electricityId.value = "";
        }, 3000);

        moneyOut.textContent = new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currency
        }).format(newAccount.accAllOuts());

        displayMovements(newAccount);

        electAmount.value = "";
      } else{
        ShowError(`Kindly input an electricity id and amount`)
      }
      });
      
      // update the current date in the current balance
      getCurrentDate();

      // button for showing form for editing user profile.
      btnChange.addEventListener("click", function(e) {
        e.preventDefault();
        displayChangeForm.classList.remove("hide-content");
      });

      // button for editing firstname and username as well as updating it in the local storage
      submitDetails.addEventListener("click", function(e) {
        e.preventDefault();
        if(changeFirstName.value === "" || changeUserName.value === ""){
          alert("input your firstname or lastname");
        } else{
          const newFirstName = changeFirstName.value;
          const newLastName = changeLastName.value;
          const newUserName = changeUserName.value;

          const getUsers = JSON.parse(localStorage.getItem("Users"))
          const getUserAccount = JSON.parse(localStorage.getItem("UserAccount"))
          getUsers.find(user => {
            if(user.accountNumber){
              user.firstname = newFirstName;
              user.username = newUserName;
              user.lastname = newLastName;
              localStorage.setItem("Users", JSON.stringify(getUsers))
            }
          });

          getUserAccount.find(user => {
            if(user.username){
              user.username = newUserName;
              localStorage.setItem("UserAccount", JSON.stringify(getUserAccount))
            }
          });

          changeFirstName.value = "";
          changeUserName.value = "";
          changeLastName.value = "";
          displayChangeForm.classList.add("hide-content");
          transactionPage.style.display="none";
          tForm.style.display="block";
          clearInterval(timerFunction);
        }
      });

      // Class Object
      class Accounts {
        #pin;
        #movements;
        #movDates;
        #allOuts;
        #airtime;
        #electricity;
        #subscription;

        constructor(
          username, 
          pin, 
          movements = [1000000], movDates = [new Date().toISOString()], 
          allOuts = [0], 
          airtime = [], 
          electricity = [], 
          subscription = []){

          this.username = username;
          this.#pin = pin;

          this.#allOuts = [...allOuts];
          this.#movements = [...movements];
          this.#movDates = [...movDates];

          this.#airtime = [...airtime];
          this.#electricity = [...electricity];
          this.#subscription = [...subscription];
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

        addAirtime(data) {
          this.#airtime.push(data);
        }

        addElectricity(data) {
          this.#electricity.push(data);
        }

        addSubscription(data) {
          this.#subscription.push(data);
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

              ShowSuccess(`Hello ${capitalizedFname}, your loan of ${displayCurrency()} has been approved and added to your balance`);

            }, 3000);

          } else {

            ShowError(`Hello ${capitalizedFname}, we're unable to approve your loan at the time`);

          }
        }

        accAllOuts() {
          return this.#allOuts.reduce((acc, val) => acc + val, 0);
        }

        get pin() {
          return this.#pin;
        }

        get movements() {
          return [...this.#movements];
        }

        get movDates() {
          return [...this.#movDates];
        }

        get allOuts() {
          return [...this.#allOuts];
        }

        get airtime() {
          return [...this.#airtime];
        }

        get electricity() {
          return [...this.#electricity];
        }

        get subscription() {
          return [...this.#subscription];
        }

        toStorageObject() {
          return {
            username: this.username,
            pin: this.pin,
            movements: this.movements,
            movDates: this.movDates,
            allOuts: this.allOuts,

            airtime: this.airtime,
            electricity: this.electricity,
            subscription: this.subscription
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

        const storedUser = stored.find(
          acc => acc.username === username && acc.pin === pin
        );

        if(!storedUser) return null;

        return new Accounts(
          storedUser.username,
          storedUser.pin,
          storedUser.movements,
          storedUser.movDates,
          storedUser.allOuts,
          storedUser.airtime,
          storedUser.electricity,
          storedUser.subscription
        );
      }

      // display movements function
      function displayMovements(account, sort = false, direction = "asc") {
        const container = balanceSection[0];
        container.innerHTML = "";

        let mov = account.movements.map((m, i) => ({
          amount: m,
          date: account.movDates[i],
          type: m > 0 ? "Deposit" : "Withdraw",
          provider: "",
          meterType: ""
        }));

        const airtime = account.airtime.map(t => ({
          amount: -t.amount,
          date: t.date,
          type: "Airtime",
          provider: t.provider,
          meterType: ""
        }));

        const sub = account.subscription.map(t => ({
          amount: -t.amount,
          date: t.date,
          type: "Subscription",
          provider: t.provider,
          meterType: ""
        }));

        const elec = account.electricity.map(t => ({
          amount: -t.amount,
          date: t.date,
          type: "Electricity",
          provider: t.provider,
          meterType: t.meterType
        }));

        mov = [...mov, ...airtime, ...sub, ...elec];

        mov.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (sort) {
          mov.sort((a, b) =>
          direction === "asc" ? a.amount - b.amount : b.amount - a.amount
          );
        }

        mov = mov.slice(0, 8);

        mov.forEach(item => {
          let title = "";
          let extra = "";

          if (item.type === "Deposit") {
            title = "Deposit";
          } else if (item.type === "Withdraw") {
            title = "Withdraw";
          } else if (item.type === "Electricity") {
            title = "Electricity Bill";
            extra = `${item.provider} (${item.meterType})`;
          } else if (item.type === "Airtime") {
            title = "Airtime";
            extra = item.provider;
          } else if (item.type === "Subscription") {
            title = "Subscription";
            extra = item.provider;
          }

        balance = Math.abs(item.amount)

          const html = `
          <div class="balance-content">
            <div class="balance-row">
              <div>
                <h3 class="${item.amount > 0 ? "in" : "out"}">${title} <span class="provider">${extra}</span></h3>
                <span class="mov-date">
                  ${new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            </div>

            

            <div class="balance-row second-row">
              <p class="${item.amount > 0 ? "in" : "out"}">
                ${item.amount > 0 ? "+" : "-"}${displayCurrency()}
              </p>
            </div>
          </div>
          `;
          container.insertAdjacentHTML("beforeend", html);
        });
      }

      // Load or create new account
      let newAccount = loadAccount(tUserName.value, tPass.value);
      if(newAccount){
        balance = newAccount.balance();
        totalBalance.forEach(total => {
          total.textContent = displayCurrency();
        });

        ////Updating All Out
          balance = Number(newAccount.accAllOuts());
          moneyOut.textContent = displayCurrency()
      }

      if(!newAccount){
        newAccount = new Accounts(tUserName.value, tPass.value);
        saveAccount(newAccount);
      }
      displayMovements(newAccount);

      // Sorting movements
      ascend.addEventListener("click", () => {
        displayMovements(newAccount, true, "asc");
      });

      descend.addEventListener("click", () => {
        displayMovements(newAccount, true, "desc");
      });

      // Transfer Funds
      btnTransfer.addEventListener("click",()=>{
        if(!transferAmount.value) return;
        if(recipient.value === "") return
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
        totalBalance.forEach(total => {
          total.textContent = displayCurrency();
        })

        //update Current Date
        getCurrentDate()



        // Calculating money out
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
        totalBalance.forEach(total => {
          total.textContent = displayCurrency()
        })
          
        requestAmount.value = "";
      });

      // button for logging user out
      btnLogOut.addEventListener("click", function(e) {
        e.preventDefault();
        transactionPage.style.display="none";
        tForm.style.display="block";
        tUserName.value="";
        tPass.value="";
      });

      // Close Account
      btnClose.addEventListener("click",()=>{
        const stored = JSON.parse(localStorage.getItem("UserAccount")) || [];
        const foundCorrectUser = stored.find(acc=>acc.username === cUser.value && acc.pin === cPass.value);
        if(foundCorrectUser){
          ShowError("We're sorry to see you go. We hope to see you again.");
          localStorage.clear();
          greetings.textContent="";
          transactionPage.style.display="none";
          tForm.style.display="block";
        } else {
          ShowError("Incorrect Username or Pin. Please try again.");
        }
      });

    } else {
      ShowError("Incorrect username or pin. Please try again or sign up on the home page.");
    }
      tUserName.value="";
      tPass.value="";
  });
}