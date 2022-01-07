 // resaltar   el link  activo  en navbar 

const activePage = window.location.pathname
const navLink = document.querySelectorAll('.nav-link')


navLink.forEach(element => {
    
    if(element.href.includes(`${activePage}`)){
        element.classList.add('active');
    }
    
});