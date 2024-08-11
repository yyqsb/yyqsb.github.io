document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const playlist = document.getElementById('playlist');
    const audioPlayer = document.getElementById('audioPlayer');
    playlist.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const listItem = document.createElement('li');
        listItem.textContent = file.name;

        listItem.addEventListener('click', function() {
            const objectUrl = URL.createObjectURL(file);
            audioPlayer.src = objectUrl;
            audioPlayer.play();
        });

        playlist.appendChild(listItem);
    }
});
