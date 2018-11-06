export abstract class Event {
    public static ready(callback: () => void) {
        let doc = document;
        let documentElement = doc.documentElement as any;

        if (doc.readyState === "complete" || (doc.readyState !== "loading" && !documentElement.doScroll)) {
            callback();
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    }
}