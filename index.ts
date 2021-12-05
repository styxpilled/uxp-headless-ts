// Photoshop UXP TS Sample
// Get the layer names from the active document, and write them to a file, or print them to an alert.
import { entrypoints } from "uxp";
import { app } from 'photoshop';
import { writeLayers, getLayerNames } from './src/lib';

// Set up entrypoints
entrypoints.setup({
    commands: {
        writelayers: () => writeLayers(),
        printlayers: () => app.showAlert(getLayerNames(app.activeDocument).join('\n'))
    }
});
