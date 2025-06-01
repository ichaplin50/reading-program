# reading-program
little js program to help make learning how to read engaging and rewarding!

NOTES:
To add a tag with associated filtering and auto-generation, the following steps must be followed:
1. In generate-tags.js, make changes to auto-generate the value, including:
	1. add the new property
2. In script.js, add filter logic for the new value, including:
	1. extend the filters object
	2. update filterwords() to include the new property
	3. update renderFilters() to include the new property
3. In index.html, add the filter UI for the new value
