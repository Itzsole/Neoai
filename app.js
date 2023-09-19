const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

// Replace 'YOUR_API_KEY' with your actual OpenAI API key
const apiKey = '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';

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, NEO is ready to help you?");
    } else if (message.includes("open google")) {
        window.location.href = "https://www.google.com";
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.location.href = "https://www.youtube.com";
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.location.href = "https://www.facebook.com";
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        // Send the query to OpenAI API
        fetch('https://api.openai.com/v1/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                question: message,
                model: 'text-davinci-002', // You can choose a different model
                examples_context: 'Contextual information if needed',
                max_tokens: 50, // Adjust the response length as needed
            }),
        })
            .then(response => response.json())
            .then(data => {
                const answer = data.answers[0];
                content.textContent = answer;
                speak(answer);
            })
            .catch(error => {
                console.error('Error fetching data from OpenAI:', error);
                content.textContent = "I'm sorry, I couldn't find an answer.";
                speak("I'm sorry, I couldn't find an answer.");
            });
    } else {
        // Handle other commands or queries as before
    }
}
