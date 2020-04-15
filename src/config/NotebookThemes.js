// import AppColors from './Colors';

import NOTEBOOK_CREME from '../../static/notebook/Notebook-Creme.svg';
import NOTEBOOK_EXECUTIVE from '../../static/notebook/Notebook-Executive.svg';
import NOTEBOOK_MOSSY from '../../static/notebook/Notebook-MossyStone.svg';
import NOTEBOOK_ODD from '../../static/notebook/Notebook-Odd.svg';
import NOTEBOOK_RETRO from '../../static/notebook/Notebook-Retro.svg';
import NOTEBOOK_SHARK from '../../static/notebook/Notebook-Shark.svg';
import NOTEBOOK_SOPHISTICATED from '../../static/notebook/Notebook-Sophisticated.svg';
import NOTEBOOK_VINTAGE from '../../static/notebook/Notebook-Vintage.svg';
import NOTEBOOK_VIVID_RETRO from '../../static/notebook/Notebook-VividRetro.svg';

const Notebooks = {
  CREME: {
    name: 'Creme',
    Component: NOTEBOOK_CREME,
    TextContainerColor: '#a69f94',
    textColor: '#333333',
    spineTextColor: '#f1e7d6',
  },
  EXECUTIVE: {
    name: 'Executive',
    Component: NOTEBOOK_EXECUTIVE,
    TextContainerColor: '#BF9163',
    textColor: '#73573C',
    spineTextColor: '#525B56',
  },
  MOSSY: {
    name: 'Mossy',
    Component: NOTEBOOK_MOSSY,
    TextContainerColor: '#898C46',
    textColor: '#E0DADC',
    spineTextColor: '#E0DADC',
  },
  ODD: {
    name: 'Odd',
    Component: NOTEBOOK_ODD,
    TextContainerColor: '#A769B5',
    textColor: '#BCD904',
    spineTextColor: '#BCD904',
  },
  RETRO: {
    name: 'Retro',
    Component: NOTEBOOK_RETRO,
    TextContainerColor: '#563838',
    textColor: '#b8c2b5',
    spineTextColor: '#b8c2b5',
  },
  SHARK: {
    name: 'Shark',
    Component: NOTEBOOK_SHARK,
    TextContainerColor: '#16235a',
    textColor: '#ffffff',
    spineTextColor: '#c4bec1',
  },
  SOPHISTICATED: {
    name: 'Sophisticated',
    Component: NOTEBOOK_SOPHISTICATED,
    TextContainerColor: '#261d14',
    textColor: '#ad845a',
    spineTextColor: '#ad845a',
  },
  MINT: {
    name: 'Mint',
    Component: NOTEBOOK_VINTAGE,
    TextContainerColor: '#069686',
    textColor: '#d5dbd5',
    spineTextColor: '#ecf2eb',
  },
  VIVID_RETRO: {
    name: 'Vivid Retro',
    Component: NOTEBOOK_VIVID_RETRO,
    TextContainerColor: '#db8718',
    textColor: '#692f46',
    spineTextColor: '#ad4e74',
  },
};

export default Notebooks;

export const Fields = {
  Name: 'name',
  Component: 'Component',
  TextContainerColor: 'TextContainerColor',
  TextColor: 'textColor',
  SpineTextColor: 'spineTextColor',
};

export const getNotesWhere = (key, value) => {
  return Object.values(Notebooks).find(data => data[key] === value);
};
