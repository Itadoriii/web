const toggleButton = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const navbar = document.getElementById('navbar');
    
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  navbar.classList.toggle('navbar-dark');
  navbar.classList.toggle('bg-dark');
  navbar.classList.toggle('navbar-light');
  navbar.classList.toggle('bg-light');
  
  if (document.body.classList.contains('dark-mode')) {
    darkModeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    darkModeIcon.classList.replace('fa-sun', 'fa-moon');
  }
});

