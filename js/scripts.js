$(document).ready(function () {
  let currentStep = 1;

  function updateProgressBar() {
    const progressSteps = $(".progress-step");
    progressSteps.each(function (index) {
      if (index < currentStep) {
        $(this).addClass("progress-step-active");
      } else {
        $(this).removeClass("progress-step-active");
      }
    });
    const progress = $("#progress");
    progress.css(
      "width",
      ((currentStep - 1) / (progressSteps.length - 1)) * 100 + "%"
    );
  }

  function showStep(step) {
    $(".step").removeClass("step-active");
    $("#step" + step).addClass("step-active");
    updateProgressBar();
  }

  function validateField(field) {
    const validationMessage = $(field).siblings(".validation-message");
    if (!field.checkValidity()) {
      $(field).addClass("invalid");
      validationMessage.show();
      return false;
    } else {
      $(field).removeClass("invalid");
      validationMessage.hide();
      return true;
    }
  }

  function validateStep(step) {
    let isValid = true;
    $("#step" + step + " input, #step" + step + " select").each(function () {
      if (!validateField(this)) {
        isValid = false;
      }
    });
    return isValid;
  }

  function updateSummary() {
    let summary = `
            <p><strong>Name:</strong> ${$("#name").val()}</p>
            <p><strong>Email:</strong> ${$("#email").val()}</p>
            <p><strong>Category:</strong> ${$("#category").val()}</p>
        `;
    if ($("#programmingLanguage").length) {
      summary += `<p><strong>Programming Language:</strong> ${$(
        "#programmingLanguage"
      ).val()}</p>`;
    }
    if ($("#dietaryPreferences").length) {
      summary += `<p><strong>Dietary Preferences:</strong> ${$(
        "#dietaryPreferences"
      ).val()}</p>`;
    }
    if ($("#educationLevel").length) {
      summary += `<p><strong>Education Level:</strong> ${$(
        "#educationLevel"
      ).val()}</p>`;
    }
    $("#summary").html(summary);
  }

  $(".next").click(function () {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        currentStep++;
        if (currentStep === 3) {
          updateSummary();
        }
        showStep(currentStep);
      }
    }
  });

  $(".prev").click(function () {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });

  $("#category").change(function () {
    const category = $(this).val();
    let additionalFields = "";
    if (category === "tech") {
      additionalFields = `
                <label for="programmingLanguage">Programming Language:</label>
                <select id="programmingLanguage" name="programmingLanguage" required>
                    <option value="">Select...</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
                <div class="validation-message">Please select a programming language.</div>
            `;
    } else if (category === "health") {
      additionalFields = `
                <label for="dietaryPreferences">Dietary Preferences:</label>
                <select id="dietaryPreferences" name="dietaryPreferences" required>
                    <option value="">Select...</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-Free</option>
                </select>
                <div class="validation-message">Please select a dietary preference.</div>
            `;
    } else if (category === "education") {
      additionalFields = `
                <label for="educationLevel">Education Level:</label>
                <select id="educationLevel" name="educationLevel" required>
                    <option value="">Select...</option>
                    <option value="high-school">High School</option>
                    <option value="bachelors">Bachelors</option>
                    <option value="masters">Masters</option>
                </select>
                <div class="validation-message">Please select an education level.</div>
            `;
    }
    $("#additionalFields").html(additionalFields);
  });

  $("#multiStepForm").submit(function (event) {
    event.preventDefault();
    if (validateStep(currentStep)) {
      let summary = $("#summary").html();
      showThankYouPage(summary);
    }
  });

  function showThankYouPage(summary) {
    $(".container").html(`
            <div class="thank-you">
                <h2>Thank You!</h2>
                <p>Your submission has been received.</p>
                <div>${summary}</div>
                <button id="returnBtn">Return to First Page</button>
            </div>
        `);

    $("#returnBtn").click(function () {
      location.reload();
    });
  }

  // Event listeners to hide validation messages on input change
  $(document).on("input change", "input, select", function () {
    validateField(this);
  });

  showStep(currentStep);
});
