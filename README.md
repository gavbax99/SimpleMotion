<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./liveDemoAssets/images/logo_color.png" alt="Logo" width="128" height="90.25">
  </a>

  <h3 align="center">SimpleMotion</h3>

  <p align="center">
    A simple JavaScipt library to animate HTML elements on-scroll.
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-simplemotion">About</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#documentation">Documentation</a>
      <ul>
        <li><a href="#simplemotion-attributes">SimpleMotion Attributes</li>
        <li><a href="#default-animation-values">Default Animation Values</li>
        <li><a href="#constant-values">Constant Values</li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#author">Author</a></li>
  </ol>
</details>


## About SimpleMotion 🎿

A free and easy-to-use JavaScript library that fades in (or otherwise animates) your HTML elements as the user scolls them into frame. SimpleMotion is incredibly lightweight clocking in at only 4kb. Setup is as simple as adding the script to your HTML page and adding a single data attribute to the element you want to animate; add other attributes to customize your animations. Works anywhere you can use a `<script>` tag and access HTML elements (WordPress, Squarespace, Wix, etc).

<a href="/">View live demo with examples here ✨</a>

## Getting Started 🌞

1. Download and include **<a href="/">simpleMotion.js</a>** before the closing `</body>` tag in your HTML:
    ```html
      <script src="./simpleMotion.js"></script>
    </body>
    ```
2. Add the `data-sm` attribute to any element you want to animate:
    ```html
    <p data-sm>I will now animate as the user scrolls me into view.</p>
    ```
**Note:** By default, SimpleMotion is setup to pleasantly fade-in  elements upwards as the user scrolls them 25% into view.

## Documentation 📖

All elements that you want to animate using SimpleMotion require the `data-sm` attribute. You can also add various other attributes to affect the animation. Although only `<p>` tags will be used in the following examples, SimpleMotion will work with any HTML tag.

By default, all SimpleMotion elements will end with the CSS property of `transform: translate(0, 0)` after animating, unless the `def_finalTransform` value is changed or unless you provide a custom ending transform through the `data-sm-final-transform` attribute.

#### SimpleMotion Attributes

| Attribute   | Description | Accepted Values | Examples |
| ----------- | ----------- | --------------- | -------- |
| `data-sm` | **Required to activate SimpleMotion and animate elements.**<br>*Default animation values in JS file.* | N/A | `<p data-sm>Text<p>` |
| `data-sm-dist-x` | Distance (in pixels) the element will move across the x axis. Positive values move the element left, negative right. | `Number` | `<p data-sm data-sm-dist-x="50">Text</p>` |
| `data-sm-dist-y` | Distance (in pixels) the element will move across the y axis. Positive values move the element up, negative down. | `Number` | `<p data-sm data-sm-dist-y="-50">Text</p>` |
| `data-sm-time` | Animation duration. | Positive `Integer`<br>*Represented in ms* | `<p data-sm data-sm-time="3000">Text</p>` |
| `data-sm-delay` | Time delay before the animation fires. | Positive `Integer`<br>*Represented in ms* | `<p data-sm data-sm-delay="1000">Text</p>` |
| `data-sm-start-scale` | Starting scale of the element before animation. | Positive `Number`<br>*Represented in %*  | `<p data-sm data-sm-start-scale="1.5">Text</p>` |
| `data-sm-start-opac` | Starting opacity of the element before animation. | `Number` between 0-1<br>*Represented in %* | `<p data-sm data-sm-start-opac="0.3">Text</p>` |
| `data-sm-final-opac` | Ending opacity of the element after animation. | `Number` between 0-1<br>*Represented in %* | `<p data-sm data-sm-final-opac="0.75">Text</p>` |
| `data-sm-ease` | Ease type of the animation. | `String` of any valid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function">CSS transition</a> | `<p data-sm data-sm-ease="ease-out">Text</p>` |
| `data-sm-final-transform` | Ending element transform property after animation. | `String` of any valid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform">CSS transform</a> | `<p data-sm data-sm-final-transform="scale(1.5) rotate(360deg)">Text</p>` |

#### Default Animation Values

These can be found at the top of your **<a href="/">simpleMotion.js</a>** file.

| Attribute | Accepted Values | Default Value |
| -- | -- | -- |
| `def_distanceToTravelX` | `Number` | `0` (No horizontal movement) |
| `def_distanceToTravelY` | `Number` | `30` (30px upward movement) |
| `def_startingScale` | Positive `Number`<br>*Represented in %* | `1` (100% scale) |
| `def_animationTime` | Positive `Integer`<br>*Represented in ms* | `1000` (1 second) |
| `def_startingOpacity` | `Number` between 0-1<br>*Represented in %* | `0` (0% opacity) |
| `def_finalOpacity` | `Number` between 0-1<br>*Represented in %* | `1` (100% opacity) |
| `def_animationEaseType` | `String` of any valid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function">CSS transition</a> | `ease` |
| `def_finalTransform` | `String` of any valid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform">CSS transform</a> | `translate(0, 0)` |

#### Constant Values

These values control the animation handler. These can be found at the top of your **<a href="/">simpleMotion.js</a>** file.

| Variable | Description | Accepted Values |
| -- | -- | -- |
| `animInterval` | How often the "check if animation should happen" innerval fires (default value `100`). | Positive `Integer`<br>*Represented in ms*
| `revealPosition` | The location on the screen where elements will animate when crossed. The lower the number the further you need to scroll to trigger animations (default value `0.75`). | `Number` between 0-1<br>*Represented in %*|

## License 📜
Distributed under the MIT License. Use it, sell it, whatever. Go nuts.

## Author 📝

Gavin Baxter, Frontend Developer
gavinbaxter.com | hello@gavinbaxter.com

Grateful and generous? Send me crypto 😎
💸 awfa0w0af80awf90awf80awfwdawaw 💸

<style>
  table {
    min-width: 100%;
  }

  table th:nth-of-type(2) {
    width: 500px;
  }
</style>