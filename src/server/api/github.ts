// This would be a server-side API endpoint in a real application
// For this demo, we'll simulate the server response

export async function getGitHubToken(code: string) {
  // In a real app, this would make a request to GitHub's OAuth endpoint
  // https://github.com/login/oauth/access_token

  // For demo purposes, we'll return a mock token
  return {
    access_token:
      "mock_github_token_" + Math.random().toString(36).substring(2, 15),
    token_type: "bearer",
    scope: "repo,read:user",
  };
}
