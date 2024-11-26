function generateJobRejectionEmailTemplate({
    applicantName,
    jobTitle,
    companyName,
    contactEmail,
  }) {
        // Generate an HTML email template for job rejection
    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h1 style="color: #D9534F;">Application Decision</h1>
          <p>Dear ${applicantName},</p>
          <p>
            Thank you for your interest in the <strong>${jobTitle}</strong> role at <strong>${companyName}</strong>.
          </p>
          <p>
            After a thorough review, we regret to inform you that we are unable to proceed with your application at this time.
          </p>
          <p>
            We sincerely appreciate the effort you put into your application and encourage you to explore future opportunities with us that align with your skills and experience. We wish you great success in your job search.
          </p>
          <p>
            If you have any questions or would like additional feedback, please don’t hesitate to contact us at <a href="mailto:${contactEmail}">${contactEmail}</a>.
          </p>
          <p>Best regards,</p>
          <p>The ${companyName} Hiring Team</p>
        </div>
      `;
  }
    // Export the function for use in other modules
  module.exports = {
    generateJobRejectionEmailTemplate,
  };
  