function bp_thumbnail_resize(inFrames, tab) {
	image_tag = '<img width="317" height="210" src="' + inFrames.replace("/s72-c/", "/w317-h210-c/") +'" alt="' + tab.replace(/"/g,"") + '" title="' + tab.replace(/"/g,"") +'"/>';
	if (tab !="") {
		return image_tag;
	} else {
		return"";
	}
};