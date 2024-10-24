function validateCode() {
    const code = document.getElementById('codeInput').value;
    const fileType = document.getElementById('fileType').value;
    const resultDiv = document.getElementById('result');

    let isValid = false;

    try {
        if (fileType === 'json') {
            JSON.parse(code); // Intenta analizar el JSON
            isValid = true;
        } else if (fileType === 'xml') {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(code, "application/xml");
            const parseError = xmlDoc.getElementsByTagName("parsererror");
            if (parseError.length > 0) {
                throw new Error("Error de análisis en XML.");
            }
            isValid = true;
        }
    } catch (error) {
        isValid = false;
        resultDiv.innerText = error.message;
        resultDiv.classList.add('error');
        return;
    }

    resultDiv.innerText = isValid ? "El código es válido." : "El código no es válido.";
    resultDiv.classList.remove('error');
}