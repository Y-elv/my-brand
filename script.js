const smMenuBtn = document.querySelector(".main-header__sm-scr-nav-btn");
const smMenu = document.querySelector(".main-header__sm-menu");
const smMenuCloseBtn = document.querySelector(".main-header__sm-menu-close");

const smMenuLinks = document.querySelectorAll(".main-header__sm-menu-link");
const smMenuLink1 = document.querySelector(".main-header__sm-menu-link--1");
const smMenuLink2 = document.querySelector(".main-header__sm-menu-link--2");
const smMenuLink3 = document.querySelector(".main-header__sm-menu-link--3");
const smMenuLink4 = document.querySelector(".main-header__sm-menu-link--4");

smMenuBtn.addEventListener("click", () => {
  smMenu.style.transitionDelay = "0s";
  smMenu.classList.add("main-header__sm-menu--active");

  smMenuLink1.style.transitionDelay = ".5s";
  smMenuLink1.style.transform = "translateY(0)";
  smMenuLink1.style.opacity = "1";

  smMenuLink2.style.transitionDelay = ".8s";
  smMenuLink2.style.transform = "translateY(0)";
  smMenuLink2.style.opacity = "1";

  smMenuLink3.style.transitionDelay = "1.1s";
  smMenuLink3.style.transform = "translateY(0)";
  smMenuLink3.style.opacity = "1";

  smMenuLink4.style.transitionDelay = "1.4s";
  smMenuLink4.style.transform = "translateY(0)";
  smMenuLink4.style.opacity = "1";
});

smMenuLinks.forEach((ele) => {
  ele.addEventListener("click", () => {
    smMenuLink4.style.transitionDelay = "0s";
    smMenuLink4.style.transform = "translateY(50px)";
    smMenuLink4.style.opacity = "0";

    smMenuLink3.style.transitionDelay = ".3s";
    smMenuLink3.style.transform = "translateY(50px)";
    smMenuLink3.style.opacity = "0";

    smMenuLink2.style.transitionDelay = ".6s";
    smMenuLink2.style.transform = "translateY(50px)";
    smMenuLink2.style.opacity = "0";

    smMenuLink1.style.transitionDelay = ".9s";
    smMenuLink1.style.transform = "translateY(50px)";
    smMenuLink1.style.opacity = "0";

    smMenu.style.transitionDelay = "1.2s";
    smMenu.classList.remove("main-header__sm-menu--active");

    setTimeout(() => {
      document.getElementById(ele.name).scrollIntoView();
    }, 1300);
  });
});

smMenuCloseBtn.addEventListener("click", () => {
  smMenuLink4.style.transitionDelay = "0s";
  smMenuLink4.style.transform = "translateY(50px)";
  smMenuLink4.style.opacity = "0";

  smMenuLink3.style.transitionDelay = ".3s";
  smMenuLink3.style.transform = "translateY(50px)";
  smMenuLink3.style.opacity = "0";

  smMenuLink2.style.transitionDelay = ".6s";
  smMenuLink2.style.transform = "translateY(50px)";
  smMenuLink2.style.opacity = "0";

  smMenuLink1.style.transitionDelay = ".9s";
  smMenuLink1.style.transform = "translateY(50px)";
  smMenuLink1.style.opacity = "0";

  smMenu.style.transitionDelay = "1.2s";
  smMenu.classList.remove("main-header__sm-menu--active");
});

// ---
const themeColorSelector = document.querySelector(".themeClrSelector");
const themeColorSelectorInput = document.querySelector(
  ".themeClrSelector__input"
);
const root = document.documentElement;

const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const eventFire = (el, etype) => {
  if (el.fireEvent) {
    el.fireEvent("on" + etype);
  } else {
    let evObj = document.createEvent("Events");
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
};

const headerLogoConatiner = document.querySelector(
  ".main-header__logo-container"
);

headerLogoConatiner.addEventListener("click", () => {
  location.href = "index.html";
});

const form = document.querySelector(".contact__form");
const alertMsg = document.getElementById("alert-msg");
const formDataArray = [];

form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const nameField = document.getElementById("nameField");
    const emailField = document.getElementById("emailField");
    const messageField = document.getElementById("messageField");

    const nameValue = nameField.value;
    const emailValue = emailField.value;
    const messageValue = messageField.value;

    let alertMessage = "";

    if (!nameValue && !emailValue && !messageValue) {
      alertMessage += "Please fill in all the required fields.\n";
    } else {
      if (!nameValue) {
        alertMessage += "Please enter your name.\n";
      } else if (/^\d+$/.test(nameValue)) {
        alertMessage += "Name should not contain only numbers.\n";
      }

      if (!emailValue) {
        alertMessage += "Please enter your email address.\n";
      } else {
        const emailRegex =
          /^[^\s@%?,/<>\-]+@(gmail\.com|yahoo\.com|otherdomain\.com)$/;
        if (!emailRegex.test(emailValue)) {
          alertMessage +=
            "Please enter a valid email address with the correct domain (e.g., gmail.com, yahoo.com, otherdomain.com).\n";
        }
      }

      if (!messageValue) {
        alertMessage += "Please enter your message.\n";
      }
    }

    if (alertMessage) {
      const messages = alertMessage
        .split("\n")
        .filter((message) => message.trim());
      if (messages.length === 2) {
        alertMsg.textContent = `${messages[0]}\n${messages[1]}`;
      } else {
        alertMsg.textContent = alertMessage;
      }
      alertMsg.classList.remove("success");
      return;
    }

    // Construct formData object inside the submit event listener
    const formData = {
      name: nameValue,
      email: emailValue,
      message: messageValue,
    };

    const response = await fetch("http://localhost:3000/api/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alertMsg.textContent = "Successfully submitted the Message!";
      alertMsg.classList.add("success");
      console.log("submitted:", formData);
      form.reset();
      setTimeout(() => {
        alertMsg.textContent = "";
        alertMsg.classList.remove("success");
      }, 5000);
    } else {
     
      alertMsg.textContent =
        "Failed to submit the form. Please try again later.";
      alertMsg.classList.remove("success");
    }
  } catch (error) {
    console.error("Error in your system:", error);
  }
});
