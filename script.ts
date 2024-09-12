
document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Type Assertion
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const userNameElement = document.getElementById('userName') as HTMLInputElement;

    // Check if all elements exist
    if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement && userNameElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const userName = userNameElement.value;
        const uniquePath = `resume/${userName.replace(/\s+/g, '')}_resume.html`;

        // Picture Elements
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

        // Resume Output
        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}

            <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span> </p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable"> ${email} </span> </p>
            <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>
            <p><strong>Address:</strong> <span id="edit-address" class="editable"> ${address} </span> </p>

            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>

            <h3>Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>

            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;

        // Downloadable link
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download CV';

        // Display the resume Output
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.classList.remove("hidden");

            // Create container for buttons
            const buttonsContainer = document.createElement("div");
            buttonsContainer.id = "buttonsContainer";
            resumeOutputElement.appendChild(buttonsContainer);

            // Add download PDF Button
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download as PDF";
            downloadButton.addEventListener("click", () => {
                window.print(); // allowing the user to save as PDF.
            });
            buttonsContainer.appendChild(downloadButton);

            // Add Shareable Link
            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", async () => {
                try {
                    // Create a unique shareable link using the userName
                    const shareableLink = `https://yourdomain.com/resume/${userName.replace(/\s+/g, "_")}_cv.html`;

                    // Clipboard API to copy the shareable link
                    await navigator.clipboard.writeText(shareableLink);
                    alert("Shareable Link Copied To Clipboard!");
                } catch (err) {
                    console.error("Failed to Copy Link:", err);
                    alert("Failed to copy Link to Clipboard. Please try again.");
                }
            });
            buttonsContainer.appendChild(shareLinkButton);
        }
    } else {
        console.error('One or more input elements are missing');
    }
});
