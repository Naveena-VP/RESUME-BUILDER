function generateResume() {

    // Get values from the form
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let location = document.getElementById("location").value;
    let objective = document.getElementById("objective").value;
    let education = document.getElementById("education").value;
    let skills = document.getElementById("skills").value;
    let projects = document.getElementById("projects").value;
    let experience = document.getElementById("experience").value;


    // Display values in resume preview

    document.getElementById("previewName").textContent =
        name || "Your Name";

    document.getElementById("previewEmail").textContent =
        email || "email@example.com";

    document.getElementById("previewPhone").textContent =
        phone || "Phone";

    document.getElementById("previewLocation").textContent =
        location || "Location";

    document.getElementById("previewObjective").textContent =
        objective || "Your career objective will appear here.";

    document.getElementById("previewEducation").textContent =
        education || "Your education details will appear here.";

    document.getElementById("previewSkills").textContent =
        skills || "Your skills will appear here.";

    document.getElementById("previewProjects").textContent =
        projects || "Your project details will appear here.";

    document.getElementById("previewExperience").textContent =
        experience || "Your experience details will appear here.";

    alert("Resume generated successfully!");
}


function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("location").value = "";
    document.getElementById("objective").value = "";
    document.getElementById("education").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("projects").value = "";
    document.getElementById("experience").value = "";

    document.getElementById("previewName").textContent = "Your Name";
    document.getElementById("previewEmail").textContent = "email@example.com";
    document.getElementById("previewPhone").textContent = "Phone";
    document.getElementById("previewLocation").textContent = "Location";
    document.getElementById("previewObjective").textContent =
        "Your career objective will appear here.";
    document.getElementById("previewEducation").textContent =
        "Your education details will appear here.";
    document.getElementById("previewSkills").textContent =
        "Your skills will appear here.";
    document.getElementById("previewProjects").textContent =
        "Your project details will appear here.";
    document.getElementById("previewExperience").textContent =
        "Your experience details will appear here.";
}


function downloadResume() {

    window.print();

}