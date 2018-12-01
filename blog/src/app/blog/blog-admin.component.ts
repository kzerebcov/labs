import { Component, OnInit } from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})
export class BlogAdminComponent implements OnInit {
  private editor: Editor = new Editor();
  constructor() { }
  ngOnInit() { }
}

type Image = {
  url: string,
  alt: string,
  width: number,
  height: number
}

export class Editor {
  private image: EditorBlock;
  private title: string;
  private excerpt: EditorBlock = new EditorBlock('excerpt');
  private queue: Array<EditorBlock> = [];
  private slug: string;

  constructor() {
    this.queue.push(new EditorBlock('paragraph', true));
  }

  private removeBlock(target: number) {
    this.queue.splice(target, 1);
  }

  private moveUp(target: number) {
    if(target > 0) {
      let buffer = this.queue[target - 1];
      this.queue[target - 1] = this.queue[target];
      this.queue[target] = buffer;
    }
  }

  private moveDown(target: number) {
    if(target < this.queue.length - 1) {
      let buffer = this.queue[target + 1];
      this.queue[target + 1] = this.queue[target];
      this.queue[target] = buffer;
    }
  }

  private setFocus(target: number) {
    for(let index = 0; index < this.queue.length; index++) {
      index == target ? this.queue[index].setFocus(true) : this.queue[index].setFocus(false);
    }
  }

  private addTitleImage() {
    let block = new EditorBlock('image', true);
    block.url = 'http://via.placeholder.com/1350x900/f1f1f1/aaa/?text=placeholder';
    block.alt = '';
    this.image = block;
  }

  private saveTitleImage() {
    this.image.setFocus(false);
  }

  private removeTitleImage() {
    this.image = null;
  }

  private addParagraph() {
    let block = new EditorBlock('paragraph');
    block.text = '';
    this.queue.push(block);
    this.setFocus(this.queue.length - 1);
  }

  private addQuote() {
    let block = new EditorBlock('quote');
    block.text = '';
    block.subtitle = '';
    this.queue.push(block);
    this.setFocus(this.queue.length - 1);
  }

  private addImage() {
    let block = new EditorBlock('image');
    block.url = 'http://via.placeholder.com/1350x900/f1f1f1/aaa/?text=placeholder';
    block.alt = '';
    this.queue.push(block);
    this.setFocus(this.queue.length - 1);
  }

  private addCode() {
    let block = new EditorBlock('code');
    block.text = '';
    block.subtitle = '';
    this.queue.push(block);
    this.setFocus(this.queue.length - 1);
  }

  public updateSlug(title: string) {
    this.slug = this.makeSlug(title);
  }

  private makeSlug(str) {
    var from = "а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я ā ą ä á à â å č ć ē ę ě é è ê æ ģ ğ ö ó ø ǿ ô ő ḿ ŉ ń ṕ ŕ ş ü ß ř ł đ þ ĥ ḧ ī ï í î ĵ ķ ł ņ ń ň ř š ś ť ů ú û ứ ù ü ű ū ý ÿ ž ź ż ç є ґ".split(' ');
    var to =  "a b v g d e e zh z i y k l m n o p r s t u f h ts ch sh shch # y # e yu ya a a ae a a a a c c e e e e e e e g g oe o o o o o m n n p r s ue ss r l d th h h i i i i j k l n n n r s s t u u u u u u u u y y z z z c ye g".split(' ');

    str = str.toLowerCase();

    // remove simple HTML tags
    str = str.replace(/(<[a-z0-9\-]{1,15}[\s]*>)/gi, '');
    str = str.replace(/(<\/[a-z0-9\-]{1,15}[\s]*>)/gi, '');
    str = str.replace(/(<[a-z0-9\-]{1,15}[\s]*\/>)/gi, '');
    str = str.replace(/^\s+|\s+$/gm,''); // trim spaces

    for(let i=0; i<from.length; ++i)
      str = str.split(from[i]).join(to[i]);

    // Replace different kind of spaces with dashes
    var spaces = [/(&nbsp;|&#160;|&#32;)/gi, /(&mdash;|&ndash;|&#8209;)/gi,
      /[(_|=|\\|\,|\.|!)]+/gi, /\s/gi];

    for(let i=0; i<from.length; ++i)
      str = str.replace(spaces[i], '-');

    str = str.replace(/-{2,}/g, "-");

    // remove special chars like &amp;
    str = str.replace(/&[a-z]{2,7};/gi, '');
    str = str.replace(/&#[0-9]{1,6};/gi, '');
    str = str.replace(/&#x[0-9a-f]{1,6};/gi, '');
    str = str.replace(/[^a-z0-9\-]+/gmi, ""); // remove all other stuff
    str = str.replace(/^\-+|\-+$/gm,''); // trim edges

    return str;
  }
}

export class EditorBlock {
  public type: string;
  public url: string;
  public alt: string;
  public text: string;
  public subtitle: string;
  public focus: boolean;
  public width: number;
  public height: number;

  constructor(type: string, focus: boolean = false) {
    this.type = type;
    this.focus = focus;
  }

  public setFocus(value) {
    if(this.type == 'paragraph' && !this.text || this.text == '') {
      if(!value && this.focus) {
        this.text = 'Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Nulla vitae elit libero, a pharetra augue.';
      }
    }

    this.focus = value;
  }
}
