chrome.commands.onCommand.addListener((command, tab) => {
	if (command === "skip" && tab?.id) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id, allFrames: true },
			func: skip,
		});
	}
});

function skip() {
	for (const video of Array.from(document.querySelectorAll("video"))) {
		video.currentTime += 85;
	}
}
