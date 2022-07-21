import RenderCampsite from './RenderCampsite'

const CampsiteInfoScreen = ({ route }) => {
  /* destructure to get campsite param from route params object
  where all the params for the route exist */
  const { campsite } = route.params;
  return <RenderCampsite campsite={campsite} />;
}

export default CampsiteInfoScreen;