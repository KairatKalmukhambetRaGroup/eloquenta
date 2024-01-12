export const convertLocalDateTimeArrayToTimestamp = (localDateTimeArray: [number, number, number, number, number]) =>{
    // Assuming localDateTimeArray is an array in the format [year, month, day, hour, minute]
    const [year, month, day, hour, minute] = localDateTimeArray;
  
    // Create a JavaScript Date object
    const jsDate = new Date(year, month - 1, day, hour, minute);
  
    // Get the timestamp (milliseconds since Unix Epoch)
    const timestamp = jsDate.getTime();
  
    return timestamp;
}