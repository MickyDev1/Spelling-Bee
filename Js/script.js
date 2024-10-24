"use strict";

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("number");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// form.addEventListener("submit", function (event) {
//   event.preventDefault(); 
//   console.log("michael");

//   const formData = new FormData(form);

//   fetch("https://word-wiz-be-bsws.onrender.com/word-wiz/contact_us", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       your_full_name: fullName,
//       your_full_email_address: email,
//       your_full_subject: subject,
//       your_message: message,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       Swal.fire({
//         title: "Good job!",
//         text: "Your message has been sent successfully!",
//         icon: "success",
//       });
//       form.reset();
//       console.log("successful");
//     })
//     .catch((error) => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "There was an error sending your message. Please try again.",
//       });
//       console.error("Error:", error);
//     });
// });

function clearInputs() {
  fullName.value = "";
  email.value = "";
  subject.value = "";
  message.value = "";
}

function sendEmail() {
  const bodyMessage = `
  Full Name: ${fullName.value}<br/>
  Email: ${email.value}<br/>
  Message: ${message.value}
  `;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "olatilewakangtk@gmail.com",
    Password: "6B38675F4CAEA1F5F394BAF63CCE83B8E4E4",
    To: "olatilewakangtk@gmail.com",
    From: "olatilewakangtk@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message Sent Successfully!",
        icon: "success",
      });
      clearInputs(); // Clear the inputs after successful submission
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
});

document.querySelectorAll(".faq-header").forEach((header) => {
  header.addEventListener("click", () => {
    const card = header.parentElement;
    card.classList.toggle("active");
  });
});
document
  .querySelector(".learn-more-btn")
  .addEventListener("click", function () {
    alert("More information will be added soon!");
  });
