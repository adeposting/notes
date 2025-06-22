#!/usr/bin/env osascript -l JavaScript


/*

To use this script, you need to first set up the key shortcuts in Rekordbox. In the menu bar, go to rekordbox => Preferences => Keyboard. Import the rekordbox-keymap.xml file, it should be in the same directory as this script. You can also do this manually as follows: Select "Performance 1 (Preset) in the drop-down menu. Expand the section for "Deck 1". Ensure the following key shortcuts are set. I've highlighed the ones that you need to change in bold, the rest should be set by default, but you should double check in case there are differences with your version of Rekordbox. 

- Cue: S
- Return to the beginning of the track: T
- Next Track: U
- Set Memory Cue: V
- Delete Memory Cue: W
- Call Next Memory Cue: X
- Call Previous Memory Cue: Y
- Memory Cue 1: A
- Memory Cue 2: B
- Memory Cue 3: C
- Memory Cue 4: D
- Memory Cue 5: E
- Memory Cue 6: F
- Memory Cue 7: G
- Memory Cue 8: H
- Memory Cue 9: I
- Memory Cue 10: J
- Delete Memory Cue 1: shift + A
- Delete Memory Cue 2: shift + B
- Delete Memory Cue 3: shift + C
- Delete Memory Cue 4: shift + D
- Delete Memory Cue 5: shift + E
- Delete Memory Cue 6: shift + F
- Delete Memory Cue 7: shift + G
- Delete Memory Cue 8: shift + H
- Delete Memory Cue 9: shift + I
- Delete Memory Cue 10: shift + J
- Set Hot Cue A: K
- Set Hot Cue B: L
- Set Hot Cue C: M
- Set Hot Cue D: N
- Set Hot Cue E: O
- Set Hot Cue F: P
- Set Hot Cue G: Q
- Set Hot Cue H: R
- Clear Hot Cue A: shift + K
- Clear Hot Cue B: shift + L
- Clear Hot Cue C: shift + M
- Clear Hot Cue D: shift + N
- Clear Hot Cue E: shift + O
- Clear Hot Cue F: shift + P
- Clear Hot Cue G: shift + Q
- Clear Hot Cue H: shift + R
- Forward 4 beats: shift + S
- Forward 8 beats: shift + T
- Forward 16 beats: shift + U
- Forward 8 bars: shift + V
- Backward 4 beats: shift + W
- Backward 8 beats: shift + X
- Backward 16 beats: shift + Y
- Backward 8 bars: shift + Z
- Set 1.1 Bars: Z

*/

(() => {

    SHORT_DELAY = 0.1;
    LONG_DELAY = 0.25;
    HOT_CUE_COUNT = 8;
    MEMORY_CUE_COUNT = 10;

    // - Cue: S
    function cue() {
        console.log("Cue");
        systemEvents.keystroke("s");
        delay(SHORT_DELAY);
    }

    // - Return to the beginning of the track: T
    function returnToTheBeginningOfTheTrack() {
        console.log("Return to the beginning of the track");
        systemEvents.keystroke("t");
        delay(SHORT_DELAY);
    }

    // - Next Track: U
    function nextTrack() {
        console.log("Next Track");
        systemEvents.keystroke("u");
        delay(LONG_DELAY);
    }

    // - Set Memory Cue: V
    function setMemoryCue() {
        console.log("Set Memory Cue");
        systemEvents.keystroke("v");
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue: W
    function deleteMemoryCue() {
        console.log("Delete Memory Cue");
        systemEvents.keystroke("w");
        delay(SHORT_DELAY);
    }

    // - Call Next Memory Cue: X
    function callNextMemoryCue() {
        console.log("Call Next Memory Cue");
        systemEvents.keystroke("x");
        delay(SHORT_DELAY);
    }

    // - Call Previous Memory Cue: Y
    function callPreviousMemoryCue() {
        console.log("Call Previous Memory Cue");
        systemEvents.keystroke("y");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 1: A
    function callMemoryCue1() {
        console.log("Call Memory Cue 1");
        systemEvents.keystroke("a");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 2: B
    function callMemoryCue2() {
        console.log("Call Memory Cue 2");
        systemEvents.keystroke("b");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 3: C
    function callMemoryCue3() {
        console.log("Call Memory Cue 3");
        systemEvents.keystroke("c");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 4: D
    function callMemoryCue4() {
        console.log("Call Memory Cue 4");
        systemEvents.keystroke("d");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 5: E
    function callMemoryCue5() {
        console.log("Call Memory Cue 5");
        systemEvents.keystroke("e");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 6: F
    function callMemoryCue6() {
        console.log("Call Memory Cue 6");
        systemEvents.keystroke("f");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 7: G
    function callMemoryCue7() {
        console.log("Call Memory Cue 7");
        systemEvents.keystroke("g");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 8: H
    function callMemoryCue8() {
        console.log("Call Memory Cue 8");
        systemEvents.keystroke("h");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 9: I
    function callMemoryCue9() {
        console.log("Call Memory Cue 9");
        systemEvents.keystroke("i");
        delay(SHORT_DELAY);
    }

    // - Memory Cue 10: J
    function callMemoryCue10() {
        console.log("Call Memory Cue 10");
        systemEvents.keystroke("j");
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 1: shift + A
    function deleteMemoryCue1() {
        console.log("Delete Memory Cue 1");
        systemEvents.keystroke("a", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 2: shift + B
    function deleteMemoryCue2() {
        console.log("Delete Memory Cue 2");
        systemEvents.keystroke("b", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 3: shift + C
    function deleteMemoryCue3() {
        console.log("Delete Memory Cue 3");
        systemEvents.keystroke("c", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 4: shift + D
    function deleteMemoryCue4() {
        console.log("Delete Memory Cue 4");
        systemEvents.keystroke("d", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 5: shift + E
    function deleteMemoryCue5() {
        console.log("Delete Memory Cue 5");
        systemEvents.keystroke("e", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 6: shift + F
    function deleteMemoryCue6() {
        console.log("Delete Memory Cue 6");
        systemEvents.keystroke("f", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 7: shift + G
    function deleteMemoryCue7() {
        console.log("Delete Memory Cue 7");
        systemEvents.keystroke("g", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 8: shift + H
    function deleteMemoryCue8() {
        console.log("Delete Memory Cue 8");
        systemEvents.keystroke("h", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 9: shift + I
    function deleteMemoryCue9() {
        console.log("Delete Memory Cue 9");
        systemEvents.keystroke("i", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Delete Memory Cue 10: shift + J
    function deleteMemoryCue10() {
        console.log("Delete Memory Cue 10");
        systemEvents.keystroke("j", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Set Hot Cue A: K
    function setHotCueA() {
        console.log("Set Hot Cue A");
        systemEvents.keystroke("k");
        delay(SHORT_DELAY);
    }

    // - Set Hot Cue B: L
    function setHotCueB() {
        console.log("Set Hot Cue B");
        systemEvents.keystroke("l");
        delay(SHORT_DELAY);
    }

    // - Set Hot Cue C: M
    function setHotCueC() {
        console.log("Set Hot Cue C");
        systemEvents.keystroke("m");
        delay(SHORT_DELAY);
    }

    // - Set Hot Cue D: N
    function setHotCueD() {
        console.log("Set Hot Cue D");
        systemEvents.keystroke("n");
        delay(SHORT_DELAY);
    }

    // - Set Hot Cue E: O
    function setHotCueE() {
        console.log("Set Hot Cue E");
        systemEvents.keystroke("o");
        delay(SHORT_DELAY);
    }

    // - Set Hot Cue F: P
    function setHotCueF() {
        console.log("Set Hot Cue F");
        systemEvents.keystroke("p");
        delay(SHORT_DELAY);
    }

    // - Set Hot Cue G: Q
    function setHotCueG() {
        console.log("Set Hot Cue G");
        systemEvents.keystroke("q");
        delay(SHORT_DELAY);
    }

    // - Set Hot Cue H: R
    function setHotCueH() {
        console.log("Set Hot Cue H");
        systemEvents.keystroke("r");
        delay(SHORT_DELAY);
    }

    // - Clear Hot Cue A: shift + K
    function clearHotCueA() {
        console.log("Clear Hot Cue A");
        systemEvents.keystroke("k", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Clear Hot Cue B: shift + L
    function clearHotCueB() {
        console.log("Clear Hot Cue B");
        systemEvents.keystroke("l", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Clear Hot Cue C: shift + M
    function clearHotCueC() {
        console.log("Clear Hot Cue C");
        systemEvents.keystroke("m", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Clear Hot Cue D: shift + N
    function clearHotCueD() {
        console.log("Clear Hot Cue D");
        systemEvents.keystroke("n", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Clear Hot Cue E: shift + O
    function clearHotCueE() {
        console.log("Clear Hot Cue E");
        systemEvents.keystroke("o", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Clear Hot Cue F: shift + P
    function clearHotCueF() {
        console.log("Clear Hot Cue F");
        systemEvents.keystroke("p", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Clear Hot Cue G: shift + Q
    function clearHotCueG() {
        console.log("Clear Hot Cue G");
        systemEvents.keystroke("q", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Clear Hot Cue H: shift + R
    function clearHotCueH() {
        console.log("Clear Hot Cue H");
        systemEvents.keystroke("r", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Forward 4 beats: shift + S
    function forward4Beats() {
        console.log("Forward 4 beats");
        systemEvents.keystroke("s", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Forward 8 beats: shift + T
    function forward8Beats() {
        console.log("Forward 8 beats");
        systemEvents.keystroke("t", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Forward 16 beats: shift + U
    function forward16Beats() {
        console.log("Forward 16 beats");
        systemEvents.keystroke("u", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Forward 8 bars: shift + V
    function forward8Bars() {
        console.log("Forward 8 bars");
        systemEvents.keystroke("v", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Backward 4 beats: shift + W
    function backward4Beats() {
        console.log("Backward 4 beats");
        systemEvents.keystroke("w", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Backward 8 beats: shift + X
    function backward8Beats() {
        console.log("Backward 8 beats");
        systemEvents.keystroke("x", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Backward 16 beats: shift + Y
    function backward16Beats() {
        console.log("Backward 16 beats");
        systemEvents.keystroke("y", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Backward 8 bars: shift + Z
    function backward8Bars() {
        console.log("Backward 8 bars");
        systemEvents.keystroke("z", { using: "shift down" });
        delay(SHORT_DELAY);
    }

    // - Set 1.1 Bars: Z
    function set1Point1Bars() {
        console.log("Set 1.1 Bars");
        systemEvents.keystroke("z");
        delay(SHORT_DELAY);
    }


    // --------------------------------------------------------------

    function moveToFirstBeatOfTrack() {
        returnToTheBeginningOfTheTrack();
        cue();
    }

    function moveForwardByNumberOfBars(numberOfBars) {
        switch (numberOfBars) {
            case 0:
                // do nothing
                break;
            case 1:
                forward4Beats();
                break;
            case 2:
                forward8Beats();
                break;
            case 3:
                forward8Beats();
                forward4Beats();
                break;
            case 4:
                forward16Beats();
                break;
            case 5:
                forward16Beats();
                forward4Beats();
                break;
            case 6:
                forward16Beats();
                forward8Beats();
                break;
            case 7:
                forward16Beats();
                forward8Beats();
                forward4Beats();
                break;
            case 8:
                forward8Bars();
                break;
            default:
                multiplesOf8 = Math.floor(numberOfBars / 8);
                remainder = numberOfBars % 8;
                for (var i = 0; i < multiplesOf8; i++) {
                    forward8Bars();
                }
                if (remainder > 0) {
                    forwardByNumberOfBars(remainder);
                }
                break;
        }
        cue();
    }

    function moveBackwardByNumberOfBars(numberOfBars) {
        switch (numberOfBars) {
            case 0:
                // do nothing
                break;
            case 1:
                backward4Beats();
                break;
            case 2:
                backward8Beats();
                break;
            case 3:
                backward8Beats();
                backward4Beats();
                break;
            case 4:
                backward16Beats();
                break;
            case 5:
                backward16Beats();
                backward4Beats();
                break;
            case 6:
                backward16Beats();
                backward8Beats();
                break;
            case 7:
                backward16Beats();
                backward8Beats();
                backward4Beats();
                break;
            case 8:
                backward8Bars();
                break;
            default:
                multiplesOf8 = Math.floor(numberOfBars / 8);
                remainder = numberOfBars % 8;
                for (var i = 0; i < multiplesOf8; i++) {
                    backward8Bars();
                }
                if (remainder > 0) {
                    backwardByNumberOfBars(remainder);
                }
                break;
        }
        cue();
    }

    function moveForwardByNumberOfMemoryCues(numberOfMemoryCues) {
        for (var i = 0; i < numberOfMemoryCues; i++) {
            callNextMemoryCue();
        }
    }

    function moveBackwardByNumberOfMemoryCues(numberOfMemoryCues) {
        for (var i = 0; i < numberOfMemoryCues; i++) {
            callPreviousMemoryCue();
        }
    }

    function moveToMemoryCueAtIndex(memoryCueIndex) {
        switch (memoryCueIndex) {
            case 0:
                callMemoryCue1();
                break;
            case 1:
                callMemoryCue2();
                break;
            case 2:
                callMemoryCue3();
                break;
            case 3:
                callMemoryCue4();
                break;
            case 4:
                callMemoryCue5();
                break;
            case 5:
                callMemoryCue6();
                break;
            case 6:
                callMemoryCue7();
                break;
            case 7:
                callMemoryCue8();
                break;
            case 8:
                callMemoryCue9();
                break;
            case 9:
                callMemoryCue10();
                break;
            default:
                // do nothing
                break;
        }
    }

    function deleteMemoryCueAtIndex(memoryCueIndex) {
        switch (memoryCueIndex) {
            case 0:
                deleteMemoryCue1();
                break;
            case 1:
                deleteMemoryCue2();
                break;
            case 2:
                deleteMemoryCue3();
                break;
            case 3:
                deleteMemoryCue4();
                break;
            case 4:
                deleteMemoryCue5();
                break;
            case 5:
                deleteMemoryCue6();
                break;
            case 6:
                deleteMemoryCue7();
                break;
            case 7:
                deleteMemoryCue8();
                break;
            case 8:
                deleteMemoryCue9();
                break;
            case 9:
                deleteMemoryCue10();
                break;
            default:
                // do nothing
                break;
        }
    }

    function setHotCueByIndex(hotCueIndex) {
        switch (hotCueIndex) {
            case 0:
                setHotCueA();
                break;
            case 1:
                setHotCueB();
                break;
            case 2:
                setHotCueC();
                break;
            case 3:
                setHotCueD();
                break;
            case 4:
                setHotCueE();
                break;
            case 5:
                setHotCueF();
                break;
            case 6:
                setHotCueG();
                break;
            case 7:
                setHotCueH();
                break;
            default:
                // do nothing
                break;
        }
    }

    function clearHotCueByIndex(hotCueIndex) {
        switch (hotCueIndex) {
            case 0:
                clearHotCueA();
                break;
            case 1:
                clearHotCueB();
                break;
            case 2:
                clearHotCueC();
                break;
            case 3:
                clearHotCueD();
                break;
            case 4:
                clearHotCueE();
                break;
            case 5:
                clearHotCueF();
                break;
            case 6:
                clearHotCueG();
                break;
            case 7:
                clearHotCueH();
                break;
            default:
                // do nothing
                break;
        }
    }

    function setAllMemoryCuesByNumberOfBars(startBarIndex, stepBarCount) {
        moveToFirstBeatOfTrack();
        moveForwardByNumberOfBars(startBarIndex);
        for (var i = 0; i < MEMORY_CUE_COUNT; i++) {
            setMemoryCue();
            moveForwardByNumberOfBars(stepBarCount);
        }
    }

    function deleteAllMemoryCues() {
        for (var i = 0; i < MEMORY_CUE_COUNT; i++) {
            deleteMemoryCueAtIndex(0);
        }
    }

    function setAllHotCuesByNumberOfBars(startBarIndex, stepBarCount) {
        moveToFirstBeatOfTrack();
        moveForwardByNumberOfBars(startBarIndex);
        for (var i = 0; i < HOT_CUE_COUNT; i++) {
            setHotCueByIndex(i);
            moveForwardByNumberOfBars(stepBarCount);
        }
    }

    function setAllHotCuesByNumberOfBarsBeforeMemoryCues(startMemoryCueIndex, stepMemoryCueCount, stepBarCount) {
        moveToMemoryCueAtIndex(startMemoryCueIndex);
        for (var i = 0; i < HOT_CUE_COUNT + 1; i++) {
            moveBackwardByNumberOfBars(stepBarCount);
            setHotCueByIndex(i);
            moveForwardByNumberOfMemoryCues(stepMemoryCueCount + 1);
        }
    }

    function setAllHotCuesByNumberOfBarsAfterMemoryCues(startMemoryCueIndex, stepMemoryCueCount, stepBarCount) {
        moveToMemoryCueAtIndex(startMemoryCueIndex);
        for (var i = 0; i < HOT_CUE_COUNT + 1; i++) {
            moveForwardByNumberOfBars(stepBarCount);
            setHotCueByIndex(i);
            moveBackwardByNumberOfMemoryCues(1);
            moveForwardByNumberOfMemoryCues(stepMemoryCueCount);
        }
    }

    function clearAllHotCues() {
        for (var i = 0; i < 8; i++) {
            clearHotCueByIndex(i);
        }
    }

    function iterateThroughTracksWithCallback(numberOfTracks, callback) {
        callback();
        for (var i = 0; i < numberOfTracks - 1; i++) {
            nextTrack();
            callback();
        }
    }

    // --------------------------------------------------------------



    function getNumberOfBarsToMoveForwardByForMemoryCuesByGenre(trackGenre) {
        switch (trackGenre) {
            case "Drum & Bass":
                return 16;
            default:
                // do nothing
                break;
        }
    }

    function runSetMemoryCuesScript(numberOfTracks, trackGenre) {
        startBarIndex = 0;
        moveByNumberOfBars = getNumberOfBarsToMoveForwardByForMemoryCuesByGenre(trackGenre);
        iterateThroughTracksWithCallback(numberOfTracks, function () {
            setAllMemoryCuesByNumberOfBars(startBarIndex, moveByNumberOfBars);
        });
    }

    function runDeleteMemoryCuesScript(numberOfTracks) {
        iterateThroughTracksWithCallback(numberOfTracks, deleteAllMemoryCues);
    }

    function getStartMemoryCueIndexForHotCuesByGenre(trackGenre) {
        switch (trackGenre) {
            case "Drum & Bass":
                return 1;
            default:
                // do nothing
                break;
        }
    }

    function getNumberOfMemoryCuesToMoveForwardByForHotCuesByGenre(trackGenre) {
        switch (trackGenre) {
            case "Drum & Bass":
                return 1;
            default:
                // do nothing
                break;
        }
    }

    function getNumberOfBarsToMoveBackwardByForHotCuesByGenre(trackGenre) {
        switch (trackGenre) {
            case "Drum & Bass":
                return 2;
            default:
                // do nothing
                break;
        }
    }

    function runSetHotCuesScript(numberOfTracks, trackGenre) {
        startAtMemoryCueIndex = getStartMemoryCueIndexForHotCuesByGenre(trackGenre);
        moveByNumberOfMemoryCues = getNumberOfMemoryCuesToMoveForwardByForHotCuesByGenre(trackGenre);
        moveByNumberOfBars = getNumberOfBarsToMoveBackwardByForHotCuesByGenre(trackGenre);
        iterateThroughTracksWithCallback(numberOfTracks, function () {
            setAllHotCuesByNumberOfBarsBeforeMemoryCues(startAtMemoryCueIndex, moveByNumberOfMemoryCues, moveByNumberOfBars);
        });
    }

    function runClearHotCuesScript(numberOfTracks) {
        iterateThroughTracksWithCallback(numberOfTracks, clearAllHotCues);
    }

    function runSet1Point1BarsScript(numberOfTracks) {
        iterateThroughTracksWithCallback(numberOfTracks, function () {
            moveToFirstBeatOfTrack();
            set1Point1Bars();
        });
    }

    function promptUserForScriptAction() {
        var listOfActions = ["Set memory cues", "Delete memory cues", "Set hot cues", "Clear hot cues", "Set 1.1 bars"];
        var scriptAction = app.chooseFromList(listOfActions, { withPrompt: "What action do you want to perform?", defaultItems: [] });
        if (!scriptAction) return;
        if (scriptAction.buttonReturned === "Cancel") return;
        return scriptAction[0];
    }

    function promptUserForGenre() {
        var listOfGenres = ["Drum & Bass"];
        var trackGenre = app.chooseFromList(listOfGenres, { withPrompt: "What is the genre of the tracks in your playlist?", defaultItems: [] });
        if (!trackGenre) return;
        if (trackGenre.buttonReturned === "Cancel") return;
        return trackGenre[0];
    }

    function promptUserForNumberOfTracks() {
        var numberOfTracks = app.displayDialog("How many tracks do you want to process?", { defaultAnswer: "" });
        if (numberOfTracks.buttonReturned === "Cancel") return;
        numberOfTracks = parseInt(numberOfTracks.textReturned, 10);
        return numberOfTracks;
    }
    function promptUserForConfirmation(scriptAction, trackGenre, numberOfTracks) {
        var userConfirmation = app.displayDialog("Are you sure you want to run '" + scriptAction + "' on " + numberOfTracks + " " + trackGenre + " tracks?");
        if (userConfirmation.buttonReturned === "Cancel") return;
        return true;
    }

    function promptUser() {
        var scriptAction = promptUserForScriptAction();
        if (!scriptAction) return;
        var trackGenre = promptUserForGenre();
        if (!trackGenre) return;
        var numberOfTracks = promptUserForNumberOfTracks();
        if (!numberOfTracks) return;
        var userConfirmation = promptUserForConfirmation(scriptAction, trackGenre, numberOfTracks);
        if (!userConfirmation) return;
        return {
            scriptAction: scriptAction,
            trackGenre: trackGenre,
            numberOfTracks: numberOfTracks
        };
    }

    function getScriptFunction(scriptAction, trackGenre, numberOfTracks) {
        switch (scriptAction) {
            case "Set memory cues":
                return () => runSetMemoryCuesScript(numberOfTracks, trackGenre);
            case "Delete memory cues":
                return runDeleteMemoryCuesScript(numberOfTracks);
            case "Set hot cues":
                return runSetHotCuesScript(numberOfTracks, trackGenre);
            case "Clear hot cues":
                return runClearHotCuesScript(numberOfTracks);
            case "Set 1.1 bars":
                return runSet1Point1BarsScript(numberOfTracks);
            default:
                // do nothing
                break;
        }
    }

    function runScript(scriptAction, trackGenre, numberOfTracks) {
        var scriptFunction = getScriptFunction(scriptAction, trackGenre, numberOfTracks);
        if (!scriptFunction) return;
        scriptFunction();
    }

    function main() {
        rekordbox = Application("rekordbox");
        rekordbox.activate();
        systemEvents = Application("System Events");
        app = rekordbox;
        app.includeStandardAdditions = true;
        var userInput = promptUser();
        if (!userInput) return;
        var scriptAction = userInput.scriptAction;
        var trackGenre = userInput.trackGenre;
        var numberOfTracks = userInput.numberOfTracks;
        runScript(scriptAction, trackGenre, numberOfTracks);
    }

    main();


})();