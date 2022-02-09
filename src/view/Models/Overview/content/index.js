import BrainCT from './BrainCT';
import BrainMRI from './BrainMRI';
import ChestCT from './ChestCT';
import ChestXR from './ChestXR';
import LiverCT from './LiverCT';
import Mammo from './Mammo';
import SpineXR from './SpineXR';

const modelOverviews = {
  ChestXray: ChestXR,
  SpineXray: SpineXR,
  Mammography: Mammo,
  BrainCT: BrainCT,
  BrainMRI: BrainMRI,
  LungCT: ChestCT,
  LiverCT: LiverCT,
};

export default modelOverviews;
