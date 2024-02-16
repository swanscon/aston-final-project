export const parseTime = (timeString) => {
    if (typeof timeString !== 'string') {
        console.error('parseTime expects a string in "HH:MM:SS" format');
        return new Date(); // Return current time as fallback
    }
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
};

export const formatTimeForSubmission = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60; // Calculate the remaining seconds

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatAmPm = (timeString) => {
    if(timeString === null) {
        return "";
    }
    // eslint-disable-next-line
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const period = hours < 12 ? "am" : "pm";
    let adjustedHours = hours % 12 || 12;

    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}