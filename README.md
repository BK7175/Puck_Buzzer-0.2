# Puck_Buzzer-0.2
A advanced new version with Dashboard on with [Bangle.js 2](https://www.espruino.com/Bangle.js2), and [Puck.js](https://www.espruino.com/Puck.js)

# What's new here
1. Leaderboard on Bangle.js

- Tracks who buzzed first
- Displays names in order
- Resets round on button press

2. Sound/Vibration Patterns

- First buzzer: 🎵 Beep twice + long vibration
- Others get short buzz only

# Number of participants
Each Puck.js has a unique name like "QuizBuzzer1", "QuizBuzzer2", etc.
Puck.js sends: { buzz: true, name: "Puck A" }
Bangle.js tracks the order people buzzed in.

# IDE
https://www.espruino.com/ide/



