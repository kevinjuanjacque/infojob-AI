

export const createDescription =  (details) => {
    return `

    ${details.title}
    
    los requerimientos minimos son:
    ${details.minRequirements}
    
    las skills necesarias son:
    ${details.skillsList.map(skill => skill.skill).join(', ')}
    
    la descripción del perfil es:
    ${details.profile.description}
    
    la descripción del cargo es:
    ${details.description}
    
    los studios minimos son:
    ${details.studiesMin.value}
    
    
    
    la experiencia minima requerida es:
    ${details.experienceMin.value}
     `
}