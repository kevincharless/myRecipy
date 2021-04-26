import YouTube from 'react-youtube';

const RecipeVideo = ({ videoLink }) => {
    const url = videoLink?.substring(videoLink?.lastIndexOf('/') + 1) || videoLink;

    const opts = {
        height: '200',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    return (
        <div className="col-md-5 recipe-content-video">
            <h3 className="recipe-content-subheading">Video Tutorial :</h3>
            {videoLink ? (
            //  <iframe title="Tutorial Video" width="100%" height="200" src={videoLink} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <YouTube videoId={url} opts={opts} onReady={(e) => e.target.pauseVideo()} />
            ) : (
                <p style={{ opacity: '0.75' }}>no video available</p>
            )}
        </div>
    )
}

export default RecipeVideo
