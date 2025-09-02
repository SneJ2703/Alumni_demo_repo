// Example: Interactive recent activity (highlight on click)
document.addEventListener("DOMContentLoaded", () => {
  const recentItems = document.querySelectorAll(".recent ul li");
  
  recentItems.forEach(item => {
    item.addEventListener("click", () => {
      alert(`You clicked: ${item.textContent}`);
    });
  });
});
