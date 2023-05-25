


export const createCV= (cv, skills, experience, education)=> {
    let text = "";
    text += "Nombre: " + cv[0].name + "\n";
    text += "ID: " + cv[0].id + "\n\n";
    text += "Habilidades:\n";
    skills.expertise.forEach((skill) => {
      text += "- " + skill.skill + ": " + skill.level + "\n";
    });
    text += "\nExperiencia:\n";
    experience.experience.forEach((job) => {
      text += "- " + job.job + " en " + job.company + "\n";
      text += "  Desde: " + job.startingDate.slice(0, 10) + "\n";
      if (job.onCourse) {
        text += "  Hasta: Actualidad\n";
      } else {
        text += "  Hasta: " + job.finishingDate.slice(0, 10) + "\n";
      }
      text += "  Habilidades:\n";
      job.expertise.forEach((skill) => {
        text += "    - " + skill.skill + "\n";
      });
      text += "\n";
    });
    text += "\nEducación:\n";
    education.education.forEach((edu) => {
      text +=
        "- " +
        edu.educationLevelCode +
        ": " +
        edu.courseCode +
        ", en " +
        edu.institutionName +
        "\n";
      text += "  Desde: " + edu.startingDate.slice(0, 10) + "\n";
      if (edu.stillEnrolled) {
        text += "  Hasta: Actualidad\n";
      } else {
        text += "  Hasta: " + edu.finishingDate.slice(0, 10) + "\n";
      }
      text += "\n";
    });
    return text;
  }