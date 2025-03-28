import { Plugin, ButtonView } from 'ckeditor5';

export default class AudioStreamPlugin extends Plugin {
    isListening = false;
    buttonView: any;
    
    mic = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3z"/>
    <path fill="currentColor" d="M19 11h-2c0 2.5-2 4.5-5 4.5S7 13.5 7 11H5c0 3.03 2.13 5.44 5 5.91V19H9v2h6v-2h-1v-2.09c2.87-.47 5-2.88 5-5.91z"/>
    </svg>`;
    
    mute_mic = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3z"/>
    <path fill="currentColor" d="M19 11h-2c0 2.5-2 4.5-5 4.5S7 13.5 7 11H5c0 3.03 2.13 5.44 5 5.91V19H9v2h6v-2h-1v-2.09c2.87-.47 5-2.88 5-5.91z"/>
    <path fill="red" stroke="currentColor" stroke-width="2" d="M4 4l16 16"/>
    </svg>`;
    
    init() {
        const editor = this.editor;
        editor.listenTo(editor, 'isListeningChanged', (evt, data) => {
            this.isListening = false
            if (this.buttonView) {
                this.buttonView.icon = this.mic;
            }
        });

        editor.ui.componentFactory.add('customButton', locale => {
            const view = new ButtonView(locale);
            this.buttonView = view;
            view.set({
                label: 'Mic',
                tooltip: true,
                withText: false,
                icon: this.mic
            });
            view.on('execute', () => {
                this.isListening = !this.isListening;
                view.set({ icon: this.isListening ? this.mute_mic : this.mic });
                editor.fire('customPlugin:clicked');
            });
            return view;
        });
    }
}
