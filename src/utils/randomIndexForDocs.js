export function generateRandomCode() {
    const russianLetters = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ';
    const randomDigit = Math.floor(Math.random() * 10).toString();
    const randomLetter = russianLetters[Math.floor(Math.random() * russianLetters.length)];
    return randomDigit + randomLetter;
}