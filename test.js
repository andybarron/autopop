#!/usr/bin/env node
var fs = require('fs');
var midi = require('jsmidgen');

var file = new midi.File();
// file
//   .addTrack()
//     .setTempo(60)
//     .note(0, 'c4', 32)
//     .note(0, 'd4', 32)
//     .note(0, 'e4', 32)
//     .note(0, 'f4', 32)
//     .note(0, 'g4', 32)
//     .note(0, 'a4', 32)
//     .note(0, 'b4', 32)
//     .note(0, 'c5', 32)

//     // church organ
//     .instrument(0, 0x13)

//     // by skipping the third arguments, we create a chord (C major)
//     .noteOn(0, 'c4', 64)
//     .noteOn(0, 'e4')
//     .noteOn(0, 'g4')

//     // by skipping the third arguments again, we stop all notes at once
//     .noteOff(0, 'c4', 47)
//     .noteOff(0, 'e4')
//     .noteOff(0, 'g4')

//     //alternatively, a chord may be created with the addChord function
//     .addChord(0, ['c4', 'e4', 'g4'], 64)

//     .noteOn(0, 'c4', 1)
//     .noteOn(0, 'e4')
//     .noteOn(0, 'g4')
//     .noteOff(0, 'c4', 384)
//     .noteOff(0, 'e4')
//     .noteOff(0, 'g4')
//     ;
var chords = {
  Am: ['a4', 'c4', 'e4'],
  C: ['c4', 'e4', 'g4'],
  F: ['f4', 'a4', 'c4'],
  G: ['g4', 'b4', 'd4'],
};
var durations = {
  quarter: 128,
  eighth: 64,
};
const addSectionSyncopated = function(track, chords) {
  track
    .addChord(0, chords[0], durations.quarter)
    .addChord(0, chords[0], durations.quarter)
    .addChord(0, chords[1], durations.quarter * 3/4)
    .addChord(0, chords[1], durations.quarter * 3/4)
    .addChord(0, chords[2], durations.quarter * 1.5)
    .addChord(0, chords[2], durations.quarter)
    .addChord(0, chords[2], durations.eighth)
    .addChord(0, chords[2], durations.eighth)
    .addChord(0, chords[3], durations.quarter)
  ;
};
var track = file.addTrack().setTempo(120);
for (let i = 0; i < 4; i++) {
  addSectionSyncopated(track, [chords.F, chords.G, chords.Am, chords.G]);
}


fs.writeFileSync('test2.mid', file.toBytes(), 'binary');