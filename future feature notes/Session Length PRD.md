The goal of this feature is to enable people to select the length of their session, in terms of word count. Right now, the game is hard coded to a 10 word session length, and we would like to give people the flexibility to select session length based on the age of their child, the amount of time they have at the moment, the interest of their child, etc.

Here are the requirements:
1. We should enable people to set the session length, in terms of words, on the start screen.
2. There should be a minimum and maximum session length. The minimum length is 1 word. The maximum length is the total number of words that have been recorded in the game. 
	1. The maximum length should not be hard coded -- as we add words, the maximum should increase automatically without needing to edit a hard coded value in a separate location.
3. The default session length should be 10 words
4. When the user clicks the "Start Game" button, the session length should be based on the value in the session length option.

Design notes:
1. Implement the session length control as a slider to prevent the risk of invalid entry.
2. Try to structure the code in a way that will allow for us to easily add analytics on common session lengths in the future.