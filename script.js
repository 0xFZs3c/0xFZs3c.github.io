function updateAge() {
    const birthDate = new Date(2010, 2, 18);
    const now = new Date();
    const ageMs = now - birthDate;
    const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25); 

    const button = document.getElementById('ageButton');
    if (button) {
        button.textContent = `You just turned: ${ageYears.toFixed(12)} yo!`;
    }
}

window.addEventListener('load', function () {
    updateAge();
    setInterval(updateAge, 100); 
});
