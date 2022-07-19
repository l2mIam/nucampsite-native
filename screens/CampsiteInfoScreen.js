import Render from 'react-native';
import RenderCampsite from './RenderCampsite'

const CampsiteInfoScreen = (props) => {
  return <RenderCampsite campsite={props.campsite} />;
}

export default CampsiteInfoScreen;