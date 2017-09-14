import { ColegiosPage } from './app.po';

describe('colegios App', () => {
  let page: ColegiosPage;

  beforeEach(() => {
    page = new ColegiosPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
