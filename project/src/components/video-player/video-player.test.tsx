import { render } from '@testing-library/react';
import { VideoPlayer } from './video-player';

describe('Component: VideoPlayer', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.load = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('should play melody when data is loaded', async () => {
    render(
      <VideoPlayer
        videoSrc=''
        posterSrc=''
      />,
    );
    await new Promise((r) => setTimeout(r, 1000));

    expect(window.HTMLVideoElement.prototype.play).toBeCalled();
  });
});
