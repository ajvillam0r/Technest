import JSZip from "jszip";
import { saveAs } from "file-saver";

// Function to generate HTML content based on portfolio data and template
export function generatePortfolioHTML(portfolio: any, template: any) {
  // This is a simplified version - in a real app, you'd use a more sophisticated templating system
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolio.personal.fullName} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <header class="container mx-auto px-4 py-8 text-center">
    <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
      <img src="${portfolio.personal.avatar}" alt="${portfolio.personal.fullName}" class="w-full h-full object-cover">
    </div>
    <h1 class="text-3xl font-bold">${portfolio.personal.fullName}</h1>
    <p class="text-xl text-gray-600 dark:text-gray-400">${portfolio.personal.title}</p>
    <p class="text-sm mt-2">${portfolio.personal.location}</p>
    <div class="flex justify-center gap-4 mt-4">
      ${portfolio.personal.socialLinks.github ? `<a href="${portfolio.personal.socialLinks.github}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg></a>` : ""}
      ${portfolio.personal.socialLinks.linkedin ? `<a href="${portfolio.personal.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>` : ""}
      ${portfolio.personal.socialLinks.twitter ? `<a href="${portfolio.personal.socialLinks.twitter}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>` : ""}
    </div>
  </header>

  <main class="container mx-auto px-4 py-8">
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">About Me</h2>
      <p>${portfolio.personal.bio}</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Skills</h2>
      <div class="space-y-4">
        ${portfolio.skills
          .map(
            (skill: any) => `
          <div class="space-y-1">
            <div class="flex justify-between">
              <span>${skill.name}</span>
              <span>${skill.level}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: ${skill.level}%"></div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${portfolio.projects
          .map(
            (project: any) => `
          <div class="border rounded-lg overflow-hidden">
            <div class="aspect-video w-full overflow-hidden">
              <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
              <h3 class="font-bold text-lg">${project.title}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${project.description}</p>
              <div class="flex flex-wrap gap-1 mb-2">
                ${project.tags.map((tag: string) => `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded">${tag}</span>`).join("")}
              </div>
              ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline text-sm">View Project</a>` : ""}
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Education</h2>
      ${portfolio.education
        .map(
          (edu: any) => `
        <div class="mb-4">
          <h3 class="font-bold">${edu.institution}</h3>
          <div class="flex justify-between">
            <p>${edu.degree}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">${edu.year}</p>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">${edu.description}</p>
        </div>
      `,
        )
        .join("")}
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Experience</h2>
      ${portfolio.experience
        .map(
          (exp: any) => `
        <div class="mb-4">
          <h3 class="font-bold">${exp.company}</h3>
          <div class="flex justify-between">
            <p>${exp.position}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">${exp.year}</p>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">${exp.description}</p>
        </div>
      `,
        )
        .join("")}
    </section>

    <section class="text-center">
      <h2 class="text-2xl font-bold mb-4">Contact Me</h2>
      <p class="mb-2">${portfolio.personal.email}</p>
    </section>
  </main>

  <footer class="bg-gray-100 dark:bg-gray-800 py-6">
    <div class="container mx-auto px-4 text-center">
      <p>© ${new Date().getFullYear()} ${portfolio.personal.fullName}. All rights reserved.</p>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Created with TechNest Portfolio Builder</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;

  return html;
}

// Function to generate CSS content based on portfolio data and template
export function generatePortfolioCSS(portfolio: any, template: any) {
  // This is a simplified version - in a real app, you'd have different CSS for different templates
  const css = `/* Custom styles for ${portfolio.name} */

/* Add any custom CSS here */

/* Dark mode toggle */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
    color: #f3f4f6;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  header {
    padding: 1rem;
  }
  
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
`;

  return css;
}

// Function to generate JavaScript content based on portfolio data and template
export function generatePortfolioJS(portfolio: any, template: any) {
  // This is a simplified version - in a real app, you'd have different JS for different templates
  const js = `// Custom JavaScript for ${portfolio.name}

// Dark mode toggle functionality
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
}

// Set initial theme
setTheme(prefersDark.matches);

// Listen for changes
prefersDark.addEventListener('change', (e) => setTheme(e.matches));

// Add any other custom JavaScript here
`;

  return js;
}

// Main function to generate and download portfolio as ZIP
export async function generatePortfolioZip(portfolio: any, template: any) {
  try {
    const zip = new JSZip();

    // Add HTML file
    const html = generatePortfolioHTML(portfolio, template);
    zip.file("index.html", html);

    // Add CSS file
    const css = generatePortfolioCSS(portfolio, template);
    zip.file("styles.css", css);

    // Add JavaScript file
    const js = generatePortfolioJS(portfolio, template);
    zip.file("script.js", js);

    // Generate ZIP file
    const content = await zip.generateAsync({ type: "blob" });

    // Save the ZIP file
    saveAs(
      content,
      `${portfolio.name.replace(/\s+/g, "-").toLowerCase()}-portfolio.zip`,
    );

    return true;
  } catch (error) {
    console.error("Error generating portfolio ZIP:", error);
    throw error;
  }
}
