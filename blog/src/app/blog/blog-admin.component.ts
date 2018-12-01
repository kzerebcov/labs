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
    this.focus = value;
  }
}
