const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const topFlap = document.getElementById('topFlap');
const letter = document.getElementById('letter');

openBtn.addEventListener('click', () => {
  topFlap.style.transform = 'rotateX(180deg)';
  letter.style.top = '10px';
});

closeBtn.addEventListener('click', () => {
  topFlap.style.transform = 'rotateX(0deg)';
  letter.style.top = '90px';
});
