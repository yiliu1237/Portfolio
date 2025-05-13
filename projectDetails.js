export const projectDetails = {
    ///////////////////////////////// Project 1 ///////////////////////////////////
"Project 1 Details": `
# 8-Bit BBQ Grill

A lightweight web-based BBQ simulation game where you grill pixelated meats, collect them at the perfect moment.

---
## Gameplay

- **Drag & Drop**: Pick meats and veggies from the menu and drag them onto the ASCII grill.
- **Cooking Simulation**: Meats cook over time - from raw, to perfect, to burnt if you wait too long.
- **Clip Mode**: 
  - Click the "Clip" button to enter clipping mode.
  - Collect as many cooked meats as you want!
  - Click "Clip" again to exit clipping mode.
- **Clear Grill**: Reset the grill anytime by pressing "Clear the Grill".

---
## Gameplay Preview
![Gameplay](https://raw.githubusercontent.com/yiliu1237/8-Bit-BBQ/main/gameplay/gameplay.gif)

![Gameplay Preview](https://raw.githubusercontent.com/yiliu1237/8-Bit-BBQ/main/gameplay/img2.png)

---
## How It Works
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: FastAPI (Python)
- **Image Processing**: PIL (Python Imaging Library)
- **ASCII Art Renderer**: Converts images into ASCII characters, colored to mimic pixel art.

---
## More Details 

Please check the GitHub repository here: <a href="https://github.com/yiliu1237/8-Bit-BBQ" target="_blank">8-Bit-BBQ</a>
`,   

///////////////////////////////// Project 2 ///////////////////////////////////

"Project 2 Details": `
# FungiClock

**Fungi Clock** is a relaxing and playful productivity web app.  
Set focus sessions, collect adorable mushrooms, track real-time or custom time, and enjoy the company of a friendly cat companion!

This app combines a clock, focus timer, and mushroom collection system to encourage mindfulness and sustained attention in a cozy virtual forest.

---

## Features

- **Customizable Focus Timer:**  
  Choose a focus session between **10 minutes and 3 hours**.

- **Mushroom Collection System:**  
  Mushrooms appear dynamically during your focus time - click them to collect, or earn rewards automatically as you focus.

- **Dynamic Forest Scenes:**  
  Background changes throughout the day based on the current or manually set time:  
  _Morning, Noon, Afternoon, Evening, Night, and Dawn_.

- **Animated Cat Companion:**  
  A friendly cat cheers you on and changes poses during focus sessions.

- **Real-Time and Manual Clock:**  
  View a live clock or manually adjust the time for a different forest atmosphere.

- **Focus Session Summary:**  
  After completing a session, see a detailed summary of mushrooms collected.

- **Lightweight and Responsive:**  
  No frameworks or heavy dependencies - just fast, smooth, and responsive.

---

## How It Works

### Focus Sessions
- Click **Start Focus Session** to begin.
- Set your desired focus duration (10 - 180 minutes).
- Mushrooms are collected passively based on focus time, and more mushrooms appear if you stay focused.
- You can stop early, but rewards scale with the time you remain focused.

### Mushroom Collection
- Mushrooms pop up on the background while you focus.
- Click on them to instantly collect, or let the session timer handle passive gathering.

### Scene and Time Dynamics
- The background image changes based on the time of day.
- Use the **Settings** panel to manually adjust the time and explore different scenes.
- A real-time clock overlay is available.

### End of Session
- After a session completes (or if you stop early), you'll see a **collection summary** listing how many mushrooms you gathered.

---

## Display

### Scene Transition
![Scene](https://raw.githubusercontent.com/yiliu1237/FungiClock/main/display/sceneTransition.gif)

### Focus Mode
![Focus Mode](https://raw.githubusercontent.com/yiliu1237/FungiClock/main/display/focusMode.gif)

### Mushroom Collection
![Mushrooms](https://raw.githubusercontent.com/yiliu1237/FungiClock/main/display/mushroomCollection.gif)

### Clock
![Clock Overlay](https://raw.githubusercontent.com/yiliu1237/FungiClock/main/display/clock.gif)

---

## Built With

- HTML5
- CSS3
- Vanilla JavaScript

---

## Future Improvements

- Save mushroom collections between sessions
- Rare mushrooms based on focus duration
- Cat customization (choose different cat companions)
- Ambient soundscapes for each time period
- Achievements for consistent focus habits

---

## More Details 

Please check the website:  <a href="https://yiliu1237.github.io/FungiClock" target="_blank">FungiClock</a>
`, 

///////////////////////////////// Project 3 ///////////////////////////////////

"Project 3 Details": `

# ConfTrack

Stay in sync with major academic deadlines.

---
## Overview

ConfTrack is a lightweight reminder tool built to help academic researchers and students stay ahead of major conference deadlines like CVPR, SIGGRAPH, ECCV, ICCV, and more.  
Instead of manually tracking dates, ConfTrack connects you with an **IFTTT** (If This Then That) applet to deliver automated monthly email reminders - so you can focus on your research, not your calendar.

> ConfTrack uses <a href="https://ifttt.com/explore" target="_blank">IFTTT</a>, a free automation platform, to handle reminders.

---
## How It Works
1. Open the ConfTrack webpage.
2. Read about the reminder system and its purpose.
3. Click the **Launch the Reminder App** button.
4. Connect with **IFTTT** and enable the ConfTrack applet.
5. Receive an email on the 1st of each month reminding you to check upcoming conference deadlines.

ConfTrack does not store your data - it simply redirects you to IFTTT for managing reminders.

---

## More Details 

Please check the website: <a href="https://yiliu1237.github.io/ConfTrack" target="_blank">ConfTrack</a>
`,

///////////////////////////////// Project 4 ///////////////////////////////////











///////////////////////////////// Project 5 ///////////////////////////////////
"Project 5 Details": `
# EchoGem

**EchoGem** is an interactive WebGL-based experience where your memories take the form of shimmering crystals.  
Move through a dynamic 3D space, reflect on your thoughts, and capture them as beautiful geometric artifacts.

---

## Preview

![Preview](https://raw.githubusercontent.com/yiliu1237/EchoGem/main/demo/preview.gif)

---

## How to Play

- **Move**: \`W A S D\`
- **Zoom**: \`Z\` (Zoom in) / \`X\` (Zoom out)
- **Mouse**: Hold and drag to change the camera direction.
- **Enter Gem Library**: Press \`Space\`
- **Slide Crystals**: Use \`Left\` and \`Right\` arrow keys

---

## Features

- Procedural crystal generation
- Dynamic WebGL shader animation
- Smooth UI overlay transitions
- Lightweight and responsive

---

## More Details 

Please check the website: <a href="https://yiliu1237.github.io/EchoGem" target="_blank">EchoGem</a>
`, 


///////////////////////////////// Project 6 ///////////////////////////////////

"Project 6 Details": `
# Stackwich: A Sandwich-Making Web Game

**Stackwich** is an interactive browser-based game where players build custom sandwiches by clicking ingredients, completing orders, and racing against the clock to earn coins.

---

## Gameplay Overview

- Players receive **random sandwich orders** displayed at the top.
- Ingredients (like bread, tomato, ham, mayo, etc.) are laid out visually on a kitchen counter.
- Clicking an ingredient adds it to the sandwich stack.
- Hovering over the sandwich lifts it to preview the full stack.
- Players must match the order as closely as possible before submitting.
- Submitting correct orders awards **coins** and feedback.
- The game runs on a **2-minute timer**.
- When time's up, a popup displays total coins and completed orders.

---

## Demo

<img src="https://raw.githubusercontent.com/yiliu1237/Stackwich/main/demo/demo_gif.gif" alt="Stackwich gameplay demo" width="800"/>


---

## Features

- Animated ingredient stacking
- Real-time scoring and feedback
- Undo functionality
- Pause/resume system with timer handling
- Randomized order generation with visual order sheets

---

## Technologies Used

- **HTML5** + **CSS3** for structure and responsive layout
- **Vanilla JavaScript** for interactivity
- Lightweight and framework-free

---
## More Details 

Please check the website: <a href="https://yiliu1237.github.io/Stackwich" target="_blank">Stackwich</a>
`,

///////////////////////////////// Project 7 ///////////////////////////////////

"Project 7 Details": `
# Nowhere Disc

**Nowhere Disc** is an interactive web ring that preserves and shares **abandoned game ideas** — projects that never reached completion, but still carry creative spark.

Each idea is presented as a **virtual game case**, complete with cover art, concept descriptions, and creator reflections. These aren’t cancelled releases — they’re prototypes, sketches, mechanics, or worlds left behind in notebooks, jam folders, and design documents.

---

## Why Nowhere Disc?

In creative work, ideas often get set aside — not because they’re bad, but because time runs out, scope grows too big, or interest shifts.  
**Nowhere Disc provides a platform for those abandoned ideas to breathe again.**

- The idea you gave up might inspire someone else.
- What felt too big alone might become possible through collaboration.
- A discarded mechanic might find new life in a different genre.

Here, giving up can be a form of revival.

---

## Features

- **Search by Type or Reason**
  Filter the full collection by game type (e.g. Puzzle, Horror, Idle) or abandonment reason (e.g. lost interest, too ambitious, time constraints) to find ideas that match your curiosity or creative focus.

- **Create Your Own Game Case**
  Use the built-in creation interface to write your own abandoned idea. Add your game title, type, reasons, notes, and a cover image.

- **Web Ring Navigation**  
  Browse through abandoned game concepts using **Next**, **Previous**, and **Random** buttons. The ring loops endlessly.

- **Game Case Format**  
  Every idea appears like a physical game box, showing what it might’ve been if it had reached a shelf.

---
## More Details 

Please check the website:  <a href="https://yiliu1237.github.io/Nowhere-Disc" target="_blank">Nowhere Disc</a>
`,


///////////////////////////////// Project 8 ///////////////////////////////////
"Project 8 Details": `

# Newton Fractal Explorer

This is an interactive web-based Newton Fractal visualizer built with **p5.js** and WebGL shaders.  
It allows you to dynamically control the fractal's shape, color themes, and zoom/movement in real time.

---

## Features

- **Smooth Real-Time Rendering**  
  - GPU-accelerated shader rendering of a Newton fractal variant.
  
- **Power Control**  
  - Set the fractal's function power (n) between 0 and 6.
  - Resume automatic oscillation animation around the base power.
  
- **Camera Controls**  
  - **W / A / S / D**: Move the view Up / Left / Down / Right.
  - **Z / X**: Zoom In / Out.
  - **Hold keys** for continuous smooth movement and zoom.

- **UI Panel**  
  - **SPACE**: Toggle the UI panel visibility for full-screen exploration.
  
- **Dynamic Color Themes**  
  - Choose from preset color palettes: Default, Sunset, Ocean.
  - Generate completely random color sets with one click.

- **Custom Color Input**  
  - Manually define custom RGB colors for each fractal root.
  - Changes are immediately reflected in both the fractal and the color input fields.
  
---

## Demos

### Color Switching
![Color Theme Change](https://raw.githubusercontent.com/yiliu1237/dynamic_newton_fractal/main/demo/changeColor.gif)

### Power Oscillation
![Changing Power](https://raw.githubusercontent.com/yiliu1237/dynamic_newton_fractal/main/demo/changePower.gif)

### Camera Movement
![Camera Movement](https://raw.githubusercontent.com/yiliu1237/dynamic_newton_fractal/main/demo/movement.gif)

---

## Fractal Previews

<p align="center">
  <table>
    <tr>
      <td><img src="https://raw.githubusercontent.com/yiliu1237/dynamic_newton_fractal/main/demo/img1.png" width="500"></td>
      <td><img src="https://raw.githubusercontent.com/yiliu1237/dynamic_newton_fractal/main/demo/img2.png" width="500"></td>
      <td><img src="https://raw.githubusercontent.com/yiliu1237/dynamic_newton_fractal/main/demo/img3.png" width="500"></td>
    </tr>
    <tr>
      <td><img src="https://raw.githubusercontent.com/yiliu1237/dynamic_newton_fractal/main/demo/img4.png" width="500"></td>
      <td><img src="https://raw.githubusercontent.com/yiliu1237/dynamic_newton_fractal/main/demo/img5.png" width="500"></td>
      <td><img src="https://raw.githubusercontent.com/yiliu1237/dynamic_newton_fractal/main/demo/img6.png" width="500"></td>
    </tr>
  </table>
</p>

---

## Controls Summary

| Key / Button | Action |
|:------------|:-------|
| \`W\` / \`A\` / \`S\` / \`D\` | Move camera Up / Left / Down / Right |
| \`Z\` | Zoom In |
| \`X\` | Zoom Out |
| \`SPACE\` | Toggle panel visibility |
| \`Apply\` Button | Set custom fractal power and stop animation |
| \`Resume Animation\` Button | Resume automatic oscillation |
| Theme Buttons | Switch between color themes |
| Custom Colors Section | Manually define and apply RGB colors |

---

## More Details 

Please check the website:  <a href="https://yiliu1237.github.io/dynamic_newton_fractal" target="_blank">Newton Fractal Explorer</a>`


};

  