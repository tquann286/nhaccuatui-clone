import millify from 'millify'

export const createRandomSongView = () => {
  const songView = Math.floor(Math.random() * 100000)
  if (songView > 1000 && songView < 1000000) {
    console.log(millify(songView))
    return millify(songView)
  } else {
    createRandomSongView()
  }
}

export const animationConfig = {
	animationIn: 'fadeIn',
	animationOut: 'fadeOut',
	animationInDuration: 100,
	animationOutDuration: 100,
	style: { zIndex: 1 },
}