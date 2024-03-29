const playSoundEffect = (soundEnabled, soundFilePath) => {
    if (soundEnabled) {
        const new_soundFilePath = `${process.env.PUBLIC_URL}/sounds/${soundFilePath}.mp3`;
        const soundEffect = new Audio(new_soundFilePath);
        soundEffect.play()
        .catch(error => console.error("효과음 재생에 실패했습니다:", error));
    }
}

export default playSoundEffect;