// Klassen för Jeopardy frågor
class JeopardyQuestion {
  constructor(category, question, answer) {
    this.category = category;
    this.question = question;
    this.answer = answer;
  }
}

// Variabel för att lagra den aktuella frågan
let currentQuestion;

// Funktion för att hämta Jeopardy frågor från API
function fetchJeopardyQuestion() {
  const url = "https://jservice.io/api/random";

  // Gör en asynkron GET-förfrågan med jQuery Ajax
  $.ajax({
    url: url,
    success: function (response) {
      const category = response[0].category.title; // Extraherar kategorin från API-svaret
      const question = response[0].question; // Extraherar frågan från API-svaret
      const answer = response[0].answer; // Extraherar svaret från API-svaret

      // Skapar en ny JeopardyQuestion instans med hämtad data
      currentQuestion = new JeopardyQuestion(category, question, answer);

      // Visar Jeopardy frågan i gränssnittet
      displayJeopardyQuestion(currentQuestion);
    },
    error: function (error) {
      console.log("Ett fel inträffade vid hämtning av Jeopardy fråga:", error);
    },
  });
}

// Funktion för att visa Jeopardy frågan i gränssnittet
function displayJeopardyQuestion(question) {
  $("#category").text(question.category); // Sätter kategorirubriken
  $("#question").text(question.question); // Sätter frågerubriken
  $("#answer").text(question.answer); // Sätter svaret
}

// Kör koden när hemsidan har laddats in
$(document).ready(function () {
  fetchJeopardyQuestion(); // Hämtar första Jeopardy frågan när sidan laddas

  // Eventlyssnare för "Visa svar" knappen
  $("#answer-button").click(function () {
    $("#answer").show(); // Visar svaret när knappen klickas
  });

  // Eventlyssnare för "Nästa fråga" knappen
  $("#next-button").click(function () {
    $("#answer").hide(); // Döljer svaret när knappen klickas
    fetchJeopardyQuestion(); // Hämtar nästa Jeopardy fråga
  });
});
