import React from 'react'

function Header () {
    return (
      <header>
        <h1>
          <span aria-label="chick" role="img">🐥 </span> Chirp-tronome
          <span aria-label="chick" role="img"> 🐥</span>
        </h1>
        <p>
          Why play with a <span>click</span> when you can play with a <span>chick?</span>
        </p>
      </header>
    );
}

export default Header;