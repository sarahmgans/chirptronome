import React from 'react'
// Importing the svg singingBird. This illustration is done by Katerina Limpitsouni and is from unDraw.co. 
import singing from './singingBird.svg';

function Header () {
    return (
      <header>
        <div className="headerParent">
          <img src={singing} alt="A very adorable blue bird singing in a field of flowers" />
          <h1>
            {/* span is added so that the first and second halves of the h1 can be in different font weights. */}
            <span className="header">Chirp</span>tronome
          </h1>
        </div>
        <p>
          Why play with a <span>click</span> when you can play with a <span>chick?</span>
        </p>
      </header>
    );
}

export default Header;