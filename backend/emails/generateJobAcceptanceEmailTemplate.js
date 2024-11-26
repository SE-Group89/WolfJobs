function generateJobAcceptanceEmailTemplate({
    applicantName,
    jobTitle,
    companyName,
    contactEmail,
    applicationDate,
    nextSteps,
  }) {
    
    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h1 style="color: #0B5394;">Congratulations on Your Application Acceptance!</h1>
          <p>Dear ${applicantName},</p>
          <p>
            We are delighted to let you know that your application for the role of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been successfully accepted as of ${applicationDate}.
          </p>
          <p>
            Your skills and experience stood out to us, and we are confident that you will make a great addition to our team.
          </p>
          <p>
          <strong>What’s Next:</strong><br>
          ${nextSteps}
        </p>
          <p>
            If you have any queries, feel free to contact us at <a href="mailto:${contactEmail}">${contactEmail}</a>.
          </p>
          <p>Warm regards,</p>
          <p>The Recruitment Team at ${companyName}</p>
        </div>
      `;
  }
  
  module.exports = { generateJobAcceptanceEmailTemplate };
  