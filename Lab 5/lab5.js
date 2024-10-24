const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

notes.forEach(note => {
    document.getElementById(`key${note}`).addEventListener('click', function() {
        playSound(note);
    });
});

function playSound(note) {
    const audio = new Audio(`Sounds/${note}.wav`);
    audio.play();
}
