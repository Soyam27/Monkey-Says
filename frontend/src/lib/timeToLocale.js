export const formatTime = (date) =>{
    const formatTime = new Date(date).toLocaleTimeString("en-US",{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }
    )

    return formatTime;
}