# EXPLANATION OF DOM MANIPULATION IN THIS PROJECT:
DOM (Document Object Model) manipulation refers to using JavaScript to access and modify HTML elements dynamically.
<u>How DOM works in this project?</u>
* JavaScript selects HTML elements using getElementById() or querySelector().
* When the user searches for a stock or crypto symbol, JavaScript updates the text, values, and styles of elements on the webpage.
* The page does not reload; only the required parts of the UI change.

<u>Example actions in the project:</u>
* Reading user input from the search box
* Updating price text and percentage change
* Changing colors (green/red) based on price movement
* Updating charts dynamically

# HOW DATA FLOWS IN THE PROJECT?
1. User Input: 
The user enters a stock or crypto symbol and clicks the search button. 
2. API Request: 
JavaScript captures the input value. 
A fetch()request is sent to a market data API.
3. API Response:
 The API returns market data in JSON format.
4. Processing the Data:
JavaScript extracts required values(price,change,volume)
5. UI Update(DOM Manipulation):
The extracted data is inserted into HTML elements. 
Charts and texts update dynamically without refreshing the page. 
## DIAGRAM: 
![]

# SCREENSHOTS: 
1. UI: 
![UI Screenshot](images\FINOVA_DATA_VIEWER_UI.jpeg)
2. CHART OUTPUT: 
![CHART OUTPUT](images\CHART OUTPUT.jpeg)

### 1.SCREENSHOT OF UI IN BROWSER  
![Screenshot of UI](images/sc_of_UI.png)

### 2.GIT COMMANDS USED  
#### 2.1 INITIALISE GIT:
![git_initialise](images/initialisegit.png)  
![git_initialise_2](images/initialisegit2.png)  
#### 2.2 GITHUB INITIALISE:  
![github_initialise](images/github_initialise.png)  
#### 2.3 add,commit,push commands used:
![git_commands1](images/update_htmlcss.png)  
![git_commands2](images/added_images.png)




