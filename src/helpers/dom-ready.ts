export const DomReady = new class DomReady {
	public readyBound: boolean = false;
	public isReady: boolean = false;
	public readyList: Array<() => {}> = [];
	public userAgent: string = navigator.userAgent.toLowerCase();
	public isOpera: boolean;


	constructor() {
		this.isOpera = /opera/.test(this.userAgent);
		this.bindReady();
	}

	public ready(callback: () => void) {
		this.bindReady();

		if (this.isReady) {
			callback.call(window, []);
		} else {
			this.readyList.push(function () {
				return callback.call(window, []);
			});
		}
	}

	bindReady() {
		let self = this;
		if (this.readyBound) {
			return;
		}

		this.readyBound = true;

		// Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
		if (document.addEventListener && !this.isOpera) {
			// Use the handy event callback
			document.addEventListener("DOMContentLoaded", () => {
				this.domReady()
			}, false);
		}

		if (this.isOpera) {
			document.addEventListener("DOMContentLoaded", function anon() {
				if (self.isReady) return;
				for (var i = 0; i < document.styleSheets.length; i++)
					if (document.styleSheets[i].disabled) {
						setTimeout(anon, 0);
						return;
					}
				// and execute any waiting functions
				self.domReady();
			}, false);
		}

		if (/webkit/.test(this.userAgent)) {
			var numStyles;
			(function anon() {
				if (self.isReady) return;
				if ((document as any).readyState != "loaded" && document.readyState != "complete") {
					setTimeout(anon, 0);
					return;
				}
				if (typeof numStyles === "undefined") {
					numStyles = 0;
					var links = document.getElementsByTagName("link");
					for (var i = 0; i < links.length; i++) {
						if (links[i].getAttribute('rel') == 'stylesheet') {
							numStyles++;
						}
					}
					var styles = document.getElementsByTagName("style");
					numStyles += styles.length;
				}
				if (document.styleSheets.length != numStyles) {
					setTimeout(anon, 0);
					return;
				}

				// and execute any waiting functions
				self.domReady();
			})();
		}

		// A fallback to window.onload, that will always work
		this.addLoadEvent();
	}

	domReady() {
		if (this.isReady || !this.readyList.length) {
			return;
		}
		this.isReady = true;

		for (let i = 0; i < this.readyList.length; i++) {
			this.readyList[i].call(window, []);
		}

		this.readyList = [];
	}

	addLoadEvent() {
		const oldOnLoad = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = () => {
				this.domReady();
			};
		} else {
			window.onload = () => {
				if (oldOnLoad) {
					(oldOnLoad as () => void)();
				}
				this.domReady();
			}
		}
	};
};