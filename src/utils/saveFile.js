export const saveJsonToFile = (jsonData, filename) => {
    const jsonString = JSON.stringify(jsonData, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'data.json';

    a.click();

    URL.revokeObjectURL(url);
};