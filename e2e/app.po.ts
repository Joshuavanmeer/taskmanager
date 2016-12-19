import { browser, element, by } from 'protractor';

export class TaskmanagerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tm-root h1')).getText();
  }
}
