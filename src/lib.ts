import { storage as fs } from "uxp";
import { app, Document } from 'photoshop';

async function writeLayers() {
    try {
        if (app.documents.length == 0) {
            app.showAlert("Please open at least one document.");
            return;
        }
        const activeDoc = app.activeDocument;

        const layerNames = getLayerNames(activeDoc);
        if (layerNames) {
            await writeLayersToDisk(activeDoc.title, layerNames);
        }
        else {
            app.showAlert("Could not get any layer names.");
        }
    }
    catch (err) {
        app.showAlert(`Error occurred getting layer names: ${err.message}`);
    }
}

function getLayerNames(activeDoc: Document) {
    return activeDoc.layers.map(layer => layer.name);
}

async function writeLayersToDisk(activeDocName: string, layerNames: string[]) {
    const file = await fs.localFileSystem.getFileForSaving("layer names.txt", { types: ["txt"] });
    if (!file) {
        return;
    }
    const result = file.write(`Layers for document ${activeDocName}\n\n${layerNames.join('\n')}`, undefined);
    console.log(result)
}

export { writeLayers };
export { getLayerNames };
