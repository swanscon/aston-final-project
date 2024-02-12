export const mapDurationToHours = (duration) => {
    const sections = duration.split(" ");
if(sections[0] < 10) {
    sections[0] = "0" + sections[0];
}
    return sections[0];
}

export const mapDurationToMinutes = (duration) => {
    const sections = duration.split(" ");
    if(sections.length < 4) {
        return sections[0];
    } 
    return sections[2];
}