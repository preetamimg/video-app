export const handleSidebar = ()=> {
  const body = document.body;
  if(body.classList.contains('sidebarOpen')) {
    body.classList.remove('sidebarOpen')
  } else {
    body.classList.add('sidebarOpen')
  }
}