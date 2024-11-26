function generateJobSelectionEmailTemplate({
    applicantName,
    jobTitle,
    companyName,
    contactEmail,
    startDate,
    onboardingDetails,
  }) {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h1 style="color: #0B5394;">Welcome Aboard, ${applicantName}!</h1>
          <p>Dear ${applicantName},</p>
          <p>
            We are delighted to inform you that you have been selected for the role of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.
          </p>
          <p>
            Your qualifications and expertise impressed us greatly, and we are excited to welcome you as part of our team.
          </p>
          
          <p>
            <strong>Onboarding Information:</strong><br>
            ${onboardingDetails}
          </p>
          <p>
            Kindly confirm your acceptance of this offer by responding to this email. If you have any questions or need further clarification, don’t hesitate to contact us at <a href="mailto:${contactEmail}">${contactEmail}</a>.
          </p>
          <p>We eagerly anticipate working with you and wish you a smooth onboarding experience!</p>
          <p>Warm regards,</p>
          <p>The ${companyName} Team</p>
        </div>
      `;
  }
  
  module.exports = {
    generateJobSelectionEmailTemplate,
  };
  