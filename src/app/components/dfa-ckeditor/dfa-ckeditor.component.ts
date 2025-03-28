import {Component,EventEmitter,Input,Output,OnInit,ViewChild,ElementRef,effect, SimpleChanges,} from '@angular/core';
import {
  type EditorConfig,
  ClassicEditor,
  Autosave,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  Italic,
  Link,
  Paragraph,
  RemoveFormat,
  SpecialCharacters,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline,
  Alignment,
  AutoImage,
  AutoLink,
  BlockQuote,
  CloudServices,
  FullPage,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  LinkImage,
  SourceEditing,
  Style,
  TextPartLanguage,
  WordCount,
} from 'ckeditor5';
import { CKEditorComponent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { CommonService } from '../../../services/common.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AudioStreamerService } from '../../services/audio-streamer.service';
import CustomPlugin from './audioStreamerPlugin';

@Component({
  selector: 'dfa-ckeditor',
  standalone: true,
  imports: [CKEditorModule, FormsModule, CommonModule],
  templateUrl: './dfa-ckeditor.component.html',
})
export class DfaCkeditorComponent implements OnInit {
  // Inputs
  @Input() editorContent: string = ''; // NgModel
  @Input() disabled: boolean = false; // Is CKEditor read only
  @Input() fullFeatures: boolean = true; // Determines if full features are enabled
  @Input() activeIndex: number = 0; // Active tab index
  @Input() actualIndex: number = 0; // Actual tab index
  // Outputs
  @Output() editorContentChange = new EventEmitter<string>();

  Editor = ClassicEditor;
  ckEditorConfig: EditorConfig = {};

  @ViewChild('editorWordCountElement')
  private editorWordCount!: ElementRef<HTMLDivElement>;
  @ViewChild('editorMenuBarElement')
  private editorMenuBar!: ElementRef<HTMLDivElement>;

  editorTag: any;
  isListening = false;

  constructor(
    private audioService: AudioStreamerService
  ) {
    effect(() => {
      this.updateTranscript();
    });
  }

  ngOnInit() {
    // Configuration for full features
    const fullConfig: EditorConfig = {
      licenseKey: 'GPL',
      extraPlugins: [CustomPlugin],
      toolbar: {
        items: [
          'heading',
          'style',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'subscript',
          'superscript',
          'code',
          'removeFormat',
          'link',
          'insertTable',
          'highlight',
          'sourceEditing',
          'blockQuote',
          'alignment',
          'outdent',
          'indent',
          '|',
          'customButton',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        Heading,
        Autosave,
        Bold,
        Code,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Highlight,
        Italic,
        Link,
        Paragraph,
        RemoveFormat,
        SpecialCharacters,
        Strikethrough,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        Underline,
        Alignment,
        AutoImage,
        AutoLink,
        BlockQuote,
        CloudServices,
        FullPage,
        HorizontalLine,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        LinkImage,
        SourceEditing,
        Style,
        TextPartLanguage,
        WordCount,
      ],
      style: {
        definitions: [
          {
            name: 'Article category',
            element: 'h3',
            classes: ['category'],
          },
          {
            name: 'Title',
            element: 'h2',
            classes: ['document-title'],
          },
          {
            name: 'Subtitle',
            element: 'h3',
            classes: ['document-subtitle'],
          },
          {
            name: 'Info box',
            element: 'p',
            classes: ['info-box'],
          },
          {
            name: 'Side quote',
            element: 'blockquote',
            classes: ['side-quote'],
          },
          {
            name: 'Marker',
            element: 'span',
            classes: ['marker'],
          },
          {
            name: 'Spoiler',
            element: 'span',
            classes: ['spoiler'],
          },
          {
            name: 'Code (dark)',
            element: 'pre',
            classes: ['fancy-code', 'fancy-code-dark'],
          },
          {
            name: 'Code (bright)',
            element: 'pre',
            classes: ['fancy-code', 'fancy-code-bright'],
          },
        ],
      },
      fontFamily: {
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4',
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5',
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6',
          },
        ],
      },
      htmlSupport: {
        allow: [
          { name: /^.*$/, styles: true, attributes: true, classes: true },
        ],
      },
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      menuBar: {
        isVisible: true,
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableProperties',
          'tableCellProperties',
        ],
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage',
        ],
      },
    };

    // Configuration for text area only
    const textAreaConfig: EditorConfig = {
      toolbar: {
        items: [],
      },
      plugins: [Essentials, Paragraph],
    };

    // Set the configuration based on fullFeatures input
    this.ckEditorConfig = this.fullFeatures ? fullConfig : textAreaConfig;
  }

  onCKEditorReady(editor: any) {
    this.editorTag = editor;
    if (this.disabled) {
      editor.enableReadOnlyMode('editor-disable');
    }
    if (!this.fullFeatures) {
      const toolbarContainer =
        editor.ui.view.toolbar.element.closest('.ck-editor__top');
      if (toolbarContainer) {
        toolbarContainer.style.display = 'none';
      }
    }
    // To make links clickable inside CKEditor
    editor.editing.view.document.on('click', (evt: any, data: any) => {
      const targetElement = data.target;
      // if (targetElement.name === 'a' && !this.commonService.isStrEmpty(targetElement.getAttribute('href'))) {
      //   data.preventDefault();
      //   window.open(targetElement.getAttribute('href'), '_blank');
      // }
    });

    editor.on('customPlugin:clicked', () => {  
      this.toggleMic()
    });

  }

  onContentChange(modifiedEditorContent: string) {
    this.editorContentChange.emit(modifiedEditorContent);
  }

  updateTranscript() {
    const text = this.audioService.getTranscript();
    if(this.actualIndex !== this.activeIndex) {
      if(this.isListening) {
        this.audioService.stopRecognition();
      }
      this.isListening = false;
      if (this.editorTag) {
        this.editorTag.fire('isListeningChanged', { value: true });
      }
      return
    }
    if (text !== '' && this.editorTag) {
      const editor = this.editorTag;
      const model = editor.model;
      model.change((writer: any) => {
        let insertPosition = model.document.selection.getFirstPosition();
        if (!insertPosition) {
          insertPosition = writer.createPositionAt(
            model.document.getRoot(),
            'end'
          );
        }
        writer.insertText(text + ' ', insertPosition);
        const newCursorPosition = insertPosition.getShiftedBy(text.length + 1);
        writer.setSelection(newCursorPosition);
      });
      editor.editing.view.focus();
    }
  }

  async toggleMic() {
    if (this.isListening) {
      this.audioService.stopRecognition();
    } else {
      await this.audioService.startRecognition();
    }
    this.isListening = !this.isListening;
  }

}
