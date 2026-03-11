// ==========================================
// DICTIONARY APP - script.js
// Written in simple beginner style
// ==========================================


// ==========================================
// STEP 1: GET ALL THE HTML ELEMENTS
// We need to grab each element we want to
// control using their ID from index.html
// ==========================================

// Pages
var homePage       = document.getElementById("home-page");
var definitionPage = document.getElementById("definition-page");
var bookmarksPage  = document.getElementById("bookmarks-page");
var notFoundPage   = document.getElementById("not-found-page");

// Home page elements
var searchInput          = document.getElementById("search-input");
var searchButton         = document.getElementById("search-button");
var openBookmarksButton  = document.getElementById("open-bookmarks-button");

// Definition page elements
var backButton        = document.getElementById("back-button");
var saveButton        = document.getElementById("save-button");
var wordTitle         = document.getElementById("word-title");
var phoneticText      = document.getElementById("phonetic-text");
var playAudioButton   = document.getElementById("play-audio-button");
var definitionsContainer = document.getElementById("definitions-container");

// Bookmarks page elements
var bookmarksBackButton  = document.getElementById("bookmarks-back-button");
var bookmarksContainer   = document.getElementById("bookmarks-container");

// Not found page elements
var notFoundBackButton = document.getElementById("not-found-back-button");


// ==========================================
// STEP 2: SET UP APP DATA (STATE)
// These variables remember things while
// the app is running
// ==========================================

// savedWords stores all bookmarked words
// We load from localStorage so they stay after refresh
// If nothing is saved yet, we start with an empty object {}
var savedWords = JSON.parse(localStorage.getItem("my-dictionary-words") || "{}");

// currentWord is the word we are currently looking at
var currentWord = "";

// currentWordData is the full data for that word (from the API)
var currentWordData = [];

// audioPlayer will hold the Audio object if the word has sound
var audioPlayer = null;


// ==========================================
// STEP 3: PAGE SWITCHING FUNCTIONS
// These functions show one page and
// hide all the others
// ==========================================

// Show the home page
function showHomePage() {
  homePage.classList.remove("hidden");
  definitionPage.classList.add("hidden");
  bookmarksPage.classList.add("hidden");
  notFoundPage.classList.add("hidden");
}

// Show the definition page
function showDefinitionPage() {
  homePage.classList.add("hidden");
  definitionPage.classList.remove("hidden");
  bookmarksPage.classList.add("hidden");
  notFoundPage.classList.add("hidden");
}

// Show the bookmarks page
function showBookmarksPage() {
  homePage.classList.add("hidden");
  definitionPage.classList.add("hidden");
  bookmarksPage.classList.remove("hidden");
  notFoundPage.classList.add("hidden");
}

// Show the not-found page
function showNotFoundPage() {
  homePage.classList.add("hidden");
  definitionPage.classList.add("hidden");
  bookmarksPage.classList.add("hidden");
  notFoundPage.classList.remove("hidden");
}


// ==========================================
// STEP 4: SEARCH FUNCTION
// This runs when user presses Search or Enter
// ==========================================

function searchWord() {

  // Get what the user typed and clean it up
  var word = searchInput.value.trim().toLowerCase();

  // If input is empty, do nothing
  if (word === "") {
    alert("Please type a word first!");
    return;
  }

  // If user typed more than one word, do nothing
  if (word.indexOf(" ") !== -1) {
    alert("Please search for one word at a time.");
    return;
  }

  // If the word is already saved, use the saved data (no API needed)
  if (savedWords[word]) {
    showWordDefinition(word, savedWords[word]);
    return;
  }

  // Otherwise, fetch the word from the API
  fetchWordFromAPI(word);
}


// ==========================================
// STEP 5: FETCH WORD FROM THE API
// This calls the free Dictionary API
// and gets the word data
// ==========================================

function fetchWordFromAPI(word) {

  // Show the definition page with a loading message
  definitionsContainer.innerHTML = "<p>Loading...</p>";
  showDefinitionPage();

  // The API URL — we put the word at the end
  var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

  // fetch() is a built-in JavaScript function to get data from the internet
  fetch(url)
    .then(function(response) {

      // If the word was not found, the response will not be OK
      if (!response.ok) {
        showNotFoundPage();
        return; // stop here
      }

      // Convert the response into a JavaScript object
      return response.json();

    })
    .then(function(data) {

      // If data is undefined (word not found case above), stop
      if (!data) return;

      // Show the definition on screen
      showWordDefinition(word, data);

    })
    .catch(function(error) {
      // If there was a network error, show the not found page
      showNotFoundPage();
    });
}


// ==========================================
// STEP 6: SHOW WORD DEFINITION
// This builds the definition page using
// the data we got from the API
// ==========================================

function showWordDefinition(word, data) {

  // Save to our app variables
  currentWord = word;
  currentWordData = data;
  audioPlayer = null;

  // --- Show the word title ---
  wordTitle.textContent = word;

  // --- Find and show phonetic text (pronunciation spelling) ---
  var phonetics = data[0].phonetics;
  var foundPhonetic = "";

  for (var i = 0; i < phonetics.length; i++) {
    if (phonetics[i].text) {
      foundPhonetic = phonetics[i].text;
      break; // stop as soon as we find one
    }
  }

  phoneticText.textContent = foundPhonetic;

  // --- Find and set up audio ---
  var foundAudioUrl = "";

  for (var j = 0; j < phonetics.length; j++) {
    if (phonetics[j].audio) {
      foundAudioUrl = phonetics[j].audio;
      break;
    }
  }

  if (foundAudioUrl !== "") {
    // Some URLs start with "//" so we add "https:" at the front
    if (foundAudioUrl.startsWith("//")) {
      foundAudioUrl = "https:" + foundAudioUrl;
    }
    audioPlayer = new Audio(foundAudioUrl);
    playAudioButton.classList.remove("hidden"); // show the listen button
  } else {
    playAudioButton.classList.add("hidden"); // hide the listen button
  }

  // --- Update the Save button text ---
  updateSaveButton();

  // --- Build the definitions HTML ---
  var html = "";

  for (var entryIndex = 0; entryIndex < data.length; entryIndex++) {
    var entry = data[entryIndex];

    // Add a divider line between entries (not before the first one)
    if (entryIndex > 0) {
      html += '<hr class="divider-line" />';
    }

    // Loop through each meaning (noun, verb, adjective...)
    for (var m = 0; m < entry.meanings.length; m++) {
      var meaning = entry.meanings[m];

      html += '<div class="meaning-card">';
      html += '  <span class="part-of-speech">' + meaning.partOfSpeech + '</span>';

      // Loop through each definition inside this meaning
      for (var d = 0; d < meaning.definitions.length; d++) {
        var item = meaning.definitions[d];

        // Add a number if there are multiple definitions
        var number = "";
        if (meaning.definitions.length > 1) {
          number = (d + 1) + ". ";
        }

        html += '<p class="definition-text">' + number + item.definition + '</p>';

        // Show example sentence if there is one
        if (item.example) {
          html += '<p class="example-text">"' + item.example + '"</p>';
        }
      }

      html += '</div>'; // end meaning-card
    }
  }

  // Put the HTML into the definitions container
  definitionsContainer.innerHTML = html;

  // Show the definition page
  showDefinitionPage();
}


// ==========================================
// STEP 7: AUDIO BUTTON
// Play the pronunciation when clicked
// ==========================================

playAudioButton.addEventListener("click", function() {
  if (audioPlayer !== null) {
    audioPlayer.play();
  }
});


// ==========================================
// STEP 8: SAVE / UNSAVE WORD (BOOKMARKS)
// ==========================================

// Update the save button text based on whether word is saved
function updateSaveButton() {
  if (savedWords[currentWord]) {
    saveButton.textContent = "★ Saved!";
    saveButton.style.backgroundColor = "#4caf50"; // green when saved
  } else {
    saveButton.textContent = "⭐ Save Word";
    saveButton.style.backgroundColor = "#e91e63"; // pink when not saved
  }
}

// When user clicks Save Word button
saveButton.addEventListener("click", function() {

  if (savedWords[currentWord]) {
    // Word is already saved — remove it
    delete savedWords[currentWord];
  } else {
    // Word is not saved — save it
    savedWords[currentWord] = currentWordData;
  }

  // Save to localStorage so it stays after refresh
  localStorage.setItem("my-dictionary-words", JSON.stringify(savedWords));

  // Update the button look
  updateSaveButton();
});


// ==========================================
// STEP 9: BOOKMARKS PAGE
// Show the list of all saved words
// ==========================================

function showSavedWords() {

  var wordList = Object.keys(savedWords); // get array of all saved word names

  var html = "";

  if (wordList.length === 0) {
    // No saved words yet
    html = '<p class="empty-message">No saved words yet.<br>Search a word and click Save Word!</p>';
  } else {
    // Build a row for each saved word
    for (var i = 0; i < wordList.length; i++) {
      var word = wordList[i];

      // Count how many meanings this word has
      var totalMeanings = 0;
      for (var e = 0; e < savedWords[word].length; e++) {
        totalMeanings += savedWords[word][e].meanings.length;
      }

      var meaningLabel = totalMeanings === 1 ? "meaning" : "meanings";

      html += '<div class="bookmark-row" data-word="' + word + '">';
      html += '  <div>';
      html += '    <div class="bookmark-word-name">' + word + '</div>';
      html += '    <div class="bookmark-word-count">' + totalMeanings + ' ' + meaningLabel + '</div>';
      html += '  </div>';
      html += '  <button class="delete-button" data-word="' + word + '">🗑 Remove</button>';
      html += '</div>';
    }
  }

  bookmarksContainer.innerHTML = html;

  // --- Add click events to each row ---
  var rows = bookmarksContainer.querySelectorAll(".bookmark-row");

  for (var r = 0; r < rows.length; r++) {
    rows[r].addEventListener("click", function(event) {

      // If user clicked the Remove button, don't open the word
      if (event.target.classList.contains("delete-button")) return;

      var clickedWord = this.getAttribute("data-word");
      showWordDefinition(clickedWord, savedWords[clickedWord]);
    });
  }

  // --- Add click events to each Remove button ---
  var deleteButtons = bookmarksContainer.querySelectorAll(".delete-button");

  for (var b = 0; b < deleteButtons.length; b++) {
    deleteButtons[b].addEventListener("click", function(event) {
      event.stopPropagation(); // prevent the row click from firing too

      var wordToRemove = this.getAttribute("data-word");
      delete savedWords[wordToRemove];
      localStorage.setItem("my-dictionary-words", JSON.stringify(savedWords));

      // Refresh the bookmarks page
      showSavedWords();
    });
  }

  showBookmarksPage();
}


// ==========================================
// STEP 10: BUTTON CLICK EVENTS
// Connect all buttons to their functions
// ==========================================

// Search button click
searchButton.addEventListener("click", function() {
  searchWord();
});

// Press Enter key in the search box
searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchWord();
  }
});

// Open bookmarks button (home page)
openBookmarksButton.addEventListener("click", function() {
  showSavedWords();
});

// Back button (definition page → home)
backButton.addEventListener("click", function() {
  searchInput.value = ""; // clear the search box
  showHomePage();
});

// Back button (bookmarks page → home)
bookmarksBackButton.addEventListener("click", function() {
  showHomePage();
});

// Back button (not found page → home)
notFoundBackButton.addEventListener("click", function() {
  searchInput.value = ""; // clear the search box
  showHomePage();
});
