import React from 'react'
import singing from './singingBird.svg';

function Header () {
    return (
      <header>
        <div class="headerParent">
          <img src={singing} alt="bird" />
          <h1>
            <span className="header">Chirp</span>tronome
          </h1>
        </div>
        <p>
          Why play with a <span>click</span> when you can play with a{" "}
          <span>chick?</span>
        </p>
      </header>
    );
}

export default Header;