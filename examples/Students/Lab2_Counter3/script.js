let count = 0;

document.getElementById('increase').addEventListener('click', () => {
    count++;
    document.getElementById('count').innerText = count;
});

document.getElementById('decrease').addEventListener('click', () => {
    count--;
    document.getElementById('count').innerText = count;
});
