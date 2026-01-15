const webhookURL = "https://discord.com/api/webhooks/1461479576789192959/ii0I1LlHOIRIV-8jSGt9jOiUfP0pL0M49oS0vQIvBEGYwIZ_9rKVNjhUFGJAoXFtcFMQ";

const form = document.getElementById("staffForm");
const roleSelect = document.getElementById("role");
const modFields = document.getElementById("moderatorFields");
const betaFields = document.getElementById("betaFields");
const messageEl = document.getElementById("formMessage");

if(roleSelect){
  roleSelect.addEventListener("change", () => {
    if(roleSelect.value === "Moderator"){
      modFields.style.display = "block";
      betaFields.style.display = "none";
    } else {
      modFields.style.display = "none";
      betaFields.style.display = "block";
    }
  });
}

if(form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const role = roleSelect.value;
    const discord = document.getElementById("discord").value;

    let fields = [
      { name: "Role", value: role },
      { name: "Discord", value: discord }
    ];

    if(role === "Moderator"){
      const exp = document.getElementById("modExperience").value;
      const reason = document.getElementById("modReason").value;
      fields.push({ name: "Moderation Experience", value: exp });
      fields.push({ name: "Reason", value: reason });
    } else {
      const platform = document.getElementById("betaPlatform").value;
      const feedback = document.getElementById("betaFeedback").value;
      fields.push({ name: "Platform/Device", value: platform });
      fields.push({ name: "Testing Experience", value: feedback });
    }

    const data = { embeds: [{ title: "New Staff Application", color: 5814783, fields }] };

    try {
      const res = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if(res.ok){
        messageEl.textContent = "Application submitted successfully!";
        messageEl.style.color = "lightgreen";
        form.reset();
        modFields.style.display = "block";
        betaFields.style.display = "none";
      } else {
        messageEl.textContent = "Failed to submit. Try again.";
        messageEl.style.color = "red";
      }
    } catch(err){
      messageEl.textContent = "Error sending application.";
      messageEl.style.color = "red";
      console.error(err);
    }
  });
}
