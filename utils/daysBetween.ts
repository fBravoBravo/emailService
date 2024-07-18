export function daysBetween(date1: Date, date2: Date) {
    // Convert the dates to milliseconds
    const milliseconds1 = date1.getTime();
    const milliseconds2 = date2.getTime();

    // Calculate the difference in milliseconds
    const difference = Math.abs(milliseconds1 - milliseconds2);

    // Convert the difference to days (1 day = 1000 milliseconds * 60 seconds/minute * 60 minutes/hour * 24 hours/day)
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return days;
}
