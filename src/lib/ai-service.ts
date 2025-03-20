// This is a mock AI service - in a real app, you would connect to an actual AI API

// Function to generate AI suggestions for portfolio bio
export async function generateBioSuggestion(currentBio: string, skills: any[]) {
  try {
    // In a real app, you would call an AI API here
    // For now, we'll simulate a response with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const skillNames = skills.map((skill) => skill.name).join(", ");

        // Generate a more professional bio based on the current one
        const improvedBio = `Passionate and results-driven professional with expertise in ${skillNames}. ${currentBio.replace(/^Passionate/, "I am dedicated to").replace(/\.$/, "")} with a strong focus on delivering high-quality solutions and continuous learning.`;

        resolve(improvedBio);
      }, 1500);
    });
  } catch (error) {
    console.error("Error generating bio suggestion:", error);
    throw error;
  }
}

// Function to generate AI suggestions for project descriptions
export async function generateProjectSuggestions(projects: any[]) {
  try {
    // In a real app, you would call an AI API here
    // For now, we'll simulate a response with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const improvedProjects = projects.map((project) => {
          // Generate a more detailed project description
          const tags = project.tags.join(", ");
          const improvedDescription = `${project.description.replace(/\.$/, "")} Implemented using ${tags}, focusing on performance, scalability, and user experience.`;

          return {
            ...project,
            description: improvedDescription,
          };
        });

        resolve(improvedProjects);
      }, 1500);
    });
  } catch (error) {
    console.error("Error generating project suggestions:", error);
    throw error;
  }
}

// Function to generate AI suggestions for skill improvements
export async function generateSkillSuggestions(
  skills: any[],
  experience: any[],
) {
  try {
    // In a real app, you would call an AI API here
    // For now, we'll simulate a response with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // Extract technologies from experience
        const experienceText = experience
          .map((exp) => exp.description)
          .join(" ");

        // Suggest additional skills based on experience
        const additionalSkills = [];

        if (
          experienceText.toLowerCase().includes("react") &&
          !skills.some((s) => s.name === "Redux")
        ) {
          additionalSkills.push({ name: "Redux", level: 75 });
        }

        if (
          experienceText.toLowerCase().includes("web") &&
          !skills.some((s) => s.name === "Responsive Design")
        ) {
          additionalSkills.push({ name: "Responsive Design", level: 85 });
        }

        if (
          experienceText.toLowerCase().includes("developer") &&
          !skills.some((s) => s.name === "Git")
        ) {
          additionalSkills.push({ name: "Git", level: 80 });
        }

        resolve(additionalSkills);
      }, 1500);
    });
  } catch (error) {
    console.error("Error generating skill suggestions:", error);
    throw error;
  }
}

// Main function to get all AI suggestions for a portfolio
export async function getAISuggestions(portfolio: any) {
  try {
    // Get all suggestions in parallel
    const [bioSuggestion, projectSuggestions, skillSuggestions] =
      await Promise.all([
        generateBioSuggestion(portfolio.personal.bio, portfolio.skills),
        generateProjectSuggestions(portfolio.projects),
        generateSkillSuggestions(portfolio.skills, portfolio.experience),
      ]);

    return {
      bioSuggestion,
      projectSuggestions,
      skillSuggestions,
    };
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    throw error;
  }
}
