export const formatTime = (timestamp: number, timezoneOffset: number) => {
    const localMs = (timestamp + timezoneOffset) * 1000;
    return new Date(localMs).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
    });
};