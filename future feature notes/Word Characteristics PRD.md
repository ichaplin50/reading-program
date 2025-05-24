The goal of this feature is to enable users to customize their sessions to only include words with certain characteristics. This enables users to customize sessions to focus on words of interest -- for example, a kid that really wants to do animal words, or card words -- or to focus on educational priorities -- for example, a new letter or phonic.

Requirements:
1. We should define characteristics of each word and then enable filters on each word characteristic.
2. We will have multiple characteristic categories, and multiple characteristic values within each category. Examples:
	1. Word Type: animal, car, person, action, etc.
	2. Letters: a, b, c, d, ..., z
	3. Phonics:  ou, oo, aw, etc.
3. The default setting should be to have all categories/words enabled
4. There will eventually be a lot of different options to select from, so we cannot put the options on the start screen. So we should have a "Customize Words" button on the start screen that takes the user to a separate "Customize Words" screen where they can apply their filters.
5. On the "Customize Words" screen, there should be groupings by category with all of the different value options within. For example -- a header that says "Word Type" with options to select from animal, car, person, action, etc. 
	1. There should be a select/deselect all option too. 
6. We should allow multi-select -- for example, you can choose "animal" and "car" and the session will include both animal words and car words.
7. The filter logic should be "AND" -- so the word set for a session is the *intersection* of filters, not the union. So if you select 
8. The session length slider should update to account for the min/max session length parameters. In other words, if the user selects that they only want "animal" words, and there are 8 total animal words, then the session length slider should update to allow the user to select length values from 1 word to 8 words.
9. We always need at least one word to meet the criteria, so we should design the experience to ensure there is always at least one qualifying word. Ideally, we achieve this by having an intuitive, on-rails experience that never allows for any scenario where the user accidentally enters selection where 0 words qualify. If not, we need some sort of validation logic and experience. There are some competing considerations here:
	1. **user experience - customization:** increasing flexibility by allowing for users to apply filters across multiple categories with multiple selections within a category can create a positive experience for 'power users' who really want to tune the game to their kid's needs. For example, the user may want to work on a phonic while also restricting the words to a difficulty level matching their child's current reading capabilities.
	2. **user experience - ease of use/complexity:** on the other hand, flexibility can be in tension with ease of use for the average user who may just want to select "cars" as quickly, easily, and intuitively as possible. 
	3. **user experience - invalid selections:** allowing users to apply filters that result in zero qualifying words is a negative experience, especially if that is late feedback or a disruptive dialog box. 
	4. **scalability:** we want to ensure our design and experience scales up with new words. so defining presets may be tempting for ease of use/complexity, but we would need to do so in a way that doesn't require hard coding new presets for every new word. 
10. Filters should persist across sessions. 
11. Future requirements:
	1. analytics
	2. a derived 'difficulty' score as a word characteristic
12. Produce a design:
	1. consider phasing (can start with one category)
	2. consider implementation that a word to have multiple characteristics within a category. For example, a word could have multiple phonics within it (thought will have the "th" and "ought" phonices)
	3. consider implementation that will scale up as new words are added -- how do we make it as easy as possible to add new words? right now we have a few dozen words; if we will eventually have 1000+, how do we make adding words and assigning these characteristics as easy as possible, while still protecting the UX tenets we've described above?
	4. For filter persistence, consider trade-offs between localStorage and cookies.


Ask about:
-implementation to account for a word having multiple characteristics within a single category (ex: box will have letters b, o, and x)
-mock ups
-options for selection (check box, filters)