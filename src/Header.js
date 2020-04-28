import React from 'react'

function Header () {
    return (
      <header>
        <h1>
          <span aria-label="chick" role="img">🐥</span> Chirp-tronome{" "}
          <span aria-label="chick" role="img">🐥</span>
        </h1>
        <p>
          Why listen to a <span>click</span> when you can listen to a{" "}
          <span>chick?</span>
        </p>
      </header>
    );
}

export default Header;