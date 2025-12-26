function showSection( id ) {
    
  const sections = document.querySelectorAll( "main > section" );

  for ( let i = 0; i < sections.length; i++ ) {
    sections[i].classList.remove( "visible" );
  }

  const target = document.getElementById( id );
target.classList.add( "visible" );
  
}
