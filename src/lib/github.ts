import { Octokit } from "@octokit/rest";

let octokit: Octokit | null = null;

export async function initGitHub(accessToken: string) {
  octokit = new Octokit({ auth: accessToken });
  return octokit;
}

export async function getAuthUrl() {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = `${import.meta.env.VITE_APP_URL}/github-callback`;
  const scope = "repo,read:user";

  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
}

export async function getAccessToken(code: string) {
  const response = await fetch("/api/github/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error("Failed to get GitHub access token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function getUserRepositories() {
  if (!octokit) {
    throw new Error("GitHub not initialized");
  }

  const { data } = await octokit.repos.listForAuthenticatedUser({
    visibility: "public",
    sort: "updated",
    per_page: 100,
  });

  return data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
    updated_at: repo.updated_at,
  }));
}

export async function getRepositoryDetails(owner: string, repo: string) {
  if (!octokit) {
    throw new Error("GitHub not initialized");
  }

  const [repoData, languages] = await Promise.all([
    octokit.repos.get({ owner, repo }),
    octokit.repos.listLanguages({ owner, repo }),
  ]);

  return {
    id: repoData.data.id,
    name: repoData.data.name,
    description: repoData.data.description,
    url: repoData.data.html_url,
    stars: repoData.data.stargazers_count,
    languages: Object.keys(languages.data),
    updated_at: repoData.data.updated_at,
  };
}
