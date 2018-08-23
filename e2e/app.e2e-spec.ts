import { MarbleDogsPage } from './app.po';

describe('marble-dogs App', () => {
  let page: MarbleDogsPage;

  beforeEach(() => {
    page = new MarbleDogsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
