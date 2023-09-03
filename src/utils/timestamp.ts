// Step 1: Get the current date and time in the browser's local timezone
const currentDateTime = new Date();

// Step 2: Determine the client's locale

// Step 3: Format the current datetime using the client's locale
const formattedDateTime = formatWithClientLocale(currentDateTime);

// Print the current datetime and formatted datetime
console.log("Current Datetime:", currentDateTime);
console.log("Formatted Local Datetime:", formattedDateTime);

// Helper function to format datetime based on client's locale
function formatWithClientLocale(dateTime: any) {
	const clientLocale = navigator.language;
	const options: any = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	};
	return new Intl.DateTimeFormat(clientLocale, options)
		.format(dateTime)
		.replace(",", "");
}

export { currentDateTime, formatWithClientLocale };
