// This would be a server-side API endpoint in a real application
// For this demo, we'll simulate the server response

export async function sendEmail(to: string, subject: string, html: string) {
  // In a real app, this would send an email using a service like SendGrid, Mailgun, etc.

  // For demo purposes, we'll just log the email details
  console.log(`Sending email to ${to}:\nSubject: ${subject}\nContent: ${html}`);

  return {
    success: true,
    messageId: "mock_email_id_" + Math.random().toString(36).substring(2, 15),
  };
}
